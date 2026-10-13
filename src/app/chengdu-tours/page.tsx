import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { chengduToursMeta } from '@/lib/data/seo-pages';
import { chengduHub, buildDepartureRows, buildSampleItinerary, cheapestPrice, resolveHubTours } from '@/lib/data/destination-hubs';

// Departures and prices come from tours.ts; revalidate so a data edit reaches the live page.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: chengduToursMeta.title,
    description: chengduToursMeta.description,
    path: '/chengdu-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/chengdu-pandas.jpg',
    ogImageAlt: 'Chengdu Tours - Giant Pandas, Sichuan Cuisine, CTS Tours',
    keywords: ['Chengdu tours New Zealand', 'giant pandas Chengdu', 'Sichuan tours', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function ChengduToursPage() {
  const tours = resolveHubTours(chengduHub.tourRefs);

  const schemas = [
    generateTouristDestinationSchema('Chengdu', chengduToursMeta.description, '/chengdu-tours', tours),
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
        cityName={chengduToursMeta.cityName}
        heroTitle={chengduToursMeta.h1}
        heroSubtitle={chengduToursMeta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/chengdu-pandas.jpg"
        introText={chengduToursMeta.introText}
        highlights={chengduToursMeta.highlights}
        bestTimeToVisit={chengduToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={chengduToursMeta.faqs}
        proseSections={chengduHub.prose}
        departureRows={buildDepartureRows(tours.slice(0, chengduHub.featuredCount ?? tours.length), chengduHub.cityPattern)}
        sampleItinerary={buildSampleItinerary(chengduHub)}
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
