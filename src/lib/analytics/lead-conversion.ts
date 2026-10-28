/**
 * Lead-conversion firing for CTS Tours enquiry funnels.
 *
 * Fires the Google Ads "Booking Service" conversion + the Meta Pixel `Lead`
 * event + a GA4 `generate_lead` event together, so every enquiry path reports
 * identically (the GA4 event is what Magic Engine / GA4 reports read as "a
 * real enquiry was accepted"; the form-level `dataLayer` pushes never reach GA4
 * because the GTM container script is not installed on the site):
 *   - /contact form submit (inline success state)
 *   - tour enquiry form: fired by the form itself the moment /api/tour-enquiry
 *     accepts the submission, just before it navigates to /thank-you. The
 *     /thank-you page never fires it — opening that URL (bookmark, refresh,
 *     shared link, QA) is not an enquiry.
 *
 * gtag + fbq are installed unconditionally by <TrackingScripts> (they are NOT
 * cookie-consent gated), so these fire regardless of the visitor's consent
 * choice. Each channel is guarded independently — a missing gtag/fbq simply
 * skips that channel without throwing.
 *
 * <TrackingScripts> loads gtag/fbq with strategy="afterInteractive", so a caller
 * that runs very early in a page load can run before they exist. To avoid
 * silently dropping those conversions we retry each channel for a few seconds
 * until it is ready, firing each at most once.
 */

import { readSubmitAttribution } from './first-touch';

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
// A fixed NZD 1 for the Google Ads "Booking Service" conversion ONLY. It is neither revenue nor a
// real lead value, so it must never be sent to Meta (value-based bidding would learn "every lead
// is worth NZD 1") or to GA4.
const GOOGLE_ADS_PLACEHOLDER_VALUE = 1.0;
const CURRENCY = 'NZD';

export type LeadSource = 'contact_page' | 'tour_enquiry' | 'china_tours_hub' | 'china_visa_guide';

/**
 * Which tour an enquiry is about. `slug` is the tour's id: GA4 gets it as `tour_slug` (the same value the ad page's
 * enquiry_open and call_click events send, so a funnel can be read tour by tour) and Meta gets it as `content_ids`
 * (the id the ViewContent event sends for that tour, so Meta can match "viewed tour X" with "enquired about tour X").
 * `path` is the address of that tour's own page (for example /tours/china/discovery/shanghai-surroundings, never the
 * ad landing page the visitor came through); GA4 gets it as `tour_path`.
 */
export interface LeadTour {
  path: string;
  slug: string;
}

/**
 * Fire the Google Ads conversion + Meta Pixel `Lead` for a submitted enquiry.
 *
 * The shared `eventID` lets a future server-side CAPI `Lead` event de-duplicate
 * against this browser event (see conversion-tracking audit, Phase-2 CAPI).
 */
const MAX_ATTEMPTS = 20; // retry for ~3s (20 × 150ms) while gtag/fbq finish loading
const RETRY_MS = 150;

function attributionParams(): Record<string, string> {
  // Never let a damaged storage value interrupt the conversion calls that follow.
  try {
    const a = readSubmitAttribution();
    if (!a) return {};
    return {
      first_landing_path: String(a.first_landing_path ?? ''),
      submit_path: String(a.submit_path ?? ''),
      referrer_host: String(a.referrer_host ?? ''),
      viewed_tour_paths: Array.isArray(a.viewed_tour_paths) ? a.viewed_tour_paths.join(',') : '',
    };
  } catch {
    return {};
  }
}

export function fireLeadConversion(source: LeadSource, tour?: LeadTour): void {
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
          value: GOOGLE_ADS_PLACEHOLDER_VALUE,
          currency: CURRENCY,
          transaction_id: eventId,
        });
        // GA4: no value on purpose — the 1.0 above is an Ads bidding placeholder,
        // not revenue, and must not show up as money in GA4 reports.
        g('event', 'generate_lead', {
          lead_source: source,
          transaction_id: eventId,
          ...(tour ? { tour_slug: tour.slug, tour_path: tour.path } : {}),
        });
        // One unified "an enquiry was accepted" event for every form, whether the visitor
        // is sent to /thank-you or sees an inline success message. Carries the first
        // landing page and the submit page so Magic Engine can split enquiries by where
        // the visitor first arrived. Additive: the two events above are unchanged.
        g('event', 'enquiry_thank_you', {
          lead_source: source,
          transaction_id: eventId,
          ...attributionParams(),
        });
        gtagDone = true;
      }
    }
    if (!fbqDone) {
      const f = fbq();
      if (f) {
        // No value/currency on purpose: CTS has no real per-lead value to report, and `value` is
        // optional for Lead in Meta's pixel reference. The custom-data object is always passed (empty
        // when no tour is known) so the options argument ({ eventID }) stays in the 4th position that
        // fbq expects.
        f('track', 'Lead', tour ? { content_ids: [tour.slug], content_type: 'product' } : {}, { eventID: eventId });
        fbqDone = true;
      }
    }
    if ((gtagDone && fbqDone) || ++attempts >= MAX_ATTEMPTS) return;
    setTimeout(tick, RETRY_MS);
  };

  tick();
}
