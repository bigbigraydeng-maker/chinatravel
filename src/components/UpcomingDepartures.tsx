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
    <section className="bg-surface py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Ready to book
          </span>
          <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">Upcoming departures</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
            Confirmed dates pulled live from each tour — never a stale page.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse" style={{ minWidth: '640px' }}>
            <thead>
              <tr className="border-b border-secondary/20 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Departs</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Journey</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-muted">Duration</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-muted">From</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {upcoming.map(({ tour, date, price }, i) => {
                const label = `${date.getDate()} ${SHORT_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
                const href = `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
                return (
                  <tr key={`${tour.slug}-${i}`} className="border-b border-secondary/10 transition-colors hover:bg-white/60">
                    <td className="whitespace-nowrap px-6 py-6 font-medium text-ink" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {label}
                    </td>
                    <td className="px-6 py-6">
                      <Link href={href} className="font-semibold text-ink transition-colors hover:text-primary">
                        {tour.name}
                      </Link>{' '}
                      <span className="capitalize text-ink-muted">({tour.tier})</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-6 text-ink-muted">{tour.duration}</td>
                    <td className="whitespace-nowrap px-6 py-6 font-serif font-bold text-ink">{price}</td>
                    <td className="px-6 py-6">
                      <Link
                        href={href}
                        className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
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

        <div className="mt-8">
          <Link
            href="/tours/find"
            className="inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-primary hover:text-primary"
          >
            See all tours &amp; departures →
          </Link>
        </div>
      </div>
    </section>
  );
}
