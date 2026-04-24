import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { xianToursMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: xianToursMeta.title,
    description: xianToursMeta.description,
    path: '/xian-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/xian-terracotta.jpg',
    ogImageAlt: "Xi'an Tours - Terracotta Warriors, Ancient City Wall, CTS Tours",
    keywords: ['Xian tours New Zealand', 'Terracotta Warriors', 'Xian travel', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function XianToursPage() {
  const tours = getToursByCityName("xi'an");

  const schemas = [
    generateTouristDestinationSchema("Xi'an", xianToursMeta.description, '/xian-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: "Xi'an", url: '/xian-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={xianToursMeta.cityName}
        heroTitle={xianToursMeta.h1}
        heroSubtitle={xianToursMeta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/xian-terracotta.jpg"
        introText={xianToursMeta.introText}
        highlights={xianToursMeta.highlights}
        bestTimeToVisit={xianToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={xianToursMeta.faqs}
      />
    </>
  );
}
