'use client';

import type { DayItinerary } from '@/lib/data/tours';

interface TourInclusionsProps {
  inclusions: string[];
  exclusions: string[];
  /**
   * Optional itinerary — when provided, we derive:
   *  - meal counts (Breakfasts / Lunches / Dinners), Wendy Wu-style
   *  - sample hotels grouped by consecutive nights per property
   */
  itinerary?: DayItinerary[];
}

interface MealTally {
  breakfast: number;
  lunch: number;
  dinner: number;
}

function countMeals(itinerary: DayItinerary[]): MealTally {
  const tally: MealTally = { breakfast: 0, lunch: 0, dinner: 0 };
  for (const day of itinerary) {
    for (const meal of day.meals ?? []) {
      const m = meal.toLowerCase();
      if (m.startsWith('breakfast')) tally.breakfast += 1;
      else if (m.startsWith('lunch')) tally.lunch += 1;
      else if (m.startsWith('dinner')) tally.dinner += 1;
    }
  }
  return tally;
}

interface HotelStay {
  name: string;
  nights: number;
}

function extractHotelStays(itinerary: DayItinerary[]): HotelStay[] {
  const stays: HotelStay[] = [];
  let current: HotelStay | null = null;
  for (const day of itinerary) {
    const hotel = day.accommodation?.trim();
    if (!hotel) {
      current = null;
      continue;
    }
    if (current && current.name === hotel) {
      current.nights += 1;
    } else {
      current = { name: hotel, nights: 1 };
      stays.push(current);
    }
  }
  return stays;
}

export default function TourInclusions({ inclusions, exclusions, itinerary }: TourInclusionsProps) {
  const meals = itinerary ? countMeals(itinerary) : null;
  const totalMeals = meals ? meals.breakfast + meals.lunch + meals.dinner : 0;
  const stays = itinerary ? extractHotelStays(itinerary) : [];
  const totalHotelNights = stays.reduce((sum, s) => sum + s.nights, 0);

  return (
    <section id="inclusions" className="scroll-mt-24">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
        What&apos;s Included
      </h2>

      {/* Meal + accommodation summary — derived from itinerary */}
      {meals && totalMeals > 0 && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-warm-50 border border-warm-200 rounded-lg p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Included meals ({totalMeals})
            </p>
            <div className="flex items-center gap-6 text-gray-800">
              <div>
                <p className="text-2xl font-bold text-primary leading-none">{meals.breakfast}</p>
                <p className="text-xs uppercase tracking-wide text-gray-600 mt-1">Breakfasts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary leading-none">{meals.lunch}</p>
                <p className="text-xs uppercase tracking-wide text-gray-600 mt-1">Lunches</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary leading-none">{meals.dinner}</p>
                <p className="text-xs uppercase tracking-wide text-gray-600 mt-1">Dinners</p>
              </div>
            </div>
          </div>

          {stays.length > 0 && (
            <div className="bg-warm-50 border border-warm-200 rounded-lg p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                Accommodation ({totalHotelNights} nights)
              </p>
              <p className="text-2xl font-bold text-primary leading-none">
                {stays.length} <span className="text-base font-semibold text-gray-800">carefully selected properties</span>
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Sample hotels detailed below — final selection confirmed at booking.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inclusions */}
        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Included
          </h3>
          <ul className="space-y-3">
            {inclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div className="bg-red-50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Not Included
          </h3>
          <ul className="space-y-3">
            {exclusions.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sample hotels — Wendy Wu-style, listed per stay */}
      {stays.length > 0 && (
        <div className="mt-10">
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Sample tour hotels</h3>
          <p className="text-sm text-gray-600 mb-6">
            Representative properties for this tour — actual hotels may vary by departure date and are confirmed at booking.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stays.map((stay, index) => (
              <li
                key={`${stay.name}-${index}`}
                className="border border-warm-200 rounded-lg p-4 bg-white flex items-start gap-4"
              >
                <div className="shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-md bg-primary/10 text-primary">
                  <span className="text-xl font-bold leading-none">{stay.nights}</span>
                  <span className="text-[10px] uppercase tracking-wide mt-0.5">
                    {stay.nights === 1 ? 'night' : 'nights'}
                  </span>
                </div>
                <p className="text-sm md:text-base font-semibold text-gray-900 leading-snug">
                  {stay.name}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
