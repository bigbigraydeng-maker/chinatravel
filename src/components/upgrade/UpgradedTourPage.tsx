import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { type Tour, getAllActiveTours, getDestinationBySlug } from '@/lib/data/tours';
import { getTourPageFaqsForTour } from '@/lib/schema-tour';
import { experiences, includesExperience, matchingOffer, tourUrl } from '@/lib/tour-discovery';
import JourneyGallery from './JourneyGallery';
import UpgradedTourBooking from './UpgradedTourBooking';
import TourRouteMap from '@/components/tours/TourRouteMap';
import TourInclusions from '@/components/tours/TourInclusions';
import TourSupportingContentLinks from '@/components/tours/TourSupportingContentLinks';
import ItineraryActions from '@/components/tours/ItineraryActions';
import TrustBar from '@/components/TrustBar';
import TourTrustSignals from '@/components/tours/TourTrustSignals';
import FAQSection from '@/components/FAQSection';

const goldenDayHeadings: Record<number, string> = {
  1: 'Your journey begins',
  2: 'A welcome to Beijing',
  3: 'The heart of imperial Beijing',
  4: 'Walk the Great Wall',
  5: 'Hutong life & palace gardens',
  6: 'By rail to ancient Xi’an',
  7: 'Meet the Terracotta Warriors',
  8: 'City walls to Shanghai skylines',
  9: 'A water town & an evening river cruise',
  10: 'Gardens, museums & the Bund',
  11: 'Shanghai at your own pace',
  12: 'Welcome home',
};

const relatedImages: Record<string, { src: string; alt: string }> = {
  'beijing-xian': { src: '/images/cts-upgrade/tour-terracotta.webp', alt: 'Terracotta Warriors in Xi’an' },
  essentials: { src: '/images/cts-upgrade/spotlight-temple-landscape.webp', alt: 'The complete Temple of Heaven seen through an arch in Beijing' },
};

const goldenPhotos = [
  { src: '/images/cts-upgrade/experience-wall.webp', alt: 'The Great Wall, China' },
  { src: '/images/cts-upgrade/tour-terracotta.webp', alt: 'The Terracotta Warriors in Xi’an' },
  { src: '/images/cts-upgrade/search-bund.webp', alt: 'Shanghai’s waterfront skyline' },
  { src: '/images/cts-upgrade/tour-temple.webp', alt: 'The Temple of Heaven in Beijing' },
];

const galleryAlts: Record<string, string[]> = {
  'china-icons-collection': [
    'Shanghai skyline dressed for Christmas and New Year',
    'Shanghai illuminated at night during the festive season',
    'The Great Wall in winter mist',
    'Aerial view across Beijing’s Forbidden City',
    'The Terracotta Warriors in Xi’an',
    'An illuminated Chinese pagoda at night',
  ],
  'china-icons-collection-christchurch': [
    'Shanghai’s illuminated Nanjing Road during the festive season',
    'Shanghai illuminated at night during the festive season',
    'The Great Wall in winter mist',
    'Aerial view across Beijing’s Forbidden City',
    'The Terracotta Warriors in Xi’an',
    'An illuminated Chinese pagoda at night',
  ],
  'beijing-xian': [
    'Golden guardian lion at Beijing’s Forbidden City',
    'The Terracotta Warriors in Xi’an',
  ],
  essentials: [
    'Shanghai’s illuminated skyline at night',
    'Canals and traditional buildings in a Jiangnan water town',
  ],
  'shanghai-surroundings': [
    'A traditional canal town in the Yangtze Delta',
    'Shanghai’s illuminated waterfront at night',
  ],
  'yunnan-explorer': [
    'Songzanlin Monastery reflected in Lamuyangcuo Lake, Shangri-La',
    'The Three Pagodas beneath the Cangshan Mountains near Dali',
    'A canal running through Lijiang Old Town',
    'A traditional village in Yunnan’s highland landscape',
    'Songzanlin Monastery in Shangri-La',
  ],
  zhangjiajie: [
    'Sandstone peaks across Zhangjiajie National Forest Park',
    'The Avatar-like sandstone spires of Zhangjiajie',
    'Zhangjiajie Grand Canyon Glass Bridge',
    'The cliff-edge glass walkway on Tianmen Mountain',
    'Zhangjiajie railway station, the starting point for this stopover',
  ],
};

const additionalGalleryImages: Record<string, { src: string; alt: string }[]> = {
  'beijing-xian': [
    { src: '/images/tours/great-wall-green.jpg', alt: 'The Great Wall crossing green mountain ridges near Beijing' },
    { src: '/images/tours/beijing-temple-2.jpg', alt: 'Imperial architecture at the Temple of Heaven in Beijing' },
    { src: '/images/tours/xian-terracotta-2.jpg', alt: 'Rows of Terracotta Warriors in Xi’an' },
  ],
  essentials: [
    { src: '/images/tours/great-wall-cloud-sea.jpg', alt: 'The Great Wall rising above a sea of clouds' },
    { src: '/images/tours/beijing-temple.jpg', alt: 'The Temple of Heaven in Beijing' },
    { src: '/images/tours/xian-terracotta.jpg', alt: 'Terracotta Warriors archaeological site in Xi’an' },
  ],
  'shanghai-surroundings': [
    { src: '/images/blog/inline/jiangnan-water-town.webp', alt: 'Red lanterns beside a canal in a Jiangnan water town' },
    { src: '/images/cts-upgrade/planner-westlake.webp', alt: 'West Lake and traditional gardens in Hangzhou' },
    { src: '/images/tours/shanghai-yuyuan-night.jpg', alt: 'Traditional architecture near Yu Garden illuminated at night' },
  ],
};

const localGallerySources: Record<string, string[]> = {
  'china-icons-collection': [
    'https://glbdnayojixmexgofbsd.supabase.co/storage/v1/object/public/visual-assets/group-tours/christmas-shanghai/hero.png',
    '/images/tours/shanghai-night-red.jpg',
    '/images/tours/great-wall-mist.jpg',
    '/images/tours/forbidden-city-aerial.jpg',
    '/images/tours/xian-terracotta.jpg',
    '/images/tours/china-pagoda-night.jpg',
  ],
  'china-icons-collection-christchurch': [
    '/images/campaigns/christmas-new-year/festive-china-og.webp',
    '/images/tours/shanghai-night-red.jpg',
    '/images/tours/great-wall-mist.jpg',
    '/images/tours/forbidden-city-aerial.jpg',
    '/images/tours/xian-terracotta.jpg',
    '/images/tours/china-pagoda-night.jpg',
  ],
  'beijing-xian': [
    '/images/tours/forbidden-city-gold-lion.jpg',
    '/images/tours/xian-terracotta.jpg',
  ],
  essentials: [
    '/images/tours/shanghai-night-blue.jpg',
    '/images/tours/wuzhen-canal.jpg',
  ],
  'shanghai-surroundings': [
    '/images/tours/wuzhen-canal.jpg',
    '/images/tours/shanghai-night-red.jpg',
  ],
  'yunnan-explorer': [
    '/images/tours/shangri-la-monastery-lake.jpg',
    '/blog/sourced/dali-three-pagodas.jpg',
    '/blog/sourced/lijiang-old-town-canal.jpg',
    '/images/tours/yunnan-village.jpg',
    '/images/tours/shangri-la-monastery.jpg',
  ],
  zhangjiajie: [
    '/images/guides/zhangjiajie/huangshizhai-panorama.jpg',
    '/images/guides/zhangjiajie/sandstone-spires.jpg',
    '/images/guides/zhangjiajie/grand-canyon-glass-bridge.jpg',
    '/images/tours/tianmen-mountain-glass-walkway.jpg',
    '/images/guides/zhangjiajie/zhangjiajie-railway-station.jpg',
  ],
};

const overviewHeadings: Record<string, string> = {
  'golden-china': 'A journey through China’s icons.',
  'china-icons-collection': 'Celebrate the season across China’s great cities.',
  'china-icons-collection-christchurch': 'A direct South Island departure for China’s festive season.',
  'beijing-xian': 'Two capitals, one clear introduction to China.',
  essentials: 'China’s essential cities, paced for discovery.',
  'shanghai-surroundings': 'Water towns, gardens and the Shanghai skyline.',
  'yunnan-explorer': 'Ancient towns, highland cultures and the road to Shangri-La.',
  zhangjiajie: 'Three days among China’s most cinematic mountain landscapes.',
};

function shortTourName(tour: Tour) {
  return tour.name.replace(/^[^—]+—\s*/, '');
}

function galleryForTour(tour: Tour) {
  if (tour.slug === 'golden-china') return goldenPhotos;
  const sources = localGallerySources[tour.slug] ?? (tour.gallery?.length ? tour.gallery : [tour.heroImage]);
  const alts = galleryAlts[tour.slug] ?? [];
  const primary = sources.map((src, index) => ({
    src,
    alt: alts[index] ?? `${shortTourName(tour)} journey photograph ${index + 1}`,
  }));
  return [...primary, ...(additionalGalleryImages[tour.slug] ?? [])];
}

function dayHeading(tour: Tour, day: Tour['itinerary'][number]) {
  if (tour.slug === 'golden-china') return goldenDayHeadings[day.day] || day.title;
  if (day.festiveLabel && !day.title.toLowerCase().includes(day.festiveLabel.toLowerCase())) {
    return `${day.festiveLabel}: ${day.title}`;
  }
  return day.title;
}

export default function UpgradedTourPage({ tour }: { tour: Tour }) {
  const destination = getDestinationBySlug(tour.destination)!;
  const photos = galleryForTour(tour);
  const related = getAllActiveTours()
    .filter((candidate) => candidate.slug !== tour.slug && candidate.destination === tour.destination && matchingOffer(candidate, {}))
    .sort((a, b) => Number(b.departureDates?.some((date) => date.includes('December 2026'))) - Number(a.departureDates?.some((date) => date.includes('December 2026'))))
    .slice(0, 3);

  return (
    <div className="bg-surface text-ink">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-6">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-muted">
          <Link href="/">Home</Link> / <Link href="/tours/find">Tours</Link> / {tour.name}
        </nav>
        <div className="mb-8 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">
            {destination.name} · {tour.tier} · {tour.duration}
          </p>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl">{shortTourName(tour)}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{tour.shortDescription}</p>
        </div>
        {tour.soldOut && (
          <section className="mb-8 rounded-2xl border border-primary/20 bg-white p-6">
            <h2 className="font-serif text-3xl text-primary">{tour.departureDates?.[0] ?? 'This departure'} · Sold Out</h2>
            <p className="mt-3 text-ink-muted">
              {tour.slug === 'golden-china'
                ? 'This Golden China departure is fully booked. Join our Christmas & New Year journeys departing Auckland or Christchurch on 22 December 2026.'
                : 'This departure is fully booked. Explore our current confirmed journeys or ask CTS about future dates.'}
            </p>
            <Link href="/campaigns/spotlight" className="mt-4 inline-block font-semibold text-primary">
              {tour.slug === 'golden-china' ? 'Explore December tours →' : 'Explore available tours →'}
            </Link>
          </section>
        )}
        <JourneyGallery images={photos} />
      </div>

      <TrustBar />
      <TourTrustSignals />

      <nav aria-label="On this page" className="border-y border-warm-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-7 gap-y-3 px-4 py-5 text-sm font-semibold">
          {[
            ['overview', 'Overview'],
            ['route-map', 'Route map'],
            ['itinerary', 'Day by day'],
            ['inclusions', 'Inclusions'],
            ['planning-resources', 'Travel guides'],
            ['enquiry', tour.soldOut ? 'Available alternatives' : 'Enquire'],
          ].map(([id, label]) => <a key={id} href={`#${id}`} className="text-primary hover:underline">{label}</a>)}
        </div>
      </nav>

      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <div className="min-w-0 space-y-14">
          <section id="overview" className="scroll-mt-24">
            {tour.quickAnswer && (
              <aside className="mb-8 rounded-2xl border border-primary/20 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Quick answer</p>
                <p className="mt-3 leading-relaxed text-ink">{tour.quickAnswer}</p>
              </aside>
            )}
            <h2 className="font-serif text-3xl">{overviewHeadings[tour.slug] ?? 'The experiences that shape this journey.'}</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {tour.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 rounded-xl border border-warm-200 bg-white p-4 text-sm leading-relaxed">
                  <span className="text-primary" aria-hidden>✦</span>{highlight}
                </li>
              ))}
            </ul>
            <h3 className="mt-8 font-semibold">Experiences included in this journey</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {experiences.filter((experience) => includesExperience(tour, experience.id)).map((experience) => (
                <Link key={experience.id} href={`/tours/find?experience=${experience.id}`} className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm text-primary">
                  {experience.title} ↗
                </Link>
              ))}
            </div>
          </section>

          <section id="route-map" className="scroll-mt-24">
            <h2 className="mb-6 font-serif text-3xl">Your route at a glance.</h2>
            <TourRouteMap slug={tour.slug} tourName={tour.name} />
          </section>

          <section id="itinerary" className="scroll-mt-24">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
              <h2 className="font-serif text-3xl">Your journey, day by day.</h2>
              <ItineraryActions tourName={tour.name} tourSlug={tour.slug} destination={tour.destination} tier={tour.tier} variant="toolbar" />
            </div>
            <div className="ml-3 border-l border-secondary/50 pl-7 md:pl-10">
              {tour.itinerary.map((day) => (
                <details key={day.day} open={day.day === 1} className="relative border-b border-warm-200 py-6 first:pt-0">
                  <span className="absolute -left-[35px] top-7 h-3 w-3 rounded-full border-2 border-surface bg-primary md:-left-[47px]" aria-hidden />
                  <summary className="cursor-pointer list-none">
                    <span className="text-xs font-semibold uppercase tracking-[.15em] text-primary">
                      Day {String(day.day).padStart(2, '0')}{day.festiveLabel ? ` · ${day.festiveLabel}` : ''}
                    </span>
                    <h3 className="mt-2 flex justify-between gap-4 font-serif text-xl md:text-2xl">
                      {dayHeading(tour, day)}<span className="text-lg text-primary" aria-hidden>＋</span>
                    </h3>
                    <p className="mt-2 text-sm text-ink-muted">
                      {day.meals.length ? `${day.meals.join(', ')} · ` : ''}View full day
                    </p>
                  </summary>
                  <div className="mt-5 text-ink-muted">
                    <p className="whitespace-pre-line leading-relaxed">{day.description}</p>
                    <p className="mt-4 text-sm"><strong>Meals:</strong> {day.meals.length ? day.meals.join(', ') : 'See day description'}</p>
                    {day.accommodation && <p className="mt-2 text-sm"><strong>Stay:</strong> {day.accommodation}</p>}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="inclusions" className="scroll-mt-24">
            <TourInclusions inclusions={tour.inclusions} exclusions={tour.exclusions} itinerary={tour.itinerary} />
            {tour.singleSupplement && <p className="mt-4 text-sm">Single supplement: {tour.singleSupplement}</p>}
          </section>
        </div>
        <Suspense fallback={<a href="/contact">Contact CTS to enquire about this journey</a>}>
          <UpgradedTourBooking tour={tour} />
        </Suspense>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <TourSupportingContentLinks tour={tour} wide />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="font-serif text-3xl">You may also like.</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((candidate) => {
            const offer = matchingOffer(candidate, {})!;
            const photo = relatedImages[candidate.slug] ?? { src: candidate.heroImage, alt: candidate.name };
            return (
              <Link href={`${tourUrl(candidate)}${offer.date ? `?date=${offer.date}` : ''}`} key={candidate.id} className="overflow-hidden rounded-2xl border border-warm-200 bg-white">
                <div className="relative aspect-[16/10]">
                  <Image src={photo.src} alt={photo.alt} unoptimized={photo.src.startsWith('/')} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-primary">{candidate.duration} · {candidate.tier}</p>
                  <h3 className="mt-3 font-serif text-2xl">{candidate.name}</h3>
                  <p className="mt-3 line-clamp-2 text-sm text-ink-muted">{candidate.shortDescription}</p>
                  <p className="mt-5 text-sm">{offer.label}</p>
                  <p className="mt-2 font-semibold text-primary">
                    {offer.price.replace(/\s*(?:per\s+person|pp)\s*$/i, '')} <span className="text-xs font-normal">per person</span> →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <FAQSection faqs={getTourPageFaqsForTour(tour, destination.name)} />
    </div>
  );
}
