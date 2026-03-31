'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const popularSearches = [
  'Great Wall', 'Shanghai', 'Panda', 'Silk Road', 'Japan Cherry Blossom', 'Vietnam'
];

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [destination, setDestination] = useState('');
  const [interest, setInterest] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (destination) params.set('destination', destination);
    if (interest) params.set('interest', interest);
    router.push(`/tours/find?${params.toString()}`);
  };

  const handleQuickSearch = (term: string) => {
    router.push(`/tours/find?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        {/* Main search bar */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="flex items-center">
            <div className="flex-1 flex items-center px-6 py-4">
              <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations, tours, experiences..."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-lg"
              />
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden md:flex items-center gap-1 px-4 py-2 mr-2 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-8 py-4 font-semibold hover:bg-primary/90 transition-colors text-lg"
            >
              Search
            </button>
          </div>

          {/* Expanded filters */}
          {isExpanded && (
            <div className="border-t border-gray-100 px-6 py-4 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="">All Destinations</option>
                  <option value="china">China</option>
                  <option value="japan">Japan</option>
                  <option value="vietnam">Vietnam</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Interest</label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
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
          )}
        </div>
      </form>

      {/* Popular searches */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-white/70 text-sm">Popular:</span>
        {popularSearches.map(term => (
          <button
            key={term}
            onClick={() => handleQuickSearch(term)}
            className="text-sm px-3 py-1 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors backdrop-blur-sm"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}
