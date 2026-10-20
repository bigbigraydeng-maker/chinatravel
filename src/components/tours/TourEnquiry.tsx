'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { triggerGtmEvent } from '@/components/GoogleTagManager';
import { getStoredUtmParams } from '@/lib/utils/utm-parser';
import { captureSubmitAttribution } from '@/lib/analytics/first-touch';
import { fireLeadConversion } from '@/lib/analytics/lead-conversion';
import { CTS_PHONE_DISPLAY, CTS_PHONE_HREF } from '@/lib/site';
import {
  BUDGET_BAND_FIELD_LABEL,
  BUDGET_BAND_OPTIONS,
  TRAVEL_WINDOW_FIELD_LABEL,
  TRAVEL_WINDOW_OPTIONS,
} from '@/lib/enquiry/travel-preferences';

/** How long a visitor waits for the server before the request is given up (a cold start takes well under this). */
const REQUEST_TIMEOUT_MS = 30000;

/** After this long the button says "Still sending…", so a visitor on a slow connection does not press it again. */
const SLOW_SENDING_MS = 10000;

/**
 * Once the server has accepted the enquiry the button stays off until the page changes (a second press would send the
 * enquiry twice). If the page is still here after this long, the move to the thank-you page failed: the button comes back.
 */
const ACCEPTED_BUTTON_RESET_MS = 10000;

/**
 * What the form tells the visitor when an enquiry could not be sent. `text` is a mistake in the form (nothing to ring about);
 * `server` is the server's own words, shown as they are; `network` and `timeout` are plain sentences. All but `text` get a
 * tappable phone button.
 */
type SubmitError =
  | { kind: 'text'; text: string }
  | { kind: 'server'; text: string }
  | { kind: 'network' }
  | { kind: 'timeout' };

/**
 * `fetch` itself failed: the server never answered. A browser's own words ("Failed to fetch", "Load failed") mean
 * nothing to a traveller, so the two cases that really happen get a plain sentence.
 */
function describeFetchFailure(error: unknown, timedOut: boolean): SubmitError {
  if (timedOut) return { kind: 'timeout' };
  if (error instanceof TypeError) return { kind: 'network' };
  return { kind: 'server', text: error instanceof Error && error.message ? error.message : 'Something went wrong.' };
}

function SubmitErrorBody({ error }: { error: SubmitError }) {
  let message: string;
  if (error.kind === 'network') {
    message = "We couldn't reach our server. Please check your internet connection and try again. Your details are still here.";
  } else if (error.kind === 'timeout') {
    message =
      "Sending is taking longer than expected. Please try again \u2014 your details are still here. If you're not sure it went through, please call us.";
  } else {
    message = error.text;
  }
  return (
    <>
      <p>{message}</p>
      {error.kind !== 'text' && (
        <a
          href={CTS_PHONE_HREF}
          className="mt-3 flex min-h-[48px] items-center justify-center whitespace-nowrap rounded-xl bg-red-700 px-4 py-2 text-base font-semibold text-white"
        >
          Call us on {CTS_PHONE_DISPLAY}
        </a>
      )}
    </>
  );
}

/**
 * Work that happens after the server has accepted the enquiry (our own events, the move to the thank-you page). If it fails
 * the visitor must not be told their enquiry failed (it did not): the failure is logged, never swallowed silently.
 */
function afterAccepted(label: string, action: () => void): void {
  try {
    action();
  } catch (error) {
    console.error(`TourEnquiry: ${label} failed after the enquiry was accepted`, error);
  }
}

interface TourEnquiryProps {
  tourName: string;
  tourSlug: string;
  destination: string;
  tier: string;
  /** Shown in enquiry notification email (e.g. campaign landing page name) */
  source?: string;
  enquiryContext?: string;
  compact?: boolean;
}

export default function TourEnquiry({
  tourName,
  tourSlug,
  destination,
  tier,
  source = 'Tour Page Enquiry',
  enquiryContext,
  compact = false,
}: TourEnquiryProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    // Option codes (see travel-preferences.ts); '' = nothing chosen yet.
    travelWindow: '',
    budgetBand: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slowSending, setSlowSending] = useState(false);
  const [submitError, setSubmitError] = useState<SubmitError | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(true);

  // A visitor who leaves the page while a request is out does not cancel it: the server may already have the enquiry, and
  // then it must still be counted. A late answer only may not touch this form or move the page. Setting `mounted` again on
  // mount keeps React's development double mount honest.
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // The message sits next to the button the visitor just pressed, and the form is taller than a phone screen: make
  // sure all of it is on screen (jsdom and very old browsers have no scrollIntoView).
  useEffect(() => {
    if (submitError) errorRef.current?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
  }, [submitError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Already sending, or already accepted and on its way to the thank-you page: a second submit (a double tap, a stray Enter) is ignored.
    if (isSubmitting) return;
    setSubmitError(null);

    // Phone OR email — either is enough. Lowers the form burden for older travellers.
    if (!formData.email.trim() && !formData.phone.trim()) {
      setSubmitError({ kind: 'text', text: 'Please leave a phone number or an email so we can get back to you.' });
      return;
    }

    // The two questions are required on the page. (The browser normally stops an empty submit first, with the
    // messages set on the fields below; this is the same rule for any submit that gets past it.)
    if (!formData.travelWindow) {
      setSubmitError({ kind: 'text', text: 'Please choose when you are planning to travel.' });
      return;
    }
    if (!formData.budgetBand) {
      setSubmitError({ kind: 'text', text: 'Please choose your estimated budget per person.' });
      return;
    }

    setIsSubmitting(true);
    setSlowSending(false);

    const utm = getStoredUtmParams();
    const payload = {
      tourName,
      tourSlug,
      destination,
      tier,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      travelWindow: formData.travelWindow,
      budgetBand: formData.budgetBand,
      message: [enquiryContext, formData.message.trim()].filter(Boolean).join('\n\n') || undefined,
      source,
      utm,
      attribution: captureSubmitAttribution(),
    };

    // One request, given up after REQUEST_TIMEOUT_MS.
    let timedOut = false;
    let accepted = false;
    const controller = new AbortController();
    const timeoutTimer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REQUEST_TIMEOUT_MS);
    const slowTimer = setTimeout(() => {
      if (mounted.current) setSlowSending(true);
    }, SLOW_SENDING_MS);

    try {
      let res: Response;
      try {
        res = await fetch('/api/tour-enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } catch (fetchError) {
        // Only the request itself is described here; anything that goes wrong after the server answered keeps its own message.
        if (mounted.current) setSubmitError(describeFetchFailure(fetchError, timedOut));
        return;
      }
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(typeof data.error === 'string' ? data.error : 'Submission failed. Please try again.');
      }

      accepted = true;
      afterAccepted('the thank-you event', () =>
        triggerGtmEvent({
          event: 'tour_enquiry_submit',
          form_type: 'tour_enquiry',
          tour_name: tourName,
          tour_slug: tourSlug,
          // Option codes only — never names, contact details or labels.
          travel_window: formData.travelWindow,
          budget_band: formData.budgetBand,
          pagePath: window.location.pathname,
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
          timestamp: Date.now(),
        })
      );
      // Google Ads conversion + Meta Pixel Lead + GA4 generate_lead — only now that the API has
      // accepted the enquiry. The /thank-you page itself no longer fires it (a direct visit is
      // not a lead). A visitor who has already left the page is still counted: the server has the enquiry.
      afterAccepted('the lead conversion', () =>
        fireLeadConversion('tour_enquiry', { path: `/tours/${destination}/${tier}/${tourSlug}`, slug: tourSlug })
      );
      if (mounted.current) {
        afterAccepted('the move to the thank-you page', () => {
          const q = new URLSearchParams({
            tour: tourName,
            slug: tourSlug,
            destination,
            tier,
          });
          router.push(`/thank-you?${q.toString()}`);
        });
        // The button stays off until the page changes; if this form is still on screen a while later, bring it back.
        setTimeout(() => {
          if (mounted.current) {
            setIsSubmitting(false);
            setSlowSending(false);
          }
        }, ACCEPTED_BUTTON_RESET_MS);
      }
    } catch (err) {
      if (mounted.current) {
        setSubmitError({ kind: 'server', text: err instanceof Error ? err.message : 'Something went wrong.' });
      }
    } finally {
      clearTimeout(timeoutTimer);
      clearTimeout(slowTimer);
      if (mounted.current && !accepted) {
        setIsSubmitting(false);
        setSlowSending(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // A choice was made: drop the "please choose" message the browser attached to an empty required select.
    if (e.target instanceof HTMLSelectElement) e.target.setCustomValidity('');
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div id={compact ? undefined : "enquiry"} className={compact ? "bg-white" : "bg-white border border-warm-200 rounded-2xl overflow-hidden shadow-lg"}>
      {!compact && <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-5 text-white">
        <h3 className="text-lg font-bold">Enquire About This Tour</h3>
        <p className="text-sm text-white/80 mt-1">
          Interested in {tourName}? We&apos;ll get back to you within 24 hours.
        </p>
      </div>}

      <div className={compact ? "" : "p-6"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="eq-name" className="block text-base font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="eq-name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border border-warm-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-warm-50/50"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label htmlFor="eq-email" className="block text-base font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="eq-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border border-warm-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-warm-50/50"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="eq-phone" className="block text-base font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="eq-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border border-warm-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-warm-50/50"
              placeholder="+64 / 0800 287 888"
            />
            <p className="mt-1.5 text-sm text-gray-600">
              Leave a phone or email—whichever suits you.
            </p>
          </div>

          <div>
            <label htmlFor="eq-travel-window" className="block text-base font-medium text-gray-700 mb-1">
              {TRAVEL_WINDOW_FIELD_LABEL} *
            </label>
            <select
              id="eq-travel-window"
              name="travelWindow"
              required
              value={formData.travelWindow}
              onChange={handleChange}
              onInvalid={(e) => e.currentTarget.setCustomValidity('Please choose when you are planning to travel.')}
              className="w-full px-4 py-3.5 border border-warm-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-warm-50/50"
            >
              <option value="">Please choose…</option>
              {TRAVEL_WINDOW_OPTIONS.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="eq-budget" className="block text-base font-medium text-gray-700 mb-1">
              {BUDGET_BAND_FIELD_LABEL} *
            </label>
            <select
              id="eq-budget"
              name="budgetBand"
              required
              value={formData.budgetBand}
              onChange={handleChange}
              onInvalid={(e) => e.currentTarget.setCustomValidity('Please choose your estimated budget per person.')}
              className="w-full px-4 py-3.5 border border-warm-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all bg-warm-50/50"
            >
              <option value="">Please choose…</option>
              {BUDGET_BAND_OPTIONS.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="eq-message" className="block text-base font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="eq-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3.5 border border-warm-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all resize-none bg-warm-50/50"
              placeholder="Tell us about your travel dates, group size, and any special requirements..."
            />
          </div>

          {submitError && (
            <div
              ref={errorRef}
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700"
            >
              <SubmitErrorBody error={submitError} />
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {slowSending ? 'Still sending…' : 'Sending...'}
              </>
            ) : (
              'Send Enquiry'
            )}
          </button>

          <p className="text-sm text-gray-600 text-center">
            We respect your privacy. Your information will not be shared.
          </p>
        </form>
      </div>
    </div>
  );
}
