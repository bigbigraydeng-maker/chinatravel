import Link from 'next/link';
import Image from 'next/image';
import HeroSearchEditorial from '@/components/HeroSearchEditorial';
import { Icon, type IconName } from '@/components/ui/Icon';
import { getTourBySlug, type Tour } from '@/lib/data/tours';

/**
 * Redesigned homepage — internal preview only (/preview-home, noindex).
 *
 * Implements the approved Stitch "Editorial" direction (asymmetric hero,
 * magazine-style curated journeys, editorial Why-CTS, dark CTA band) with the
 * brand design system, wired to REAL tour data / images / routes. The global
 * Navbar + Footer come from the root layout, so they are not re-rendered here.
 * The live homepage (src/app/page.tsx) is intentionally untouched.
 *
 * Additional sections (upcoming departures, specialist, testimonials,
 * destinations) are a follow-up pass, restyled to this same aesthetic.
 */

const HERO_IMAGE =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg';
const PHONE_DISPLAY = '0800 287 888';
const PHONE_HREF = 'tel:0800287888';

const ArrowRight = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface JourneyMeta {
  slug: string;
  tier: 'signature' | 'discovery';
  badge: string;
  ex: string;
}

const LARGE_JOURNEY: JourneyMeta = { slug: 'imperial-heritage', tier: 'signature', badge: 'Small Group', ex: 'Ex Auckland' };
const SIDE_JOURNEYS: JourneyMeta[] = [
  { slug: 'grand-tour', tier: 'signature', badge: 'Best Seller', ex: 'Ex Auckland' },
  { slug: 'silk-road', tier: 'signature', badge: 'Cultural Focus', ex: 'Ex NZ Wide' },
];

const FEATURES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'landmark', title: 'Specialists Since 1928', body: 'Nearly a century of on-the-ground expertise in Chinese culture, logistics and hospitality.' },
  { icon: 'pencil', title: 'Tailor-Made Design', body: 'Flexible itineraries customised down to the finest detail around your interests and pace.' },
  { icon: 'shield', title: 'Fully Protected', body: 'TAANZ-bonded and IATA-accredited, so your investment is secure from the first deposit.' },
  { icon: 'users', title: 'Local NZ Support', body: 'Talk directly with our Auckland-based team before, during and after your journey.' },
];

function tourHref(t: Tour) {
  return `/tours/${t.destination}/${t.tier}/${t.slug}`;
}

const HomePageRedesign = () => {
  const large = getTourBySlug('china', LARGE_JOURNEY.tier, LARGE_JOURNEY.slug);
  const sides = SIDE_JOURNEYS.map((j) => ({ meta: j, tour: getTourBySlug('china', j.tier, j.slug) }));

  return (
    <div className="bg-surface font-sans text-ink">
      {/* ===== Asymmetric hero ===== */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-12 lg:py-16">
          <div className="space-y-8 lg:col-span-5 lg:pr-6">
            <h1 className="font-serif text-5xl leading-[1.08] tracking-tight text-ink md:text-7xl">
              See all of China,
              <br />
              <span className="italic text-primary">the way it deserves.</span>
            </h1>
            <p className="max-w-md text-lg font-light leading-relaxed text-ink-muted">
              Curated, luxury journeys designed in New Zealand for discerning travellers — small groups and
              genuinely tailor-made.
            </p>
            <HeroSearchEditorial />
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
              <span>98 years heritage</span>
              <span className="text-ink/20">•</span>
              <span>10,000+ Kiwi travellers</span>
              <span className="text-ink/20">•</span>
              <span>TAANZ &amp; IATA accredited</span>
            </div>
          </div>

          <div className="relative h-[52vh] w-full overflow-hidden rounded-3xl shadow-2xl lg:col-span-7 lg:h-[78vh] lg:rounded-l-3xl">
            <Image
              src={HERO_IMAGE}
              alt="The Great Wall of China at dawn"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-right"
            />
          </div>
        </div>
      </section>

      {/* ===== Trust bar ===== */}
      <section className="border-y border-warm-100 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-8">
          <div className="flex items-center gap-3">
            {['TAANZ', 'IATA', 'TIA'].map((b) => (
              <span
                key={b}
                className="rounded-md border border-warm-200 bg-surface px-3 py-1.5 font-serif text-sm font-bold text-primary"
              >
                {b}
              </span>
            ))}
            <span className="ml-1 hidden text-sm text-ink-muted sm:inline">Bonded &amp; accredited</span>
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <span className="flex text-secondary">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Icon key={i} name="star" className="h-5 w-5" />
                ))}
              </span>
              <span className="text-sm font-medium text-ink-muted">4.8/5 from 400+ reviews</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-ink-muted">
              <Icon name="shield" className="h-5 w-5 text-emerald-600" />
              Your payment is 100% protected
            </div>
          </div>
        </div>
      </section>

      {/* ===== Curated journeys (magazine layout) ===== */}
      <section className="bg-surface py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                Signature Experiences
              </span>
              <h2 className="mb-4 font-serif text-4xl leading-tight text-ink md:text-5xl">Curated Journeys</h2>
              <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
                Our most sought-after itineraries — iconic landmarks balanced with hidden cultural treasures,
                fully escorted from New Zealand.
              </p>
            </div>
            <Link
              href="/tours"
              className="hidden items-center gap-2 border-b-2 border-ink pb-1 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-primary hover:text-primary md:inline-flex"
            >
              View all tours <ArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Large feature */}
            {large && (
              <article className="group relative flex h-[560px] flex-col overflow-hidden rounded-3xl shadow-editorial lg:col-span-8">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={large.heroImage}
                    alt={large.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                </div>
                <span className="absolute left-8 top-8 z-10 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink shadow-sm">
                  {LARGE_JOURNEY.badge}
                </span>
                <div className="relative z-10 mt-auto flex flex-col p-8 md:p-10">
                  <h3 className="mb-4 font-serif text-4xl text-white md:text-5xl">{large.name}</h3>
                  <div className="mb-8 flex items-center gap-6 text-sm text-white/80">
                    <span className="flex items-center gap-2"><Icon name="clock" className="h-5 w-5" /> {large.duration}</span>
                    <span className="flex items-center gap-2"><Icon name="plane" className="h-5 w-5" /> {LARGE_JOURNEY.ex}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/60">From</span>
                      <span className="font-serif text-3xl font-semibold text-white">
                        {large.price} <span className="font-sans text-sm font-normal text-white/60">pp</span>
                      </span>
                    </div>
                    <Link
                      href={tourHref(large)}
                      className="rounded-full bg-white px-8 py-4 text-sm font-bold text-ink shadow-lg transition-colors hover:bg-primary hover:text-white"
                    >
                      Discover More
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Side stack */}
            <div className="flex flex-col gap-8 lg:col-span-4">
              {sides.map(({ meta, tour }) =>
                tour ? (
                  <article
                    key={meta.slug}
                    className="group flex flex-1 flex-col overflow-hidden rounded-3xl bg-white shadow-editorial"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={tour.heroImage}
                        alt={tour.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink backdrop-blur-sm">
                        {meta.badge}
                      </span>
                    </div>
                    <div className="flex flex-grow flex-col justify-between p-6">
                      <div>
                        <h3 className="mb-2 font-serif text-xl text-ink">{tour.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-ink-muted">
                          <span>{tour.duration}</span> • <span>{meta.ex}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-serif text-lg font-semibold text-ink">
                          {tour.price} <span className="font-sans text-xs font-normal text-ink-muted">pp</span>
                        </span>
                        <Link
                          href={tourHref(tour)}
                          aria-label={`View ${tour.name}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white"
                        >
                          <ArrowRight />
                        </Link>
                      </div>
                    </div>
                  </article>
                ) : null
              )}
            </div>
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:text-primary"
            >
              View all tours <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Why CTS (editorial) ===== */}
      <section className="bg-white py-24 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
            <div className="space-y-6 lg:w-1/3">
              <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                The CTS Difference
              </span>
              <h2 className="font-serif text-5xl leading-tight text-ink">
                Expertise you
                <br />
                can trust.
              </h2>
              <p className="pt-4 text-lg leading-relaxed text-ink-muted">
                For nearly a century we have crafted exceptional travel experiences, bridging New Zealand and the
                wonders of China.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-12 gap-y-14 md:grid-cols-2 lg:w-2/3">
              {FEATURES.map((f) => (
                <div key={f.title}>
                  <div className="mb-6 flex h-12 w-12 items-end border-b-2 border-primary pb-3 text-primary">
                    <Icon name={f.icon} className="h-8 w-8" />
                  </div>
                  <h4 className="mb-4 font-serif text-2xl text-ink">{f.title}</h4>
                  <p className="text-base leading-relaxed text-ink-muted">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-8">
          <h2 className="mb-8 font-serif text-4xl text-white md:text-6xl">Let&apos;s design your China, together.</h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl font-light leading-relaxed text-white/70">
            Speak with one of our New Zealand-based China specialists today to start planning your perfect
            itinerary.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/tailor-made"
              className="w-full rounded-full bg-primary px-10 py-5 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-colors hover:bg-white hover:text-ink sm:w-auto"
            >
              Enquire Now
            </Link>
            <a
              href={PHONE_HREF}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-white/20 px-10 py-5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/5 sm:w-auto"
            >
              <Icon name="phone" className="h-5 w-5" /> Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageRedesign;
