import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { suzhouToursMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: suzhouToursMeta.title,
    description: suzhouToursMeta.description,
    path: '/suzhou-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/suzhou-canal.jpg',
    ogImageAlt: 'Suzhou Tours - Classical Gardens, Canal Towns, CTS Tours',
    keywords: ['Suzhou tours New Zealand', 'Suzhou classical gardens', 'Suzhou canal tours', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function SuzhouToursPage() {
  const tours = getToursByCityName('suzhou');

  const schemas = [
    generateTouristDestinationSchema('Suzhou', suzhouToursMeta.description, '/suzhou-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Suzhou', url: '/suzhou-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={suzhouToursMeta.cityName}
        heroTitle={suzhouToursMeta.h1}
        heroSubtitle={suzhouToursMeta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/suzhou-canal.jpg"
        introText={suzhouToursMeta.introText}
        highlights={suzhouToursMeta.highlights}
        bestTimeToVisit={suzhouToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={suzhouToursMeta.faqs}
        guideLinks={[
          { label: 'Suzhou Travel Guide', href: '/suzhou-travel-guide', emoji: '🌿', description: 'UNESCO gardens & canal visitor tips' },
          { label: 'Hangzhou Travel Guide', href: '/hangzhou-travel-guide', emoji: '🍵', description: 'West Lake & Longjing tea guide' },
        ]}
      />
    </>
  );
}
