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
import {
  generateTourSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  getTourPageFaqsForTour,
} from '@/lib/schema-tour';
import { getSiteUrl } from '@/lib/site';
import CampaignWelcomeBanner from './_components/CampaignWelcomeBanner';
import StickyPriceBar from './_components/StickyPriceBar';
import WhyCtsBadgeRow from './_components/WhyCtsBadgeRow';
import BigStatsBlock from './_components/BigStatsBlock';
import CustomerTripPhotos from '@/app/china-tours/_components/CustomerTripPhotos';

/**
 * Paid-traffic landing page for the flagship "Best of China" (Essentials) tour.
 * Conversion-focused variant of the standard product page: campaign hero CTA,
 * scheduled-departure scarcity strip, trust signals up top, and a sticky
 * enquiry form — for Google/Facebook ads to land on (UTM is captured globally
 * by <TrackingScripts> and submitted with the enquiry for attribution).
 */
const TOUR_SLUG = 'essentials';
const ENQUIRY_SOURCE = 'Campaign LP: Best of China';

export function generateMetadata(): Metadata {
  const tour = getTourBySlug('china', 'discovery', TOUR_SLUG);
  if (!tour) return { title: 'Best of China | CTS Tours' };

  const siteUrl = getSiteUrl();
  const canonicalUrl = `${siteUrl}/campaigns/best-of-china`;
  return {
    title: tour.metaTitle || `${tour.name} | CTS Tours`,
    description: tour.metaDescription,
    keywords: [tour.name, 'China tour from New Zealand', 'CTS Tours', ...(tour.tags ?? [])],
    openGraph: {
      title: tour.name,
      description: tour.metaDescription,
      type: 'website',
      url: canonicalUrl,
      images: [{ url: tour.heroImage, width: 1200, height: 630, alt: tour.title }],
    },
    alternates: { canonical: canonicalUrl },
  };
}

export default function BestOfChinaLandingPage() {
  const tour = getTourBySlug('china', 'discovery', TOUR_SLUG);
  if (!tour) notFound();

  const destination = getDestinationBySlug(tour.destination);
  if (!destination) notFound();

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
        { name: 'Tours', url: '/tours' },
        { name: tour.name, url: '/campaigns/best-of-china' },
      ],
      siteUrl
    ),
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />

      <StickyPriceBar />
      <CampaignWelcomeBanner />

      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="inline-block py-1 hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{tour.name}</li>
          </ol>
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
        departureDates={tour.departureDates}
        primaryCtaLabel="Reserve Your Place →"
        secondaryCtaLabel="View itinerary"
        singleSupplement={tour.singleSupplement}
      />

      {tour.departureDates && tour.departureDates.length > 0 && (
        <div className="bg-amber-50 border-y border-amber-200 py-4">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm uppercase tracking-wider text-amber-700 font-semibold mb-1">
              Scheduled small-group departures
            </p>
            <p className="text-lg font-serif font-bold text-gray-900">
              {tour.departureDates.join(' · ')}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Limited places per departure — reserve early to secure your date.
            </p>
          </div>
        </div>
      )}

      <WhyCtsBadgeRow />

      <BigStatsBlock />

      {/* LLM-friendly TL;DR for AI Overview / ChatGPT / Perplexity citation
          (mirror of the Quick Answer block PR #72 added to /china-tours).
          Sourced from tour.* fields so updates to tours.ts propagate without
          a separate copy edit. */}
      <section className="bg-white">
        <div className="container mx-auto px-4 pt-10 md:pt-12">
          <aside
            aria-label="Quick answer"
            className="relative max-w-4xl rounded-2xl overflow-hidden shadow-sm border border-amber-100 bg-gradient-to-br from-warm-50 via-white to-amber-50/40"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-500 via-amber-600 to-orange-500" />
            <div className="px-6 md:px-8 py-6 md:py-7">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  Quick answer
                </p>
                <span className="text-2xl md:text-3xl font-serif font-bold text-gray-900 leading-none">
                  {tour.price}
                </span>
                <span className="text-sm md:text-base text-gray-600 font-medium">
                  · {tour.duration} · Auckland departures
                </span>
              </div>
              <p className="text-gray-800 leading-relaxed">
                <span className="font-bold">{tour.name}</span> is a{' '}
                {tour.duration.toLowerCase()}, Auckland-departing China tour covering Beijing,
                Xi&apos;an, Hangzhou, a Jiangnan water-town stop, and Shanghai. Lead-in price{' '}
                <span className="font-semibold">{tour.price}</span> including return
                international airfares from Auckland, English-speaking guides, hotel
                accommodation, and entrance fees per itinerary.
                {tour.departureDates && tour.departureDates.length > 0 && (
                  <> Scheduled small-group departures: {tour.departureDates.join(', ')}.</>
                )}
                {' '}Backed by CTS — global China travel brand since 1928, NZ team
                25 years. NZ ordinary passport holders currently enjoy visa-free entry
                of up to 30 days, published through 31 December 2026.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <CustomerTripPhotos />

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

              <TourSupportingContentLinks tour={tour} />

              <CtsDepartureScheduleBlock currentSlug={tour.slug} />

              <TourHighlights highlights={tour.highlights} />

              <FacebookFollowStrip variant="inline" />

              <TourItinerary
                itinerary={tour.itinerary}
                tourCities={tour.tourCities}
                tourName={tour.name}
                tourSlug={tour.slug}
                destination={tour.destination}
                tier={tour.tier}
              />

              <TourInclusions inclusions={tour.inclusions} exclusions={tour.exclusions} />

              <TourGallery images={tour.gallery} tourName={tour.name} />
            </div>

            <div id="enquiry" className="lg:col-span-1 scroll-mt-24">
              <div className="sticky top-24 space-y-6">
                <TourEnquiry
                  tourName={tour.name}
                  tourSlug={tour.slug}
                  destination={tour.destination}
                  tier={tour.tier}
                  source={ENQUIRY_SOURCE}
                />

                <Testimonials variant="sidebar" tourFilter={tour.tier} />

                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Quick Info</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-600">Duration</dt>
                      <dd className="font-medium">{tour.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Price</dt>
                      <dd className="font-medium text-primary">{tour.price}</dd>
                    </div>
                  </dl>
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
