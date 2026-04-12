'use client';

import { useMemo, useState } from 'react';
import { DayItinerary } from '@/lib/data/tours';
import {
  canRenderItineraryMap,
  extractRouteFromItinerary,
} from '@/lib/itinerary-map/extractRouteFromItinerary';
import ItineraryRouteSchematic from '@/components/tours/ItineraryRouteSchematic';

interface TourItineraryProps {
  itinerary: DayItinerary[];
}

export default function TourItinerary({ itinerary }: TourItineraryProps) {
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [view, setView] = useState<'map' | 'detailed'>('map');

  const route = useMemo(() => extractRouteFromItinerary(itinerary), [itinerary]);
  const showMapView = canRenderItineraryMap(route);

  return (
    <section id="itinerary" className="scroll-mt-24">
      <h2 className="mb-8 font-serif text-3xl font-bold text-gray-900">Day-by-Day Itinerary</h2>

      {showMapView && route ? (
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm" role="tablist" aria-label="Itinerary view">
            <button
              type="button"
              role="tab"
              aria-selected={view === 'map'}
              onClick={() => setView('map')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                view === 'map'
                  ? 'bg-secondary text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Map view
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'detailed'}
              onClick={() => setView('detailed')}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                view === 'detailed'
                  ? 'bg-secondary text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Detailed view
            </button>
          </div>
        </div>
      ) : null}

      {showMapView && route && view === 'map' ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="max-h-[min(560px,70vh)] overflow-y-auto rounded-xl border border-gray-200 bg-white pr-1 shadow-sm">
            {itinerary.map(day => (
              <div
                key={day.day}
                className="flex gap-4 border-b border-gray-100 px-4 py-4 last:border-b-0 md:px-5 md:py-5"
              >
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-full border-2 border-secondary/80 bg-warm-50 text-center">
                  <span className="text-[9px] font-bold uppercase leading-none text-secondary">Day</span>
                  <span className="text-lg font-bold leading-tight text-accent">{day.day}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold leading-snug text-gray-900">{day.title}</h3>
                  {day.meals && day.meals.length > 0 ? (
                    <p className="mt-1.5 text-sm text-gray-600">
                      <span className="font-medium text-secondary">Meals:</span> {day.meals.join(', ')}
                    </p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <div className="min-h-[280px] lg:sticky lg:top-28 lg:self-start">
            <ItineraryRouteSchematic route={route} />
            <p className="mt-3 text-center text-xs text-gray-500">
              Schematic route for planning — not a geographic map. City order is derived from your itinerary text.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {itinerary.map(day => (
            <div key={day.day} className="overflow-hidden rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => {
                  const next = new Set(expandedDays);
                  if (next.has(day.day)) {
                    next.delete(day.day);
                  } else {
                    next.add(day.day);
                  }
                  setExpandedDays(next);
                }}
                className="flex w-full items-center justify-between bg-gray-50 p-4 text-left transition-colors hover:bg-gray-100"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
                    {day.day}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900">{day.title}</h3>
                    {day.accommodation ? <p className="text-sm text-gray-500">{day.accommodation}</p> : null}
                  </div>
                </div>
                <svg
                  className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${expandedDays.has(day.day) ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedDays.has(day.day) ? (
                <div className="bg-white p-4">
                  <p className="mb-4 leading-relaxed text-gray-700">{day.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {day.meals && day.meals.length > 0 ? (
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          <strong>Meals:</strong> {day.meals.join(', ')}
                        </span>
                      </div>
                    ) : null}

                    {day.accommodation ? (
                      <div className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span>
                          <strong>Accommodation:</strong> {day.accommodation}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {showMapView && view === 'map' ? null : (
        <div className="mt-4 flex gap-4">
          <button
            type="button"
            onClick={() => setExpandedDays(new Set(itinerary.map(d => d.day)))}
            className="text-sm text-primary hover:underline"
          >
            Expand All Days
          </button>
          <button type="button" onClick={() => setExpandedDays(new Set())} className="text-sm text-primary hover:underline">
            Collapse All
          </button>
        </div>
      )}
    </section>
  );
}
