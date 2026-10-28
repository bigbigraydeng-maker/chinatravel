'use client';

import { useEffect, useState } from 'react';
import type { Tour } from '@/lib/data/tours';

/**
 * Always-visible sticky strip at the top of /campaigns/best-of-china.
 *
 * Shows tour name, duration, lead-in NZD price, and a single primary CTA —
 * the conversion-relevant facts the paid visitor needs before scrolling.
 * Hides until the user scrolls past the hero (sticky-on-scroll pattern) so
 * the hero stays the visual focal point on first paint.
 */
export default function StickyPriceBar({ tour }: { tour: Tour }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      role="region"
      aria-label="Best of China — sticky reserve bar"
      aria-hidden={!visible}
      className={`fixed top-0 inset-x-0 z-40 transition-transform duration-300 ease-out ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 shadow-lg">
        <div className="container mx-auto px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3 text-white flex-wrap">
            <span className="text-base sm:text-lg font-serif font-bold">{tour.name}</span>
            <span className="hidden sm:inline text-white/70">·</span>
            <span className="text-sm sm:text-base font-medium">{tour.duration}</span>
            <span className="hidden sm:inline text-white/70">·</span>
            <span className="text-sm sm:text-base font-bold tracking-wide">
              {tour.price}
            </span>
            <span className="hidden md:inline text-white/70">·</span>
            <span className="hidden md:inline text-sm">{tour.departureDates?.[0] ?? 'Ask CTS for next dates'} · Auckland</span>
          </div>
          <a
            href="#enquiry"
            className="inline-flex items-center justify-center bg-white text-amber-700 hover:bg-amber-50 text-sm sm:text-base font-bold px-5 py-2 rounded-md transition-colors whitespace-nowrap shadow-sm"
          >
            Reserve Your Place →
          </a>
        </div>
      </div>
    </div>
  );
}
