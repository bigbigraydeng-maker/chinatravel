'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Glass, segmented hero search — matches the redesign concept.
 *
 * Two fields: Destination + Attraction (+ "Find your journey"). Used ONLY
 * inside <HeroCinematic /> on /preview-hero, so the live homepage's
 * <SearchBar /> is untouched.
 *
 * Design note: the earlier "When (month)" field was dropped on purpose — with
 * a small tour catalogue, month filtering mostly returns nothing, which reads
 * as a dead search. Attractions instead map to a keyword (`q`) that TourFinder
 * matches against tour name / description / highlights / cities, so every listed
 * attraction returns real results (verified against tours.ts term frequency).
 */

const destinations = [
  { value: 'beijing', label: 'Beijing' },
  { value: 'xian', label: "Xi'an" },
  { value: 'shanghai', label: 'Shanghai' },
  { value: 'chengdu', label: 'Chengdu' },
  { value: 'guilin', label: 'Guilin' },
  { value: 'zhangjiajie', label: 'Zhangjiajie' },
  { value: 'yunnan', label: 'Yunnan' },
];

// label = what the traveller recognises; query = the term TourFinder matches on.
const attractions = [
  { query: 'Great Wall', label: 'Great Wall' },
  { query: 'Forbidden City', label: 'Forbidden City' },
  { query: 'Terracotta', label: 'Terracotta Warriors' },
  { query: 'Li River', label: 'Li River (Guilin)' },
  { query: 'Panda', label: 'Giant Pandas' },
  { query: 'Yangtze', label: 'Yangtze River Cruise' },
  { query: 'Bund', label: 'The Bund (Shanghai)' },
  { query: 'Zhangjiajie', label: 'Avatar Mountains' },
];

const selectClass =
  'w-full cursor-pointer appearance-none bg-transparent py-1 pr-6 text-[15px] font-semibold text-white outline-none';
const optionClass = 'text-gray-800';

export default function HeroSearchGlass() {
  const [destination, setDestination] = useState('');
  const [attraction, setAttraction] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_search_submit', {
        destination: destination || 'all',
        attraction: attraction || 'any',
        event_category: 'engagement',
        event_label: 'hero_glass_search',
      });
    }

    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (attraction) params.set('q', attraction);
    router.push(`/tours/find?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="mx-auto w-full max-w-2xl">
      <div className="flex flex-col gap-2 rounded-2xl border border-white/25 bg-white/10 p-2 shadow-2xl backdrop-blur-md sm:flex-row sm:items-stretch sm:gap-0">
        {/* Destination */}
        <div className="flex-1 px-4 py-2 text-left sm:border-r sm:border-white/20">
          <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
            Destination
          </label>
          <div className="relative">
            <select
              aria-label="Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={selectClass}
            >
              <option value="" className={optionClass}>Anywhere in China</option>
              {destinations.map((d) => (
                <option key={d.value} value={d.value} className={optionClass}>{d.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-secondary">▾</span>
          </div>
        </div>

        {/* Attraction */}
        <div className="flex-1 px-4 py-2 text-left">
          <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
            Must-see
          </label>
          <div className="relative">
            <select
              aria-label="Must-see attraction"
              value={attraction}
              onChange={(e) => setAttraction(e.target.value)}
              className={selectClass}
            >
              <option value="" className={optionClass}>Any attraction</option>
              {attractions.map((a) => (
                <option key={a.query} value={a.query} className={optionClass}>{a.label}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-secondary">▾</span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-1 w-full shrink-0 rounded-xl bg-gradient-to-r from-primary to-red-600 px-7 py-3 text-[15px] font-bold text-white shadow-lg transition hover:-translate-y-px hover:brightness-110 sm:mt-0 sm:w-auto sm:self-stretch"
        >
          Find your journey
        </button>
      </div>
    </form>
  );
}
