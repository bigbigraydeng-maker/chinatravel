import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { chengduToursMeta } from '@/lib/data/seo-pages';

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
  const tours = getToursByCityName('chengdu');

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
        guideLinks={[
          { label: 'Chengdu Travel Guide', href: '/chengdu-travel-guide', emoji: '🐼', description: 'Pandas, temples & hot pot' },
          { label: 'Panda Sanctuary Guide', href: '/chengdu-panda-sanctuary', emoji: '🎋', description: '200+ pandas · morning feeding · visitor tips' },
          { label: 'Leshan Buddha Guide', href: '/leshan-buddha-travel-guide', emoji: '🗿', description: 'Giant cliffside Buddha visitor tips' },
        ]}
      />
    </>
  );
}
