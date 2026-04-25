import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { zhangjiajieToursMetadata } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: zhangjiajieToursMetadata.title,
    description: zhangjiajieToursMetadata.description,
    path: '/zhangjiajie-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/zhangjiajie.jpg',
    ogImageAlt: 'Zhangjiajie Tours - Avatar Mountains, Glass Bridge, CTS Tours',
    keywords: ['Zhangjiajie tours New Zealand', 'Avatar mountains', 'Zhangjiajie glass bridge', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function ZhangjiajieToursPage() {
  const tours = getToursByCityName('zhangjiajie');

  const schemas = [
    generateTouristDestinationSchema('Zhangjiajie', zhangjiajieToursMetadata.description, '/zhangjiajie-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Zhangjiajie', url: '/zhangjiajie-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={zhangjiajieToursMetadata.cityName}
        heroTitle={zhangjiajieToursMetadata.h1}
        heroSubtitle={zhangjiajieToursMetadata.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/zhangjiajie.jpg"
        introText={zhangjiajieToursMetadata.introText}
        highlights={zhangjiajieToursMetadata.highlights}
        bestTimeToVisit={zhangjiajieToursMetadata.bestTimeToVisit}
        tours={tours}
        faqs={zhangjiajieToursMetadata.faqs}
        guideLinks={[
          { label: 'Zhangjiajie Travel Guide', href: '/zhangjiajie-travel-guide', emoji: '🏔️', description: 'Avatar peaks explorer guide' },
          { label: 'Tianmen Mountain Guide', href: '/tianmen-mountain-travel-guide', emoji: '🪟', description: 'Glass walkway & cable car tips' },
        ]}
      />
    </>
  );
}
