import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let email: string;
  let name: string | undefined;

  try {
    const body = await request.json();
    email = body.email;
    name = body.name;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email address required' }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  const dc = process.env.MAILCHIMP_DATACENTER || 'us19';

  if (!apiKey || !audienceId) {
    console.error('Newsletter: MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID not configured');
    return NextResponse.json({ error: 'Newsletter service not configured' }, { status: 500 });
  }

  const nameParts = (name || '').trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');

  try {
    const response = await fetch(
      `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'pending',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        }),
      }
    );

    const data = await response.json();

    if (response.status === 400 && data.title === 'Member Exists') {
      return NextResponse.json({ message: "You're already on our list!" });
    }

    if (!response.ok) {
      console.error('Mailchimp API error:', data);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Almost there! Please check your email to confirm your subscription.',
    });
  } catch (err) {
    console.error('Newsletter subscribe error:', err);
    return NextResponse.json({ error: 'Network error. Please try again.' }, { status: 500 });
  }
}
