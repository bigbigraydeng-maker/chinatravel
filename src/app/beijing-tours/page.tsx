import { Metadata } from 'next';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { beijingToursMeta } from '@/lib/data/seo-pages';
import { getSiteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: beijingToursMeta.title,
  description: beijingToursMeta.description,
  keywords: ['Beijing tours', 'Great Wall', 'Forbidden City', 'Beijing travel', 'CTS Tours'],
  openGraph: {
    title: beijingToursMeta.title,
    description: beijingToursMeta.description,
    type: 'website',
    url: '/beijing-tours',
    images: [{
      url: '/images/tours/forbidden-city-aerial.jpg',
      width: 1200,
      height: 630,
      alt: 'Beijing Tours - Great Wall, Forbidden City'
    }]
  },
  alternates: { canonical: '/beijing-tours' }
};

export default function BeijingToursPage() {
  const tours = getToursByCityName('beijing');

  const schemas = [
    generateTouristDestinationSchema(
      'Beijing',
      beijingToursMeta.description,
      '/beijing-tours',
      tours
    ),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Beijing', url: '/beijing-tours' }
    ]),
    generateFAQPageSchema('/beijing-tours', beijingToursMeta.faqs)
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={beijingToursMeta.cityName}
        heroTitle={beijingToursMeta.h1}
        heroSubtitle={beijingToursMeta.heroSubtitle}
        heroImage="/images/tours/forbidden-city-aerial.jpg"
        introText={beijingToursMeta.introText}
        highlights={beijingToursMeta.highlights}
        bestTimeToVisit={beijingToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={beijingToursMeta.faqs}
      />
    </>
  );
}
