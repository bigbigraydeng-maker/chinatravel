import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { chengduToursMeta } from '@/lib/data/seo-pages';
import { chengduHub, buildDepartureRows, buildSampleItinerary, resolveHubTours } from '@/lib/data/destination-hubs';

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
        departureRows={buildDepartureRows(tours, chengduHub.cityPattern)}
        sampleItinerary={buildSampleItinerary(chengduHub)}
        guideLinks={[
          { label: 'Chengdu Travel Guide', href: '/chengdu-travel-guide', icon: 'paw', description: 'Pandas, temples & hot pot' },
          { label: 'Panda Sanctuary Guide', href: '/chengdu-panda-sanctuary', icon: 'paw', description: '200+ pandas · morning feeding · visitor tips' },
          { label: 'Leshan Buddha Guide', href: '/leshan-buddha-travel-guide', icon: 'landmark', description: 'Giant cliffside Buddha visitor tips' },
          { label: 'Panda Sanctuary: Plan Your Visit', href: '/blog/chengdu-panda-sanctuary-experience', icon: 'paw', description: 'Timing, exclusive access & what to book' },
          { label: 'Chengdu Spicy Cuisine', href: '/blog/chengdu-spicy-cuisine-culture', icon: 'flame', description: 'Mala science & must-eat Sichuan dishes' },
          { label: 'Chongqing vs Chengdu', href: '/blog/chongqing-vs-chengdu', icon: 'map', description: 'Which Sichuan-basin city suits you' },
        ]}
      />
    </>
  );
}
