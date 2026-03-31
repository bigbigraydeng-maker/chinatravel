'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface TourData {
  id: string;
  slug: string;
  destination: string;
  tier: string;
  name: string;
  shortDescription: string;
  duration: string;
  price: string;
  heroImage: string;
  highlights: string[];
}

interface TourFinderProps {
  tours: TourData[];
}

export default function TourFinder({ tours }: TourFinderProps) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [interest, setInterest] = useState(searchParams.get('interest') || '');

  const interestKeywords: Record<string, string[]> = {
    culture: ['culture', 'history', 'heritage', 'temple', 'forbidden city', 'terracotta', 'ancient', 'museum', 'palace'],
    food: ['food', 'culinary', 'cuisine', 'cooking', 'dumpling', 'tea', 'dining'],
    nature: ['nature', 'mountain', 'river', 'landscape', 'scenic', 'hiking', 'park', 'gorge', 'cruise'],
    family: ['family', 'kid', 'child', 'panda', 'zoo', 'fun'],
    luxury: ['luxury', 'premium', 'signature', 'boutique', 'exclusive', 'private'],
    photography: ['photography', 'photo', 'scenic', 'sunrise', 'landscape', 'view'],
  };

  const filtered = tours.filter(tour => {
    const searchText = `${tour.name} ${tour.shortDescription} ${tour.highlights.join(' ')} ${tour.destination} ${tour.tier}`.toLowerCase();

    if (query && !searchText.includes(query.toLowerCase())) return false;
    if (destination && tour.destination !== destination) return false;
    if (interest && interestKeywords[interest]) {
      const keywords = interestKeywords[interest];
      if (!keywords.some(kw => searchText.includes(kw))) return false;
    }
    return true;
  });

  return (
    <div>
      {/* Search Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tours, destinations, experiences..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <select value={destination} onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
              <option value="">All Destinations</option>
              <option value="china">China</option>
              <option value="japan">Japan</option>
              <option value="vietnam">Vietnam</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
            <select value={interest} onChange={(e) => setInterest(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
              <option value="">All Interests</option>
              <option value="culture">Culture & History</option>
              <option value="food">Food & Culinary</option>
              <option value="nature">Nature & Adventure</option>
              <option value="family">Family</option>
              <option value="luxury">Luxury</option>
              <option value="photography">Photography</option>
            </select>
          </div>
        </div>
        {(query || destination || interest) && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">{filtered.length} tour{filtered.length !== 1 ? 's' : ''} found</span>
            <button onClick={() => { setQuery(''); setDestination(''); setInterest(''); }}
              className="text-sm text-primary hover:underline">Clear filters</button>
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No tours found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <Link href="/tailor-made" className="btn-primary">Request a Tailor Made Tour</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tour) => (
            <Link key={tour.id} href={`/tours/${tour.destination}/${tour.tier}/${tour.slug}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative h-48 bg-gray-200 overflow-hidden">
                <img src={tour.heroImage} alt={tour.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {tour.tier}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary uppercase">{tour.destination}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-xs text-gray-500">{tour.duration}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{tour.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tour.shortDescription}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{tour.price}</span>
                  <span className="text-sm text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    View Tour
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
