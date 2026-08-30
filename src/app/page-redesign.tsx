import Link from 'next/link';
import Image from 'next/image';
import HeroSearchEditorial from '@/components/HeroSearchEditorial';
import ContactChannels, { CTS_PHONE_DISPLAY, CTS_PHONE_HREF } from '@/components/ContactChannels';
import { Icon, type IconName } from '@/components/ui/Icon';
import { getTourBySlug } from '@/lib/data/tours';
import { HOME_SPOTLIGHT_TOURS } from '@/lib/data/home-spotlight';
import { getAllBlogPosts } from '@/lib/data/blogs';
import UpcomingDepartures from '@/components/UpcomingDepartures';
import SouthIslandDeparture from '@/app/china-tours/_components/SouthIslandDeparture';
import { homeTestimonials } from '@/lib/data/home-testimonials';
import { migratedSite } from '@/lib/site-media';
import { parsePrice } from '@/lib/ui/price';

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

/*
  CTS's own photographs of CTS departures. Everything else pictured on this page
  is a stock or AI landscape — the same Unsplash China set the competition uses —
  so these are the only images here that a competitor could not also buy.
  Lanyards and the CTS Tours sign are visible in three of the four.

  Served from /blog/web/, which holds 1000px (1800px for the wide one)
  re-encodes of the originals in /blog/. The originals stay put because other
  pages reference them. The derivatives exist because image-loader.ts passes
  local paths straight through — every srcset candidate resolves to the same
  URL — so a page using the originals ships the full file. The Great Wall
  original alone is 1.3MB; the set is 2.7MB as shot and 1.3MB here.

  Captions state only what is visible in the frame. Nothing about dates,
  itineraries or which tour these were shot on is asserted, because that is not
  recorded anywhere.
*/
const TRAVELLER_PHOTOS = [
  {
    src: '/blog/web/group-great-wall-cts.jpg',
    alt: 'CTS group on the Great Wall of China, holding a CTS Tours sign',
    caption: 'On the Great Wall',
    portrait: true,
  },
  {
    src: '/blog/web/group-temple-of-heaven-beijing.jpg',
    alt: 'CTS travellers at the Temple of Heaven in Beijing',
    caption: 'Temple of Heaven, Beijing',
    portrait: true,
  },
  {
    src: '/blog/web/group-shanghai-bund-selfie.jpg',
    alt: 'CTS travellers photographing themselves on the Shanghai Bund',
    caption: 'The Bund, Shanghai',
    portrait: true,
  },
  {
    src: '/blog/web/group-bullet-train-cts-sign.jpg',
    alt: 'A CTS group seated in a Chinese high-speed train carriage',
    caption: 'Between cities by high-speed rail',
    portrait: false,
  },
];

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
      {/*
        ===== Immersive hero =====

        Was a 5/7 split: copy in a column on the left, a rounded photo card on
        the right. Legible, but structurally the same layout as every other
        page — which is why three weeks of restyling never read as a redesign.

        This is Ceepii's hero language properly: the photograph is the page,
        the type sits on it, and everything anchors to the bottom edge. Ceepii
        runs it at min-h-dvh; 88vh clamped to 640-860px keeps a sliver of the
        next section visible so the page still reads as scrollable.

        The search card keeps its white surface and floats on the image, which
        is how Ceepii places its own search — no restyling needed there.
      */}
      {/*
        min-h, not a fixed h. With `h-[88vh]` the content stack (96px headline,
        lede, search card, link row) was taller than 88vh minus the sticky
        header on shorter windows, so the top of the headline slid up behind the
        nav and got clipped. min-h lets the section grow when the content needs
        it; the pt-* below reserves room for the banner + nav so the headline
        can never start underneath them.
      */}
      <section className="relative flex min-h-[600px] flex-col justify-end overflow-hidden text-white md:min-h-[88vh]">
        <Image
          src={HERO_IMAGE}
          alt="The Great Wall of China at dawn"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/15"
          aria-hidden
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-28 md:px-8 md:pb-12 md:pt-32 lg:pb-14">
          <h1 className="max-w-4xl font-serif text-[2.75rem] font-normal leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-7xl xl:text-8xl">
            See all of China,
            <br />
            <span className="italic text-white/90">the way it deserves.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg font-light leading-relaxed text-white/80">
            Curated, luxury journeys designed in New Zealand for discerning travellers — small groups and
            genuinely tailor-made.
          </p>

          {/*
            The search bar spans its own row now that it lays out horizontally —
            two fields plus the submit need the width, and stacking the meta
            below it keeps the whole hero inside a 780px-tall window.
          */}
          <div className="mt-7 max-w-4xl">
            <HeroSearchEditorial />
          </div>

          <div className="mt-6">
            {/*
              max-w keeps this row from running under the fixed "Need help?"
              bubble in the bottom-right corner — at full width the
              accreditation line was being clipped by it.

              The guard has to start at md, not lg: FloatingHelpBubble is
              `hidden md:block`, so from 768px up the bubble was live while this
              row was still full width, and it covered about a third of "TAANZ &
              IATA accredited" — in the hero, on an iPad in portrait.

              Padding, not a max-width, for the md..lg band. The bubble is
              position:fixed at a constant 140px wide with a 24px right margin,
              so its left edge is (viewport - 164) and it marches left as the
              viewport narrows. A fixed max-width cannot track that: max-w-2xl
              (672px) still overlapped by 33px at 800px wide. pr-44 keeps a
              constant ~12px gap at every width in the band. From lg the
              max-width alone is clear of it again.
            */}
            <div className="space-y-3 md:pr-44 lg:max-w-3xl lg:pr-0">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/tours" className="inline-flex items-center gap-1.5 text-white hover:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Browse all tours <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-white/30">·</span>
                <Link href="/tailor-made" className="inline-flex items-center gap-1.5 text-white hover:text-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Design a tailor-made trip <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <span>Backed by CTS · Founded 1928</span>
                <span className="text-white/30">•</span>
                <span>10,000+ Kiwi travellers</span>
                <span className="text-white/30">•</span>
                <span>TAANZ &amp; IATA accredited</span>
              </div>
            </div>
          </div>
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
                      {/* The card supplies its own "From" and "pp", but
                          tour.price is free text that often already carries
                          both — 'From NZD $4,080 per person'. Printed raw, this
                          card reads "From / From NZD $4,080 per person pp",
                          which is what production shows today on the largest
                          card on the homepage. parsePrice strips the qualifiers
                          out of the string so each is rendered exactly once.
                          What is displayed is unchanged; only the duplication
                          goes. */}
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/60">From</span>
                      <span className="font-serif text-3xl font-semibold text-white">
                        {parsePrice(featured.tour.price).amount}{' '}
                        <span className="font-sans text-sm font-normal text-white/60">pp</span>
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
                        {/* Same de-duplication as the featured card. These
                            cards have no separate "From" label, so a leading
                            "From" in the source string is re-rendered inline
                            rather than dropped — losing it would turn a
                            starting price into an apparent fixed one. */}
                        <span className="font-serif text-lg font-semibold text-ink">
                          {(() => {
                            const p = parsePrice(tour.price);
                            return p.from ? `From ${p.amount}` : p.amount;
                          })()}{' '}
                          <span className="font-sans text-xs font-normal text-ink-muted">pp</span>
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

      {/* ===== South Island departure (Christchurch direct) ===== */}
      <SouthIslandDeparture />

      {/* ===== Upcoming departures (derived from tours.ts) ===== */}
      <UpcomingDepartures />

      {/* ===== Popular cities ===== */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Left-aligned. A centred heading over a regular grid is the most
              template-looking arrangement on the page, and it is the one thing
              every section here was doing. */}
          <div className="mb-12">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">Where to go</span>
            <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">Explore China by city</h2>
          </div>
          {/*
            Six equal tiles on a shared baseline read as a contact sheet. The
            tiles are still a grid — the links, order and crops are unchanged —
            but every third one drops, so the eye travels instead of scanning
            rows. Offsets are desktop-only; on a phone a stagger just wastes
            vertical space. items-start stops the pushed tiles from stretching
            their row.
          */}
          <div className="grid grid-cols-2 items-start gap-4 md:grid-cols-3 md:gap-6">
            {CITIES.map((c, i) => (
              <Link
                key={c.slug}
                href={`/${c.slug}-tours`}
                className={`group relative block h-56 overflow-hidden rounded-2xl md:h-64 ${
                  ['', 'lg:mt-10', 'lg:mt-20'][i % 3]
                }`}
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

      {/* ===== Meet your specialist (Baker Gu) =====
          Was a 380px rounded photo card sitting in a 12-column grid, i.e. one
          more box next to another box. CTS's single strongest differentiator —
          you talk to a named person, not a call centre — was rendered at the
          same visual weight as a tour thumbnail.

          Now the portrait bleeds off the left edge of the viewport and runs
          full height, and the contact card is pulled back over the photo's
          edge so the two overlap. The overlap is what reads as "designed":
          nothing else on the page crosses a boundary.

          Photo: the real office portrait against the CTS New Zealand sign. Three
          better-framed alternatives used to sit alongside it and were deleted —
          they were AI composites of a real, named person. Copies still exist in
          the Supabase tour-images bucket, so the ban is enforced by name in
          src/__tests__/no-ai-portraits.test.ts rather than by their absence.

          The portrait is 768x1376, so it is soft above ~800px of column width;
          the column is capped at 42vw for that reason. A real 2x portrait would
          let this run wider.
      */}
      <section className="bg-warm-50">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          <Link
            href="/experts/baker-gu"
            className="group relative min-h-[440px] w-full shrink-0 overflow-hidden sm:min-h-[540px] lg:min-h-[660px] lg:w-[42%]"
          >
            <Image
              src={BAKER_IMAGE}
              alt="Baker Gu at the CTS New Zealand office"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-[center_22%] transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent p-6 pt-16">
              <p className="font-serif text-2xl text-white">Baker Gu</p>
              <p className="text-sm text-white/80">Founder &amp; Lead China Specialist</p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/90">
                Read his story <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>

          <div className="w-full self-center px-4 py-14 md:px-8 md:py-16 lg:flex-1 lg:py-20 lg:pl-24 lg:pr-10 xl:pl-32 xl:pr-16">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">Meet your specialist</span>
            <blockquote className="mb-6 max-w-xl font-serif text-[1.75rem] italic leading-[1.15] text-ink md:text-4xl">
              &ldquo;For 20 years I&apos;ve shown Kiwi travellers the China I grew up in — not the one in the brochures.&rdquo;
            </blockquote>
            <p className="mb-5 max-w-lg leading-relaxed text-ink-muted">
              Baker personally designs and quality-checks every CTS journey. When you enquire, you&apos;re not talking to
              a call centre — you&apos;re talking to the person who built the trip.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {['Born in China', 'NZ-based', '20+ years in travel', 'Mandarin · English · Cantonese'].map((c) => (
                <span key={c} className="rounded-full border border-warm-200 bg-white px-3 py-1.5 text-xs font-semibold text-primary">{c}</span>
              ))}
            </div>
            <Link href="/experts/baker-gu" className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
              Read Baker&apos;s full story <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Pulled back over the photo edge on desktop. Keeps its own
                background so it stays readable where it crosses the image. */}
            <div className="relative z-10 mt-8 rounded-2xl bg-white p-6 shadow-editorial lg:-ml-36 lg:max-w-lg xl:-ml-48">
              <p className="mb-3 text-sm font-bold uppercase tracking-wide text-ink">Speak to Baker &mdash; no obligation</p>
              <ContactChannels tone="light" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why CTS ===== */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* items-start so the sticky child can move within the row rather
              than being stretched to its full height. */}
          <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24">
            {/* The heading holds while the four reasons scroll past it. It costs
                nothing but changes how the section behaves rather than how it
                looks, which is the one kind of change a static screenshot can't
                show.

                The offset is computed, not guessed. VisaFreeBanner publishes its
                own height as --vfb-h and Navbar sits at top:var(--vfb-h), so the
                stack is banner + ~84px of navbar. A flat top-28 (112px) was
                shorter than that whenever the banner was showing — i.e. for
                every first-time visitor, i.e. all paid traffic — and the navbar
                covered all but 0.4px of the eyebrow for the whole 136px of
                sticky travel.

                Copy here is a frozen compliance string — position only. */}
            <div className="space-y-6 lg:sticky lg:top-[calc(var(--vfb-h,0px)+5.5rem)] lg:w-1/3">
              <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-primary">The CTS Difference</span>
              <h2 className="font-serif text-4xl leading-tight text-ink">
                Expertise you
                <br />
                can trust.
              </h2>
              <p className="pt-4 text-lg leading-relaxed text-ink-muted">
                For 25 years CTS Tours NZ has crafted (parent CTS Group in the industry since 1928) exceptional travel experiences, bridging New Zealand and the
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

      {/* ===== On tour with CTS — our own photographs =====
          Placed immediately before the reviews on purpose: faces first, then
          the words those people wrote. Text-only social proof asks to be
          believed; a photograph of the same customers does not.

          Treated deliberately unlike every other image block on this page.
          Everything else here is rounded, gradient-scrimmed, with copy set over
          the picture. These are square-cornered, edge to edge, separated by
          hairlines, captioned underneath — the arrangement of a contact sheet
          rather than an advertisement. Dressing up a snapshot is what makes it
          look like stock.

          The block also escapes the max-w-7xl container that the heading sits
          in, so the photographs run the full width of the viewport.
      */}
      <section className="bg-white pt-16 md:pt-20">
        <div className="mx-auto mb-10 max-w-7xl px-4 md:mb-12 md:px-8">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">
            On tour with CTS
          </span>
          <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">Real travellers, real departures.</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
            Every photograph here is from a CTS departure. The people in them are our guests.
          </p>
        </div>

        {/* gap-px over a warm background draws the hairlines between frames. */}
        <div className="grid grid-cols-2 gap-px bg-warm-200 sm:grid-cols-3">
          {TRAVELLER_PHOTOS.map((photo, i) => (
            <figure
              key={photo.src}
              /* The lead portrait takes the full width on a phone — three
                 portraits across a 390px screen is 125px each, too small to
                 read a face. Index rather than a first: variant: stacking
                 first: with sm: relies on variant ordering that is easy to get
                 backwards and produces no CSS when you do. */
              className={`bg-white ${
                !photo.portrait
                  ? 'col-span-2 sm:col-span-3'
                  : i === 0
                    ? 'col-span-2 sm:col-span-1'
                    : 'col-span-1'
              }`}
            >
              <div className={`relative bg-warm-100 ${photo.portrait ? 'aspect-[3/4]' : 'aspect-[16/9]'}`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={photo.portrait ? '(max-width: 640px) 100vw, 33vw' : '100vw'}
                  className="object-cover"
                />
              </div>
              <figcaption className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-ink-muted md:px-6">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===== Testimonials wall (real reviews) =====
          Was three bordered cards with line-clamp-4. These reviews run ~65
          words and are specific — they name Mutianyu at sunrise, the bullet
          train, the hutong walk. The clamp was cutting them mid-sentence, so
          the most persuasive detail was the part being thrown away, and the
          card frames made real words look like ad copy.

          Now one lead quote set in display serif, then the rest as
          hairline-separated quotes in CSS columns. No clamp anywhere: every
          review is shown in full. break-inside-avoid keeps a quote from
          splitting across a column.

          Note this is presentational only — src/app/page.tsx carries
          TravelAgency + WebSite JSON-LD and no Review/aggregateRating, so
          there is no rich-result surface to break here.
      */}
      {reviews.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 max-w-2xl">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.1em] text-primary">What travellers say</span>
              <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">Loved by Kiwi travellers</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted">
                Real words from CTS travellers — every itinerary personally designed by our specialists.
              </p>
            </div>

            <figure className="mb-14 max-w-4xl border-l-2 border-primary pl-6 md:pl-10">
              <blockquote className="font-serif text-xl italic leading-[1.35] text-ink md:text-[1.75rem]">
                &ldquo;{reviews[0].text}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-primary/10 font-serif text-sm font-bold text-primary">
                  {reviews[0].avatarInitials}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-ink">{reviews[0].name}</span>
                  <span className="block text-xs text-ink-muted">{reviews[0].location} · {reviews[0].tour}</span>
                </span>
              </figcaption>
            </figure>

            <div className="columns-1 gap-10 md:columns-2 lg:columns-3">
              {reviews.slice(1).map((t) => (
                <figure key={t.id} className="mb-9 break-inside-avoid border-t border-warm-200 pt-5">
                  <div className="mb-3 flex text-secondary">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Icon key={i} name="star" className="h-3.5 w-3.5" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-ink-muted">
                    &ldquo;{t.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-3 text-xs">
                    <span className="font-bold text-ink">{t.name}</span>
                    <span className="text-ink-muted"> · {t.location} · {t.tour}</span>
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

      {/* ===== Design your China (enquiry CTA) =====
          Was a rounded card inside max-w-6xl: the page ended on a box, the same
          shape as every other box above it.

          Now a full-bleed closing band using the hero's own language — one
          photograph, the same dark gradient, copy anchored bottom-left. The
          page opens and closes the same way, which is what makes the middle
          read as one designed thing rather than a stack of sections.

          Every lead channel is carried over unchanged: the /tailor-made CTA,
          ContactChannels tone="dark", and the tel: link.
      */}
      <section className="relative flex min-h-[560px] items-end overflow-hidden text-white md:min-h-[70vh]">
        <Image
          src={CTA_IMAGE}
          alt="Dramatic mountain landscape in China"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Darker than the hero's scrim, and darker through the middle than a
            hero scrim would be. This band carries an eyebrow, a headline, a
            paragraph, a button and three contact controls — the copy occupies
            most of the height, so the gradient cannot stay light until near the
            top. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/45" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
          {/* Third attempt at this line, so the reasoning is worth recording.
              It began as the gold accent, which worked on the flat red panel
              this block used to be and failed completely over a photograph.
              White at 75% was the second try and still measured 2.6-3.5:1
              against the sky in the upper part of the frame — 12px text needs
              4.5:1, so it failed at every viewport.

              Full white plus a shadow, and the scrim's top stop lifted from /35
              to /45. The shadow is what actually carries it: the sky behind is
              the lightest region of the photo and no reasonable scrim fixes
              that without flattening the image. */}
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.14em] text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.85)]">
            Prefer to travel your way?
          </span>
          <h2 className="mb-5 max-w-2xl font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
            Let&apos;s design your China, together.
          </h2>
          <p className="mb-8 max-w-lg text-lg font-light leading-relaxed text-white/85">
            Tell a New Zealand-based China specialist what you dream of seeing. No obligation — a reply within one
            working day.
          </p>
          <Link
            href="/tailor-made"
            className="mb-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-primary shadow-lg transition-colors hover:bg-secondary hover:text-ink"
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
      </section>
    </div>
  );
};

export default HomePageRedesign;
