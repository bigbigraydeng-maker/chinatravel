import { Metadata } from 'next';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getToursByCityName } from '@/lib/data/tours';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { xianToursMeta } from '@/lib/data/seo-pages';

export const metadata: Metadata = {
  title: xianToursMeta.title,
  description: xianToursMeta.description,
  keywords: ["Xi'an tours", 'Terracotta Warriors', "Xi'an travel", 'CTS Tours'],
  openGraph: {
    title: xianToursMeta.title,
    description: xianToursMeta.description,
    type: 'website',
    url: '/xian-tours',
    images: [{
      url: '/images/tours/xian-terracotta.jpg',
      width: 1200,
      height: 630,
      alt: "Xi'an Tours - Terracotta Warriors"
    }]
  },
  alternates: { canonical: '/xian-tours' }
};

export default function XianToursPage() {
  const tours = getToursByCityName("xi'an");

  const schemas = [
    generateTouristDestinationSchema("Xi'an", xianToursMeta.description, '/xian-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: "Xi'an", url: '/xian-tours' }
    ]),
    generateFAQPageSchema('/xian-tours', xianToursMeta.faqs)
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={xianToursMeta.cityName}
        heroTitle={xianToursMeta.h1}
        heroSubtitle={xianToursMeta.heroSubtitle}
        heroImage="/images/tours/xian-terracotta.jpg"
        introText={xianToursMeta.introText}
        highlights={xianToursMeta.highlights}
        bestTimeToVisit={xianToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={xianToursMeta.faqs}
      />
    </>
  );
}
