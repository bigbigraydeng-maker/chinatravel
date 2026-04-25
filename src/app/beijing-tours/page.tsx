import { Metadata } from 'next';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { beijingToursMeta } from '@/lib/data/seo-pages';
import { getSiteUrl } from '@/lib/site';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: beijingToursMeta.title,
    description: beijingToursMeta.description,
    path: '/beijing-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
    ogImageAlt: 'Beijing Tours from New Zealand — Great Wall, Forbidden City, CTS Tours',
    keywords: ['Beijing tours New Zealand', 'Great Wall tours', 'Forbidden City', 'Beijing travel', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function BeijingToursPage() {
  const tours = getToursByCityName('beijing');

  const schemas = [
    generateTouristDestinationSchema(
      'Beijing',
      beijingToursMeta.description,
      '/beijing-tours',
      tours
    ),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Beijing', url: '/beijing-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={beijingToursMeta.cityName}
        heroTitle={beijingToursMeta.h1}
        heroSubtitle={beijingToursMeta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg"
        introText={beijingToursMeta.introText}
        highlights={beijingToursMeta.highlights}
        bestTimeToVisit={beijingToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={beijingToursMeta.faqs}
        guideLinks={[
          { label: 'Great Wall Travel Guide', href: '/great-wall-travel-guide', emoji: '🏯', description: 'History, hikes & access tips' },
          { label: 'Forbidden City Travel Guide', href: '/forbidden-city-travel-guide', emoji: '🏛️', description: 'Imperial palace inside out' },
          { label: 'Beijing Travel Guide', href: '/beijing-travel-guide', emoji: '🌆', description: 'Full city visitor guide' },
        ]}
      />
    </>
  );
}
