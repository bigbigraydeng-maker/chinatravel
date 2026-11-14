/** Sends the customer their personal upload link (first time or reminder). */
import { Resend } from 'resend';
import { passportUploadSubject } from '@/lib/email-subjects';
import { getSiteUrl } from '@/lib/site';
import { LINK_VALID_DAYS } from './store';

const FROM_ADDRESS = 'CTS Tours <info@ctstours.co.nz>';

export function uploadUrl(token: string): string {
  return `${getSiteUrl()}/passport-upload/${token}`;
}

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] ?? c);
}

export function uploadEmailHtml(name: string, tourName: string, departureDate: string, url: string, isReminder: boolean): string {
  return `<p>Dear ${esc(name)},</p>
<p>${isReminder ? 'A friendly reminder: we still need' : 'To finalise your booking we need'} a photo of your passport for <strong>${esc(tourName)}</strong> (departing ${esc(departureDate)}). Airlines, hotels and our team in China need your details exactly as they appear on your passport.</p>
<p><a href="${esc(url)}">Upload your passport photo securely</a></p>
<p>This link is just for you and works for ${LINK_VALID_DAYS} days. Your photo is encrypted, only CTS staff can see it, and it is deleted 6 months after your tour returns. See our <a href="${esc(getSiteUrl())}/privacy-policy#passport-information">privacy policy</a>.</p>
<p>If you did not expect this email, please call us on 0800 CTS 888 before uploading anything.</p>
<p>Kind regards,<br/>CTS Tours New Zealand</p>`;
}

export class EmailNotConfiguredError extends Error {}

export async function sendUploadLink(to: string, name: string, tourName: string, departureDate: string, token: string, isReminder: boolean): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new EmailNotConfiguredError('RESEND_API_KEY is not set');
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: passportUploadSubject(tourName, isReminder),
    html: uploadEmailHtml(name, tourName, departureDate, uploadUrl(token), isReminder),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}
