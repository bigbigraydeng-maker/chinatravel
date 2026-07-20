import Link from 'next/link';
import Image from 'next/image';
import HeroSearchEditorial from '@/components/HeroSearchEditorial';
import ContactChannels, { CTS_PHONE_DISPLAY, CTS_PHONE_HREF } from '@/components/ContactChannels';
import { Icon, type IconName } from '@/components/ui/Icon';
import { getTourBySlug } from '@/lib/data/tours';
import { HOME_SPOTLIGHT_TOURS } from '@/lib/data/home-spotlight';
import { getAllBlogPosts } from '@/lib/data/blogs';
import UpcomingDepartures from '@/components/UpcomingDepartures';
import { homeTestimonials } from '@/lib/data/home-testimonials';
import { migratedSite } from '@/lib/site-media';

/**
 * Editorial homepage body — now LIVE at `/` (rendered by src/app/page.tsx,
 * which supplies SEO metadata + JSON-LD). Also still served at /preview-home.
 *
 * Editorial direction (approved via Stitch), wired to real data. Decisions:
 *  1. Enquiry-led — WhatsApp / Email / Phone, no online booking.
 *  2. Primary push = the Spotlight tours (HOME_SPOTLIGHT_TOURS), which
 *     marketing updates periodically; the "Curated Journeys" block reads
 *     straight from that config.
 *  3. "No forced shopping stops" is a confirmed, truthful trust signal.
 * Global Navbar + Footer come from the root layout. Live homepage untouched.
 */

const HERO_IMAGE =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg';
const BAKER_IMAGE = '/images/baker-gu-portrait.jpg';
const CTA_IMAGE =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/zhangjiajie.jpg';

const ArrowRight = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FEATURES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'landmark', title: 'Specialists Since 1928', body: 'Nearly a century of on-the-ground expertise in Chinese culture, logistics and hospitality.' },
  { icon: 'pencil', title: 'Tailor-Made Design', body: 'Flexible itineraries customised down to the finest detail around your interests and pace.' },
  { icon: 'shield', title: 'Fully Protected', body: 'TAANZ-bonded and IATA-accredited, so your investment is secure from the first deposit.' },
  { icon: 'users', title: 'Local NZ Support', body: 'Talk directly with our Auckland-based team before, during and after your journey.' },
];

const CITIES = [
  { name: 'Beijing', slug: 'beijing', tag: 'Great Wall · Forbidden City', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg' },
  { name: "Xi'an", slug: 'xian', tag: 'Terracotta Warriors', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/xian-terracotta.jpg' },
  { name: 'Shanghai', slug: 'shanghai', tag: 'The Bund · Water towns', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/shanghai-skyline.jpg' },
  { name: 'Chengdu', slug: 'chengdu', tag: 'Giant pandas · Sichuan food', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/chengdu-pandas.jpg' },
  { name: 'Chongqing', slug: 'chongqing', tag: 'Hotpot · Yangtze gorges', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/migrated/unsplash/photo-1581252584837-95f73fd23574.jpg' },
  { name: 'Zhangjiajie', slug: 'zhangjiajie', tag: "Avatar's floating mountains", img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/zhangjiajie.jpg' },
];

const CREDENTIALS: { src: string; alt: string; wide?: boolean }[] = [
  { src: migratedSite('credentials-taanz.png'), alt: 'TAANZ — Travel Agents Association of New Zealand' },
  { src: migratedSite('credentials-iata.png'), alt: 'IATA accredited agent' },
  { src: migratedSite('credentials-qualmark.png'), alt: 'Qualmark recognised' },
  { src: migratedSite('credentials-tourism-export-council.png'), alt: 'Tourism Export Council New Zealand', wide: true },
];

const HomePageRedesign = () => {
  const spotlight = HOME_SPOTLIGHT_TOURS
    .map((ref) => ({ ref, tour: getTourBySlug(ref.destination, ref.tier, ref.slug) }))
    .filter((x): x is { ref: (typeof HOME_SPOTLIGHT_TOURS)[number]; tour: NonNullable<ReturnType<typeof getTourBySlug>> } => Boolean(x.tour));
  const featured = spotlight[0];
  const sides = spotlight.slice(1, 3);
  const blogPosts = getAllBlogPosts().slice(0, 3);
  const reviews = homeTestimonials;

  return (
    <div className="bg-surface font-sans text-ink">
      {/* ===== Asymmetric hero ===== */}
      <section className="relative overflow-hidden bg-surface">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 md:px-8 lg:grid-cols-12 lg:py-16">
          <div className="space-y-7 lg:col-span-5 lg:pr-6">
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
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
              <Link href="/tours" className="inline-flex items-center gap-1.5 text-ink hover:text-primary">
                Browse all tours <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <span className="text-ink/20">·</span>
              <Link href="/tailor-made" className="inline-flex items-center gap-1.5 text-primary hover:text-red-700">
                Design a tailor-made trip <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs font-bold uppercase tracking-wider text-ink-muted">
              <span>98 years heritage</span>
              <span className="text-ink/20">•</span>
              <span>10,000+ Kiwi travellers</span>
              <span className="text-ink/20">•</span>
              <span>TAANZ &amp; IATA accredited</span>
            </div>
          </div>

          <div className="relative h-[44vh] w-full overflow-hidden rounded-3xl shadow-2xl lg:col-span-7 lg:h-[62vh] lg:rounded-l-3xl">
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

      {/* ===== Trust bar — real accreditation logos + who ===== */}
      <section className="border-y border-warm-200 bg-white py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 md:flex-row md:justify-between md:px-8">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg font-bold text-ink md:text-xl">Trusted by 10,000+ Kiwi travellers</p>
            <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm text-ink-muted md:justify-start">
              <span>Licensed NZ specialists since 1928</span>
              <span className="text-ink/20">·</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <Icon name="check-circle" className="h-4 w-4" /> No forced shopping stops
              </span>
              <span className="text-ink/20">·</span>
              <span className="inline-flex items-center gap-1">
                <Icon name="shield" className="h-4 w-4 text-primary" /> Payment protected
              </span>
            </p>
          </div>
          <div className="flex flex-none items-center gap-5 opacity-90 md:gap-7">
            {CREDENTIALS.map((l) => (
              <Image
                key={l.src}
                src={l.src}
                alt={l.alt}
                width={l.wide ? 150 : 84}
                height={44}
                className="h-9 w-auto object-contain md:h-11"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Curated journeys — driven by Spotlight config ===== */}
      {featured && (
        <section className="bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                  This Season&apos;s Spotlight
                </span>
                <h2 className="mb-4 font-serif text-4xl leading-tight text-ink md:text-5xl">Curated Journeys</h2>
                <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
                  The journeys our specialists are recommending right now — fully escorted from New Zealand, with
                  guaranteed departures.
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
              <article className="group relative flex h-[430px] flex-col overflow-hidden rounded-3xl shadow-editorial lg:col-span-8">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={featured.tour.heroImage}
                    alt={featured.tour.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                </div>
                <span className="absolute left-8 top-8 z-10 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink shadow-sm">
                  {featured.ref.departureLabel}
                </span>
                <div className="relative z-10 mt-auto flex flex-col p-8 md:p-10">
                  <p className="mb-2 text-sm font-medium text-white/80">{featured.ref.route.join('  ›  ')}</p>
                  <h3 className="mb-4 font-serif text-4xl text-white md:text-5xl">{featured.tour.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/60">From</span>
                      <span className="font-serif text-3xl font-semibold text-white">
                        {featured.tour.price} <span className="font-sans text-sm font-normal text-white/60">pp</span>
                      </span>
                    </div>
                    <Link
                      href={featured.ref.campaignHref}
                      className="rounded-full bg-white px-8 py-4 text-sm font-bold text-ink shadow-lg transition-colors hover:bg-primary hover:text-white"
                    >
                      Discover More
                    </Link>
                  </div>
                </div>
              </article>

              {/* Side stack */}
              <div className="flex flex-col gap-8 lg:col-span-4">
                {sides.map(({ ref, tour }) => (
                  <article key={ref.slug} className="group flex flex-1 flex-col overflow-hidden rounded-3xl bg-white shadow-editorial">
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={tour.heroImage}
                        alt={tour.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink backdrop-blur-sm">
                        {ref.departureLabel}
                      </span>
                    </div>
                    <div className="flex flex-grow flex-col justify-between p-6">
                      <div>
                        <h3 className="mb-1 font-serif text-xl text-ink">{tour.name}</h3>
                        <p className="text-xs text-ink-muted">{ref.route.join(' · ')}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-serif text-lg font-semibold text-ink">
                          {tour.price} <span className="font-sans text-xs font-normal text-ink-muted">pp</span>
                        </span>
                        <Link
                          href={ref.campaignHref}
                          aria-label={`View ${tour.name}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white"
                        >
                          <ArrowRight />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== Upcoming departures (derived from tours.ts) ===== */}
      <UpcomingDepartures />

      {/* ===== Popular cities ===== */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">Where to go</span>
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">Explore China by city</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}-tours`}
                className="group relative block h-56 overflow-hidden rounded-2xl md:h-64"
              >
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-serif text-2xl text-white transition-colors group-hover:text-secondary">{c.name}</h3>
                  <p className="text-xs text-white/80">{c.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Meet your specialist (Baker Gu) ===== */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 md:px-8 lg:grid-cols-12 lg:gap-16">
          <Link
            href="/experts/baker-gu"
            className="group relative mx-auto block h-[380px] w-full max-w-sm overflow-hidden rounded-3xl shadow-editorial lg:col-span-5"
          >
            <Image
              src={BAKER_IMAGE}
              alt="Baker Gu, CTS China specialist"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-6">
              <p className="font-serif text-xl font-bold text-white">Baker Gu</p>
              <p className="text-sm text-white/80">Founder &amp; Lead China Specialist</p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
                Read his story <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
          <div className="lg:col-span-7">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">Meet your specialist</span>
            <blockquote className="mb-6 font-serif text-2xl italic leading-snug text-ink md:text-3xl">
              &ldquo;For 20 years I&apos;ve shown Kiwi travellers the China I grew up in — not the one in the brochures.&rdquo;
            </blockquote>
            <p className="mb-4 max-w-xl leading-relaxed text-ink-muted">
              Baker personally designs and quality-checks every CTS journey. When you enquire, you&apos;re not talking to
              a call centre — you&apos;re talking to the person who built the trip.
            </p>
            <div className="mb-8 flex flex-wrap gap-2">
              {['Born in China', 'NZ-based', '20+ years in travel', 'Mandarin · English · Cantonese'].map((c) => (
                <span key={c} className="rounded-full border border-warm-200 bg-surface px-3 py-1.5 text-xs font-semibold text-primary">{c}</span>
              ))}
            </div>
            <Link href="/experts/baker-gu" className="mb-8 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
              Read Baker&apos;s full story <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <p className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">Speak to Baker &mdash; no obligation</p>
            <ContactChannels tone="light" />
          </div>
        </div>
      </section>

      {/* ===== Why CTS ===== */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
            <div className="space-y-6 lg:w-1/3">
              <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-primary">The CTS Difference</span>
              <h2 className="font-serif text-4xl leading-tight text-ink">
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

      {/* ===== Testimonials wall (real reviews) ===== */}
      {reviews.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 max-w-2xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">What travellers say</span>
              <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">Loved by Kiwi travellers</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Real words from CTS travellers — every itinerary personally designed by our specialists.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((t) => (
                <figure key={t.id} className="flex flex-col rounded-2xl border border-warm-100 bg-surface p-6 shadow-editorial">
                  <div className="mb-4 flex text-secondary">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Icon key={i} name="star" className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mb-6 flex-1 text-sm leading-relaxed text-ink line-clamp-4">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <figcaption className="flex items-center gap-3 border-t border-warm-100 pt-4">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-bold text-primary">
                      {t.avatarInitials}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-ink">{t.name}</span>
                      <span className="block truncate text-xs text-ink-muted">{t.location} · {t.tour}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== From the blog ===== */}
      {blogPosts.length > 0 && (
        <section className="bg-surface py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">Stories &amp; guides</span>
                <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">From the blog</h2>
              </div>
              <Link
                href="/blog"
                className="hidden items-center gap-2 border-b-2 border-ink pb-1 text-sm font-bold uppercase tracking-wider text-ink transition-colors hover:border-primary hover:text-primary md:inline-flex"
              >
                All articles <ArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {blogPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-editorial">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={p.heroImage}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">{p.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-2 text-xs text-ink-muted">{p.readTime}</p>
                    <h3 className="mb-2 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-primary">{p.title}</h3>
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">{p.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">Read more <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== Design your China (enquiry CTA card) ===== */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid grid-cols-1 overflow-hidden rounded-3xl shadow-editorial lg:grid-cols-2">
            {/* Left — heritage-red panel */}
            <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#8E121F] via-primary to-[#A3172A] p-10 text-white md:p-14">
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(214,167,86,0.38), transparent 65%)' }}
                aria-hidden
              />
              <div className="relative">
                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.14em] text-secondary">
                  Prefer to travel your way?
                </span>
                <h2 className="mb-5 font-serif text-4xl leading-tight text-white md:text-5xl">
                  Let&apos;s design your China, together.
                </h2>
                <p className="mb-8 max-w-md text-lg font-light leading-relaxed text-white/85">
                  Tell a New Zealand-based China specialist what you dream of seeing. No obligation — a reply within one
                  working day.
                </p>
                <Link
                  href="/tailor-made"
                  className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-lg transition-colors hover:bg-secondary hover:text-ink"
                >
                  Start your tailor-made trip <ArrowRight />
                </Link>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">Or reach us directly</p>
                <ContactChannels tone="dark" />
                <p className="mt-5 text-sm text-white/70">
                  Prefer to talk now? Call{' '}
                  <a href={CTS_PHONE_HREF} className="font-semibold text-white underline-offset-4 hover:underline">
                    {CTS_PHONE_DISPLAY}
                  </a>
                </p>
              </div>
            </div>
            {/* Right — cinematic photo */}
            <div className="relative min-h-[300px] lg:min-h-full">
              <Image
                src={CTA_IMAGE}
                alt="Dramatic mountain landscape in China"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageRedesign;
