'use client';

import { useState } from 'react';
import { DayItinerary } from '@/lib/data/tours';

interface TourItineraryProps {
  itinerary: DayItinerary[];
}

export default function TourItinerary({ itinerary }: TourItineraryProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));

  return (
    <section id="itinerary" className="scroll-mt-24">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
        Day-by-Day Itinerary
      </h2>
      
      <div className="space-y-4">
        {itinerary.map((day) => (
          <div 
            key={day.day}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Day Header */}
            <button
              onClick={() => {
                const next = new Set(expandedDays);
                if (next.has(day.day)) { next.delete(day.day); } else { next.add(day.day); }
                setExpandedDays(next);
              }}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {day.day}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900">{day.title}</h3>
                  {day.accommodation && (
                    <p className="text-sm text-gray-500">{day.accommodation}</p>
                  )}
                </div>
              </div>
              <svg 
                className={`w-5 h-5 text-gray-500 transition-transform ${expandedDays.has(day.day) ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Day Content */}
            {expandedDays.has(day.day) && (
              <div className="p-4 bg-white">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {day.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {day.meals && day.meals.length > 0 && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span><strong>Meals:</strong> {day.meals.join(', ')}</span>
                    </div>
                  )}

                  {day.accommodation && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span><strong>Accommodation:</strong> {day.accommodation}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Expand All / Collapse All */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setExpandedDays(new Set(itinerary.map(d => d.day)))}
          className="text-sm text-primary hover:underline"
        >
          Expand All Days
        </button>
        <button
          onClick={() => setExpandedDays(new Set())}
          className="text-sm text-primary hover:underline"
        >
          Collapse All
        </button>
      </div>
    </section>
  );
}
