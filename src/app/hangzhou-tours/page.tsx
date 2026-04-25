import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { hangzhouToursMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: hangzhouToursMeta.title,
    description: hangzhouToursMeta.description,
    path: '/hangzhou-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/hangzhou-west-lake.jpg',
    ogImageAlt: 'Hangzhou Tours - West Lake, Longjing Tea, CTS Tours',
    keywords: ['Hangzhou tours New Zealand', 'West Lake Hangzhou', 'Longjing tea tours', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function HangzhouToursPage() {
  const tours = getToursByCityName('hangzhou');

  const schemas = [
    generateTouristDestinationSchema('Hangzhou', hangzhouToursMeta.description, '/hangzhou-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Hangzhou', url: '/hangzhou-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={hangzhouToursMeta.cityName}
        heroTitle={hangzhouToursMeta.h1}
        heroSubtitle={hangzhouToursMeta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/hangzhou-west-lake.jpg"
        introText={hangzhouToursMeta.introText}
        highlights={hangzhouToursMeta.highlights}
        bestTimeToVisit={hangzhouToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={hangzhouToursMeta.faqs}
        guideLinks={[
          { label: 'Hangzhou Travel Guide', href: '/hangzhou-travel-guide', emoji: '🍵', description: 'West Lake, tea & silk highlights' },
          { label: 'Suzhou Travel Guide', href: '/suzhou-travel-guide', emoji: '🌿', description: 'Classical gardens & canal towns' },
        ]}
      />
    </>
  );
}
