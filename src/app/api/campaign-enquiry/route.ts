import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const FROM_ADDRESS = 'CTS Tours <info@ctstours.co.nz>';
const DEFAULT_NOTIFY = 'info@ctstours.co.nz';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('campaign-enquiry: RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'Enquiry service is not configured. Please call (09) 375 1717.' },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const notifyTo = process.env.ENQUIRY_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY;

  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      tourOfInterest,
      numTravellers,
      preferredContact,
      message,
      source,
    } = body;

    if (!firstName || !lastName || !email || !phone || !tourOfInterest) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();
    const name = `${String(firstName).trim()} ${String(lastName).trim()}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New campaign enquiry</title></head>
<body style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;padding:24px;">
  <h1 style="font-size:18px;margin-bottom:16px;">New campaign enquiry — ${escapeHtml(String(source || 'Campaign page'))}</h1>
  <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
    <tr><td style="font-weight:bold;padding-right:24px;">Name</td><td>${escapeHtml(name)}</td></tr>
    <tr><td style="font-weight:bold;">Email</td><td><a href="mailto:${escapeHtml(String(email))}">${escapeHtml(String(email))}</a></td></tr>
    <tr><td style="font-weight:bold;">Phone</td><td>${escapeHtml(String(phone))}</td></tr>
    <tr><td style="font-weight:bold;">Tour of interest</td><td>${escapeHtml(String(tourOfInterest))}</td></tr>
    <tr><td style="font-weight:bold;">Travellers</td><td>${escapeHtml(String(numTravellers || '—'))}</td></tr>
    <tr><td style="font-weight:bold;">Preferred contact</td><td>${escapeHtml(String(preferredContact || '—'))}</td></tr>
    <tr><td style="font-weight:bold;">Submitted</td><td>${submittedAt}</td></tr>
  </table>
  ${message ? `<p style="margin-top:20px;"><strong>Message:</strong></p><p style="white-space:pre-wrap;background:#f9fafb;padding:12px;border:1px solid #e5e7eb;">${escapeHtml(String(message))}</p>` : ''}
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: notifyTo,
      replyTo: String(email),
      subject: `Campaign enquiry: ${String(tourOfInterest).slice(0, 60)} — ${name}`,
      html,
    });

    if (error) {
      console.error('Resend error (campaign-enquiry):', error);
      return NextResponse.json({ error: 'Failed to send enquiry. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('campaign-enquiry error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
