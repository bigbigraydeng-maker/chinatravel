'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { getSeasonalDataByMonth } from '@/lib/data/seasonal-data';

interface SeasonalGuideProps {
  defaultMonth?: number;
}

const MONTHS = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' },
];

const RAINFALL_COLORS = {
  low: 'text-blue-400',
  medium: 'text-blue-500',
  high: 'text-blue-600',
};

const PRICE_COLORS = {
  low: 'text-green-500',
  medium: 'text-yellow-500',
  high: 'text-red-500',
};

const CROWDING_COLORS = {
  light: 'text-green-500',
  moderate: 'text-yellow-500',
  peak: 'text-red-500',
};

const STAR_RATING = (rating: number) => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

export default function SeasonalGuide({ defaultMonth }: SeasonalGuideProps) {
  // Get current month if not provided
  const currentMonth = defaultMonth || new Date().getMonth() + 1;
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // Fetch seasonal data
  const seasonalData = useMemo(
    () => getSeasonalDataByMonth(selectedMonth),
    [selectedMonth]
  );

  if (!seasonalData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading seasonal data...</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-50 via-amber-50 to-rose-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-accent mb-4">
            Best Time to Visit China
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover the perfect month to visit based on weather, crowds, prices, and special events.
          </p>
        </div>
      </section>

      {/* Month Selector */}
      <section className="py-8 border-b border-warm-100">
        <div className="container mx-auto px-4">
          <div className="max-w-md">
            <label htmlFor="month-selector" className="block text-sm font-semibold text-accent mb-3">
              Select a Month
            </label>
            <select
              id="month-selector"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              aria-label="Select month"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Climate & Conditions */}
      <section className="py-12 border-b border-warm-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-accent mb-8">
            {seasonalData.monthName} Weather & Conditions
          </h2>

          {/* Climate Description */}
          <div className="bg-warm-50 rounded-lg p-6 mb-8">
            <p className="text-gray-700 text-lg leading-relaxed">
              {seasonalData.nationalClimate}
            </p>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Temperature */}
            <div className="bg-white border border-warm-100 rounded-lg p-5">
              <h3 className="font-semibold text-accent mb-2">Temperature</h3>
              <p className="text-2xl font-bold text-primary">
                {seasonalData.avgTemp.min}°{seasonalData.avgTemp.unit} - {seasonalData.avgTemp.max}°
                {seasonalData.avgTemp.unit}
              </p>
              <p className="text-sm text-gray-500 mt-1">Average range</p>
            </div>

            {/* Humidity */}
            <div className="bg-white border border-warm-100 rounded-lg p-5">
              <h3 className="font-semibold text-accent mb-2">Humidity</h3>
              <p className="text-lg text-gray-700">{seasonalData.humidity}</p>
            </div>

            {/* Rainfall */}
            <div className="bg-white border border-warm-100 rounded-lg p-5">
              <h3 className="font-semibold text-accent mb-2">Rainfall</h3>
              <p className={`text-lg font-semibold ${RAINFALL_COLORS[seasonalData.rainfallLevel]}`}>
                {seasonalData.rainfallLevel.charAt(0).toUpperCase() +
                  seasonalData.rainfallLevel.slice(1)}
              </p>
            </div>

            {/* Tourism Info */}
            <div className="bg-white border border-warm-100 rounded-lg p-5">
              <h3 className="font-semibold text-accent mb-2">Tourism</h3>
              <div className="space-y-2">
                <p>
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className={`ml-2 font-semibold ${PRICE_COLORS[seasonalData.priceLevel]}`}>
                    {seasonalData.priceLevel.charAt(0).toUpperCase() +
                      seasonalData.priceLevel.slice(1)}
                  </span>
                </p>
                <p>
                  <span className="text-sm text-gray-600">Crowds:</span>
                  <span className={`ml-2 font-semibold ${CROWDING_COLORS[seasonalData.crowding]}`}>
                    {seasonalData.crowding.charAt(0).toUpperCase() +
                      seasonalData.crowding.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Destinations */}
      <section className="py-12 border-b border-warm-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-accent mb-8">
            Best Destinations in {seasonalData.monthName}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonalData.bestDestinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/${destination.slug}-travel-guide`}
                className="group bg-white border border-warm-100 rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-accent group-hover:text-primary transition-colors">
                      {destination.name}
                    </h3>
                    <span className="text-yellow-400 text-sm">
                      {STAR_RATING(destination.rating)}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{destination.reason}</p>
                  <div className="text-primary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explore Guide →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 border-b border-warm-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-accent mb-6">
            {seasonalData.monthName} Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonalData.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-primary text-2xl mt-1">✨</span>
                <p className="text-gray-700">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festivals & Events */}
      {seasonalData.festivals.length > 0 && (
        <section className="py-12 border-b border-warm-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold text-accent mb-6">
              Festivals & Events
            </h2>
            <div className="space-y-3">
              {seasonalData.festivals.map((festival, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-warm-50 rounded-lg">
                  <span className="text-primary text-xl">🎉</span>
                  <p className="text-gray-700">{festival}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Travel Tips */}
      {seasonalData.tips.length > 0 && (
        <section className="py-12 border-b border-warm-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold text-accent mb-6">
              Travel Tips for {seasonalData.monthName}
            </h2>
            <div className="space-y-3">
              {seasonalData.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-600 text-xl">💡</span>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packing List */}
      {seasonalData.packing.length > 0 && (
        <section className="py-12 border-b border-warm-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold text-accent mb-6">
              What to Pack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {seasonalData.packing.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-warm-50 rounded-lg">
                  <span className="text-primary text-lg">✓</span>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-primary to-rose-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-white mb-4">
            Ready to Plan Your {seasonalData.monthName} Trip?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Browse our China tours or create a custom itinerary tailored to your preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tours"
              className="px-8 py-3 bg-white text-primary font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Browse Tours
            </Link>
            <Link
              href="/tailor-made"
              className="px-8 py-3 bg-white/20 border border-white text-white font-bold rounded-lg hover:bg-white/30 transition-all"
            >
              Custom Itinerary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
