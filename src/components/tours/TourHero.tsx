'use client';

import Link from 'next/link';
import { slugifyTourTag } from '@/lib/data/tours';
import AvailabilityBadge from '@/components/AvailabilityBadge';

interface TourHeroProps {
  title: string;
  shortDescription: string;
  duration: string;
  price: string;
  heroImage: string;
  tier: string;
  tags?: string[];
  departureDates?: string[];
  showAvailability?: boolean;
}

export default function TourHero({
  title,
  shortDescription,
  duration,
  price,
  heroImage,
  tier,
  tags,
  departureDates,
  showAvailability = true,
}: TourHeroProps) {
  const tierColors = {
    signature: 'bg-amber-500',
    discovery: 'bg-blue-500',
    stopover: 'bg-green-500'
  };

  return (
    <section id="hero" className="relative min-h-[70vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt={`${title} - China Tour from New Zealand | ${tier} Collection`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-3xl">
          {/* Tier Badge */}
          <span className={`inline-block px-4 py-1 rounded-full text-white text-sm font-semibold uppercase tracking-wide mb-6 ${tierColors[tier as keyof typeof tierColors]}`}>
            {tier} Collection
          </span>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-xl text-white/90 mb-6 max-w-2xl">
            {shortDescription}
          </p>

          {/* Departures — next departure + full list */}
          {departureDates && departureDates.length > 0 && (
            <div className="mb-6 max-w-2xl space-y-4">
              {showAvailability && (
                <AvailabilityBadge
                  departureDate={departureDates[0]}
                  seatsLeft={5}
                  showCountdown={false}
                />
              )}
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-white/70 mb-2">
                  {showAvailability ? 'All departure dates' : 'Departure dates'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {departureDates.map((d) => (
                    <span
                      key={d}
                      className="text-sm font-medium px-3 py-1.5 rounded-full bg-white/15 text-white border border-white/30 backdrop-blur-sm"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-white/60 mt-2">
                  Dates refer to scheduled group departures; year 2026 where applicable — confirm at booking.
                </p>
              </div>
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 max-w-3xl">
              {tags.map((label) => (
                <Link
                  key={label}
                  href={`/tours/find?tag=${encodeURIComponent(slugifyTourTag(label))}`}
                  className="text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full bg-white/15 text-white border border-white/25 backdrop-blur-sm hover:bg-white/25 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {/* Quick Info */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg">{duration}</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg">{price}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="#enquiry"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Enquire Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="#itinerary"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              View Itinerary
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
