import { Metadata } from 'next';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { guilinToursMeta } from '@/lib/data/seo-pages';

export const metadata: Metadata = {
  title: guilinToursMeta.title,
  description: guilinToursMeta.description,
  keywords: ['Guilin tours', 'Li River', 'Guilin travel', 'CTS Tours'],
  openGraph: {
    title: guilinToursMeta.title,
    description: guilinToursMeta.description,
    type: 'website',
    url: '/guilin-tours',
    images: [{
      url: '/images/tours/guilin-mist.jpg',
      width: 1200,
      height: 630,
      alt: 'Guilin Tours - Li River, Karst Mountains'
    }]
  },
  alternates: { canonical: '/guilin-tours' }
};

export default function GuilinToursPage() {
  const tours = getToursByCityName('guilin');

  const schemas = [
    generateTouristDestinationSchema('Guilin', guilinToursMeta.description, '/guilin-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Guilin', url: '/guilin-tours' }
    ]),
    generateFAQPageSchema('/guilin-tours', guilinToursMeta.faqs)
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={guilinToursMeta.cityName}
        heroTitle={guilinToursMeta.h1}
        heroSubtitle={guilinToursMeta.heroSubtitle}
        heroImage="/images/tours/guilin-mist.jpg"
        introText={guilinToursMeta.introText}
        highlights={guilinToursMeta.highlights}
        bestTimeToVisit={guilinToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={guilinToursMeta.faqs}
      />
    </>
  );
}
