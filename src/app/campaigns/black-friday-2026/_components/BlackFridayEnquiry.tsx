'use client';

import { useState } from 'react';
import TourEnquiry from '@/components/tours/TourEnquiry';

export interface BlackFridayEnquiryTour {
  name: string;
  slug: string;
  destination: string;
  tier: string;
}

const ENQUIRY_SOURCE = 'Campaign LP: Black Friday 2026';

/**
 * Lets the visitor pick which tour they are asking about, then shows the standard tour enquiry form for it.
 * Reusing TourEnquiry keeps validation, UTM capture and the CTS notification email identical to the tour pages;
 * the campaign is recorded through `source` and the offer note in `enquiryContext`.
 */
export default function BlackFridayEnquiry({ tours }: { tours: BlackFridayEnquiryTour[] }) {
  const [slug, setSlug] = useState(tours[0]?.slug ?? '');
  const tour = tours.find((t) => t.slug === slug) ?? tours[0];
  if (!tour) return null;

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="block text-sm font-semibold text-gray-900 mb-2">Which tour are you interested in?</span>
        <select
          value={tour.slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base text-gray-900 focus:border-[#B61E2E] focus:outline-none focus:ring-2 focus:ring-[#B61E2E]/30"
        >
          {tours.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <TourEnquiry
        key={tour.slug}
        tourName={tour.name}
        tourSlug={tour.slug}
        destination={tour.destination}
        tier={tour.tier}
        source={ENQUIRY_SOURCE}
        enquiryContext="Black Friday 2026 offer (book 17 Nov – 4 Dec 2026)"
      />
    </div>
  );
}
