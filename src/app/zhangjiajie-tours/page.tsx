import { Metadata } from 'next';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { zhangjiajieToursMetadata } from '@/lib/data/seo-pages';

export const metadata: Metadata = {
  title: zhangjiajieToursMetadata.title,
  description: zhangjiajieToursMetadata.description,
  keywords: ['Zhangjiajie tours', 'Avatar mountains', 'Glass walkway', 'CTS Tours'],
  openGraph: {
    title: zhangjiajieToursMetadata.title,
    description: zhangjiajieToursMetadata.description,
    type: 'website',
    url: '/zhangjiajie-tours',
    images: [{
      url: '/images/tours/zhangjiajie.jpg',
      width: 1200,
      height: 630,
      alt: 'Zhangjiajie Tours - Avatar Mountains, Glass Walkway'
    }]
  },
  alternates: { canonical: '/zhangjiajie-tours' }
};

export default function ZhangjiajieToursPage() {
  const tours = getToursByCityName('zhangjiajie');

  const schemas = [
    generateTouristDestinationSchema('Zhangjiajie', zhangjiajieToursMetadata.description, '/zhangjiajie-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Zhangjiajie', url: '/zhangjiajie-tours' }
    ]),
    generateFAQPageSchema('/zhangjiajie-tours', zhangjiajieToursMetadata.faqs)
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={zhangjiajieToursMetadata.cityName}
        heroTitle={zhangjiajieToursMetadata.h1}
        heroSubtitle={zhangjiajieToursMetadata.heroSubtitle}
        heroImage="/images/tours/zhangjiajie.jpg"
        introText={zhangjiajieToursMetadata.introText}
        highlights={zhangjiajieToursMetadata.highlights}
        bestTimeToVisit={zhangjiajieToursMetadata.bestTimeToVisit}
        tours={tours}
        faqs={zhangjiajieToursMetadata.faqs}
      />
    </>
  );
}
