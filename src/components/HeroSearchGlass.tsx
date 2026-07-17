'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Glass, segmented hero search — matches the redesign concept
 * (Destination / When / Style + "Find your journey").
 *
 * Used ONLY inside <HeroCinematic /> on /preview-hero so the live homepage's
 * <SearchBar /> is untouched. Destination + Style map to the existing
 * /tours/find filters. "When" (month) is captured and passed through as a
 * `month` param; month-based filtering on the results page is a follow-up
 * (kept as a real intent field rather than a decorative dropdown).
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

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const styles = [
  { value: 'culture', label: 'Culture & History' },
  { value: 'food', label: 'Food & Culinary' },
  { value: 'nature', label: 'Nature & Adventure' },
  { value: 'family', label: 'Family' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'photography', label: 'Photography' },
];

const selectClass =
  'w-full cursor-pointer appearance-none bg-transparent py-1 pr-6 text-[15px] font-semibold text-white outline-none';
const optionClass = 'text-gray-800';

export default function HeroSearchGlass() {
  const [destination, setDestination] = useState('');
  const [month, setMonth] = useState('');
  const [style, setStyle] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'hero_search_submit', {
        destination: destination || 'all',
        month: month || 'any',
        interest: style || 'all',
        event_category: 'engagement',
        event_label: 'hero_glass_search',
      });
    }

    const params = new URLSearchParams();
    if (destination) params.set('destination', destination);
    if (style) params.set('interest', style);
    if (month) params.set('month', month.toLowerCase());
    router.push(`/tours/find?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="mx-auto w-full max-w-3xl">
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

        {/* When */}
        <div className="flex-1 px-4 py-2 text-left sm:border-r sm:border-white/20">
          <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
            When
          </label>
          <div className="relative">
            <select
              aria-label="When"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={selectClass}
            >
              <option value="" className={optionClass}>Any month</option>
              {months.map((m) => (
                <option key={m} value={m} className={optionClass}>{m}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-secondary">▾</span>
          </div>
        </div>

        {/* Style */}
        <div className="flex-1 px-4 py-2 text-left">
          <label className="block text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
            Style
          </label>
          <div className="relative">
            <select
              aria-label="Style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className={selectClass}
            >
              <option value="" className={optionClass}>Any style</option>
              {styles.map((s) => (
                <option key={s.value} value={s.value} className={optionClass}>{s.label}</option>
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
