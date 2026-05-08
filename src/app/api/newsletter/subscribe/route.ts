import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

function subscriberHash(email: string): string {
  return createHash('md5').update(email.toLowerCase()).digest('hex');
}

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

  const authHeader = `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`;
  const baseUrl = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`;

  const nameParts = (name || '').trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ');

  try {
    const addResponse = await fetch(baseUrl, {
      method: 'POST',
      headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email_address: email,
        status: 'pending',
        merge_fields: { FNAME: firstName, LNAME: lastName },
      }),
    });

    const addData = await addResponse.json();

    if (addResponse.status === 400 && addData.title === 'Member Exists') {
      return handleExistingMember(email, firstName, lastName, authHeader, baseUrl);
    }

    if (!addResponse.ok) {
      console.error('Mailchimp API error:', addData);
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Almost there! Please check your email to confirm your subscription.',
    });
  } catch (err) {
    console.error('Newsletter subscribe error:', err);
    return NextResponse.json({ error: 'Network error. Please try again.' }, { status: 500 });
  }
}

async function handleExistingMember(
  email: string,
  firstName: string,
  lastName: string,
  authHeader: string,
  baseUrl: string
): Promise<NextResponse> {
  const hash = subscriberHash(email);
  const memberUrl = `${baseUrl}/${hash}`;

  try {
    const memberResponse = await fetch(memberUrl, {
      headers: { Authorization: authHeader },
    });
    const memberData = await memberResponse.json();
    const status: string = memberData.status;

    if (status === 'subscribed') {
      return NextResponse.json({ message: "You're already subscribed — no action needed!" });
    }

    if (status === 'pending') {
      return NextResponse.json({
        message: "You should already have a confirmation email — please check your inbox.",
      });
    }

    // unsubscribed or cleaned: re-enable with a fresh double opt-in
    const patchResponse = await fetch(memberUrl, {
      method: 'PATCH',
      headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'pending',
        merge_fields: { FNAME: firstName, LNAME: lastName },
      }),
    });

    if (!patchResponse.ok) {
      console.error('Mailchimp PATCH error:', await patchResponse.json());
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Almost there! Please check your email to confirm your subscription.',
    });
  } catch (err) {
    console.error('Newsletter member lookup error:', err);
    return NextResponse.json({ error: 'Network error. Please try again.' }, { status: 500 });
  }
}
