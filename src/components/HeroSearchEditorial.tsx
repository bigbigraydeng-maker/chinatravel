'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';

/**
 * Editorial hero search — white card with underline fields, matching the
 * approved Stitch "Editorial" homepage direction. Used ONLY inside the
 * redesigned homepage (/preview-home). Two fields: Destination + Must-see,
 * both wired to the existing /tours/find filters (Destination → destination,
 * Must-see → q keyword). No month field (empty results with a small catalogue).
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

const fieldSelect =
  'w-full appearance-none cursor-pointer border-0 bg-transparent pl-8 pr-8 py-2 text-lg text-ink outline-none focus:ring-0 font-sans';

export default function HeroSearchEditorial() {
  const [destination, setDestination] = useState('');
  const [attraction, setAttraction] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_search_submit', {
        destination: destination || 'all',
        attraction: attraction || 'any',
        event_category: 'engagement',
        event_label: 'hero_editorial_search',
      });
    }
    // Tours are country-level (destination = 'china'), so a city slug can't be
    // sent as the `destination` filter — it would match no tours. Send the city
    // (or attraction) as a keyword `q`, which TourFinder matches against tour
    // cities / name / highlights. City takes priority when both are chosen.
    const params = new URLSearchParams();
    const q = destination || attraction;
    if (q) params.set('q', q);
    router.push(`/tours/find?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-warm-100 bg-white p-6 shadow-editorial"
    >
      <div className="flex flex-col gap-5">
        {/* Destination */}
        <div className="space-y-2">
          <label className="ml-1 text-xs font-bold uppercase tracking-wider text-ink">Destination</label>
          <div className="relative border-b border-ink/20 pb-1">
            <Icon name="search" className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
            <select aria-label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} className={fieldSelect}>
              <option value="">Anywhere in China</option>
              {destinations.map((d) => (
                <option key={d.value} value={d.value}>{d.label}</option>
              ))}
            </select>
            <Icon name="chevron-down" className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          </div>
        </div>

        {/* Must-see */}
        <div className="space-y-2">
          <label className="ml-1 text-xs font-bold uppercase tracking-wider text-ink">Must-see</label>
          <div className="relative border-b border-ink/20 pb-1">
            <Icon name="compass" className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
            <select aria-label="Must-see attraction" value={attraction} onChange={(e) => setAttraction(e.target.value)} className={fieldSelect}>
              <option value="">Any attraction</option>
              {attractions.map((a) => (
                <option key={a.query} value={a.query}>{a.label}</option>
              ))}
            </select>
            <Icon name="chevron-down" className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold uppercase tracking-wide text-white shadow-md transition-colors hover:bg-primary"
        >
          Find your journey
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}
