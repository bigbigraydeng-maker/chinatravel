import { Metadata } from 'next';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByRegion } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { yunnanToursMeta } from '@/lib/data/seo-pages';

export const metadata: Metadata = {
  title: yunnanToursMeta.title,
  description: yunnanToursMeta.description,
  keywords: ['Yunnan tours', 'Lijiang', 'Dali', 'Shangri-La', 'CTS Tours'],
  openGraph: {
    title: yunnanToursMeta.title,
    description: yunnanToursMeta.description,
    type: 'website',
    url: '/yunnan-tours',
    images: [{
      url: '/images/tours/great-wall-green.jpg',
      width: 1200,
      height: 630,
      alt: 'Yunnan Tours - Lijiang, Dali, Shangri-La'
    }]
  },
  alternates: { canonical: '/yunnan-tours' }
};

export default function YunnanToursPage() {
  const tours = getToursByRegion(['yunnan', 'lijiang', 'dali', 'shangri-la', 'kunming']);

  const schemas = [
    generateTouristDestinationSchema('Yunnan', yunnanToursMeta.description, '/yunnan-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Yunnan', url: '/yunnan-tours' }
    ]),
    generateFAQPageSchema('/yunnan-tours', yunnanToursMeta.faqs)
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={yunnanToursMeta.cityName}
        heroTitle={yunnanToursMeta.h1}
        heroSubtitle={yunnanToursMeta.heroSubtitle}
        heroImage="/images/tours/great-wall-green.jpg"
        introText={yunnanToursMeta.introText}
        highlights={yunnanToursMeta.highlights}
        bestTimeToVisit={yunnanToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={yunnanToursMeta.faqs}
      />
    </>
  );
}
