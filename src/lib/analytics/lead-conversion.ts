/**
 * Lead-conversion firing for CTS Tours enquiry funnels.
 *
 * Fires the Google Ads "Booking Service" conversion + the Meta Pixel `Lead`
 * event together, so every enquiry path reports identically:
 *   - /contact form submit (inline success state)
 *   - tour enquiry → /thank-you landing
 *
 * gtag + fbq are installed unconditionally by <TrackingScripts> (they are NOT
 * cookie-consent gated), so these fire regardless of the visitor's consent
 * choice. Each channel is guarded independently — a missing gtag/fbq simply
 * skips that channel without throwing.
 */

type GtagFn = (...args: unknown[]) => void;
type FbqFn = (...args: unknown[]) => void;

function gtag(): GtagFn | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { gtag?: GtagFn }).gtag;
}

function fbq(): FbqFn | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { fbq?: FbqFn }).fbq;
}

/** Google Ads conversion action — 预约服务 (Booking Service). Single source of truth. */
const GOOGLE_ADS_SEND_TO = 'AW-17984232872/y-kaCLSI9YAcEKi7xv9C';
const LEAD_VALUE = 1.0; // NZD — keep Google Ads + Meta Pixel values in sync
const CURRENCY = 'NZD';

export type LeadSource = 'contact_page' | 'tour_enquiry';

/**
 * Fire the Google Ads conversion + Meta Pixel `Lead` for a submitted enquiry.
 *
 * The shared `eventID` lets a future server-side CAPI `Lead` event de-duplicate
 * against this browser event (see conversion-tracking audit, Phase-2 CAPI).
 */
export function fireLeadConversion(source: LeadSource): void {
  if (typeof window === 'undefined') return;

  const eventId = `cts-${source}-${Date.now()}`;

  gtag()?.('event', 'conversion', {
    send_to: GOOGLE_ADS_SEND_TO,
    value: LEAD_VALUE,
    currency: CURRENCY,
    transaction_id: eventId,
  });

  fbq()?.('track', 'Lead', { value: LEAD_VALUE, currency: CURRENCY }, { eventID: eventId });
}
