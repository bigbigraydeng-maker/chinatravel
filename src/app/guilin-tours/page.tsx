import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { guilinToursMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: guilinToursMeta.title,
    description: guilinToursMeta.description,
    path: '/guilin-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/guilin-river-valley.jpg',
    ogImageAlt: 'Guilin Tours - Li River Cruise, Karst Mountains, CTS Tours',
    keywords: ['Guilin tours New Zealand', 'Li River cruise', 'karst landscape tours', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function GuilinToursPage() {
  const tours = getToursByCityName('guilin');

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
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/guilin-river-valley.jpg"
        introText={guilinToursMeta.introText}
        highlights={guilinToursMeta.highlights}
        bestTimeToVisit={guilinToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={guilinToursMeta.faqs}
      />
    </>
  );
}
