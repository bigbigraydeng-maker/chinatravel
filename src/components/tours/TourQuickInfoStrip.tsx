import Link from 'next/link';
import type { DayItinerary } from '@/lib/data/tours';

interface TourQuickInfoStripProps {
  duration: string;
  price: string;
  itinerary: DayItinerary[];
  /** Best time to travel — short label (e.g. "Apr–Oct", "Year-round"). Falls back to sensible default. */
  bestTime?: string;
  /** Optional aggregate review rating (e.g. "4.9 · 428 reviews"). Omit when no data. */
  reviewSummary?: string;
}

/**
 * Horizontal quick-facts strip rendered directly under the hero.
 * Inspired by Wendy Wu's "6 quick-info anchors" — each cell jumps to the
 * corresponding tour-detail section so long pages become navigable at a glance.
 *
 * All numbers are derived from the itinerary so no schema change is required.
 * Meal & hotel-night counts stay in sync with the source of truth (itinerary),
 * matching the derivation used in TourInclusions.
 */
export default function TourQuickInfoStrip({
  duration,
  price,
  itinerary,
  bestTime = 'Apr–Oct',
  reviewSummary,
}: TourQuickInfoStripProps) {
  // Hotel nights = number of days with an accommodation entry
  const hotelNights = itinerary.filter((d) => Boolean(d.accommodation?.trim())).length;

  // Meal totals
  let breakfasts = 0;
  let lunches = 0;
  let dinners = 0;
  for (const day of itinerary) {
    for (const meal of day.meals ?? []) {
      const m = meal.toLowerCase();
      if (m.startsWith('breakfast')) breakfasts += 1;
      else if (m.startsWith('lunch')) lunches += 1;
      else if (m.startsWith('dinner')) dinners += 1;
    }
  }
  const totalMeals = breakfasts + lunches + dinners;

  const items: { label: string; value: string; sub: string; href: string }[] = [
    {
      label: 'Fully Inclusive',
      value: 'All-in NZD',
      sub: 'Flights · hotels · guides',
      href: '#inclusions',
    },
    {
      label: 'Duration',
      value: duration,
      sub: 'Group tour',
      href: '#itinerary',
    },
    {
      label: 'Accommodation',
      value: `${hotelNights} nights`,
      sub: '4–5 star hotels',
      href: '#inclusions',
    },
    {
      label: 'Meals included',
      value: totalMeals > 0 ? `${totalMeals}` : '—',
      sub: totalMeals > 0 ? `${breakfasts} B · ${lunches} L · ${dinners} D` : 'See inclusions',
      href: '#inclusions',
    },
    {
      label: 'From',
      value: price,
      sub: 'Per person twin share',
      href: '#enquiry',
    },
    {
      label: reviewSummary ? 'Rated by travellers' : 'Best time to go',
      value: reviewSummary?.split('·')[0]?.trim() ?? bestTime,
      sub: reviewSummary?.split('·').slice(1).join('·').trim() || 'Ideal touring season',
      href: reviewSummary ? '#trust-signals' : '#itinerary',
    },
  ];

  return (
    <section
      aria-label="Tour quick facts"
      className="border-b border-warm-200 bg-white"
    >
      <div className="container mx-auto px-4">
        {/* Horizontal scroll on mobile, 6-column grid from md+ */}
        <ul className="flex md:grid md:grid-cols-6 overflow-x-auto md:overflow-visible -mx-4 md:mx-0 md:divide-x divide-warm-200">
          {items.map((item, idx) => (
            <li
              key={item.label}
              className={`flex-shrink-0 w-[45%] sm:w-1/3 md:w-auto ${idx === 0 ? 'ml-4 md:ml-0' : ''} ${idx === items.length - 1 ? 'mr-4 md:mr-0' : ''}`}
            >
              <Link
                href={item.href}
                className="group block h-full px-4 py-4 text-center hover:bg-warm-50 transition-colors"
              >
                <p className="text-[10px] md:text-xs uppercase tracking-wide font-semibold text-gray-500">
                  {item.label}
                </p>
                <p className="mt-1 text-base md:text-lg font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
                  {item.value}
                </p>
                <p className="mt-0.5 text-xs text-gray-600 leading-snug">
                  {item.sub}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
