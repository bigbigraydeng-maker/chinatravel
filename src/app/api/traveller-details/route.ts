import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const FROM_ADDRESS = 'CTS Tours <info@ctstours.co.nz>';
const DEFAULT_NOTIFY = 'info@ctstours.co.nz';

interface TravellerInput {
  fullName?: string;
  dob?: string;
  dietary?: string;
  medical?: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('traveller-details: RESEND_API_KEY is not set');
    return NextResponse.json(
      { error: 'This form is not configured yet. Please call 0800 CTS 888.' },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const notifyTo = process.env.ENQUIRY_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY;

  try {
    const body = await req.json();
    const {
      bookingRef,
      leadName,
      leadEmail,
      leadPhone,
      tourName,
      travellers,
      emergencyName,
      emergencyRelationship,
      emergencyPhone,
      specialOccasion,
      agreeAccurate,
      agreeTerms,
    } = body ?? {};

    const list: TravellerInput[] = Array.isArray(travellers) ? travellers : [];
    const validTravellers = list.filter(
      (t) => t && String(t.fullName || '').trim() && String(t.dob || '').trim()
    );

    // Required: lead contact, at least one complete traveller, an emergency contact,
    // and both consent ticks. These two consents are the legal record we keep.
    if (!leadName || !leadEmail) {
      return NextResponse.json({ error: 'Please enter your name and email.' }, { status: 400 });
    }
    if (validTravellers.length === 0) {
      return NextResponse.json(
        { error: 'Please add at least one traveller with a full legal name and date of birth.' },
        { status: 400 }
      );
    }
    if (!emergencyName || !emergencyPhone) {
      return NextResponse.json(
        { error: 'Please provide an emergency contact name and phone number.' },
        { status: 400 }
      );
    }
    if (agreeAccurate !== true || agreeTerms !== true) {
      return NextResponse.json(
        { error: 'Please tick both confirmation boxes to submit.' },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();

    const travellerRows = validTravellers
      .map(
        (t, i) => `
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb;vertical-align:top;">${i + 1}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;vertical-align:top;">${escapeHtml(String(t.fullName))}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;vertical-align:top;">${escapeHtml(String(t.dob))}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;vertical-align:top;white-space:pre-wrap;">${t.dietary ? escapeHtml(String(t.dietary)) : '—'}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;vertical-align:top;white-space:pre-wrap;">${t.medical ? escapeHtml(String(t.medical)) : '—'}</td>
        </tr>`
      )
      .join('');

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><title>Traveller details</title></head>
<body style="font-family:Arial,sans-serif;line-height:1.5;color:#111827;">
  <h1 style="font-size:18px;">Traveller details submitted — CTS website</h1>

  <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:16px;">
    <tr><td style="font-weight:bold;">Booking ref</td><td>${bookingRef ? escapeHtml(String(bookingRef)) : '—'}</td></tr>
    <tr><td style="font-weight:bold;">Tour</td><td>${tourName ? escapeHtml(String(tourName)) : '—'}</td></tr>
    <tr><td style="font-weight:bold;">Lead contact</td><td>${escapeHtml(String(leadName))}</td></tr>
    <tr><td style="font-weight:bold;">Email</td><td>${escapeHtml(String(leadEmail))}</td></tr>
    <tr><td style="font-weight:bold;">Phone</td><td>${leadPhone ? escapeHtml(String(leadPhone)) : '—'}</td></tr>
    <tr><td style="font-weight:bold;">Submitted</td><td>${submittedAt}</td></tr>
  </table>

  <h2 style="font-size:15px;">Travellers</h2>
  <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;border:1px solid #e5e7eb;margin-bottom:16px;">
    <thead>
      <tr style="background:#f9fafb;">
        <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">#</th>
        <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Full legal name (as per passport)</th>
        <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Date of birth</th>
        <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Dietary requirements</th>
        <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Medical / mobility notes</th>
      </tr>
    </thead>
    <tbody>${travellerRows}</tbody>
  </table>

  <h2 style="font-size:15px;">Emergency contact</h2>
  <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-bottom:16px;">
    <tr><td style="font-weight:bold;">Name</td><td>${escapeHtml(String(emergencyName))}</td></tr>
    <tr><td style="font-weight:bold;">Relationship</td><td>${emergencyRelationship ? escapeHtml(String(emergencyRelationship)) : '—'}</td></tr>
    <tr><td style="font-weight:bold;">Phone</td><td>${escapeHtml(String(emergencyPhone))}</td></tr>
  </table>

  ${
    specialOccasion
      ? `<p><strong>Special occasion during trip:</strong> ${escapeHtml(String(specialOccasion))}</p>`
      : ''
  }

  <p style="margin-top:16px;font-size:13px;color:#166534;">
    ✔ Traveller confirmed details are accurate as per passport.<br />
    ✔ Traveller read and agreed to the Terms &amp; Conditions and understands the deposit is non-refundable.
  </p>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: notifyTo,
      replyTo: String(leadEmail),
      subject: `Traveller details: ${leadName}${bookingRef ? ` (${bookingRef})` : ''}`,
      html,
    });

    if (error) {
      console.error('Resend error (traveller-details):', error);
      return NextResponse.json({ error: 'Failed to submit. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('traveller-details error:', err);
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
