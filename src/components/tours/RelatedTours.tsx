'use client';

import Link from 'next/link';
import { Tour } from '@/lib/data/tours';
import TourCard from './TourCard';

interface RelatedToursProps {
  tours: Tour[];
  destination: string;
  tier: string;
}

export default function RelatedTours({ tours, destination, tier }: RelatedToursProps) {
  if (tours.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            You May Also Like
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore more {destination.charAt(0).toUpperCase() + destination.slice(1)} {tier.charAt(0).toUpperCase() + tier.slice(1)} tours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard 
              key={tour.id}
              tour={tour}
              destination={destination}
              tier={tier}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href={`/tours/${destination}/${tier}`}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View All {destination.charAt(0).toUpperCase() + destination.slice(1)} {tier.charAt(0).toUpperCase() + tier.slice(1)} Tours
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
