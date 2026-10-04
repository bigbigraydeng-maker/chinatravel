/**
 * Lead-conversion firing for CTS Tours enquiry funnels.
 *
 * Fires the Google Ads "Booking Service" conversion + the Meta Pixel `Lead`
 * event + a GA4 `generate_lead` event together, so every enquiry path reports
 * identically (the GA4 event is what Magic Engine / GA4 reports read as "a
 * real enquiry was accepted"; the form-level `dataLayer` pushes never reach GA4
 * because the GTM container script is not installed on the site):
 *   - /contact form submit (inline success state)
 *   - tour enquiry → /thank-you landing
 *
 * gtag + fbq are installed unconditionally by <TrackingScripts> (they are NOT
 * cookie-consent gated), so these fire regardless of the visitor's consent
 * choice. Each channel is guarded independently — a missing gtag/fbq simply
 * skips that channel without throwing.
 *
 * <TrackingScripts> loads gtag/fbq with strategy="afterInteractive", so on a
 * FULL /thank-you load (refresh / bookmark / direct hit) the caller's effect can
 * run before they exist. To avoid silently dropping those conversions we retry
 * each channel for a few seconds until it is ready, firing each at most once.
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

export type LeadSource = 'contact_page' | 'tour_enquiry' | 'china_tours_hub' | 'china_visa_guide';

/**
 * Fire the Google Ads conversion + Meta Pixel `Lead` for a submitted enquiry.
 *
 * The shared `eventID` lets a future server-side CAPI `Lead` event de-duplicate
 * against this browser event (see conversion-tracking audit, Phase-2 CAPI).
 */
const MAX_ATTEMPTS = 20; // retry for ~3s (20 × 150ms) while gtag/fbq finish loading
const RETRY_MS = 150;

export function fireLeadConversion(source: LeadSource): void {
  if (typeof window === 'undefined') return;

  const eventId = `cts-${source}-${Date.now()}`;
  let gtagDone = false;
  let fbqDone = false;
  let attempts = 0;

  const tick = () => {
    if (!gtagDone) {
      const g = gtag();
      if (g) {
        g('event', 'conversion', {
          send_to: GOOGLE_ADS_SEND_TO,
          value: LEAD_VALUE,
          currency: CURRENCY,
          transaction_id: eventId,
        });
        // GA4: no value on purpose — the 1.0 above is an Ads bidding placeholder,
        // not revenue, and must not show up as money in GA4 reports.
        g('event', 'generate_lead', {
          lead_source: source,
          transaction_id: eventId,
        });
        gtagDone = true;
      }
    }
    if (!fbqDone) {
      const f = fbq();
      if (f) {
        f('track', 'Lead', { value: LEAD_VALUE, currency: CURRENCY }, { eventID: eventId });
        fbqDone = true;
      }
    }
    if ((gtagDone && fbqDone) || ++attempts >= MAX_ATTEMPTS) return;
    setTimeout(tick, RETRY_MS);
  };

  tick();
}
