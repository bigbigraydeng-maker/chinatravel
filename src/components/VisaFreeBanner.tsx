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
 * SSR-friendly (v2, 2026-06-12): SSR + first paint MUST render the banner DOM
 *   so (1) SEO/AI bots see the visa-free signal sitewide; (2) real users see
 *   the banner immediately without layout shift after hydrate.
 *
 *   Strategy: localStorage dismiss is applied via inline `style.display` after
 *   client-side hydration. CSS-driven hide (not React unmount) means no FOUC
 *   when a returning visitor re-loads — the browser script tag below runs
 *   *before* React hydrates and toggles display:none synchronously.
 *
 * Behavior:
 *  - SSR: banner DOM always present (SEO sees text + link)
 *  - Returning visitor who dismissed: pre-hydration inline script hides
 *    instantly (no flash)
 *  - First-time visitor: banner stays until they click X
 *  - localStorage key: cts_visa_banner_v1_dismissed
 *  - Internal link to /china-visa-guide-for-new-zealanders (SEO juice retained)
 *  - Brand colors: primary (#B61E2E) + secondary (#D6A756) — design system aligned
 *  - admin pages: excluded by ConditionalChrome (not rendered)
 */
const STORAGE_KEY = 'cts_visa_banner_v1_dismissed';
const ELEMENT_ID = 'visa-free-banner';

/**
 * Inline script that runs BEFORE React hydrates. Reads localStorage and sets
 * style.display:none on the banner if previously dismissed. Eliminates flash.
 *
 * Cannot use Next.js <Script> here — needs to be inline + synchronous before
 * hydration commits. dangerouslySetInnerHTML with `__html` is the only way.
 */
const PRE_HYDRATION_SCRIPT = `
(function(){try{if(localStorage.getItem('${STORAGE_KEY}')==='1'){var el=document.getElementById('${ELEMENT_ID}');if(el)el.style.display='none';}}catch(e){}})();
`.trim();

export default function VisaFreeBanner() {
  const [hidden, setHidden] = useState(false);

  // Mirror pre-hydration script's read on mount, so React knows current state
  // (otherwise re-renders would un-hide the banner).
  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === '1') {
        setHidden(true);
      }
    } catch {
      // localStorage blocked — banner stays visible (acceptable degradation)
    }
  }, []);

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // localStorage blocked / private browsing — accept session-only dismiss
    }
    setHidden(true);
  };

  return (
    <>
      {/* Pre-hydration sync hide (avoids flash on return visit). */}
      <script
        dangerouslySetInnerHTML={{ __html: PRE_HYDRATION_SCRIPT }}
      />
      <div
        id={ELEMENT_ID}
        className="bg-gradient-to-r from-primary via-primary to-secondary text-white"
        role="region"
        aria-label="China visa-free policy for New Zealand passport holders"
        style={hidden ? { display: 'none' } : undefined}
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
    </>
  );
}
