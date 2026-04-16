'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  type Tour,
  collectTourTagSummaries,
  slugifyTourTag,
  tourHasTagSlug,
} from '@/lib/data/tours';

interface TourFinderProps {
  tours: Tour[];
}

export default function TourFinder({ tours }: TourFinderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [interest, setInterest] = useState(searchParams.get('interest') || '');
  const [tagSlug, setTagSlug] = useState(searchParams.get('tag') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setDestination(searchParams.get('destination') || '');
    setInterest(searchParams.get('interest') || '');
    setTagSlug(searchParams.get('tag') || '');
  }, [searchParams]);

  const tagSummaries = useMemo(() => collectTourTagSummaries(tours), [tours]);

  const interestKeywords: Record<string, string[]> = {
    culture: ['culture', 'history', 'heritage', 'temple', 'forbidden city', 'terracotta', 'ancient', 'museum', 'palace'],
    food: ['food', 'culinary', 'cuisine', 'cooking', 'dumpling', 'tea', 'dining'],
    nature: ['nature', 'mountain', 'river', 'landscape', 'scenic', 'hiking', 'park', 'gorge', 'cruise'],
    family: ['family', 'kid', 'child', 'panda', 'zoo', 'fun'],
    luxury: ['luxury', 'premium', 'signature', 'boutique', 'exclusive', 'private'],
    photography: ['photography', 'photo', 'scenic', 'sunrise', 'landscape', 'view'],
  };

  const filtered = tours.filter((tour) => {
    const tagBlob = (tour.tags ?? []).join(' ').toLowerCase();
    const searchText = `${tour.name} ${tour.shortDescription} ${tour.highlights.join(' ')} ${tagBlob} ${tour.destination} ${tour.tier}`.toLowerCase();

    if (query) {
      const q = query.toLowerCase().trim();
      const matchesFreeText = searchText.includes(q);
      const matchesTag = (tour.tags ?? []).some((label) => {
        const s = slugifyTourTag(label);
        return s.includes(q.replace(/\s+/g, '-')) || label.toLowerCase().includes(q);
      });
      if (!matchesFreeText && !matchesTag) return false;
    }
    if (destination && tour.destination !== destination) return false;
    if (interest && interestKeywords[interest]) {
      const keywords = interestKeywords[interest];
      if (!keywords.some(kw => searchText.includes(kw))) return false;
    }
    if (tagSlug && !tourHasTagSlug(tour, tagSlug)) return false;
    return true;
  });

  const hasActiveFilters = Boolean(query || destination || interest || tagSlug);

  const clearAll = () => {
    setQuery('');
    setDestination('');
    setInterest('');
    setTagSlug('');
    router.replace('/tours/find', { scroll: false });
  };

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
                placeholder="Tours, interests, or tags (e.g. Mogao Caves, Peking duck)…"
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

        {tagSummaries.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-3">Browse by tag</p>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/tours/find"
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${!tagSlug ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-700 hover:border-primary/40 hover:text-primary'}`}
              >
                All tags
              </Link>
              {tagSummaries.map(({ slug, label, count }) => (
                <Link
                  key={slug}
                  href={`/tours/find?tag=${encodeURIComponent(slug)}`}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${tagSlug === slug ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-700 hover:border-primary/40 hover:text-primary'}`}
                >
                  {label}
                  <span className={`ml-1 opacity-80 ${tagSlug === slug ? '' : 'text-gray-500'}`}>({count})</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {hasActiveFilters && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500">{filtered.length} tour{filtered.length !== 1 ? 's' : ''} found</span>
            <button type="button" onClick={clearAll} className="text-sm text-primary hover:underline">Clear filters</button>
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
              className="min-w-0 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative aspect-[16/10] w-full bg-gray-200 overflow-hidden">
                <Image
                  src={tour.heroImage}
                  alt={tour.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
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
                {tour.tags && tour.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tour.tags.slice(0, 4).map((label) => (
                      <span
                        key={label}
                        className="text-[10px] font-medium uppercase tracking-wide text-primary/90 bg-primary/5 px-2 py-0.5 rounded"
                      >
                        {label}
                      </span>
                    ))}
                    {tour.tags.length > 4 ? (
                      <span className="text-[10px] text-gray-500 self-center">+{tour.tags.length - 4}</span>
                    ) : null}
                  </div>
                )}
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
