import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { guilinToursMeta as baseMeta } from '@/lib/data/seo-pages';
import { cityHubMetaForTours } from '@/lib/data/destination-hub-meta';
import { guilinHub, buildDepartureRows, buildSampleItinerary, cheapestPrice, resolveHubTours, hubProseForTours } from '@/lib/data/destination-hubs';
import { getPublishedTours } from '@/lib/data/published-tour-catalog';

// Departures and prices come from tours.ts; revalidate so a data edit reaches the live page.
export const revalidate = 15;

export async function generateMetadata(): Promise<Metadata> {
  const meta = cityHubMetaForTours(baseMeta, await getPublishedTours());
  return buildCtsPageMetadata({
    title: meta.title,
    description: meta.description,
    path: '/guilin-tours',
    ogImagePath: '/images/tours/yangshuo-karst-aerial.jpg',
    ogImageAlt: 'Guilin Tours - Li River Cruise, Karst Mountains, CTS Tours',
    keywords: ['Guilin tours New Zealand', 'Li River cruise', 'karst landscape tours', 'CTS Tours'],
    ogType: 'website',
  });
}

export default async function GuilinToursPage() {
  const publishedTours = await getPublishedTours();
  const meta = cityHubMetaForTours(baseMeta, publishedTours);
  const tours = resolveHubTours(guilinHub.tourRefs, publishedTours, guilinHub.cityPattern);

  const schemas = [
    generateTouristDestinationSchema('Guilin', meta.description, '/guilin-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Guilin', url: '/guilin-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={meta.cityName}
        heroTitle={meta.h1}
        heroSubtitle={meta.heroSubtitle}
        heroImage="/images/tours/yangshuo-karst-aerial.jpg"
        introText={meta.introText}
        highlights={meta.highlights}
        bestTimeToVisit={meta.bestTimeToVisit}
        tours={tours}
        faqs={meta.faqs}
        proseSections={hubProseForTours(guilinHub, publishedTours)}
        departureRows={buildDepartureRows(tours.slice(0, guilinHub.featuredCount ?? tours.length), guilinHub.cityPattern)}
        sampleItinerary={buildSampleItinerary(guilinHub, publishedTours)}
        offerSummary={guilinHub.offerSummary}
        startingFrom={cheapestPrice(tours)}
        featuredCount={guilinHub.featuredCount}
      />
    </>
  );
}
