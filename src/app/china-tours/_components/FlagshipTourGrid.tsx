import Image from 'next/image';
import { getAllChinaTours, type Tour } from '@/lib/data/tours';

/**
 * 4 flagship tours surfaced on /china-tours. URLs are PM-confirmed and
 * hardcoded — Shanghai & Surroundings points to the October 2026 campaign
 * landing, not the canonical tour detail page.
 */
const FLAGSHIP_TOURS: Array<{
  slug: string;
  ribbon: string;
  href: string;
}> = [
  {
    slug: 'beijing-xian',
    ribbon: 'Beijing + Xi’an',
    href: '/tours/china/discovery/beijing-xian',
  },
  {
    slug: 'essentials',
    ribbon: 'Most popular',
    href: '/tours/china/discovery/essentials',
  },
  {
    slug: 'shanghai-surroundings',
    ribbon: 'October 2026',
    href: '/campaigns/october-2026/shanghai-surroundings',
  },
  {
    slug: 'silk-road',
    ribbon: 'Signature · 18 days',
    href: '/tours/china/signature/silk-road',
  },
];

/**
 * Strip the "From " prefix and " per person" suffix so prices render with
 * consistent visual weight across cards. Stays a no-op for clean strings.
 *   "From NZD $3,480"           → "NZD $3,480"
 *   "NZD $3,399 per person"     → "NZD $3,399"
 *   "From NZD $3,880 per person"→ "NZD $3,880"
 */
function formatPrice(raw: string | undefined): string | null {
  if (!raw) return null;
  return raw.replace(/^From\s+/i, '').replace(/\s+per person$/i, '').trim();
}

/**
 * Parse the first scheduled departure into a compact "Mon YYYY" chip.
 *   "13 October 2026" → "Oct 2026"
 *   "3 November 2026" → "Nov 2026"
 * Returns null when no departure is scheduled so the chip simply hides.
 */
function nextDepartureChip(t?: Tour): string | null {
  const first = t?.departureDates?.[0];
  if (!first) return null;
  const m = first.match(/([A-Za-z]+)\s+(\d{4})/);
  if (!m) return null;
  return `${m[1].slice(0, 3)} ${m[2]}`;
}

export default function FlagshipTourGrid() {
  const toursBySlug = new Map<string, Tour>(
    getAllChinaTours().map((t) => [t.slug, t])
  );

  // Never silently drop a card — Meta/Google ads land here and a missing
  // flagship turns the LP into a half-empty grid. Log loudly so a renamed slug
  // in tours.ts surfaces in Render logs immediately, and fall back to a stub
  // card so the href (which always points at a real route) still works.
  const cards = FLAGSHIP_TOURS.map((entry) => {
    const tour = toursBySlug.get(entry.slug);
    if (!tour) {
      console.error(
        `[FlagshipTourGrid] tours.ts is missing slug="${entry.slug}" — flagship card falling back to stub. Restore the slug or update FLAGSHIP_TOURS.`
      );
    }
    return { ...entry, tour };
  });

  return (
    <section className="bg-warm-50 border-y border-warm-100">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="max-w-3xl mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            Flagship China itineraries
          </h2>
          <p className="text-lg text-gray-700">
            Four of our most-booked routes from New Zealand — pick a starting point and our
            specialists will tailor dates, hotels, and add-ons around you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ slug, href, ribbon, tour }) => (
            <a
              key={slug}
              href={href}
              className="group bg-white rounded-2xl overflow-hidden border border-warm-100 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-warm-100">
                {tour ? (
                  <Image
                    src={tour.heroImage}
                    alt={tour.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-warm-400 text-sm">
                    Image coming soon
                  </div>
                )}
                <span className="absolute top-3 left-3 inline-flex items-center bg-primary text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                  {ribbon}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs uppercase tracking-wide text-amber-700 font-semibold mb-1">
                  {tour
                    ? `${tour.duration} · ${tour.tier === 'signature' ? 'Signature' : 'Discovery'}`
                    : 'China itinerary'}
                </p>
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-2 leading-snug">
                  {tour?.name ?? ribbon}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {tour?.shortDescription ?? 'Talk to our specialists for the latest dates and pricing.'}
                </p>
                {/* Price block — explicit "From" label + large price + next-
                    departure chip. Pricing transparency lifts hub-page CTR
                    materially vs the previous one-line "$3,480" plus arrow. */}
                <div className="mt-auto pt-3 border-t border-warm-100">
                  <div className="flex items-baseline justify-between gap-2 mb-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                      From
                    </span>
                    {nextDepartureChip(tour) && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-100 rounded-full px-2 py-0.5">
                        Next · {nextDepartureChip(tour)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-2xl font-bold text-gray-900 leading-none">
                      {formatPrice(tour?.price) ?? 'Talk to us'}
                    </span>
                    <span className="text-sm font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                      View tour →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
