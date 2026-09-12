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

// Figma-exact photo — homepage-only override, kept separate from tour.heroImage
// (which also renders on the tour's own detail page and must stay that tour's
// real photo, not the homepage mockup's stand-in).
const FIGMA_IMAGE_OVERRIDE = '/images/figma-exact/christchurch-departure.png';

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
    <section className="bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        {/* Side-by-side per the Figma comp: full-height photo left, copy +
            offer card right — not a stacked editorial layout. */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <a href={href} className="group relative block aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-editorial lg:aspect-auto lg:h-[620px]">
            <Image
              src={FIGMA_IMAGE_OVERRIDE}
              alt={tour.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </a>

          <div>
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Departing from the South Island
            </span>
            <h2 className="mb-5 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Fly direct from Christchurch
            </h2>
            <p className="mb-8 max-w-xl text-lg leading-relaxed text-ink-muted">
              No need to connect through Auckland. This festive departure leaves
              direct from Christchurch, so South Island travellers start the trip
              at their own airport.
            </p>

            <a href={href} className="group block max-w-xl rounded-2xl border border-warm-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg md:p-8">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">
                {tour.duration} · Discovery
                {firstDeparture ? ` · Departs ${firstDeparture}` : ''}
              </p>
              <h3 className="mb-3 font-serif text-2xl font-bold leading-snug text-ink">
                {tour.name}
              </h3>
              <p className="mb-6 text-ink-muted">{tour.shortDescription}</p>
              <div className="flex items-end justify-between gap-3 border-t border-warm-200 pt-6">
                <div>
                  <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                    From
                  </span>
                  <span className="text-3xl font-bold leading-none text-ink">
                    {formatPrice(tour.price) ?? 'Talk to us'}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-lg transition-colors group-hover:bg-red-700">
                  View tour →
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
