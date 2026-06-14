'use client';

import { useEffect, useState } from 'react';

/**
 * UTM-aware welcome banner for /china-tours.
 *
 * Triggers when the visitor arrives with `utm_source=meta` (incl. facebook /
 * instagram) or `utm_source=google` — i.e., paid social or Google Ads. Reads
 * the URL with vanilla `URLSearchParams` (not `useSearchParams`) so the
 * component never forces a Suspense boundary on the parent page.
 *
 * DESIGN: the banner intentionally reads ONLY the current URL — it does NOT
 * fall back to `getStoredUtmParams()`. This banner welcomes the *landing*
 * visit; if the user navigates away and returns via a clean URL (bookmark,
 * back button to `/china-tours`), they should not see the welcome again.
 * Do not "fix" this by reading sessionStorage without revisiting the spec.
 */
const META_SOURCES = new Set(['meta', 'facebook', 'instagram', 'fb', 'ig']);
const GOOGLE_SOURCES = new Set(['google', 'google_ads', 'adwords']);

function readUtmSource(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const url = new URL(window.location.href);
    const raw =
      url.searchParams.get('utm_source') ??
      (window.location.hash
        ? new URLSearchParams(window.location.hash.slice(1)).get('utm_source')
        : null);
    return raw ? raw.toLowerCase().trim() : null;
  } catch {
    return null;
  }
}

export default function UtmAwareBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const source = readUtmSource();
    if (!source) return;
    if (META_SOURCES.has(source) || GOOGLE_SOURCES.has(source)) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label="Campaign welcome message"
      className="bg-amber-50 border-b border-amber-200"
    >
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-sm sm:text-base text-amber-900">
          <span className="font-semibold">Welcome from our China campaign</span> — limited
          October 2026 departures from NZ. Talk to a specialist today.
        </p>
        <a
          href="#china-tours-hero"
          className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
        >
          Request a callback →
        </a>
      </div>
    </div>
  );
}
