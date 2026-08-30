import Link from 'next/link';
import { getAllActiveTours, type Tour } from '@/lib/data/tours';
import { parsePrice } from '@/lib/ui/price';

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
  /**
   * True when `price` came from `departurePricing[dateStr]` — a quote for this
   * exact departure — rather than falling back to the tour's headline price.
   * The distinction drives whether the card says "From": labelling an exact
   * departure quote as a starting price understates what CTS has committed to,
   * and showing a headline price bare next to a fixed date overstates it.
   */
  exactForDate: boolean;
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
      const exact = tour.departurePricing?.[dateStr];
      rows.push({ tour, dateStr, date, price: exact ?? tour.price, exactForDate: Boolean(exact) });
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

        {/*
          Was a five-column <table> with a hard minWidth:640px, wrapped in
          overflow-x-auto. On the homepage it read as a spreadsheet, and on a
          phone it forced a sideways drag to see the price or the link.

          Now a scroll-snap rail of date cards: the day is the largest thing on
          each card, which is what someone scanning departures is actually
          looking for. Same six fields, same order, same links — the data is
          derived above and untouched. Plain CSS scroll-snap, no carousel
          dependency.
        */}
        {/*
          scroll-pl matches the container gutter. A snapport is the padding box
          and is not reduced by padding on its own, so without this the rail
          snapped to scrollLeft 16 (mobile) / 32 (desktop) on load and card one
          sat flush against the viewport edge, 32px left of this section's own
          h2 — it read as broken rather than deliberate.

          The scrollbar is deliberately NOT hidden. Six cards do not fit at any
          desktop width (1822px of content in a 1280px viewport), and on
          Windows and Linux the scrollbar is the only pointer affordance there
          is — no arrows, no dots, no edge fade. Hiding it left mouse users with
          a rail they could not tell was scrollable.

          pt-1 keeps the focus ring off the top edge: overflow-x:auto promotes
          overflow-y to auto, which clipped the ring by ~4px.
        */}
        <div className="-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 pb-3 pt-1 md:-mx-8 md:scroll-pl-8 md:px-8">
          {upcoming.map(({ tour, date, price, exactForDate }, i) => {
            const href = `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
            const parsed = parsePrice(price);
            return (
              <Link
                key={`${tour.slug}-${i}`}
                href={href}
                className="group flex shrink-0 snap-start basis-[78%] flex-col rounded-2xl border border-warm-200 bg-white p-6 transition-colors hover:border-primary/50 sm:basis-[44%] lg:basis-[30%] xl:basis-[23%]"
              >
                <span
                  className="font-serif text-5xl leading-none text-ink"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {date.getDate()}
                </span>
                <span className="mt-1 text-sm font-semibold uppercase tracking-wider text-ink-muted">
                  {SHORT_MONTHS[date.getMonth()]} {date.getFullYear()}
                </span>

                <p className="mt-6 flex-1 font-semibold leading-snug text-ink transition-colors group-hover:text-primary">
                  {tour.name}
                </p>
                <p className="mt-1 text-xs capitalize text-ink-muted">
                  {tour.tier} · {tour.duration}
                </p>

                {/* items-end + shrink-0, because prices are free text from
                    tours.ts and some read "NZD $3,899 per person" — long enough
                    to wrap. With justify-between alone the wrap squeezed the
                    View link onto two lines and the card feet stopped lining up.

                    The table this replaced carried a "From" column header. The
                    first pass at the card dropped it, which left four of the six
                    live cards showing a bare amount directly under a specific
                    date — reading as a fixed total for that departure. "From"
                    comes back, but only where it is true: a departurePricing
                    entry IS the quote for that date and must not be hedged.
                    "pp" is shown only when the source string said so; the
                    catalogue has bare prices and inventing the qualifier is not
                    ours to do. */}
                <div className="mt-5 flex items-end justify-between gap-3 border-t border-warm-100 pt-4">
                  <span className="min-w-0 flex-1 leading-tight">
                    {!exactForDate && (
                      <span className="mr-1.5 text-xs font-bold uppercase tracking-wider text-ink-muted">From</span>
                    )}
                    <span className="font-serif text-lg font-bold text-ink">{parsed.amount}</span>
                    {parsed.perPerson && (
                      <span className="ml-1 text-xs text-ink-muted">pp</span>
                    )}
                  </span>
                  <span className="shrink-0 whitespace-nowrap text-xs font-bold uppercase tracking-wider text-primary">View →</span>
                </div>
              </Link>
            );
          })}
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
