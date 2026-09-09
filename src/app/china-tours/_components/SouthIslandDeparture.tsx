import Image from 'next/image';
import { getAllChinaTours } from '@/lib/data/tours';

/**
 * South Island departure — surfaced on its own, not inside the flagship grid.
 *
 * Every other tour on this hub departs Auckland (the only NZ airport with
 * direct flights to mainland China), so a Christchurch-departing itinerary is
 * a genuinely different offer, not just another card. Mixed into the flagship
 * grid it reads as "one more Christmas tour" and South Island travellers miss
 * that they can fly direct from home. Given its own band with explicit
 * "departs Christchurch" framing, the distinction is the first thing they see.
 *
 * Same data source as every other card (tours.ts) — price, duration and
 * description stay in sync automatically.
 */
const SOUTH_ISLAND_SLUG = 'china-icons-collection-christchurch';

function formatPrice(raw: string | undefined): string | null {
  if (!raw) return null;
  return raw.replace(/^From\s+/i, '').replace(/\s+per person$/i, '').trim();
}

export default function SouthIslandDeparture() {
  const tour = getAllChinaTours().find((t) => t.slug === SOUTH_ISLAND_SLUG);

  // Same fail-loud contract as FlagshipTourGrid: a renamed slug should show up
  // in Render logs rather than silently deleting a section from the hub.
  if (!tour) {
    console.error(
      `[SouthIslandDeparture] tours.ts is missing slug="${SOUTH_ISLAND_SLUG}" — South Island section not rendered.`
    );
    return null;
  }

  const href = `/tours/china/${tour.tier}/${tour.slug}`;
  const firstDeparture = tour.departureDates?.[0];

  return (
    <section className="bg-white border-b border-warm-100">
      <div className="container mx-auto px-4 py-14 md:py-20">
        {/* Editorial layout: full-width photo first, then heading block, then a
            standalone quote card — mirrors the "Curated Journeys" spread above
            rather than the boxed image+text card this section used to be. */}
        <a href={href} className="group block">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl shadow-editorial md:aspect-[21/8]">
            <Image
              src={tour.heroImage}
              alt={tour.name}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute top-4 left-4 md:top-6 md:left-6 inline-flex items-center bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
              Christchurch direct
            </span>
          </div>

          <div className="max-w-3xl mt-10 md:mt-12">
            <p className="text-xs uppercase tracking-wider text-secondary font-bold mb-3">
              Departing from the South Island
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-ink mb-4">
              Fly direct from Christchurch
            </h2>
            <p className="text-lg leading-relaxed text-ink-muted">
              No need to connect through Auckland. This festive departure leaves
              direct from Christchurch, so South Island travellers start the trip
              at their own airport.
            </p>
          </div>

          <div className="max-w-xl mt-10 rounded-2xl border border-warm-200 bg-surface p-6 md:p-8 shadow-sm transition-shadow group-hover:shadow-lg">
            <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-2">
              {tour.duration} · Discovery
              {firstDeparture ? ` · Departs ${firstDeparture}` : ''}
            </p>
            <h3 className="font-serif font-bold text-2xl text-ink mb-3 leading-snug">
              {tour.name}
            </h3>
            <p className="text-ink-muted mb-6">{tour.shortDescription}</p>
            <div className="pt-6 border-t border-warm-200 flex items-end justify-between gap-3">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-ink-muted font-semibold mb-1">
                  From
                </span>
                <span className="text-3xl font-bold text-ink leading-none">
                  {formatPrice(tour.price) ?? 'Talk to us'}
                </span>
              </div>
              <span className="text-sm font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                View tour →
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
