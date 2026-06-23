'use client';

import { useEffect, useState } from 'react';

/**
 * Golden welcome banner shown only to paid-traffic visitors (Google Ads /
 * Meta) landing on /campaigns/best-of-china.
 *
 * The banner confirms ad-LP messaging match in a single glance — the visitor
 * just clicked an ad about Best of China and immediately sees "Best of
 * China · 15 days · NZD $3,880" reinforced at the top of the LP. This is
 * the visual equivalent of saying "yes, you're in the right place". Industry
 * pattern: messaging match cuts bounce rate and lifts conversion 20-40%.
 *
 * Reads `utm_source` and `utm_campaign` from the current URL once on mount.
 * Returns null (renders nothing) for organic / direct visitors so the LP
 * doesn't shout marketing copy at people who arrived by other means.
 */
const META_SOURCES = new Set(['meta', 'facebook', 'instagram', 'fb', 'ig']);
const GOOGLE_SOURCES = new Set(['google', 'google_ads', 'adwords']);

function isPaidSource(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const url = new URL(window.location.href);
    const hashParams = window.location.hash
      ? new URLSearchParams(window.location.hash.slice(1))
      : null;
    const source = (
      url.searchParams.get('utm_source') ?? hashParams?.get('utm_source') ?? ''
    )
      .toLowerCase()
      .trim();
    return META_SOURCES.has(source) || GOOGLE_SOURCES.has(source);
  } catch {
    return false;
  }
}

export default function CampaignWelcomeBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isPaidSource());
  }, []);

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label="Welcome from Best of China campaign"
      className="bg-gradient-to-r from-amber-50 via-warm-50 to-amber-50 border-b border-amber-200"
    >
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm sm:text-base text-amber-900">
          <span className="font-semibold">Best of China · 15 days</span> · from
          NZD $3,880 · October 2026 from Auckland — talk to a specialist about
          the next departure.
        </p>
        <a
          href="#enquiry"
          className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
        >
          Reserve Your Place →
        </a>
      </div>
    </div>
  );
}
