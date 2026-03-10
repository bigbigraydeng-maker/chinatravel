'use client';

import Link from 'next/link';
import { Tour } from '@/lib/data/tours';

interface TourCardProps {
  tour: Tour;
  destination: string;
  tier: string;
}

export default function TourCard({ tour, destination, tier }: TourCardProps) {
  const tierColors = {
    signature: 'bg-amber-100 text-amber-800',
    discovery: 'bg-blue-100 text-blue-800',
    stopover: 'bg-green-100 text-green-800'
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={tour.heroImage}
          alt={tour.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${tierColors[tier as keyof typeof tierColors]}`}>
            {tier}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {tour.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tour.shortDescription}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="capitalize">{destination}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <p className="text-xl font-bold text-primary">{tour.price}</p>
          </div>
          <Link 
            href={`/tours/${destination}/${tier}/${tour.slug}`}
            className="px-6 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
