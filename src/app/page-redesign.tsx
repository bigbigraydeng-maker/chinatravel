import Link from 'next/link';
import Image from 'next/image';
import ContactChannels from '@/components/ContactChannels';
import { Icon, type IconName } from '@/components/ui/Icon';
import { getTourBySlug } from '@/lib/data/tours';
import { HOME_SPOTLIGHT_TOURS } from '@/lib/data/home-spotlight';
import { getAllBlogPosts } from '@/lib/data/blogs';
import UpcomingDepartures from '@/components/UpcomingDepartures';
import SouthIslandDeparture from '@/app/china-tours/_components/SouthIslandDeparture';
import ChinaStopovers from '@/components/ChinaStopovers';
import { homeTestimonials } from '@/lib/data/home-testimonials';
import { GOOGLE_RATING } from '@/lib/data/google-rating';
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

const HERO_IMAGE = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/hero-river-sunset.webp';
const BAKER_IMAGE = '/images/baker-gu-portrait.jpg';
const CTA_IMAGE = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/cta-banner.webp';
const DIFFERENCE_IMAGE = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/temple-difference.webp';

const ArrowRight = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FEATURES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'landmark', title: 'Backed by CTS · Founded 1928', body: "Backed by CTS — China's travel brand since 1928 — with 25 years of Kiwi-led NZ operations in Chinese culture, logistics and hospitality." },
  { icon: 'pencil', title: 'Tailor-Made Design', body: 'Flexible itineraries customised down to the finest detail around your interests and pace.' },
  { icon: 'shield', title: 'Fully Protected', body: 'TAANZ-bonded and IATA-accredited, so your investment is secure from the first deposit.' },
  { icon: 'users', title: 'Local NZ Support', body: 'Talk directly with our Auckland-based team before, during and after your journey.' },
];

const CITIES = [
  { name: 'Beijing', slug: 'beijing', tag: 'A timeless blend of history and culture', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/city-beijing.webp' },
  { name: "Xi'an", slug: 'xian', tag: 'Step into a legendary past', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/city-xian.webp' },
  { name: 'Shanghai', slug: 'shanghai', tag: 'Where tradition meets modernity', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/city-shanghai.webp' },
  { name: 'Chengdu', slug: 'chengdu', tag: 'Home to pandas and a laid-back lifestyle', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/city-chengdu.webp' },
  { name: 'Chongqing', slug: 'chongqing', tag: 'A city of mountains, rivers and dazzling views', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/city-chongqing.webp' },
  { name: 'Zhangjiajie', slug: 'zhangjiajie', tag: 'Otherworldly landscapes await', img: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/city-zhangjiajie.webp' },
];

// Figma-exact card photos for the Spotlight tours — homepage-only override, kept
// separate from tour.heroImage (which also renders on the tour's own detail page
// and must stay the tour's real photo, not the homepage mockup's stand-in).
const SPOTLIGHT_IMAGE_OVERRIDE: Record<string, string> = {
  'golden-china': 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/spotlight-card1.webp',
  'china-icons-collection': 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/spotlight-card2.webp',
  essentials: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/spotlight-card3.webp',
};

// Figma-exact card photos for the blog posts currently in the "latest 3" slot —
// homepage-only, kept separate from post.heroImage (which also renders on the
// blog list and post detail pages). As the list rotates with new posts, a post
// without an entry here just falls back to its own post.heroImage.
const BLOG_IMAGE_OVERRIDE: Record<string, string> = {
  'how-many-days-in-chongqing': 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/blog-article1.webp',
  'yangtze-river-cruise-from-chongqing': 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/blog-article2.webp',
  'liziba-monorail-chongqing-guide': 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/figma-exact/blog-article3.webp',
};

const REVIEW_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * '2026-06-21' → 'June 2026'。Google 评价只给到日期，评价人城市 / 参加的团
 * 一概不提供，所以副标题里除了日期就只可能有客人正文里自己写出来的团名。
 */
function formatReviewDate(iso: string): string {
  const [year, month] = iso.split('-');
  const name = REVIEW_MONTHS[Number(month) - 1];
  return year && name ? `${name} ${year}` : iso;
}

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
      {/* ===== Full-bleed editorial hero ===== */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="A traditional boat cruising the Li River among karst mountains at sunset"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Readability overlay — matches the Figma comp: a light wash, not a
              dark wash. The photo itself (Li River at sunset) is already dark
              in the lower-left where the copy sits, so only a subtle fade is
              needed to keep white text readable. */}
          <div className="absolute inset-0 bg-ink/25 md:bg-gradient-to-r md:from-ink/40 md:via-ink/15 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent md:from-ink/35" />
        </div>
        <div className="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-center px-4 py-20 md:min-h-[680px] md:px-8 md:py-28">
          <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
            China, curated for New Zealand travellers
          </span>
          <div className="mb-6 h-0.5 w-16 bg-secondary" />
          <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-7xl">
            See all of China,
            <br />
            the way it deserves.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/90 md:text-xl">
            Curated journeys from New Zealand for travellers who want China experienced with depth, comfort and
            confidence.
          </p>
          <Link
            href="/tours"
            className="mt-9 inline-flex w-fit items-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition-colors hover:bg-red-700"
          >
            Explore our journeys <ArrowRight />
          </Link>
        </div>
      </section>

      {/* ===== Trust bar — real accreditation logos + who ===== */}
      <section className="border-y border-warm-200 bg-white py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 md:flex-row md:justify-between md:px-8">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg font-bold text-ink md:text-xl">Trusted by 10,000+ Kiwi travellers</p>
            <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-sm text-ink-muted md:justify-start">
              <span>Licensed NZ specialists — Auckland since 2000, backed by CTS (founded 1928)</span>
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
        <section className="bg-surface py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 max-w-2xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                Journeys for every season
              </span>
              <h2 className="mb-4 font-serif text-4xl leading-tight text-ink md:text-5xl">This Season&apos;s Spotlight</h2>
              <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
                Handpicked experiences that showcase the very best of China, from iconic landmarks to hidden gems.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[featured, ...sides.map((s) => ({ ref: s.ref, tour: s.tour }))].map(({ ref, tour }) => (
                <article key={ref.slug} className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-editorial">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={SPOTLIGHT_IMAGE_OVERRIDE[ref.slug] ?? tour.heroImage}
                      alt={tour.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-ink backdrop-blur-sm">
                      {ref.departureLabel}
                    </span>
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <p className="mb-1 text-xs text-ink-muted">{ref.route.join(' · ')}</p>
                    <h3 className="mb-3 font-serif text-xl leading-snug text-ink">{tour.name}</h3>
                    <span className="mb-4 font-serif text-lg font-semibold text-ink">
                      {tour.price} <span className="font-sans text-xs font-normal text-ink-muted">pp</span>
                    </span>
                    <Link
                      href={ref.campaignHref}
                      className="mt-auto inline-flex items-center gap-1.5 self-start border-b-2 border-primary pb-1 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-ink"
                    >
                      Explore Tour <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Link
                href="/tours"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-red-700"
              >
                View all tours <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== South Island departure (Christchurch direct) ===== */}
      <SouthIslandDeparture />

      {/* ===== China Stopovers (stopover-tier tours) ===== */}
      <ChinaStopovers />

      {/* ===== Upcoming departures (derived from tours.ts) ===== */}
      <UpcomingDepartures />

      {/* ===== Popular cities ===== */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">Explore China</span>
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">Where to Go</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
              From ancient wonders to modern skylines, explore China&apos;s most captivating cities and create memories that last a lifetime.
            </p>
          </div>
          {/* Mobile: one-card-at-a-time carousel — pure CSS scroll-snap + anchor
              links, no client JS. Swipe to browse; the arrow button on each
              card is an anchor to the next slide's id, so "next" works
              without any script. */}
          <div className="md:hidden">
            <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1">
              {CITIES.map((c, i) => (
                <div
                  key={c.slug}
                  id={`city-slide-${i}`}
                  className="relative h-[530px] w-full flex-none scroll-ml-4 snap-center overflow-hidden rounded-[20px]"
                >
                  <Link href={`/${c.slug}-tours`} className="absolute inset-0" aria-label={`Explore ${c.name} tours`}>
                    <Image src={c.img} alt={c.name} fill sizes="100vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="mb-1 inline-block border-b-2 border-secondary pb-1 font-serif text-3xl text-white">{c.name}</h3>
                      <p className="max-w-[220px] text-base text-white/90">{c.tag}</p>
                    </div>
                  </Link>
                  <a
                    href={`#city-slide-${(i + 1) % CITIES.length}`}
                    aria-label="Next destination"
                    className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              {CITIES.map((c, i) => (
                <a
                  key={c.slug}
                  href={`#city-slide-${i}`}
                  aria-label={`Go to ${c.name}`}
                  className="h-2 w-2 rounded-full bg-warm-200"
                />
              ))}
            </div>
          </div>
          <div className="hidden md:grid md:grid-cols-3 md:gap-5 lg:grid-cols-6">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/${c.slug}-tours`}
                className="group relative block h-64 overflow-hidden rounded-2xl lg:h-[420px]"
              >
                <Image
                  src={c.img}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5">
                  <div>
                    <h3 className="mb-1 inline-block border-b-2 border-secondary pb-1 font-serif text-xl text-white transition-colors group-hover:text-secondary">{c.name}</h3>
                    <p className="text-xs text-white/80">{c.tag}</p>
                  </div>
                  <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary text-white transition-colors group-hover:bg-secondary group-hover:text-ink">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-red-700"
            >
              Explore all destinations <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Meet your specialist (Baker Gu) ===== */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-4 md:px-8 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="order-1 lg:order-1 lg:col-span-7">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">Meet your specialist</span>
            <blockquote className="mb-6 font-serif text-2xl italic leading-snug text-ink md:text-3xl">
              &ldquo;For 20 years I&apos;ve shown Kiwi travellers the China I grew up in — not the one in the brochures.&rdquo;
            </blockquote>
            <p className="mb-4 max-w-xl leading-relaxed text-ink-muted">
              Baker personally designs and quality-checks every CTS journey. When you enquire, you&apos;re not talking to
              a call centre — you&apos;re talking to the person who built the trip.
            </p>
            <div className="mb-8 flex flex-wrap gap-x-6 gap-y-4">
              {([
                { icon: 'landmark', label: 'Born in China', width: 'w-20' },
                { icon: 'map-pin', label: 'NZ-based', width: 'w-20' },
                { icon: 'briefcase', label: '20+ Years in Travel', width: 'w-20' },
                { icon: 'message', label: 'Speaks Mandarin, English and Cantonese', width: 'w-32' },
              ] as { icon: IconName; label: string; width: string }[]).map((c) => (
                <div key={c.label} className={`flex ${c.width} flex-col items-center text-center`}>
                  <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-surface text-primary">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold text-ink-muted">{c.label}</span>
                </div>
              ))}
            </div>
            {/* Desktop position (right after the badges) — hidden on mobile,
                where the Figma comp moves this button to the very end. */}
            <Link href="/experts/baker-gu" className="hidden items-center gap-1.5 text-sm font-bold text-primary hover:underline lg:inline-flex">
              Read Baker&apos;s Full Story <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="relative order-2 mx-auto w-full max-w-sm pb-16 lg:order-2 lg:col-span-5 lg:max-w-none lg:pb-0">
            <Link
              href="/experts/baker-gu"
              className="group relative block aspect-[514/752] w-full overflow-hidden rounded-3xl shadow-editorial"
            >
              <Image
                src={BAKER_IMAGE}
                alt="Baker Gu, CTS China specialist"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-ink/80 to-transparent p-6">
                <p className="font-serif text-xl font-bold text-white">Baker Gu</p>
                <p className="text-sm text-white/80">Founder &amp; Lead China Specialist</p>
              </div>
            </Link>
            {/* Floating "speak to Baker" card overlapping the photo, per the Figma comp. */}
            <div className="absolute -bottom-10 right-0 w-[85%] max-w-xs rounded-2xl border border-warm-200 bg-white p-5 shadow-lg lg:-right-6 lg:bottom-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ink">Speak to Baker &mdash; no obligation</p>
              <ContactChannels tone="light" />
            </div>
          </div>
          {/* Mobile position (after the photo) — hidden on desktop. */}
          <Link href="/experts/baker-gu" className="order-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline lg:hidden">
            Read Baker&apos;s Full Story <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ===== Why CTS ===== */}
      <section className="bg-surface py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-editorial lg:col-span-5 lg:aspect-auto lg:h-full">
              <Image
                src={DIFFERENCE_IMAGE}
                alt="The Temple of Heaven in Beijing at golden hour"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-7">
              <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-primary">The CTS Difference</span>
              <h2 className="mt-3 font-serif text-4xl leading-tight text-ink">
                Expertise you
                <br />
                can trust.
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
                For 25 years CTS Tours NZ has crafted (parent CTS Group in the industry since 1928) exceptional travel experiences, bridging New Zealand and the
                wonders of China.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-4">
                {FEATURES.map((f) => (
                  <div key={f.title} className="rounded-2xl border border-warm-200 bg-white p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon name={f.icon} className="h-7 w-7" />
                    </div>
                    <h4 className="mb-2 font-serif text-xl text-ink">{f.title}</h4>
                    <p className="text-sm leading-relaxed text-ink-muted">{f.body}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/tours"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-red-700"
              >
                Explore Our Journeys <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials wall (real reviews) ===== */}
      {reviews.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 mx-auto max-w-2xl text-center">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">What travellers say</span>
              <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">Loved by Kiwi travellers</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Real words from CTS travellers. Every review below is public on our{' '}
                <a
                  href={GOOGLE_RATING.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-primary"
                >
                  Google Business profile
                </a>
                , quoted word for word.
              </p>
            </div>
            {(() => {
              const card = (t: (typeof reviews)[number]) => (
                <figure className="flex flex-col rounded-2xl border border-warm-100 bg-surface p-6 shadow-editorial">
                  <figcaption className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-bold text-primary">
                      {t.avatarInitials}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold text-ink">{t.name}</span>
                      <span className="block truncate text-xs text-ink-muted">
                        {[t.tour, formatReviewDate(t.date)].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                  </figcaption>
                  <div className="mb-4 flex text-secondary">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Icon key={i} name="star" filled className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-ink">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                </figure>
              );

              return (
                <>
                  {/* Mobile: one card at a time with pagination dots, per the
                      Figma comp. */}
                  <div className="md:hidden">
                    <div className="-mx-4 flex snap-x snap-mandatory overflow-x-auto px-4">
                      {reviews.map((t) => (
                        <div key={t.id} id={`review-slide-${t.id}`} className="w-full flex-none snap-center pr-4">
                          {card(t)}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      {reviews.map((t) => (
                        <a
                          key={t.id}
                          href={`#review-slide-${t.id}`}
                          aria-label={`Go to ${t.name}'s review`}
                          className="h-2 w-2 rounded-full bg-warm-200"
                        />
                      ))}
                    </div>
                  </div>
                  {/* Desktop: 3-column masonry with full-length reviews, per the
                      Figma comp — cards flow into columns and keep their natural
                      height rather than a uniform grid. */}
                  <div className="hidden gap-6 md:block md:columns-2 lg:columns-3">
                    {reviews.map((t) => (
                      <div key={t.id} className="mb-6 break-inside-avoid">{card(t)}</div>
                    ))}
                  </div>
                </>
              );
            })()}
            <div className="mt-12 flex justify-center">
              <a
                href={GOOGLE_RATING.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-red-700"
              >
                Read more reviews on Google <ArrowRight />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ===== From the blog ===== */}
      {blogPosts.length > 0 && (
        <section className="bg-surface py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-10 text-center">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">Stories &amp; guides</span>
              <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">Travel inspiration for your next adventure</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
                Practical tips, in-depth guides and real travel experiences to help you explore China with confidence.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {blogPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-editorial">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={BLOG_IMAGE_OVERRIDE[p.slug] ?? p.heroImage}
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
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">Read More <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-red-700"
              >
                View All Stories &amp; Guides <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== Design your China (enquiry CTA banner) ===== */}
      <section className="relative isolate overflow-hidden bg-surface">
        <div className="absolute inset-0 z-0">
          <Image
            src={CTA_IMAGE}
            alt="A river cruise ship passing through the Three Gorges at sunset"
            fill
            sizes="100vw"
            className="object-cover object-right"
          />
        </div>
        <div className="relative mx-auto flex min-h-[420px] max-w-7xl flex-col justify-center px-6 py-16 md:min-h-[480px] md:px-14 md:py-20 lg:py-24">
          <div className="mb-4 h-0.5 w-14 bg-secondary" />
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Prefer to travel your way?
          </span>
          <h2 className="mb-5 max-w-2xl font-serif text-4xl leading-tight text-ink md:text-5xl">
            Let&apos;s design your China, together.
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-ink-muted">
            Tell a New Zealand-based China specialist what you dream of seeing. No obligation — a reply within one
            working day.
          </p>
          <Link
            href="/tailor-made"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-red-700"
          >
            Start your tailor-made trip <ArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePageRedesign;
