import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getTourBySlug } from '@/lib/data/tours';

const FROM_ADDRESS = 'CTS Tours <itinerary@chinatravel.co.nz>';
const REPLY_TO = 'ctstours1@chinatravel.co.nz';

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { email, name, tourSlug, destination, tier } = await req.json();

    if (!email || !tourSlug || !destination || !tier) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const tour = getTourBySlug(destination, tier, tourSlug);

    if (!tour) {
      return NextResponse.json({ error: 'Tour not found.' }, { status: 404 });
    }

    const greeting = name ? `Hi ${name},` : 'Hi there,';
    const tierLabel = tier.charAt(0).toUpperCase() + tier.slice(1);

    const itineraryRows = tour.itinerary
      .map(
        (day) => `
        <tr>
          <td style="padding:12px 16px;vertical-align:top;width:48px;">
            <div style="width:36px;height:36px;background:#c0392b;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;text-align:center;line-height:36px;">
              ${day.day}
            </div>
          </td>
          <td style="padding:12px 16px 12px 0;vertical-align:top;border-bottom:1px solid #f3f4f6;">
            <p style="margin:0 0 4px;font-weight:700;font-size:14px;color:#111827;">${day.title}</p>
            <p style="margin:0 0 8px;font-size:13px;color:#4b5563;line-height:1.6;">${day.description}</p>
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              ${day.meals && day.meals.length > 0 ? `Meals: ${day.meals.join(', ')}` : ''}
              ${day.meals && day.meals.length > 0 && day.accommodation ? ' &nbsp;·&nbsp; ' : ''}
              ${day.accommodation ? `Accommodation: ${day.accommodation}` : ''}
            </p>
          </td>
        </tr>`
      )
      .join('');

    const inclusionsList = tour.inclusions
      .map((item) => `<li style="margin-bottom:4px;font-size:13px;color:#374151;">✓ &nbsp;${item}</li>`)
      .join('');

    const exclusionsList = tour.exclusions
      .map((item) => `<li style="margin-bottom:4px;font-size:13px;color:#374151;">✗ &nbsp;${item}</li>`)
      .join('');

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${tour.title} — Itinerary</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#1f2937;padding:24px 32px;text-align:left;">
              <img src="https://chinatravel.co.nz/logo.png" alt="CTS Tours" height="40" style="display:block;margin-bottom:8px;" />
              <p style="margin:0;font-size:12px;color:#9ca3af;">China Travel Specialists — Since 1928</p>
            </td>
          </tr>

          <!-- Tour Banner -->
          <tr>
            <td style="background:#c0392b;padding:20px 32px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:1px;">China ${tierLabel}</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">${tour.title}</h1>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:24px 32px 16px;">
              <p style="margin:0 0 12px;font-size:14px;color:#374151;">${greeting}</p>
              <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">
                Here's the full itinerary for <strong>${tour.title}</strong>. We hope it gives you a great sense of the journey ahead.
              </p>
            </td>
          </tr>

          <!-- Quick Facts -->
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
                <tr>
                  <td style="padding:16px;border-right:1px solid #e5e7eb;text-align:center;">
                    <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Duration</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${tour.duration}</p>
                  </td>
                  <td style="padding:16px;border-right:1px solid #e5e7eb;text-align:center;">
                    <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Price from</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#c0392b;">${tour.price}</p>
                  </td>
                  <td style="padding:16px;text-align:center;">
                    <p style="margin:0 0 2px;font-size:11px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.5px;">Collection</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${tierLabel}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Itinerary Heading -->
          <tr>
            <td style="padding:0 32px 12px;">
              <h2 style="margin:0;font-size:16px;font-weight:700;color:#111827;border-bottom:2px solid #e5e7eb;padding-bottom:8px;">Day-by-Day Itinerary</h2>
            </td>
          </tr>

          <!-- Itinerary Days -->
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${itineraryRows}
              </table>
            </td>
          </tr>

          <!-- Inclusions / Exclusions -->
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="8">
                <tr>
                  <td style="width:50%;vertical-align:top;padding-right:8px;">
                    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px;">
                      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#166534;">Included</p>
                      <ul style="margin:0;padding:0;list-style:none;">${inclusionsList}</ul>
                    </div>
                  </td>
                  <td style="width:50%;vertical-align:top;padding-left:8px;">
                    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;">
                      <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#991b1b;">Not Included</p>
                      <ul style="margin:0;padding:0;list-style:none;">${exclusionsList}</ul>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Footer -->
          <tr>
            <td style="background:#1f2937;padding:24px 32px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;color:#d1d5db;">Ready to book this tour? Our China specialists are here to help.</p>
              <p style="margin:0;font-size:15px;font-weight:700;color:#ffffff;">
                0800 CTS 888 &nbsp;·&nbsp; ctstours1@chinatravel.co.nz
              </p>
            </td>
          </tr>

          <!-- Legal Footer -->
          <tr>
            <td style="padding:16px 32px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#9ca3af;">
                © ${new Date().getFullYear()} CTS Tours. Part of China Travel Service Group, est. 1928.<br />
                2F CTS House, 175 Queen Street, Auckland, New Zealand.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      replyTo: REPLY_TO,
      subject: `Your Itinerary: ${tour.title} (${tour.duration})`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Send itinerary error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
