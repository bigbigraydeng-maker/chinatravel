'use client';

import { useState } from 'react';
import { DayItinerary } from '@/lib/data/tours';
import ItineraryActions from '@/components/tours/ItineraryActions';

interface TourItineraryProps {
  itinerary: DayItinerary[];
  tourCities?: string[]; // 城市ID列表，优先使用
  /** When all are set, Print/Email appears in the itinerary section header (not mid-page). */
  tourName?: string;
  tourSlug?: string;
  destination?: string;
  tier?: string;
}

export default function TourItinerary({
  itinerary,
  tourName,
  tourSlug,
  destination,
  tier,
}: TourItineraryProps) {
  const showSaveActions = Boolean(tourSlug && tourName && destination && tier);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));

  return (
    <section id="itinerary" className="scroll-mt-24">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="font-serif text-3xl font-bold text-gray-900">Day-by-Day Itinerary</h2>
        {showSaveActions ? (
          <ItineraryActions
            tourName={tourName!}
            tourSlug={tourSlug!}
            destination={destination!}
            tier={tier!}
            variant="toolbar"
          />
        ) : null}
      </div>

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
    </section>
  );
}
