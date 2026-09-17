import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import FAQSection from '@/components/FAQSection';
import FloatingCta from '@/components/FloatingCta';
import SchemaMarkup from '@/components/SchemaMarkup';
import FestiveTourEnquiry from '@/components/campaigns/FestiveTourEnquiry';
import { getTourBySlug } from '@/lib/data/tours';
import { GOOGLE_RATING } from '@/lib/data/google-rating';
import { homeTestimonials } from '@/lib/data/home-testimonials';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';

const PATH = '/christmas-new-year-china';
const HERO_IMAGE = '/images/campaigns/christmas-new-year/festive-china-og.webp';

const FAQS = [
  {
    question: 'Is China too cold for a Christmas and New Year holiday?',
    answer:
      'No, provided you pack proper winter layers. Shanghai is cool and can feel damp; Beijing and Xi’an are colder and drier; Chongqing and Guangzhou are milder. The itinerary combines outdoor landmarks with private transport, high-speed rail, included meals and comfortable 4-star hotels, so you are not outside all day.',
  },
  {
    question: 'What happens on Christmas Eve and Christmas Day?',
    answer:
      'On 24 December the group explores Shanghai Old Town, Yu Garden, Xintiandi and Tianzifang, visits the Oriental Pearl Tower and Bund Source Christmas market, then takes an evening Huangpu River cruise. Christmas Day is spent in Zhujiajiao, an ancient canal town outside Shanghai.',
  },
  {
    question: "Where does the tour spend New Year’s Eve?",
    answer:
      'The group spends 31 December in Xi’an. After visiting the Terracotta Warriors, the evening centres on the Tang Dynasty Ever-Bright City, with performances, lights and festive crowds. The itinerary also identifies the Bell and Drum Tower area, Big Wild Goose Pagoda and Xi’an City Wall as notable celebration settings.',
  },
  {
    question: 'What should I pack for winter in China?',
    answer:
      'Bring a warm insulated coat, thermal base layers, a jumper or fleece, gloves, a hat, warm socks and comfortable shoes with good grip. Add a compact wind-resistant or water-resistant outer layer for Shanghai. Pack lighter layers too, as Chongqing and Guangzhou are milder and hotels, coaches and trains are heated.',
  },
  {
    question: 'Can I depart from Christchurch instead of Auckland?',
    answer:
      'Yes. Both journeys depart on 22 December 2026. The Auckland itinerary is 16 days from NZD $7,188 per person. The Christchurch itinerary is 15 days from NZD $6,188 per person and flies from Christchurch via Guangzhou, avoiding an Auckland connection.',
  },
];

const WEATHER = [
  {
    city: 'Shanghai',
    timing: '23–25 December',
    feel: 'Cool and sometimes damp',
    advice: 'Warm layers plus a wind-resistant outer jacket work best for evening lights and the river cruise.',
  },
  {
    city: 'Beijing',
    timing: '26–29 December',
    feel: 'Cold, dry and often clear',
    advice: 'A proper winter coat, gloves and hat make the Great Wall and imperial landmarks comfortable.',
  },
  {
    city: "Xi’an",
    timing: '30 December–1 January',
    feel: 'Cold and dry',
    advice: 'Dress warmly for the outdoor New Year celebrations, then remove layers inside restaurants and venues.',
  },
  {
    city: 'Chongqing & Guangzhou',
    timing: '2–5 January',
    feel: 'Noticeably milder',
    advice: 'Keep lighter layers handy for the warmer final stage of the journey.',
  },
];

const TIMELINE = [
  {
    date: '22 Dec',
    place: 'New Zealand',
    title: 'The journey begins',
    body: 'Depart from Auckland or Christchurch, with international airfares included in the published tour price.',
  },
  {
    date: '24 Dec',
    place: 'Shanghai',
    title: 'Christmas Eve under the city lights',
    body: 'Yu Garden, Xintiandi, the Bund Source Christmas market, Oriental Pearl Tower and a Huangpu River cruise.',
  },
  {
    date: '25 Dec',
    place: 'Zhujiajiao',
    title: 'Christmas Day on the water',
    body: 'A slower day among arched bridges, canals and Ming and Qing dynasty streets in an ancient water town.',
  },
  {
    date: '28 Dec',
    place: 'Beijing',
    title: 'The Great Wall in quiet season',
    body: 'Visit the restored Mutianyu section during a less crowded time of year, with crisp winter views.',
  },
  {
    date: '31 Dec',
    place: "Xi’an",
    title: "A New Year’s Eve with 2,000 years of history",
    body: 'See the Terracotta Warriors by day, then welcome 2027 amid the lights and performances of Tang Dynasty Ever-Bright City.',
  },
  {
    date: '2–5 Jan',
    place: 'Chongqing & Guangzhou',
    title: 'A milder finish',
    body: 'Neon Chongqing, Hongyadong and a Cantonese Yum Cha finale bring the journey into warmer southern China.',
  },
];

const RELATED_GUIDES = [
  { href: '/shanghai-travel-guide', label: 'Shanghai travel guide' },
  { href: '/yu-garden-travel-guide', label: 'Yu Garden guide' },
  { href: '/great-wall-travel-guide', label: 'Great Wall guide' },
  { href: '/forbidden-city-travel-guide', label: 'Forbidden City guide' },
  { href: '/terracotta-warriors-travel-guide', label: 'Terracotta Warriors guide' },
  { href: '/big-wild-goose-pagoda-travel-guide', label: 'Big Wild Goose Pagoda guide' },
];

export function generateMetadata(): Metadata {
  return buildCtsPageMetadata({
    title: 'Christmas & New Year in China from New Zealand',
    description:
      'Is China too cold at Christmas? See the weather, packing advice and full festive route for CTS tours departing Auckland or Christchurch on 22 December 2026.',
    path: PATH,
    ogImagePath: HERO_IMAGE,
    ogImageAlt: 'Shanghai illuminated at night during the Christmas and New Year season',
    keywords: [
      'Christmas in China from New Zealand',
      'New Year in China tour',
      'China weather December',
      'China winter tour from NZ',
      'Christmas China tour Auckland',
      'China tour from Christchurch',
    ],
  });
}

function Arrow() {
  return <span aria-hidden>→</span>;
}

export default function ChristmasNewYearChinaPage() {
  const aucklandTour = getTourBySlug('china', 'discovery', 'china-icons-collection');
  const christchurchTour = getTourBySlug('china', 'discovery', 'china-icons-collection-christchurch');
  const site = getSiteUrl();
  const featuredReview = homeTestimonials.find((review) => review.id === 1)!;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Christmas & New Year in China from New Zealand',
      description:
        'A practical guide to winter weather, festive experiences and CTS Christmas and New Year tours in China.',
      url: `${site}${PATH}`,
      inLanguage: 'en-NZ',
      about: [
        { '@type': 'Thing', name: 'Christmas in China' },
        { '@type': 'Thing', name: "New Year’s Eve in Xi’an" },
        { '@type': 'Thing', name: 'China winter travel' },
      ],
      isPartOf: { '@type': 'WebSite', name: 'CTS Tours', url: site },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: site },
        { '@type': 'ListItem', position: 2, name: 'Christmas & New Year in China', item: `${site}${PATH}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Christmas and New Year China tours from New Zealand',
      numberOfItems: 2,
      itemListElement: [aucklandTour, christchurchTour].filter(Boolean).map((tour, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'TouristTrip',
          name: tour!.name,
          description: tour!.shortDescription,
          touristType: 'New Zealand travellers',
          itinerary: tour!.tourCities?.join(', '),
          offers: {
            '@type': 'Offer',
            price: tour!.price.replace(/[^\d.]/g, ''),
            priceCurrency: 'NZD',
            availability: 'https://schema.org/InStock',
            url: `${site}/tours/china/discovery/${tour!.slug}`,
          },
        },
      })),
    },
  ];

  const departures = [
    {
      city: 'Auckland',
      tour: aucklandTour,
      days: '16 days',
      price: 'NZD $7,188',
      note: 'Includes the Guangzhou Yum Cha finale before returning to Auckland.',
    },
    {
      city: 'Christchurch',
      tour: christchurchTour,
      days: '15 days',
      price: 'NZD $6,188',
      note: 'Depart from Christchurch via Guangzhou, with no Auckland connection.',
    },
  ];

  return (
    <main className="bg-surface text-ink">
      <SchemaMarkup data={schema} />

      <section id="hero" className="scroll-mt-24 overflow-hidden bg-ink text-white">
        <div className="mx-auto grid min-h-[690px] max-w-7xl items-center gap-12 px-4 py-10 md:px-8 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div className="relative z-10">
            <nav aria-label="Breadcrumb" className="mb-8 hidden text-sm text-white/55 sm:block">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="px-2" aria-hidden>/</span>
              <span>Christmas &amp; New Year in China</span>
            </nav>
            <span className="block text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              Departing 22 December 2026
            </span>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.06] sm:mt-5 sm:text-6xl lg:text-7xl">
              Christmas and New Year, the China way.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:mt-7 sm:text-xl">
              Shanghai lights on Christmas Eve. A water town on Christmas Day. The Great Wall in clear winter air.
              Then New Year&apos;s Eve in ancient Xi&apos;an.
            </p>

            <div className="mt-6 grid max-w-xl grid-cols-2 overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-sm sm:mt-8">
              <div className="border-r border-white/15 px-4 py-4 sm:px-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">From Auckland</p>
                <p className="mt-2 font-serif text-2xl sm:text-3xl">$7,188</p>
                <p className="mt-1 text-xs text-white/60">16 days · per person</p>
              </div>
              <div className="px-4 py-4 sm:px-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">From Christchurch</p>
                <p className="mt-2 font-serif text-2xl sm:text-3xl">$6,188</p>
                <p className="mt-1 text-xs text-white/60">15 days · per person</p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 sm:mt-9">
              <a
                href="#enquiry"
                className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-red-700"
              >
                Check availability
              </a>
              <a
                href="#festive-route"
                className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-ink"
              >
                See the journey
              </a>
            </div>
            <p className="mt-4 text-sm text-white/60 sm:mt-5">Return flights · 4-star hotels · guides · listed meals · sightseeing included</p>
          </div>

          <div className="grid h-[560px] grid-cols-[1.12fr_0.88fr] gap-3 sm:h-[620px]">
            <div className="relative overflow-hidden rounded-[2rem]">
              <Image
                src="/images/campaigns/christmas-new-year/shanghai-christmas-street.webp"
                alt="Shanghai Nanjing Road illuminated at night during the festive season"
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 32vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">24 December</p>
                <p className="mt-1 font-serif text-2xl">Christmas Eve · Shanghai</p>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-3 py-8">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/images/campaigns/christmas-new-year/great-wall-winter-light.webp"
                  alt="The Great Wall in clear winter light"
                  fill
                  sizes="(max-width: 1024px) 40vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/images/campaigns/christmas-new-year/xian-new-year-night.webp"
                  alt="Lantern-lit streets in Xi'an at night"
                  fill
                  sizes="(max-width: 1024px) 40vw, 20vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-warm-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-7 px-4 py-8 md:grid-cols-[0.35fr_1.65fr] md:items-center md:px-8">
          <a href={GOOGLE_RATING.profileUrl} target="_blank" rel="noopener noreferrer" className="block border-b border-warm-200 pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <p className="text-lg tracking-[0.16em] text-[#d9a441]" aria-label="Five star review">★★★★★</p>
            <p className="mt-1 font-bold">Google {GOOGLE_RATING.value} · {GOOGLE_RATING.count} reviews</p>
            <p className="mt-1 text-xs text-ink-muted">Read verified traveller reviews →</p>
          </a>
          <figure className="md:pl-3">
            <blockquote className="font-serif text-xl leading-relaxed md:text-2xl">“{featuredReview.text}”</blockquote>
            <figcaption className="mt-3 text-sm font-semibold text-ink-muted">{featuredReview.name} · Verified Google review</figcaption>
          </figure>
        </div>
      </section>

      <section className="border-b border-warm-200 bg-surface">
        <div className="mx-auto max-w-5xl px-4 py-10 text-center md:px-8 md:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">The quick answer</p>
          <h2 className="mx-auto mt-4 max-w-4xl font-serif text-3xl leading-tight md:text-4xl">
            China is cold in late December, but this is a planned winter journey — not two weeks standing outside.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-ink-muted">
            Pack a proper coat and layers for Beijing and Xi&apos;an. The itinerary alternates landmark visits with
            private transport, high-speed rail, included meals and 4-star hotels, before finishing in milder
            Chongqing and Guangzhou.
          </p>
        </div>
      </section>

      <section id="winter-weather" className="scroll-mt-24 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Winter, city by city</span>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">What the cold actually feels like.</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                The route moves from east to north, then west and south. You need real winter clothing, but you will
                not carry the same combination of layers every day.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {WEATHER.map((item) => (
                <article key={item.city} className="rounded-3xl border border-warm-200 bg-white p-6 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">{item.timing}</p>
                  <h3 className="mt-3 font-serif text-2xl">{item.city}</h3>
                  <p className="mt-2 font-semibold text-ink">{item.feel}</p>
                  <p className="mt-3 leading-relaxed text-ink-muted">{item.advice}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="festive-route" className="scroll-mt-24 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">The festive route</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">A date-by-date journey, not a generic winter tour.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Both departures follow the same festive core. These dates come directly from the published itinerary.
            </p>
          </div>

          <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12">
            {TIMELINE.map((item, index) => (
              <article key={item.date} className="relative border-l border-warm-300 pb-10 pl-8 last:pb-0 lg:min-h-[190px]">
                <span className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-4 border-white bg-primary ring-1 ring-primary" />
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{item.date} · {item.place}</p>
                <h3 className="mt-3 font-serif text-2xl leading-snug">{item.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">{item.body}</p>
                {index === 1 && (
                  <Link href="/shanghai-travel-guide" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                    Explore Shanghai before you go <Arrow />
                  </Link>
                )}
                {index === 4 && (
                  <Link href="/xian-travel-guide" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                    Explore Xi&apos;an before you go <Arrow />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-warm-200 bg-[#f2e9dc] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">The value is in what is arranged</span>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">The big pieces are already taken care of.</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                Land in China knowing the flights, hotels, guides, transport and headline sights have been organised.
                You can spend the festive season enjoying the journey instead of managing logistics.
              </p>
              <a href="#enquiry" className="mt-7 inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-sm font-bold uppercase tracking-[0.1em] text-primary">
                Ask what is included <Arrow />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['International & domestic flights', 'Return airfares from your selected New Zealand departure city.'],
                ['Comfortable 4-star hotels', 'Accommodation is arranged throughout the China itinerary.'],
                ['English-speaking local guides', 'Local support and context in each destination.'],
                ['Private sightseeing transport', 'Coach and transfer logistics are handled between included visits.'],
                ['Major entrance fees', 'Admission for the attractions listed in the itinerary.'],
                ['High-speed rail in China', 'Second-class train tickets for the scheduled intercity journeys.'],
                ['Meals shown in the itinerary', 'Daily breakfasts plus the listed lunches and dinners.'],
                ['Airport transfers', 'Private transfers are included as specified in the itinerary.'],
              ].map(([title, body]) => (
                <article key={title} className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary text-sm font-bold text-white">✓</span>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">{body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="grid h-[590px] grid-cols-2 gap-3">
              <div className="relative overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/campaigns/christmas-new-year/zhujiajiao-christmas-day.webp"
                  alt="Canals and traditional buildings in Zhujiajiao water town"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="grid grid-rows-2 gap-3 py-10">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/images/campaigns/christmas-new-year/shanghai-skyline-night.webp"
                    alt="Shanghai skyline illuminated at night"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <Image
                    src="/images/campaigns/christmas-new-year/xian-pagoda-night.webp"
                    alt="Big Wild Goose Pagoda illuminated at night in Xi'an"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Pack once, layer well</span>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">The winter packing list that matters.</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                You do not need specialist expedition gear. You do need warm, comfortable clothing that can be added
                or removed as the day moves between outdoor sights, coaches, trains, hotels and restaurants.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  'Insulated winter coat',
                  'Thermal base layers',
                  'Jumper or fleece',
                  'Gloves, hat and warm socks',
                  'Comfortable shoes with grip',
                  'Compact wind-resistant layer',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
                    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">✓</span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                Practical tip: keep hat and gloves in your day bag rather than your suitcase. Beijing and Xi&apos;an
                evenings feel colder after sunset, while indoor spaces are warm.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="departures" className="scroll-mt-24 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">One date · two departure cities</span>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Choose the flight that starts closer to home.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              Both tours depart on 22 December 2026 and share the same Christmas Eve, Christmas Day and New Year&apos;s Eve experiences.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {departures.map(({ city, tour, days, price, note }) => {
              if (!tour) return null;
              const href = `/tours/china/discovery/${tour.slug}`;
              return (
                <article key={city} className="flex flex-col rounded-3xl border border-warm-200 bg-surface p-7 shadow-sm md:p-9">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Depart {city} · 22 December 2026</p>
                  <h3 className="mt-4 font-serif text-3xl">{city} departure</h3>
                  <p className="mt-2 text-lg font-semibold">{days} · from {price} per person</p>
                  <p className="mt-4 flex-grow leading-relaxed text-ink-muted">{note}</p>
                  <div className="mt-7 flex flex-col gap-3">
                    <a
                      href="#enquiry"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-red-700"
                    >
                      Check availability <Arrow />
                    </a>
                    <Link href={href} className="text-center text-sm font-semibold text-primary hover:underline">
                      View the full {city} itinerary
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 bg-ink py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-secondary">One published departure date</span>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight md:text-5xl">Could this be your Christmas story?</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Tell us whether Auckland or Christchurch suits you. A CTS China specialist will confirm current
              availability, answer your questions and explain the next step. Enquiring does not commit you to book.
            </p>
            <ul className="mt-8 space-y-4 text-white/80">
              {[
                'A real reply from our Auckland-based China team',
                'Ask about rooms, mobility and dietary requirements',
                'TAANZ-bonded and IATA-accredited travel agency',
                'No payment is taken through this form',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-secondary text-sm font-bold text-ink">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 border-t border-white/15 pt-7">
              <p className="text-sm text-white/55">Prefer to talk?</p>
              <a href="tel:0800287888" className="mt-1 inline-block font-serif text-3xl text-white hover:text-secondary">0800 CTS 888</a>
            </div>
          </div>
          <FestiveTourEnquiry />
        </div>
      </section>

      <section className="border-y border-warm-200 bg-surface py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Plan with context</span>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">Read the places behind the itinerary.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {RELATED_GUIDES.map((guide) => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="flex items-center justify-between rounded-2xl border border-warm-200 bg-white px-5 py-4 font-semibold transition-colors hover:border-primary hover:text-primary"
                >
                  {guide.label} <Arrow />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={FAQS}
        subtitle="Straight answers about winter weather, festive dates, packing and departure options."
        contactHref="#enquiry"
      />
      <FloatingCta
        tourName="Christmas & New Year in China"
        tourSlug="china-icons-collection"
        enquirySectionId="enquiry"
      />
    </main>
  );
}
