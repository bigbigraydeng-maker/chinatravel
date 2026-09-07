import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getTourBySlug,
  getToursByDestinationAndTier,
  getDestinationBySlug,
} from '@/lib/data/tours';
import TourHero from '@/components/tours/TourHero';
import TourHighlights from '@/components/tours/TourHighlights';
import TourItinerary from '@/components/tours/TourItinerary';
import TourInclusions from '@/components/tours/TourInclusions';
import TourGallery from '@/components/tours/TourGallery';
import TourEnquiry from '@/components/tours/TourEnquiry';
import Testimonials from '@/components/Testimonials';
import RelatedTours from '@/components/tours/RelatedTours';
import TrustBar from '@/components/TrustBar';
import TourSupportingContentLinks from '@/components/tours/TourSupportingContentLinks';
import TourTrustSignals from '@/components/tours/TourTrustSignals';
import ChinaVisaNudge from '@/components/tours/ChinaVisaNudge';
import BakerTourFirstPerson from '@/components/tours/BakerTourFirstPerson';
import FloatingCta from '@/components/FloatingCta';
import FAQSection from '@/components/FAQSection';
import FacebookFollowStrip from '@/components/FacebookFollowStrip';
import CtsDepartureScheduleBlock from '@/components/tours/CtsDepartureScheduleBlock';
import SchemaMarkup from '@/components/SchemaMarkup';
import { computeReturnDate } from '@/lib/data/tour-dates';
import OctoberDiscoveryCampaignContent from '@/components/campaigns/OctoberDiscoveryCampaignContent';
import { OctoberCampaignScrollTracker } from '@/components/campaigns/OctoberCampaignScrollTracker';
import {
  OCTOBER_2026_DISCOVERY_BY_SLUG,
  OCTOBER_2026_DISCOVERY_SLUGS,
  isOctober2026DiscoverySlug,
  type October2026DiscoverySlug,
} from '@/lib/campaigns/october-2026-discovery';
import {
  generateTourSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  getTourPageFaqsForTour,
} from '@/lib/schema-tour';
import { getSiteUrl } from '@/lib/site';

export function generateStaticParams() {
  return OCTOBER_2026_DISCOVERY_SLUGS.map((slug) => ({ slug }));
}

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isOctober2026DiscoverySlug(params.slug)) {
    return { title: 'Campaign | CTS Tours' };
  }
  const cfg = OCTOBER_2026_DISCOVERY_BY_SLUG[params.slug];
  const tour = getTourBySlug('china', 'discovery', cfg.tourSlug);
  if (!tour) {
    return { title: 'Campaign | CTS Tours' };
  }
  const siteUrl = getSiteUrl();
  const campaignPath = `/campaigns/october-2026/${params.slug}`;
  const canonicalUrl = `${siteUrl}${campaignPath}`;
  return {
    title: cfg.metaTitleSuffix,
    description: cfg.metaDescription,
    keywords: [
      tour.name,
      'China tour from New Zealand',
      'CTS Tours',
      'October 2026 China departure',
      ...(tour.tags ?? []),
    ],
    openGraph: {
      title: cfg.metaTitleSuffix,
      description: cfg.metaDescription,
      type: 'website',
      url: canonicalUrl,
      images: [{ url: tour.heroImage, width: 1200, height: 630, alt: tour.title }],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function October2026DiscoveryCampaignPage({ params }: PageProps) {
  if (!isOctober2026DiscoverySlug(params.slug)) {
    notFound();
  }

  const campaignSlug: October2026DiscoverySlug = params.slug;
  const cfg = OCTOBER_2026_DISCOVERY_BY_SLUG[campaignSlug];
  const tour = getTourBySlug('china', 'discovery', cfg.tourSlug);

  if (!tour) {
    notFound();
  }

  const destination = getDestinationBySlug(tour.destination);
  if (!destination) {
    notFound();
  }

  const otherCfg = OCTOBER_2026_DISCOVERY_BY_SLUG[cfg.otherCampaignSlug];
  const otherTour = getTourBySlug('china', 'discovery', otherCfg.tourSlug);

  // The 14 & 15 October 2026 departures have both sold out. The LPs stay live
  // so paid traffic already booked against them lands on a real page (and CTS
  // still wants to capture enquiries for future departures), but the countdown
  // urgency bar and October-specific hero copy are replaced by an explicit
  // "Sold Out — book the next departure" banner below.
  const soldOutOctoberDate =
    campaignSlug === 'shanghai-surroundings' ? '14 October 2026' : '15 October 2026';
  const nextDeparture = tour.departureDates?.[0];
  const nextReturnDate = nextDeparture ? computeReturnDate(nextDeparture, tour.duration) : null;

  const relatedTours = getToursByDestinationAndTier(tour.destination, tour.tier)
    .filter((t) => t.slug !== tour.slug)
    .slice(0, 3);

  const faqs = getTourPageFaqsForTour(tour, destination.name);
  const siteUrl = getSiteUrl();

  const schemas = [
    generateTourSchema(tour, destination),
    generateProductSchema(tour),
    generateBreadcrumbSchema(
      [
        { name: 'Home', url: '/' },
        { name: 'October 2026', url: '/campaigns/spotlight' },
        { name: tour.name, url: `/campaigns/october-2026/${campaignSlug}` },
      ],
      siteUrl
    ),
  ];

  return (
    <>
      <OctoberCampaignScrollTracker />
      <SchemaMarkup data={schemas} />

      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/tours" className="hover:text-primary transition-colors">
                Tours
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/campaigns/spotlight" className="hover:text-primary transition-colors">
                October 2026
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{tour.name}</li>
          </ol>
          <Link
            href="/campaigns/spotlight"
            className="text-xs md:text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            ← Back to October 2026 hub
          </Link>
        </div>
      </nav>

      <TourHero
        title={tour.title}
        shortDescription={tour.shortDescription}
        duration={tour.duration}
        price={tour.price}
        heroImage={tour.heroImage}
        tier={tour.tier}
        tags={tour.tags}
        // October departure is sold out; hero now shows only the confirmed
        // upcoming departures pulled from tours.ts.
        departureDates={tour.departureDates}
        primaryCtaLabel="Enquire about a future departure →"
        secondaryCtaLabel="View itinerary"
        singleSupplement={tour.singleSupplement}
      />

      {/* Replaces OctoberUrgencyBar — the countdown was pointed at a departure
          that has since sold out, which was still funnelling enquiries. */}
      <section className="bg-amber-50 border-y border-amber-200 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold mb-1">
            {soldOutOctoberDate} Departure Sold Out
          </p>
          {nextDeparture && (
            <p className="text-lg font-serif font-bold text-gray-900">
              Next Departure: {nextDeparture}
            </p>
          )}
          <p className="text-sm text-gray-600 mt-1">
            {tour.price} per person twin-share. Contact us to register interest in another October window
            or reserve the next confirmed departure.
          </p>
        </div>
      </section>

      <ChinaVisaNudge />

      <TrustBar />

      <TourTrustSignals />

      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              <section id="overview">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Tour Overview</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{tour.shortDescription}</p>
              </section>

              {tour.destination === 'china' ? <TourSupportingContentLinks tour={tour} /> : null}

              {tour.destination === 'china' && (tour.tier === 'signature' || tour.tier === 'discovery') && (
                <CtsDepartureScheduleBlock currentSlug={tour.slug} />
              )}

              <OctoberDiscoveryCampaignContent
                tour={tour}
                campaignSlug={campaignSlug}
                otherCampaignSlug={cfg.otherCampaignSlug}
                otherTourTitle={otherTour?.title ?? 'Our other October Discovery departure'}
              />

              <TourHighlights highlights={tour.highlights} />

              {/* Facebook Follow — inline CTA between highlights and itinerary */}
              <FacebookFollowStrip variant="inline" />

              <TourItinerary
                itinerary={tour.itinerary}
                tourCities={tour.tourCities}
                tourName={tour.name}
                tourSlug={tour.slug}
                destination={tour.destination}
                tier={tour.tier}
              />

              <TourInclusions inclusions={tour.inclusions} exclusions={tour.exclusions} itinerary={tour.itinerary} />

              <TourGallery images={tour.gallery} tourName={tour.name} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <TourEnquiry
                  tourName={tour.name}
                  tourSlug={tour.slug}
                  destination={tour.destination}
                  tier={tour.tier}
                  source={cfg.enquirySource}
                />

                <Testimonials variant="sidebar" tourFilter={tour.tier} />

                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Quick Info</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-600">Destination</dt>
                      <dd className="font-medium capitalize">{tour.destination}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Collection</dt>
                      <dd className="font-medium capitalize">{tour.tier}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Duration</dt>
                      <dd className="font-medium">{tour.duration}</dd>
                    </div>
                    {nextDeparture && (
                      <div>
                        <dt className="text-sm text-gray-600">Next departure</dt>
                        <dd className="font-medium">{nextDeparture}</dd>
                      </div>
                    )}
                    {nextReturnDate && (
                      <div>
                        <dt className="text-sm text-gray-600">Returns</dt>
                        <dd className="font-medium">{nextReturnDate}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm text-gray-600">Price</dt>
                      <dd className="font-medium text-primary">{tour.price}</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/tours/${tour.destination}/${tour.tier}`}
                    className="block text-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View All {tour.tier.charAt(0).toUpperCase() + tour.tier.slice(1)} Tours
                  </Link>
                  <Link
                    href={`/tours/${tour.destination}`}
                    className="block text-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    View All {tour.destination.charAt(0).toUpperCase() + tour.destination.slice(1)} Tours
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BakerTourFirstPerson tourSlug={tour.slug} tourName={tour.name} destination={tour.destination} />

      <RelatedTours tours={relatedTours} destination={tour.destination} tier={tour.tier} />

      <FAQSection faqs={faqs} />

      <FloatingCta tourName={tour.name} tourSlug={tour.slug} enquirySectionId="enquiry" />
    </>
  );
}
