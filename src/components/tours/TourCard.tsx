import Image from 'next/image';
import type { Tour } from '@/lib/data/tours';
import TourCardViewDetailsButton from './TourCardViewDetailsButton';

interface TourCardProps {
  tour: Tour;
  destination: string;
  tier: string;
}

const tierColors: Record<string, string> = {
  signature: 'bg-amber-100 text-amber-800',
  discovery: 'bg-blue-100 text-blue-800',
  stopover: 'bg-green-100 text-green-800',
};

/**
 * Server-rendered card body so hero + title match SSR HTML (avoids client-boundary
 * hydration quirks on long tour grids). Loading UI lives in `TourCardViewDetailsButton`.
 */
export default function TourCard({ tour, destination, tier }: TourCardProps) {
  const tierClass = tierColors[tier] ?? tierColors.discovery;
  const detailHref = `/tours/${destination}/${tier}/${tour.slug}`;

  return (
    <div className="group min-w-0 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-[3/2] w-full min-h-[11rem] shrink-0 overflow-hidden bg-warm-100 sm:min-h-[13rem]">
        <Image
          src={tour.heroImage}
          alt={tour.name}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="eager"
          decoding="async"
        />
        <div className="absolute top-4 left-4 z-[1]">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${tierClass}`}
          >
            {tier}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {tour.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tour.shortDescription}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="capitalize">{destination}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <div>
            <span className="text-sm text-gray-500">From</span>
            <p className="text-xl font-bold text-primary">{tour.price}</p>
          </div>
          <TourCardViewDetailsButton href={detailHref} />
        </div>
      </div>
    </div>
  );
}
