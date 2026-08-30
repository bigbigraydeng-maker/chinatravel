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
              accreditation line was being clipped by it on desktop.
            */}
            <div className="space-y-3 lg:max-w-3xl">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
                <Link href="/tours" className="inline-flex items-center gap-1.5 text-white hover:text-white/70">
                  Browse all tours <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-white/30">·</span>
                <Link href="/tailor-made" className="inline-flex items-center gap-1.5 text-white hover:text-white/70">
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

          Photo: the real office portrait against the CTS New Zealand sign.
          public/images/ also holds baker-gu-guilin / -zhangjiajie / -great-wall,
          which are AI composites of Baker's face into scenery — better framed
          for this slot, but they depict a real, named person doing something he
          did not do. Not usable. They are currently referenced nowhere in src/.

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
                show. top-28 clears the sticky navbar and the notice banner.
                Copy here is a frozen compliance string — position only. */}
            <div className="space-y-6 lg:sticky lg:top-28 lg:w-1/3">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/35" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 md:px-8 md:py-20">
          {/* White, not the gold accent. This eyebrow used to sit on a flat red
              panel where gold read cleanly; over a photograph of pale rock it is
              12px uppercase gold on mid-grey and does not hold up. The "Or reach
              us directly" line below already uses this treatment. */}
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
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
