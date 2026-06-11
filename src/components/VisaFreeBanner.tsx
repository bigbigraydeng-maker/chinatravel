'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Sitewide Visa-Free banner — top-of-page, NZ passport hook.
 *
 * Why: PM 战略 insight #1 (2026-06-11) — Kiwis don't know NZ passport
 * is visa-free for China until 31 Dec 2026. v4 audit found 6 lesser-known
 * city pages had 0/6 visa-free signal. This is the single highest-ROI
 * single-action surface fix (per cts-6city-audit-and-tailor-made-strategy.md).
 *
 * Behavior:
 *  - Shows on all pages where ConditionalChrome renders Navbar (admin excluded)
 *  - localStorage dismissable (key: cts_visa_banner_v1_dismissed) — won't pester
 *  - Sticky-ish bar above Navbar (not fixed — scrolls naturally with page)
 *  - Internal link to /china-visa-guide-for-new-zealanders (SEO juice retained)
 *  - Brand colors: primary (#B61E2E red) + secondary (#D6A756 gold) — design system aligned
 */
const STORAGE_KEY = 'cts_visa_banner_v1_dismissed';

export default function VisaFreeBanner() {
  const [dismissed, setDismissed] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // localStorage blocked / private browsing — accept session-only dismiss
    }
    setDismissed(true);
  };

  // SSR + first paint: render nothing until we know dismiss state to avoid flash
  if (dismissed === null || dismissed) return null;

  return (
    <div
      className="bg-gradient-to-r from-primary via-primary to-secondary text-white"
      role="region"
      aria-label="China visa-free policy for New Zealand passport holders"
    >
      <div className="container mx-auto px-4 py-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span aria-hidden="true" className="inline-flex items-center text-base">
          🇳🇿
        </span>
        <p className="text-sm md:text-[0.95rem] leading-snug">
          <span className="font-semibold">NZ passport holders:</span>{' '}
          visit China <span className="font-semibold underline decoration-secondary decoration-2 underline-offset-2">visa-free for 30 days</span>{' '}
          (until 31 Dec 2026).
        </p>
        <Link
          href="/china-visa-guide-for-new-zealanders"
          className="text-sm md:text-[0.95rem] font-semibold underline-offset-2 hover:underline shrink-0"
        >
          Read our visa guide →
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss visa-free banner"
          className="ml-2 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 transition-colors shrink-0"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
