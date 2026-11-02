import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { type Tour, getDestinationBySlug } from '@/lib/data/tours';
import { getPublishedActiveTours } from '@/lib/data/published-tour-catalog';
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
import { TourDepartureTable, TourBookingTerms, hasDepartureRows } from '@/components/tours/TourGoldenBlocks';
import { getSoloTourPrice } from '@/lib/tour-price';

const overviewHeadings: Record<string, string> = {
  'golden-china': 'A journey through China’s icons.',
  'beijing-xian': 'Two capitals, one clear introduction to China.',
  essentials: 'China’s essential cities, paced for discovery.',
  'shanghai-surroundings': 'Water towns, gardens and the Shanghai skyline.',
  'yunnan-explorer': 'Ancient towns, highland cultures and the road to Shangri-La.',
  zhangjiajie: 'Three days among China’s most cinematic mountain landscapes.',
};

function shortTourName(tour: Tour) {
  return tour.name.replace(/^[^—]+—\s*/, '');
}

function displayPrice(price: string) {
  return price.replace(/\s*(?:per\s+person|pp)\s*$/i, '');
}

export function galleryForTour(tour: Tour) {
  const sources = tour.gallery?.length ? tour.gallery : [tour.heroImage];
  return sources.map((src, index) => ({
    src,
    alt: `${shortTourName(tour)} journey photograph ${index + 1}`,
  }));
}

function dayHeading(day: Tour['itinerary'][number]) {
  if (day.festiveLabel && !day.title.toLowerCase().includes(day.festiveLabel.toLowerCase())) {
    return `${day.festiveLabel}: ${day.title}`;
  }
  return day.title;
}

export default async function UpgradedTourPage({ tour }: { tour: Tour }) {
  const destination = getDestinationBySlug(tour.destination)!;
  const photos = galleryForTour(tour);
  const related = (await getPublishedActiveTours())
    .filter((candidate) => candidate.slug !== tour.slug && candidate.destination === tour.destination && !candidate.soldOut && matchingOffer(candidate, {}))
    .slice(0, 3);
  const leadDeparture = tour.departureDates?.[0];
  const leadPrice = (leadDeparture && tour.departurePricing?.[leadDeparture]) || tour.price;
  const soloTourPrice = tour.singleSupplement ? getSoloTourPrice(leadPrice, tour.singleSupplement) : null;

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
          <h1 className="mt-4 font-serif text-4xl md:text-6xl">{tour.title || shortTourName(tour)}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">{tour.shortDescription}</p>
        </div>
        {tour.soldOut && (
          <section className="mb-8 rounded-2xl border border-primary/20 bg-white p-6">
            <h2 className="font-serif text-3xl text-primary">{tour.departureDates?.[0] ?? 'This departure'} · Sold Out</h2>
            <p className="mt-3 text-ink-muted">
              This departure is fully booked. Explore our current confirmed journeys or ask CTS about future dates.
            </p>
            <Link href="/tours/china/discovery" className="mt-4 inline-block font-semibold text-primary">
              Explore available tours →
            </Link>
          </section>
        )}
        <JourneyGallery images={photos} />
        {!tour.soldOut && (
          <section aria-label="Tour price and departure summary" className="mt-6 overflow-hidden rounded-2xl bg-accent text-white shadow-lg">
            <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1.2fr_auto]">
              <div className="bg-accent px-5 py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/65">Next confirmed departure</p>
                <p className="mt-2 text-lg font-semibold">{leadDeparture ?? 'Please enquire for the next departure'}</p>
                <p className="mt-1 text-xs text-white/65">Scheduled group departure</p>
              </div>
              <div className="bg-accent px-5 py-5">
                <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/65">Twin-share price</p>
                <p className="mt-2 text-xl font-semibold">{displayPrice(leadPrice)}</p>
                <p className="mt-1 text-xs text-white/65">Per person · NZD</p>
              </div>
              {tour.singleSupplement ? (
                <div className="bg-accent px-5 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-secondary">Travelling solo?</p>
                  <p className="mt-2 text-lg font-semibold">Own room + {tour.singleSupplement}</p>
                  <p className="mt-1 text-xs text-white/70">
                    {soloTourPrice ? `${soloTourPrice} total per person` : 'Private room for the full tour'}
                  </p>
                </div>
              ) : (
                <div className="bg-accent px-5 py-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/65">Room basis</p>
                  <p className="mt-2 text-lg font-semibold">Twin share</p>
                  <p className="mt-1 text-xs text-white/65">Ask us about private rooms</p>
                </div>
              )}
              <div className="flex items-center bg-accent px-5 py-5">
                <a href="#enquiry" className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-primary/90 lg:w-auto">
                  Check availability →
                </a>
              </div>
            </div>
          </section>
        )}
      </div>

      <TrustBar />
      <TourTrustSignals />

      <nav aria-label="On this page" className="border-y border-warm-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-7 gap-y-3 px-4 py-5 text-sm font-semibold">
          {[
            ['overview', 'Overview'],
            ...(hasDepartureRows(tour) ? [['departures', 'Dates & prices']] : []),
            ['route-map', 'Route map'],
            ['itinerary', 'Day by day'],
            ['inclusions', 'Inclusions'],
            ...(tour.goldenBlocks && !tour.soldOut ? [['booking-terms', 'Booking terms']] : []),
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

          <TourDepartureTable tour={tour} />

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
                      {dayHeading(day)}<span className="text-lg text-primary" aria-hidden>＋</span>
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
            {tour.singleSupplement && (
              <p className="mt-4 rounded-lg bg-warm-50 px-4 py-3 text-sm text-ink-muted">
                <strong className="text-ink">Room basis:</strong> Prices are per person, twin share. A private room for a solo traveller is an additional <strong className="text-primary">{tour.singleSupplement}</strong> for the full tour.
              </p>
            )}
          </section>

          <TourBookingTerms tour={tour} />
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
            const photo = { src: candidate.heroImage, alt: candidate.title || candidate.name };
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
