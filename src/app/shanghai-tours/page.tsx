import { Metadata } from 'next';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { shanghaiToursMeta } from '@/lib/data/seo-pages';

export const metadata: Metadata = {
  title: shanghaiToursMeta.title,
  description: shanghaiToursMeta.description,
  keywords: ['Shanghai tours', 'The Bund', 'Shanghai travel', 'CTS Tours'],
  openGraph: {
    title: shanghaiToursMeta.title,
    description: shanghaiToursMeta.description,
    type: 'website',
    url: '/shanghai-tours',
    images: [{
      url: '/images/tours/shanghai-skyline.jpg',
      width: 1200,
      height: 630,
      alt: 'Shanghai Tours - The Bund, Modern City'
    }]
  },
  alternates: { canonical: '/shanghai-tours' }
};

export default function ShanghaiToursPage() {
  const tours = getToursByCityName('shanghai');

  const schemas = [
    generateTouristDestinationSchema('Shanghai', shanghaiToursMeta.description, '/shanghai-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: 'Shanghai', url: '/shanghai-tours' }
    ]),
    generateFAQPageSchema('/shanghai-tours', shanghaiToursMeta.faqs)
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={shanghaiToursMeta.cityName}
        heroTitle={shanghaiToursMeta.h1}
        heroSubtitle={shanghaiToursMeta.heroSubtitle}
        heroImage="/images/tours/shanghai-skyline.jpg"
        introText={shanghaiToursMeta.introText}
        highlights={shanghaiToursMeta.highlights}
        bestTimeToVisit={shanghaiToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={shanghaiToursMeta.faqs}
      />
    </>
  );
}
