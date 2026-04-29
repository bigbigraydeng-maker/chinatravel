import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTourBySlug, getDestinationBySlug, getToursByDestinationAndTier } from '@/lib/data/tours';
import TourHero from '@/components/tours/TourHero';
import TourHighlights from '@/components/tours/TourHighlights';
import TourItinerary from '@/components/tours/TourItinerary';
import TourInclusions from '@/components/tours/TourInclusions';
import TourGallery from '@/components/tours/TourGallery';
import TourEnquiry from '@/components/tours/TourEnquiry';
import TourTrustSignals from '@/components/tours/TourTrustSignals';
import TourSupportingContentLinks from '@/components/tours/TourSupportingContentLinks';
import ChinaVisaNudge from '@/components/tours/ChinaVisaNudge';
import BakerTourFirstPerson from '@/components/tours/BakerTourFirstPerson';
import CtsDepartureScheduleBlock from '@/components/tours/CtsDepartureScheduleBlock';
import FloatingCta from '@/components/FloatingCta';
import FAQSection from '@/components/FAQSection';
import FacebookFollowStrip from '@/components/FacebookFollowStrip';
import RelatedTours from '@/components/tours/RelatedTours';
import Testimonials from '@/components/Testimonials';
import TrustBar from '@/components/TrustBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import OctoberUrgencyBar from '@/components/campaigns/OctoberUrgencyBar';
import {
  generateTourSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  getTourPageFaqsForTour,
} from '@/lib/schema-tour';
import { getSiteUrl } from '@/lib/site';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { FIRE_FUZZ_CONFIG } from '@/lib/campaigns/fire-fuzz';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: FIRE_FUZZ_CONFIG.metaTitle,
    description: FIRE_FUZZ_CONFIG.metaDescription,
    path: FIRE_FUZZ_CONFIG.campaignPath,
    ogImagePath: 'https://images.unsplash.com/photo-PoFNeom7HC4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    keywords: [
      'China Discovery Fire Fuzz',
      'Chongqing tour New Zealand',
      'Chengdu panda tour',
      'Chongqing Chengdu tour package',
      'CTS Tours November 2026',
      'Hongyadong',
      'Liziba Station',
      'Dazu Rock Carvings',
    ],
  });
}

export default function FireFuzzCampaignPage() {
  const tour = getTourBySlug('china', 'discovery', FIRE_FUZZ_CONFIG.tourSlug);
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
        { name: 'China Discovery', url: '/tours/china/discovery' },
        { name: tour.name, url: FIRE_FUZZ_CONFIG.campaignPath },
      ],
      siteUrl
    ),
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />

      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/tours" className="hover:text-primary transition-colors">Tours</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/tours/china/discovery" className="hover:text-primary transition-colors">
                China Discovery
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{tour.name}</li>
          </ol>
          <Link
            href="/campaigns/october-2026"
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
        departureDates={[FIRE_FUZZ_CONFIG.heroDepartureDate]}
        primaryCtaLabel="Reserve My Seat →"
        secondaryCtaLabel="View itinerary"
        singleSupplement={tour.singleSupplement}
      />

      <OctoberUrgencyBar departureSortDate="2026-11-01" tourSlug="chongqing-chengdu" />

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
                {tour.singleSupplement && (
                  <p className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Single supplement:</span>{' '}
                    {tour.singleSupplement}
                  </p>
                )}
                <div className="mt-6 rounded-2xl border border-primary/20 bg-amber-50/60 p-5">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">
                    Featured departure
                  </p>
                  <p className="text-2xl font-serif font-bold text-gray-900">
                    {FIRE_FUZZ_CONFIG.heroDepartureDate} 2026
                  </p>
                  <p className="mt-1 text-sm text-gray-600">
                    Minimum 15 passengers. Enquire to confirm availability and hold your seat.
                  </p>
                </div>
              </section>

              {tour.destination === 'china' ? <TourSupportingContentLinks tour={tour} /> : null}

              {tour.destination === 'china' && tour.tier === 'discovery' && (
                <CtsDepartureScheduleBlock currentSlug={tour.slug} />
              )}

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

              <TourInclusions inclusions={tour.inclusions} exclusions={tour.exclusions} />

              <TourGallery images={tour.gallery} tourName={tour.name} />

              {faqs.length > 0 && (
                <FAQSection faqs={faqs} />
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <TourEnquiry
                  tourName={tour.name}
                  tourSlug={tour.slug}
                  destination={tour.destination}
                  tier={tour.tier}
                  source={FIRE_FUZZ_CONFIG.enquirySource}
                />

                <Testimonials variant="sidebar" tourFilter={tour.tier} />

                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Quick Info</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-500">Duration</dt>
                      <dd className="font-semibold text-gray-900">{tour.duration}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Price from</dt>
                      <dd className="font-semibold text-gray-900">{tour.price}</dd>
                    </div>
                    {tour.singleSupplement && (
                      <div>
                        <dt className="text-gray-500">Single supplement</dt>
                        <dd className="font-semibold text-gray-900">{tour.singleSupplement}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-gray-500">Departure</dt>
                      <dd className="font-semibold text-gray-900">{FIRE_FUZZ_CONFIG.heroDepartureDate} 2026</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Min. passengers</dt>
                      <dd className="font-semibold text-gray-900">15</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Tier</dt>
                      <dd className="font-semibold text-gray-900 capitalize">{tour.tier}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BakerTourFirstPerson tourSlug={tour.slug} tourName={tour.name} destination={tour.destination} />

      {relatedTours.length > 0 && (
        <RelatedTours tours={relatedTours} destination={tour.destination} tier={tour.tier} />
      )}

      <FloatingCta tourName={tour.name} tourSlug={tour.slug} />
    </>
  );
}
