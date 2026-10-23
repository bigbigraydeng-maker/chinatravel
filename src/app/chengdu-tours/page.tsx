import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { chengduToursMeta as baseMeta } from '@/lib/data/seo-pages';
import { cityHubMetaForTours } from '@/lib/data/destination-hub-meta';
import { chengduHub, buildDepartureRows, buildSampleItinerary, cheapestPrice, resolveHubTours, hubProseForTours } from '@/lib/data/destination-hubs';
import { getPublishedTours } from '@/lib/data/published-tour-catalog';

// Departures and prices come from tours.ts; revalidate so a data edit reaches the live page.
export const revalidate = 15;

export async function generateMetadata(): Promise<Metadata> {
  const meta = cityHubMetaForTours(baseMeta, await getPublishedTours());
  return buildCtsPageMetadata({
    title: meta.title,
    description: meta.description,
    path: '/chengdu-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/chengdu-pandas.jpg',
    ogImageAlt: 'Chengdu Tours - Giant Pandas, Sichuan Cuisine, CTS Tours',
    keywords: ['Chengdu tours New Zealand', 'giant pandas Chengdu', 'Sichuan tours', 'CTS Tours'],
    ogType: 'website',
  });
}

export default async function ChengduToursPage() {
  const publishedTours = await getPublishedTours();
  const meta = cityHubMetaForTours(baseMeta, publishedTours);
  const tours = resolveHubTours(chengduHub.tourRefs, publishedTours, chengduHub.cityPattern);

  const schemas = [
    generateTouristDestinationSchema('Chengdu', meta.description, '/chengdu-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Chengdu', url: '/chengdu-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={meta.cityName}
        heroTitle={meta.h1}
        heroSubtitle={meta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/chengdu-pandas.jpg"
        introText={meta.introText}
        highlights={meta.highlights}
        bestTimeToVisit={meta.bestTimeToVisit}
        tours={tours}
        faqs={meta.faqs}
        proseSections={hubProseForTours(chengduHub, publishedTours)}
        departureRows={buildDepartureRows(tours.slice(0, chengduHub.featuredCount ?? tours.length), chengduHub.cityPattern)}
        sampleItinerary={buildSampleItinerary(chengduHub, publishedTours)}
        offerSummary={chengduHub.offerSummary}
        startingFrom={cheapestPrice(tours)}
        featuredCount={chengduHub.featuredCount}
        guideLinks={[
          { label: 'Leshan Buddha Guide', href: '/leshan-buddha-travel-guide', icon: 'landmark', description: 'Giant cliffside Buddha visitor tips' },
          { label: 'Panda Sanctuary: Plan Your Visit', href: '/blog/chengdu-panda-sanctuary-experience', icon: 'paw', description: 'Timing, exclusive access & what to book' },
          { label: 'Giant Pandas: Complete Guide', href: '/blog/giant-pandas-chengdu-complete-guide', icon: 'paw', description: 'Planning panda time in Chengdu' },
          { label: 'Things to Do in Chengdu', href: '/blog/chengdu-things-to-do', icon: 'map', description: 'Beyond the pandas' },
        ]}
      />
    </>
  );
}
