import Link from 'next/link';
import { getAllActiveTours, type Tour } from '@/lib/data/tours';

/**
 * Upcoming departures table — the nearest scheduled departures across all
 * active tours, derived live from `tours.ts` `departureDates` (single source of
 * truth). No hardcoded dates, and NO fabricated "X seats left" counts — the
 * data has no seat inventory, so we only show fields we can stand behind:
 * departure date, journey, duration, from-price, and a link.
 */

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
  jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11,
};
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Parse "15 October 2026" or "25 August" (year inferred = next occurrence). */
function parseDepartureDate(raw: string, now: Date): Date | null {
  const m = raw.trim().match(/^(\d{1,2})\s+([A-Za-z]+)\.?\s*(\d{4})?$/);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const month = MONTHS[m[2].toLowerCase()];
  if (month === undefined || Number.isNaN(day)) return null;
  if (m[3]) return new Date(parseInt(m[3], 10), month, day);
  const thisYear = new Date(now.getFullYear(), month, day);
  return thisYear < now ? new Date(now.getFullYear() + 1, month, day) : thisYear;
}

interface DepartureRow {
  tour: Tour;
  dateStr: string;
  date: Date;
  price: string;
}

interface Props {
  limit?: number;
}

export default function UpcomingDepartures({ limit = 6 }: Props) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const rows: DepartureRow[] = [];
  for (const tour of getAllActiveTours()) {
    if (!tour.departureDates?.length) continue;
    for (const dateStr of tour.departureDates) {
      const date = parseDepartureDate(dateStr, now);
      if (!date || date < now) continue;
      rows.push({ tour, dateStr, date, price: tour.departurePricing?.[dateStr] ?? tour.price });
    }
  }
  rows.sort((a, b) => a.date.getTime() - b.date.getTime());
  const upcoming = rows.slice(0, limit);

  if (upcoming.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-warm-50 via-white to-warm-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-secondary text-sm font-semibold uppercase tracking-widest mb-2">
            Ready to book
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            Upcoming departures
          </h2>
          <p className="text-gray-600">
            Confirmed dates across our journeys — pulled live from each tour, never a stale page.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl border border-warm-100 bg-white shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: '600px' }}>
              <thead>
                <tr className="bg-warm-50 text-left">
                  <th className="px-6 py-4 font-bold text-gray-800 uppercase text-xs tracking-wide">Departs</th>
                  <th className="px-6 py-4 font-bold text-gray-800 uppercase text-xs tracking-wide">Journey</th>
                  <th className="px-6 py-4 font-bold text-gray-800 uppercase text-xs tracking-wide">Duration</th>
                  <th className="px-6 py-4 font-bold text-gray-800 uppercase text-xs tracking-wide">From (pp)</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map(({ tour, date, price }, i) => {
                  const label = `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
                  const href = `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
                  return (
                    <tr key={`${tour.slug}-${i}`} className="border-t border-warm-100 hover:bg-warm-50/60 transition-colors">
                      <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {label}
                      </td>
                      <td className="px-6 py-4">
                        <Link href={href} className="font-semibold text-gray-800 hover:text-primary transition-colors">
                          {tour.name}
                        </Link>
                        <span className="block text-xs text-gray-500 capitalize">{tour.tier}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{tour.duration}</td>
                      <td className="px-6 py-4 font-serif font-bold text-primary whitespace-nowrap">{price}</td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={href}
                          className="inline-block rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700 hover:border-primary hover:text-primary transition-colors"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/tours/find" className="text-primary font-medium hover:underline">
            See all tours &amp; departures →
          </Link>
        </div>
      </div>
    </section>
  );
}
