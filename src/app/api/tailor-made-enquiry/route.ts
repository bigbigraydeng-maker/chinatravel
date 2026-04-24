import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const FROM_ADDRESS = 'CTS Tours <info@ctstours.co.nz>';
const DEFAULT_NOTIFY = 'info@ctstours.co.nz';
const MESSAGE_MAX = 10000;

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('tailor-made-enquiry: RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'Enquiry service is not configured. Please call 0800 CTS 888.' },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const notifyTo = process.env.ENQUIRY_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY;

  try {
    const body = await req.json();

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const country = String(body.country ?? '').trim();
    const destinations = normalizeStringArray(body.destinations);
    const interests = normalizeStringArray(body.interests);
    const travelDate = String(body.travelDate ?? '').trim();
    const duration = String(body.duration ?? '').trim();
    const travellers = String(body.travellers ?? '').trim();
    const budget = String(body.budget ?? '').trim();
    const accommodation = String(body.accommodation ?? '').trim();
    const includeFlights = String(body.includeFlights ?? '').trim();
    const referralSource = String(body.referralSource ?? '').trim();
    let message = String(body.message ?? '').trim();
    if (message.length > MESSAGE_MAX) {
      message = message.slice(0, MESSAGE_MAX);
    }
    const source = String(body.source ?? 'Tailor Made Page').trim();

    if (!name || !email || !country) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Tailor-made enquiry</title></head>
<body style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;">
  <h1 style="font-size:18px;">Tailor-made enquiry — CTS website</h1>
  <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;">
    <tr><td style="font-weight:bold;">Name</td><td>${escapeHtml(name)}</td></tr>
    <tr><td style="font-weight:bold;">Email</td><td>${escapeHtml(email)}</td></tr>
    <tr><td style="font-weight:bold;">Phone</td><td>${escapeHtml(phone || '—')}</td></tr>
    <tr><td style="font-weight:bold;">Country</td><td>${escapeHtml(country)}</td></tr>
    <tr><td style="font-weight:bold;">Destinations</td><td>${escapeHtml(destinations.length ? destinations.join(', ') : '—')}</td></tr>
    <tr><td style="font-weight:bold;">Interests</td><td>${escapeHtml(interests.length ? interests.join(', ') : '—')}</td></tr>
    <tr><td style="font-weight:bold;">Preferred travel date</td><td>${escapeHtml(travelDate || '—')}</td></tr>
    <tr><td style="font-weight:bold;">Duration</td><td>${escapeHtml(duration || '—')}</td></tr>
    <tr><td style="font-weight:bold;">Travellers</td><td>${escapeHtml(travellers || '—')}</td></tr>
    <tr><td style="font-weight:bold;">Budget (pp)</td><td>${escapeHtml(budget || '—')}</td></tr>
    <tr><td style="font-weight:bold;">Accommodation</td><td>${escapeHtml(accommodation || '—')}</td></tr>
    <tr><td style="font-weight:bold;">Include flights</td><td>${escapeHtml(includeFlights || '—')}</td></tr>
    <tr><td style="font-weight:bold;">How they heard</td><td>${escapeHtml(referralSource || '—')}</td></tr>
    <tr><td style="font-weight:bold;">Source</td><td>${escapeHtml(source)}</td></tr>
    <tr><td style="font-weight:bold;">Submitted</td><td>${submittedAt}</td></tr>
  </table>
  ${
    message
      ? `<p style="margin-top:16px;"><strong>Message</strong></p><p style="white-space:pre-wrap;">${escapeHtml(message)}</p>`
      : ''
  }
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: notifyTo,
      replyTo: email,
      subject: `Tailor-made enquiry — ${name}`,
      html,
    });

    if (error) {
      console.error('Resend error (tailor-made-enquiry):', error);
      return NextResponse.json({ error: 'Failed to send enquiry. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('tailor-made-enquiry error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

function normalizeStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x): x is string => typeof x === 'string')
    .map((s) => s.trim())
    .filter(Boolean);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
