// Tour grid for SEO hub pages
// Displays tour cards in a responsive grid with fallback for empty state

import React from 'react';
import TourTierCard from '@/components/TourTierCard';
import { Tour } from '@/lib/data/tours';

interface TourGridProps {
  tours: Tour[];
  columns?: 1 | 2 | 3;
  showEmptyState?: boolean;
}

const TourGrid: React.FC<TourGridProps> = ({
  tours,
  columns = 2,
  showEmptyState = true
}) => {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }[columns];

  if (tours.length === 0) {
    return showEmptyState ? (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg mb-4">
          No tours available for this destination at the moment.
        </p>
        <a
          href="/tours/china"
          className="inline-block text-primary hover:underline font-medium"
        >
          View all China tours →
        </a>
      </div>
    ) : null;
  }

  return (
    <div className={`grid ${gridColsClass} gap-8`}>
      {tours.map((tour) => (
        <TourTierCard
          key={tour.id}
          title={tour.name}
          description={tour.shortDescription}
          duration={tour.duration}
          price={tour.price}
          image_url={tour.heroImage}
          slug={tour.slug}
          tier={tour.tier}
          destination={tour.destination}
          isPremium={tour.tier === 'signature'}
          route={
            // Extract city names from itinerary for route strip
            Array.from(
              new Set(
                tour.itinerary
                  .map(day => day.title)
                  .filter(title => /^[A-Z][a-z]+/.test(title)) // City names start with uppercase
                  .slice(0, 5) // Show max 5 cities
              )
            )
          }
        />
      ))}
    </div>
  );
};

export default TourGrid;
