import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { getTourBySlug } from '@/lib/data/tours';
import { HOME_STOPOVER_TOURS, type HomeStopoverRef } from '@/lib/data/home-stopovers';

/**
 * "China Stopovers" — homepage cards for the stopover-tier tours, real data
 * from tours.ts (name, price, duration). Figma-exact card photos, kept
 * separate from tour.heroImage (which also renders on the tour's own detail
 * page and must stay that tour's real photo, not the homepage mockup's
 * stand-in).
 */
const STOPOVER_IMAGE_OVERRIDE: Record<string, string> = {
  beijing: '/images/figma-exact/stopover-beijing.png',
  shanghai: '/images/figma-exact/stopover-shanghai.png',
  'shanghai-suzhou': '/images/figma-exact/stopover-shanghai-suzhou.png',
};

export default function ChinaStopovers() {
  const stopovers = HOME_STOPOVER_TOURS
    .map((ref) => ({ ref, tour: getTourBySlug('china', 'stopover', ref.slug) }))
    .filter((x): x is { ref: HomeStopoverRef; tour: NonNullable<ReturnType<typeof getTourBySlug>> } => Boolean(x.tour));

  if (stopovers.length === 0) return null;

  const card = ({ ref, tour }: (typeof stopovers)[number]) => {
    const href = `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
    const fromPrice = tour.price.replace(/^From\s+/i, 'FROM ');
    return (
      <Link
        href={href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-editorial transition-shadow hover:shadow-lg"
      >
        <div className="relative h-64 flex-none overflow-hidden">
          <Image
            src={STOPOVER_IMAGE_OVERRIDE[ref.slug] ?? tour.heroImage}
            alt={tour.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-primary shadow">
            <Icon name="clock" className="h-4 w-4" /> {tour.duration}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 px-7 py-4">
          <p className="text-xs font-bold uppercase tracking-wider text-secondary">China Stopover</p>
          <h3 className="font-serif text-3xl text-ink">
            {tour.name.replace(/^China Stopover — /, '').replace(/\s*\(\d+ Days?\)$/, '')}
          </h3>
          <p className="text-ink-muted">{ref.highlights}</p>
          <p className="text-lg font-medium text-ink">
            {tour.duration} &bull; {fromPrice}
          </p>
        </div>
      </Link>
    );
  };

  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">China Stopovers</span>
          <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">More China, in a few days.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
            Turn your time between flights into an unforgettable experience. Our Stopover journeys let you explore
            iconic cities, incredible food and local culture — even if you only have a few days.
          </p>
        </div>

        {/* Mobile: one card at a time with pagination dots, per the Figma comp. Desktop keeps the 3-up grid. */}
        <div className="md:hidden">
          <div className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4">
            {stopovers.map((s) => (
              <div key={s.ref.slug} id={`stopover-slide-${s.ref.slug}`} className="w-full flex-none snap-center pr-4">
                {card(s)}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            {stopovers.map((s) => (
              <a
                key={s.ref.slug}
                href={`#stopover-slide-${s.ref.slug}`}
                aria-label={`Go to ${s.tour.name}`}
                className="h-2 w-2 rounded-full bg-warm-200"
              />
            ))}
          </div>
        </div>
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {stopovers.map((s) => (
            <div key={s.ref.slug}>{card(s)}</div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/tours/china/stopover"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-red-700"
          >
            View all stopovers <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

const ArrowRight = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
