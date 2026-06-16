'use client';

import { useEffect, useState } from 'react';
import { triggerGtmEvent } from '@/components/GoogleTagManager';
import { fireLeadConversion } from '@/lib/analytics/lead-conversion';
import { getStoredUtmParams } from '@/lib/utils/utm-parser';

/**
 * A/B headline + form-copy variant for the /china-tours hero.
 *
 *  - `a` = control. Uses the title/subtitle passed in as props (set from
 *    chinaToursMeta in page.tsx) and the existing form copy.
 *  - `b` = challenger. Time-bound outcome promise ("quoted in 24 hours")
 *    + visa-free urgency. Hypothesis: explicit time commitment + concrete
 *    deliverable should raise hero form CTR vs the generic specialist
 *    invitation.
 *
 * Trigger: `?hero=a` or `?hero=b` query string. Default = `a` (control)
 * when the param is absent or any other value. Every render fires a
 * `hero_variant_view` GTM event and every form submit attaches the
 * `hero_variant` field — wire those into GA / dashboards to read the
 * actual lift.
 *
 * Drive 50/50 traffic by sending half the ad clicks to `?hero=b`; do NOT
 * randomly assign visitors client-side (causes hydration mismatch + makes
 * attribution noisy).
 */
type HeroVariant = 'a' | 'b';

interface VariantCopy {
  title?: string; // omit → fall back to the prop
  subtitle?: string;
  formHeading: string;
  formSubheading: string;
  submitLabel: string;
}

const VARIANT_COPY: Record<HeroVariant, VariantCopy> = {
  a: {
    formHeading: 'Talk to a China specialist',
    formSubheading: 'Reply within 1 NZ business day · no obligation.',
    submitLabel: 'Request a callback',
  },
  b: {
    title: 'Your China Trip, Quoted in 24 Hours',
    subtitle:
      'Talk to an Auckland-based specialist — get a custom itinerary, NZD pricing, and visa-free guidance in one call.',
    formHeading: 'Get my 24-hour quote',
    formSubheading: 'Reply within 1 NZ business day · no obligation.',
    submitLabel: 'Send me a quote',
  },
};

function readHeroVariant(): HeroVariant {
  if (typeof window === 'undefined') return 'a';
  try {
    const v = new URL(window.location.href).searchParams.get('hero');
    return v === 'b' ? 'b' : 'a';
  } catch {
    return 'a';
  }
}

interface ChinaToursHeroProps {
  title: string;
  subtitle: string;
  posterImage: string;
  /**
   * Public path to the hero background video (e.g. `/videos/china-tours-hero.mp4`).
   * Leave undefined to render the poster only — important: passing a path that
   * 404s makes the browser fire a failed request on every visit, which Meta /
   * Lighthouse counts as a 4xx error. Add the file to `/public/videos/` first,
   * then pass the path from `page.tsx`.
   */
  videoSrc?: string;
}

// Match the four flagship URLs surfaced lower on the page so the dropdown
// doubles as the visitor's first signal of which tour they want — ops then
// has tour-name continuity from form submit through to follow-up call.
// "Still deciding — show me all 4" keeps the door open for browse-first leads.
const TRAVEL_INTEREST_OPTIONS = [
  'Best of China — 15 Days',
  "Tale of Two Cities — 10 Days (Beijing + Xi'an)",
  'Shanghai & Surroundings — 10 Days',
  'Silk Road Discovery — 18 Days',
  'Still deciding — show me all 4',
];

const PHONE_DISPLAY = '0800 CTS 888';
const PHONE_TEL = '0800287888';

export default function ChinaToursHero({
  title,
  subtitle,
  posterImage,
  videoSrc,
}: ChinaToursHeroProps) {
  const [variant, setVariant] = useState<HeroVariant>('a');
  const [variantReady, setVariantReady] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travel_interest: TRAVEL_INTEREST_OPTIONS[0],
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Read variant + emit a single view event after hydration so GA gets the
  // baseline impression count for each arm. SSR always renders the `a`
  // copy to avoid hydration mismatch; the `b` variant swaps in client-side
  // for visitors landing with `?hero=b`.
  useEffect(() => {
    const v = readHeroVariant();
    setVariant(v);
    setVariantReady(true);
    triggerGtmEvent({
      event: 'hero_variant_view',
      hero_variant: v,
      pagePath: window.location.pathname,
    });
  }, []);

  const copy = VARIANT_COPY[variant];
  const renderedTitle = copy.title ?? title;
  const renderedSubtitle = copy.subtitle ?? subtitle;

  const handlePhoneTap = () => {
    triggerGtmEvent({
      event: 'phone_call_intent',
      source: 'mobile_hero_cta',
      hero_variant: variant,
      pagePath: typeof window !== 'undefined' ? window.location.pathname : '/china-tours',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!formData.email.trim() && !formData.phone.trim()) {
      setSubmitError('Please leave a phone number or an email so we can get back to you.');
      return;
    }

    setIsSubmitting(true);
    try {
      const utm = getStoredUtmParams();
      const messagePayload = [
        formData.message.trim(),
        formData.phone.trim() ? `Phone: ${formData.phone.trim()}` : '',
        '',
        '--- Lead source ---',
        'Form: /china-tours hero',
        `Hero variant: ${variant}`,
        utm.utm_source ? `utm_source: ${utm.utm_source}` : '',
        utm.utm_campaign ? `utm_campaign: ${utm.utm_campaign}` : '',
        utm.utm_content ? `utm_content: ${utm.utm_content}` : '',
        utm.gclid ? `gclid: ${utm.gclid}` : '',
        utm.fbclid ? `fbclid: ${utm.fbclid}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          travel_interest: formData.travel_interest,
          message: messagePayload || 'Enquiry from /china-tours hero form',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          typeof data.error === 'string' ? data.error : 'Submission failed. Please try again.'
        );
      }

      triggerGtmEvent({
        event: 'china_tours_hero_submit',
        form_type: 'china_tours_hub',
        hero_variant: variant,
        travel_interest: formData.travel_interest,
        pagePath: typeof window !== 'undefined' ? window.location.pathname : '/china-tours',
        utm_source: utm.utm_source,
        utm_medium: utm.utm_medium,
        utm_campaign: utm.utm_campaign,
        utm_content: utm.utm_content,
      });

      fireLeadConversion('china_tours_hub');

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        travel_interest: TRAVEL_INTEREST_OPTIONS[0],
        message: '',
      });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="china-tours-hero"
      data-hero-variant={variantReady ? variant : undefined}
      className="relative min-h-[640px] md:min-h-[680px] overflow-hidden text-white"
    >
      {/*
        Mobile-only video background: the supplied winner-ad cut is 9:16 vertical,
        so it tiles a portrait hero cleanly. On desktop (md+) we hide the <video>
        and let the poster image carry the hero — a vertical clip stretched into
        a horizontal viewport via object-cover would crop most of the frame, so a
        still landscape poster looks better there. Swap in a 16:9 cut later and
        drop `md:hidden` to enable video everywhere.
      */}
      <div className="absolute inset-0 z-0">
        <img
          src={posterImage}
          alt=""
          className="h-full w-full object-cover"
          aria-hidden
        />
        <video
          className="md:hidden absolute inset-0 h-full w-full object-cover"
          poster={posterImage}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          {videoSrc ? <source src={videoSrc} type="video/mp4" /> : null}
        </video>
      </div>
      <div className="absolute inset-0 bg-black/55 z-[1]" aria-hidden />

      <div className="relative z-[2] container mx-auto px-4 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
        {/* Headline column */}
        <div className="lg:col-span-3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-5 leading-tight">
            {renderedTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">{renderedSubtitle}</p>
          <ul className="space-y-2 text-white/90 max-w-xl">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
              <span>98 years of China-direct operations · Auckland-based specialists</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
              <span>NZD pricing · small groups · visa-free options for many NZ travellers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden />
              <span>October 2026 departures open — talk to us about availability</span>
            </li>
          </ul>
        </div>

        {/* Form column — on mobile this drops below the headline; the phone
            CTA stays as a sibling above to keep the tap target above the fold. */}
        <div className="lg:col-span-2 space-y-3">
          {/* Mobile-only phone-tap CTA. 55+ NZ travellers convert 3–5x better
              on a one-tap call than a multi-field form; desktop hides this so
              the inline form gets the visual weight there. */}
          <a
            href={`tel:${PHONE_TEL}`}
            onClick={handlePhoneTap}
            className="md:hidden flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold py-4 rounded-2xl shadow-lg text-base"
            aria-label={`Call CTS Tours on ${PHONE_DISPLAY}`}
            data-cta="hero-mobile-call"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call {PHONE_DISPLAY}
          </a>

          <div className="bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-primary text-white px-5 py-4">
              <h2 className="text-lg font-bold">{copy.formHeading}</h2>
              <p className="text-sm text-white/90 mt-0.5">{copy.formSubheading}</p>
            </div>
            <div className="p-5">
              {success ? (
                <div
                  role="status"
                  className="rounded-lg bg-green-50 border border-green-200 px-4 py-5 text-green-800"
                >
                  <p className="font-semibold mb-1">Thanks — we&apos;ve got it.</p>
                  <p className="text-sm">
                    Our specialists will be in touch within one business day. Prefer to talk now?
                    Call <a href={`tel:${PHONE_TEL}`} className="underline font-medium">{PHONE_DISPLAY}</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3" noValidate>
                  {submitError && (
                    <p
                      role="alert"
                      className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2"
                    >
                      {submitError}
                    </p>
                  )}
                  <div>
                    <label htmlFor="ct-hero-name" className="sr-only">
                      Full name
                    </label>
                    <input
                      id="ct-hero-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Full name *"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="ct-hero-email" className="sr-only">
                        Email
                      </label>
                      <input
                        id="ct-hero-email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="ct-hero-phone" className="sr-only">
                        Phone
                      </label>
                      <input
                        id="ct-hero-phone"
                        name="phone"
                        type="tel"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 -mt-1">
                    Email or phone — whichever suits you.
                  </p>
                  <div>
                    <label htmlFor="ct-hero-interest" className="sr-only">
                      Travel interest
                    </label>
                    <select
                      id="ct-hero-interest"
                      name="travel_interest"
                      value={formData.travel_interest}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    >
                      {TRAVEL_INTEREST_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="ct-hero-message" className="sr-only">
                      Travel dates or notes
                    </label>
                    <textarea
                      id="ct-hero-message"
                      name="message"
                      rows={2}
                      placeholder="Travel dates or notes (optional)"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 text-white font-bold py-3 rounded-md transition-colors"
                  >
                    {isSubmitting ? 'Sending…' : copy.submitLabel}
                  </button>
                  <p className="text-[11px] text-gray-500 text-center">
                    We respect your privacy. Your details are never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
