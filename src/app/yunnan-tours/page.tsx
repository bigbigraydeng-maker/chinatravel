import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByRegion } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { yunnanToursMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: yunnanToursMeta.title,
    description: yunnanToursMeta.description,
    path: '/yunnan-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/yunnan-village.jpg',
    ogImageAlt: 'Yunnan Tours - Lijiang, Dali, Kunming, CTS Tours',
    keywords: ['Yunnan tours New Zealand', 'Lijiang Dali tours', 'Colorful Yunnan', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function YunnanToursPage() {
  const tours = getToursByRegion(['yunnan', 'lijiang', 'dali', 'shangri-la', 'kunming']);

  const schemas = [
    generateTouristDestinationSchema('Yunnan', yunnanToursMeta.description, '/yunnan-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Yunnan', url: '/yunnan-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={yunnanToursMeta.cityName}
        heroTitle={yunnanToursMeta.h1}
        heroSubtitle={yunnanToursMeta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/yunnan-village.jpg"
        introText={yunnanToursMeta.introText}
        highlights={yunnanToursMeta.highlights}
        bestTimeToVisit={yunnanToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={yunnanToursMeta.faqs}
        guideLinks={[
          { label: 'Yunnan Travel Guide', href: '/yunnan-travel-guide', emoji: '🌸', description: 'Region overview & travel tips' },
          { label: 'Lijiang Travel Guide', href: '/lijiang-travel-guide', emoji: '🏘️', description: 'Naxi Old Town & Jade Dragon Snow Mountain' },
          { label: 'Dali Travel Guide', href: '/dali-travel-guide', emoji: '🏞️', description: 'Erhai Lake & Bai minority culture' },
          { label: 'Shangri-La Travel Guide', href: '/shangri-la-travel-guide', emoji: '🏔️', description: 'Tibetan highland monasteries' },
        ]}
      />
    </>
  );
}
