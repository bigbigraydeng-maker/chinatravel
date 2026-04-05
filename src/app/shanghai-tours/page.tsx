import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { shanghaiToursMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: shanghaiToursMeta.title,
    description: shanghaiToursMeta.description,
    path: '/shanghai-tours',
    ogImagePath: '/images/tours/shanghai-skyline.jpg',
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
