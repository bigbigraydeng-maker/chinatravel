'use client';

import { useState } from 'react';
import { triggerGtmEvent } from '@/components/GoogleTagManager';

// Rendered as <span> (not <a>) because the parent TourCard is already an <a>;
// nesting anchors is invalid HTML and triggers React hydration mismatch.
// Click bubbles to the outer Link to perform navigation.
export default function TourCardViewDetailsButton({ href: _href }: { href: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    // Extract tour details from URL (format: /tours/destination/tier/slug)
    const pathParts = _href.split('/').filter(Boolean); // ["tours", "destination", "tier", "slug"]

    // Validate URL format before destructuring
    if (pathParts.length >= 4) {
      const [, destination, tier, slug] = pathParts;

      triggerGtmEvent({
        event: 'view_tour_details',
        tourDestination: destination,
        tourTier: tier,
        tourSlug: slug,
        pagePath: window.location.pathname,
        timestamp: Date.now(),
      });
    }
  };

  return (
    <span
      role="presentation"
      onClick={handleClick}
      className={`px-6 py-2 bg-primary text-white text-sm font-semibold rounded-lg transition-all inline-flex items-center gap-2 ${
        isLoading
          ? 'opacity-75 cursor-wait pointer-events-none'
          : 'group-hover:bg-primary/90 group-hover:shadow-lg group-hover:shadow-primary/20'
      }`}
    >
      {isLoading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        'View Details'
      )}
    </span>
  );
}
