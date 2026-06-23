'use client';

import { useEffect, useState } from 'react';

/**
 * UTM-aware welcome banner for /china-tours.
 *
 * Triggers when the visitor arrives with `utm_source` from Meta family
 * (meta / facebook / instagram) or `utm_source=google` — i.e., paid social
 * or Google Ads. Reads the URL with vanilla `URLSearchParams` (not
 * `useSearchParams`) so the component never forces a Suspense boundary on
 * the parent page.
 *
 * Copy variant: when `utm_campaign` matches /visa/i (e.g.
 * `visa-free-2026`, `nz-passport-visa`) the banner swaps to a visa-pain
 * message. This lets Google/Meta ad sets that bid on visa-intent keywords
 * land on the same /china-tours LP but get a campaign-relevant headline —
 * recommended in the "unified LP + UTM personalisation" strategy instead
 * of building a separate /china-visa-free-tours page.
 *
 * DESIGN: the banner intentionally reads ONLY the current URL — it does NOT
 * fall back to `getStoredUtmParams()`. This banner welcomes the *landing*
 * visit; if the user navigates away and returns via a clean URL (bookmark,
 * back button to `/china-tours`), they should not see the welcome again.
 * Do not "fix" this by reading sessionStorage without revisiting the spec.
 */
const META_SOURCES = new Set(['meta', 'facebook', 'instagram', 'fb', 'ig']);
const GOOGLE_SOURCES = new Set(['google', 'google_ads', 'adwords']);

interface UtmReading {
  source: string | null;
  campaign: string | null;
}

function readUtm(): UtmReading {
  if (typeof window === 'undefined') return { source: null, campaign: null };
  try {
    const url = new URL(window.location.href);
    const hashParams = window.location.hash
      ? new URLSearchParams(window.location.hash.slice(1))
      : null;
    const pick = (key: string) =>
      url.searchParams.get(key) ?? hashParams?.get(key) ?? null;
    const norm = (v: string | null) => (v ? v.toLowerCase().trim() : null);
    return {
      source: norm(pick('utm_source')),
      campaign: norm(pick('utm_campaign')),
    };
  } catch {
    return { source: null, campaign: null };
  }
}

type Variant = 'visa' | 'best_of_china' | 'default';

interface BannerCopy {
  message: React.ReactNode;
  cta: string;
  ctaHref?: string;
}

const COPY: Record<Variant, BannerCopy> = {
  visa: {
    message: (
      <>
        <span className="font-semibold">No embassy queues</span> · Visa-free
        for NZ passport holders until 31 Dec 2026 · Talk to a specialist
        before the window closes.
      </>
    ),
    cta: 'Talk to a specialist →',
  },
  best_of_china: {
    message: (
      <>
        <span className="font-semibold">Best of China · 15 days</span>
        {' '}· from NZD $3,880 · October 2026 from Auckland — talk to a
        specialist about the next departure.
      </>
    ),
    cta: 'See Best of China →',
    // Best-of-China ad clicks land on /china-tours? Route them to the
    // dedicated campaign LP so the ad/LP messaging match completes.
    ctaHref: '/campaigns/best-of-china',
  },
  default: {
    message: (
      <>
        <span className="font-semibold">Welcome from our China campaign</span>
        {' '}— limited October 2026 departures from NZ. Talk to a specialist today.
      </>
    ),
    cta: 'Request a callback →',
  },
};

export default function UtmAwareBanner() {
  const [variant, setVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const { source, campaign } = readUtm();
    if (!source) return;
    const isPaidSource = META_SOURCES.has(source) || GOOGLE_SOURCES.has(source);
    if (!isPaidSource) return;
    // Campaign-aware copy selection. Order matters: /best.?of.?china/ is
    // checked first because a campaign like `best-of-china-visa-2026` should
    // surface the product-specific message, not the generic visa banner.
    if (campaign && /best[-_]?of[-_]?china/.test(campaign)) {
      setVariant('best_of_china');
    } else if (campaign && /visa/.test(campaign)) {
      setVariant('visa');
    } else {
      setVariant('default');
    }
  }, []);

  if (!variant) return null;
  const copy = COPY[variant];

  return (
    <div
      role="region"
      aria-label="Campaign welcome message"
      data-variant={variant}
      className="bg-amber-50 border-b border-amber-200"
    >
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm sm:text-base text-amber-900">{copy.message}</p>
        <a
          href={copy.ctaHref ?? '#china-tours-hero'}
          className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
        >
          {copy.cta}
        </a>
      </div>
    </div>
  );
}
