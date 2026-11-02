import type { Tour } from '@/lib/data/tours';

/**
 * Large-numerals visual stat block for /campaigns/best-of-china.
 *
 * Current route size, duration and price rendered as oversized serif numerals.
 * The values come from the published tour record so this campaign panel stays
 * aligned when Tour Management updates the product.
 */
interface Stat {
  number: string;
  label: string;
  sub: string;
}

export default function BigStatsBlock({ tour }: { tour: Tour }) {
  const durationDays = tour.duration.match(/\d+/)?.[0] ?? tour.duration;
  const route = tour.tourCities?.map((city) => city.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())).join(' · ') || '';
  const stats: Stat[] = [
    { number: String(tour.tourCities?.length ?? 0), label: 'Cities', sub: route },
    { number: durationDays, label: 'Days', sub: 'Tour duration' },
    { number: tour.price, label: 'Price', sub: 'Current published tour price' },
  ];
  return (
    <section
      aria-label="Best of China at a glance"
      className="bg-white py-12 md:py-16 border-y border-warm-100"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-4 max-w-6xl mx-auto">
          {stats.map((s, idx) => (
            <div
              key={s.label}
              className={`text-center px-4 md:px-6 ${
                idx > 0 ? 'md:border-l md:border-warm-100' : ''
              }`}
            >
              <p className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold bg-gradient-to-b from-amber-600 via-amber-700 to-orange-700 bg-clip-text text-transparent leading-none mb-2">
                {s.number}
              </p>
              <p className="text-sm md:text-base font-bold uppercase tracking-wider text-gray-900 mb-1.5">
                {s.label}
              </p>
              <p className="text-xs md:text-sm text-gray-600 leading-snug">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
