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
import TourTrustSignals from '@/components/tours/TourTrustSignals';
import TourSupportingContentLinks from '@/components/tours/TourSupportingContentLinks';
import ChinaVisaNudge from '@/components/tours/ChinaVisaNudge';
import BakerTourFirstPerson from '@/components/tours/BakerTourFirstPerson';
import { isOctoberCampaignTourSlug } from '@/lib/campaigns/october-campaign-tours';
import FloatingCta from '@/components/FloatingCta';
import FAQSection from '@/components/FAQSection';
import CtsDepartureScheduleBlock from '@/components/tours/CtsDepartureScheduleBlock';
import SchemaMarkup from '@/components/SchemaMarkup';
import {
  generateTourSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  getTourPageFaqsForTour,
} from '@/lib/schema-tour';
import { getSiteUrl } from '@/lib/site';

interface TourPageProps {
  params: {
    destination: string;
    tier: string;
    tour: string;
  };
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const tour = getTourBySlug(params.destination, params.tier, params.tour);
  
  if (!tour) {
    return {
      title: 'Tour Not Found | CTS Tours',
      description: 'The requested tour could not be found.',
    };
  }

  const destination = getDestinationBySlug(tour.destination);

  const titleParts = [tour.name, tour.duration, tour.departureDates?.[0], 'CTS NZ'].filter(Boolean);
  const documentTitle = tour.metaTitle || titleParts.join(' | ');

  return {
    title: documentTitle,
    description: tour.metaDescription,
    keywords: [
      `${tour.destination} tours`,
      `${tour.tier} tours`,
      tour.name,
      'CTS Tours',
      'China travel',
      'China Tour from New Zealand',
      'China tours from New Zealand',
      'Asia tours',
      ...(tour.tags ?? []),
    ],
    openGraph: {
      title: documentTitle,
      description: tour.shortDescription,
      type: 'website',
      url: `/tours/${tour.destination}/${tour.tier}/${tour.slug}`,
      images: [
        {
          url: tour.heroImage,
          width: 1200,
          height: 630,
          alt: `${tour.title} - ${tour.destination} Tour`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: documentTitle,
      description: tour.shortDescription,
      images: [tour.heroImage],
    },
    alternates: {
      canonical: `/tours/${tour.destination}/${tour.tier}/${tour.slug}`,
    },
  };
}

export default function TourPage({ params }: TourPageProps) {
  const tour = getTourBySlug(params.destination, params.tier, params.tour);
  
  if (!tour) {
    notFound();
  }

  const destination = getDestinationBySlug(tour.destination);
  if (!destination) {
    notFound();
  }

  const relatedTours = getToursByDestinationAndTier(tour.destination, tour.tier)
    .filter(t => t.slug !== tour.slug)
    .slice(0, 3);

  const faqs = getTourPageFaqsForTour(tour, destination.name);
  const siteUrl = getSiteUrl();
  const isOctoberCampaignTour = isOctoberCampaignTourSlug(tour.slug);

  const schemas = [
    generateTourSchema(tour, destination),
    generateProductSchema(tour),
    generateBreadcrumbSchema(
      [
        { name: 'Home', url: '/' },
        { name: 'Tours', url: '/tours' },
        { name: tour.destination, url: `/tours/${tour.destination}` },
        { name: tour.tier, url: `/tours/${tour.destination}/${tour.tier}` },
        { name: tour.name, url: `/tours/${tour.destination}/${tour.tier}/${tour.slug}` },
      ],
      siteUrl
    ),
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
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
              <Link 
                href={`/tours/${tour.destination}`} 
                className="hover:text-primary transition-colors capitalize"
              >
                {tour.destination}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link 
                href={`/tours/${tour.destination}/${tour.tier}`} 
                className="hover:text-primary transition-colors capitalize"
              >
                {tour.tier}
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{tour.name}</li>
          </ol>
        </div>
      </nav>

      {/* Tour Hero */}
      <TourHero 
        title={tour.title}
        shortDescription={tour.shortDescription}
        duration={tour.duration}
        price={tour.price}
        heroImage={tour.heroImage}
        tier={tour.tier}
        tags={tour.tags}
        departureDates={tour.departureDates}
        primaryCtaLabel={isOctoberCampaignTour ? 'Enquire for October departures' : undefined}
        secondaryCtaLabel={isOctoberCampaignTour ? 'View day-by-day itinerary' : undefined}
      />

      <BakerTourFirstPerson tourSlug={tour.slug} tourName={tour.name} destination={tour.destination} />

      {isOctoberCampaignTour ? <ChinaVisaNudge /> : null}

      <TrustBar />

      <TourTrustSignals />

      {/* Tour Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Overview */}
              <section id="overview">
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Tour Overview
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {tour.shortDescription}
                </p>
                {tour.singleSupplement && (
                  <p className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold text-gray-800">Single supplement:</span>{' '}
                    {tour.singleSupplement}
                  </p>
                )}
              </section>

              {tour.destination === 'china' ? <TourSupportingContentLinks tour={tour} /> : null}

              {tour.destination === 'china' && (tour.tier === 'signature' || tour.tier === 'discovery') && (
                <CtsDepartureScheduleBlock currentSlug={tour.slug} />
              )}

              {/* Highlights */}
              <TourHighlights highlights={tour.highlights} />

              {/* Itinerary */}
              <TourItinerary
                itinerary={tour.itinerary}
                tourCities={tour.tourCities}
                tourName={tour.name}
                tourSlug={tour.slug}
                destination={tour.destination}
                tier={tour.tier}
              />


              {/* Inclusions & Exclusions */}
              <TourInclusions 
                inclusions={tour.inclusions} 
                exclusions={tour.exclusions} 
              />

              {/* Gallery */}
              <TourGallery images={tour.gallery} tourName={tour.name} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <TourEnquiry
                  tourName={tour.name}
                  tourSlug={tour.slug}
                  destination={tour.destination}
                  tier={tour.tier}
                />

                {/* Testimonials */}
                <Testimonials variant="sidebar" tourFilter={tour.tier} />

                {/* Quick Info Card */}
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
                    <div>
                      <dt className="text-sm text-gray-600">Price</dt>
                      <dd className="font-medium text-primary">{tour.price}</dd>
                    </div>
                  </dl>
                </div>

                {/* Back Links */}
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

      {/* Related Tours */}
      <RelatedTours 
        tours={relatedTours} 
        destination={tour.destination}
        tier={tour.tier}
      />

      <FAQSection faqs={faqs} />

      {/* Floating CTA for Mobile */}
      <FloatingCta
        tourName={tour.name}
        tourSlug={tour.slug}
        enquirySectionId="enquiry"
      />
    </>
  );
}
