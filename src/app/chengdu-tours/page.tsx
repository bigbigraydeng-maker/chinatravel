import { Metadata } from 'next';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { chengduToursMeta } from '@/lib/data/seo-pages';

export const metadata: Metadata = {
  title: chengduToursMeta.title,
  description: chengduToursMeta.description,
  keywords: ['Chengdu tours', 'Giant pandas', 'Chengdu travel', 'CTS Tours'],
  openGraph: {
    title: chengduToursMeta.title,
    description: chengduToursMeta.description,
    type: 'website',
    url: '/chengdu-tours',
    images: [{
      url: '/images/tours/chengdu-pandas.jpg',
      width: 1200,
      height: 630,
      alt: 'Chengdu Tours - Giant Pandas'
    }]
  },
  alternates: { canonical: '/chengdu-tours' }
};

export default function ChengduToursPage() {
  const tours = getToursByCityName('chengdu');

  const schemas = [
    generateTouristDestinationSchema('Chengdu', chengduToursMeta.description, '/chengdu-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Chengdu', url: '/chengdu-tours' }
    ]),
    generateFAQPageSchema('/chengdu-tours', chengduToursMeta.faqs)
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={chengduToursMeta.cityName}
        heroTitle={chengduToursMeta.h1}
        heroSubtitle={chengduToursMeta.heroSubtitle}
        heroImage="/images/tours/chengdu-pandas.jpg"
        introText={chengduToursMeta.introText}
        highlights={chengduToursMeta.highlights}
        bestTimeToVisit={chengduToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={chengduToursMeta.faqs}
      />
    </>
  );
}
