import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { chongqingToursMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: chongqingToursMeta.title,
    description: chongqingToursMeta.description,
    path: '/chongqing-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/chongqing-yangtze.jpg',
    ogImageAlt: 'Chongqing Tours - Three Gorges, Yangtze River, CTS Tours',
    keywords: ['Chongqing tours New Zealand', 'Three Gorges cruise', 'Yangtze River tours', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function ChongqingToursPage() {
  const tours = getToursByCityName('chongqing');

  const schemas = [
    generateTouristDestinationSchema('Chongqing', chongqingToursMeta.description, '/chongqing-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Chongqing', url: '/chongqing-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={chongqingToursMeta.cityName}
        heroTitle={chongqingToursMeta.h1}
        heroSubtitle={chongqingToursMeta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/wuzhen-canal.jpg"
        introText={chongqingToursMeta.introText}
        highlights={chongqingToursMeta.highlights}
        bestTimeToVisit={chongqingToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={chongqingToursMeta.faqs}
        guideLinks={[
          { label: 'Chongqing Travel Guide', href: '/chongqing-travel-guide', emoji: '🌉', description: 'Mountain city, gorges & hot pot' },
        ]}
      />
    </>
  );
}
