import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSiteUrl } from '@/lib/site';

const FROM_ADDRESS = 'CTS Tours <info@ctstours.co.nz>';
const DEFAULT_NOTIFY = 'info@ctstours.co.nz';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('contact: RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'Contact form is not configured. Please call 0800 CTS 888.' },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const notifyTo = process.env.ENQUIRY_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY;

  try {
    const body = await req.json();
    const { name, email, phone, travel_interest, message } = body;

    if (!name || !email || !travel_interest || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();
    const contactUrl = `${getSiteUrl()}/contact`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New contact message</title></head>
<body style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;">
  <h1 style="font-size:18px;">New message — Contact form (CTS website)</h1>
  <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
    <tr><td style="font-weight:bold;">Name</td><td>${escapeHtml(String(name))}</td></tr>
    <tr><td style="font-weight:bold;">Email</td><td>${escapeHtml(String(email))}</td></tr>
    <tr><td style="font-weight:bold;">Phone</td><td>${phone ? escapeHtml(String(phone)) : '—'}</td></tr>
    <tr><td style="font-weight:bold;">Travel interest</td><td>${escapeHtml(String(travel_interest))}</td></tr>
    <tr><td style="font-weight:bold;">Submitted</td><td>${submittedAt}</td></tr>
    <tr><td style="font-weight:bold;">Form URL</td><td><a href="${escapeHtml(contactUrl)}">/contact</a></td></tr>
  </table>
  <p style="margin-top:16px;"><strong>Message</strong></p>
  <p style="white-space:pre-wrap;">${escapeHtml(String(message))}</p>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: notifyTo,
      replyTo: email,
      subject: `Contact form: ${travel_interest} — ${name}`,
      html,
    });

    if (error) {
      console.error('Resend error (contact):', error);
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('contact error:', err);
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
