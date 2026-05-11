import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { shanghaiToursMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: shanghaiToursMeta.title,
    description: shanghaiToursMeta.description,
    path: '/shanghai-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/shanghai-skyline.jpg',
    ogImageAlt: 'Shanghai Tours from New Zealand - The Bund, Skyline, CTS Tours',
    keywords: ['Shanghai tours New Zealand', 'The Bund', 'Shanghai travel', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function ShanghaiToursPage() {
  const tours = getToursByCityName('shanghai');

  const schemas = [
    generateTouristDestinationSchema('Shanghai', shanghaiToursMeta.description, '/shanghai-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Shanghai', url: '/shanghai-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={shanghaiToursMeta.cityName}
        heroTitle={shanghaiToursMeta.h1}
        heroSubtitle={shanghaiToursMeta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/shanghai-skyline.jpg"
        introText={shanghaiToursMeta.introText}
        highlights={shanghaiToursMeta.highlights}
        bestTimeToVisit={shanghaiToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={shanghaiToursMeta.faqs}
        guideLinks={[
          { label: 'Shanghai Travel Guide', href: '/shanghai-travel-guide', emoji: '🌃', description: 'Bund, French Concession & more' },
          { label: 'Hangzhou Travel Guide', href: '/hangzhou-travel-guide', emoji: '🍵', description: 'West Lake day trip from Shanghai' },
          { label: 'Suzhou Travel Guide', href: '/suzhou-travel-guide', emoji: '🌿', description: 'Classical gardens & canal towns' },
          { label: 'Shanghai Skyline & Modern China', href: '/blog/shanghai-skyline-modern-china', emoji: '🏙️', description: 'Bund, Pudong & French Concession explained' },
          { label: 'Suzhou Classical Gardens', href: '/blog/suzhou-gardens-classical-beauty', emoji: '🌸', description: 'UNESCO gardens — which to visit & when' },
          { label: 'Zhujiajiao Water Village', href: '/blog/zhujiajiao-water-village', emoji: '🛶', description: 'Day trip guide to Shanghai\'s ancient town' },
        ]}
      />
    </>
  );
}
