import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
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
    <section className="bg-surface py-16 md:py-20">
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

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {upcoming.map(({ tour, date, price }, i) => {
            const day = date.getDate();
            const month = SHORT_MONTHS[date.getMonth()].toUpperCase();
            const year = date.getFullYear();
            const href = `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
            return (
              <Link
                key={`${tour.slug}-${i}`}
                href={href}
                className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-editorial transition-shadow hover:shadow-lg"
              >
                <div className="relative h-24 w-24 flex-none overflow-hidden rounded-xl md:h-28 md:w-28">
                  <Image
                    src={tour.heroImage}
                    alt={tour.name}
                    fill
                    sizes="112px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div
                  className="w-14 flex-none border-l border-warm-200 pl-4 text-center leading-none"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  <span className="block font-serif text-2xl font-bold text-primary">{day}</span>
                  <span className="mt-1 block text-[11px] font-bold uppercase tracking-wide text-ink-muted">{month}</span>
                  <span className="block text-[11px] text-ink-muted">{year}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-ink transition-colors group-hover:text-primary">{tour.name}</h3>
                  <p className="capitalize text-xs text-ink-muted">({tour.tier})</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                    <span className="inline-flex items-center gap-1">
                      <Icon name="clock" className="h-3.5 w-3.5" /> {tour.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 font-serif font-bold text-ink">
                      <Icon name="coins" className="h-3.5 w-3.5 text-primary" /> {price}
                    </span>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary text-white transition-colors group-hover:bg-red-700"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/tours/find"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-red-700"
          >
            See all tours &amp; departures →
          </Link>
        </div>
      </div>
    </section>
  );
}
