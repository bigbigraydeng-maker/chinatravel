import { Icon } from '@/components/ui/Icon';
import type { Tour } from '@/lib/data/tours';

/**
 * Horizontal city journey strip: visual timeline of the 4 main stops on
 * Best of China, with day-range chip + 1-line hook per city. Gives paid
 * visitors an at-a-glance answer to "where do I actually go on this trip?"
 * without making them scroll into the day-by-day itinerary.
 */
interface City {
  name: string;
  days: string;
  hook: string;
}

export default function CityJourneyTimeline({ tour }: { tour: Tour }) {
  const cities: City[] = (tour.tourCities ?? []).map((slug) => {
    const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
    const relatedDays = tour.itinerary.filter((day) => day.title.toLowerCase().includes(name.toLowerCase()) || day.description.toLowerCase().includes(name.toLowerCase()));
    const first = relatedDays[0]?.day;
    const last = relatedDays.at(-1)?.day;
    return {
      name,
      days: first === undefined ? 'On route' : first === last ? `Day ${first}` : `Days ${first}–${last}`,
      hook: relatedDays[0]?.description ?? `Included in ${tour.name}`,
    };
  });
  return (
    <section
      aria-label="Best of China journey at a glance"
      className="bg-gradient-to-b from-white via-warm-50/40 to-white py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-primary mb-2">
          The Journey
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-10">
          {tour.duration} · {cities.length} Destinations
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Connector line behind the dots (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-6 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-amber-300 via-amber-500 to-orange-500"
          />

          <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
            {cities.map((c, idx) => (
              <li key={c.name} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg ring-4 ring-white">
                    <Icon name="map-pin" filled className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-white border border-warm-200 text-xs font-bold text-amber-700 rounded-full w-6 h-6 flex items-center justify-center shadow">
                    {idx + 1}
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                  {c.days}
                </p>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2 leading-none">
                  {c.name}
                </h3>
                <p className="text-sm text-gray-600 leading-snug max-w-[14rem]">{c.hook}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
