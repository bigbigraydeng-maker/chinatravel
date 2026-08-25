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
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="max-w-3xl mb-8">
          <p className="text-xs uppercase tracking-wider text-primary font-bold mb-2">
            Departing from the South Island
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            Fly direct from Christchurch
          </h2>
          <p className="text-lg text-gray-700">
            No need to connect through Auckland. This festive departure leaves
            direct from Christchurch, so South Island travellers start the trip
            at their own airport.
          </p>
        </div>

        <a
          href={href}
          className="group grid md:grid-cols-2 bg-warm-50 rounded-2xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-lg transition-shadow"
        >
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px] overflow-hidden bg-warm-100">
            <Image
              src={tour.heroImage}
              alt={tour.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
            <span className="absolute top-3 left-3 inline-flex items-center bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
              Christchurch direct
            </span>
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-2">
              {tour.duration} · Discovery
              {firstDeparture ? ` · Departs ${firstDeparture}` : ''}
            </p>
            <h3 className="font-serif font-bold text-2xl text-gray-900 mb-3 leading-snug">
              {tour.name}
            </h3>
            <p className="text-gray-600 mb-6">{tour.shortDescription}</p>
            <div className="mt-auto pt-4 border-t border-warm-200 flex items-end justify-between gap-3">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-1">
                  From
                </span>
                <span className="text-3xl font-bold text-gray-900 leading-none">
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
