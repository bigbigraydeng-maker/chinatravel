import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSiteUrl } from '@/lib/site';

const FROM_ADDRESS = 'CTS Tours <enquiries@chinatravel.co.nz>';
const DEFAULT_NOTIFY = 'ctstours1@chinatravel.co.nz';

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('tour-enquiry: RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'Enquiry service is not configured. Please call 0800 CTS 888.' },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const notifyTo = process.env.ENQUIRY_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY;

  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      message,
      tourName,
      tourSlug,
      destination,
      tier,
      source,
    } = body;

    if (!name || !email || !phone || !tourName || !tourSlug || !destination || !tier) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();
    const tourPath = `/tours/${destination}/${tier}/${tourSlug}`;
    const absTourUrl = `${getSiteUrl()}${tourPath}`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>New tour enquiry</title></head>
<body style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;">
  <h1 style="font-size:18px;">New tour enquiry — CTS website</h1>
  <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
    <tr><td style="font-weight:bold;">Name</td><td>${escapeHtml(String(name))}</td></tr>
    <tr><td style="font-weight:bold;">Email</td><td>${escapeHtml(String(email))}</td></tr>
    <tr><td style="font-weight:bold;">Phone</td><td>${escapeHtml(String(phone))}</td></tr>
    <tr><td style="font-weight:bold;">Tour</td><td>${escapeHtml(String(tourName))}</td></tr>
    <tr><td style="font-weight:bold;">URL</td><td><a href="${escapeHtml(absTourUrl)}">${escapeHtml(tourPath)}</a></td></tr>
    <tr><td style="font-weight:bold;">Source</td><td>${escapeHtml(String(source || 'Tour Page'))}</td></tr>
    <tr><td style="font-weight:bold;">Submitted</td><td>${submittedAt}</td></tr>
  </table>
  ${message ? `<p style="margin-top:16px;"><strong>Message</strong></p><p style="white-space:pre-wrap;">${escapeHtml(String(message))}</p>` : ''}
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: notifyTo,
      replyTo: email,
      subject: `Tour enquiry: ${tourName} — ${name}`,
      html,
    });

    if (error) {
      console.error('Resend error (tour-enquiry):', error);
      return NextResponse.json({ error: 'Failed to send enquiry. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('tour-enquiry error:', err);
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
