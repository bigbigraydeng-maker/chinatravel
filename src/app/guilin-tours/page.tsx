import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { guilinToursMeta } from '@/lib/data/seo-pages';
import { guilinHub, buildDepartureRows, buildSampleItinerary, resolveHubTours } from '@/lib/data/destination-hubs';

// Departures and prices come from tours.ts; revalidate so a data edit reaches the live page.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: guilinToursMeta.title,
    description: guilinToursMeta.description,
    path: '/guilin-tours',
    ogImagePath: '/images/tours/yangshuo-karst-aerial.jpg',
    ogImageAlt: 'Guilin Tours - Li River Cruise, Karst Mountains, CTS Tours',
    keywords: ['Guilin tours New Zealand', 'Li River cruise', 'karst landscape tours', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function GuilinToursPage() {
  const tours = resolveHubTours(guilinHub.tourRefs);

  const schemas = [
    generateTouristDestinationSchema('Guilin', guilinToursMeta.description, '/guilin-tours', tours),
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
        cityName={guilinToursMeta.cityName}
        heroTitle={guilinToursMeta.h1}
        heroSubtitle={guilinToursMeta.heroSubtitle}
        heroImage="/images/tours/yangshuo-karst-aerial.jpg"
        introText={guilinToursMeta.introText}
        highlights={guilinToursMeta.highlights}
        bestTimeToVisit={guilinToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={guilinToursMeta.faqs}
        proseSections={guilinHub.prose}
        departureRows={buildDepartureRows(tours, guilinHub.cityPattern)}
        sampleItinerary={buildSampleItinerary(guilinHub)}
        guideLinks={[
          { label: 'Guilin Travel Guide', href: '/guilin-travel-guide', icon: 'mountain', description: 'Karst peaks & Li River overview' },
          { label: 'Li River Travel Guide', href: '/li-river-travel-guide', icon: 'ship', description: 'Cruise guide & scenic tips' },
          { label: 'Yangshuo Travel Guide', href: '/yangshuo-travel-guide', icon: 'bike', description: 'Village cycling & countryside hikes' },
          { label: 'Chengdu Tours', href: '/chengdu-tours', icon: 'paw', description: 'Pandas, Jinli Street & Sichuan cuisine' },
          { label: 'Tailor-made Trips', href: '/tailor-made', icon: 'compass', description: 'Build your own China itinerary' },
        ]}
      />
    </>
  );
}
