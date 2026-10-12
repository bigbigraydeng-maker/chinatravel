import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { xianToursMeta } from '@/lib/data/seo-pages';
import { xianHub, buildDepartureRows, buildSampleItinerary, resolveHubTours } from '@/lib/data/destination-hubs';

// Departures and prices come from tours.ts; revalidate so a data edit reaches the live page.
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: xianToursMeta.title,
    description: xianToursMeta.description,
    path: '/xian-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/xian-terracotta.jpg',
    ogImageAlt: "Xi'an Tours - Terracotta Warriors, Ancient City Wall, CTS Tours",
    keywords: ['Xian tours New Zealand', 'Terracotta Warriors', 'Xian travel', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function XianToursPage() {
  const tours = resolveHubTours(xianHub.tourRefs);

  const schemas = [
    generateTouristDestinationSchema("Xi'an", xianToursMeta.description, '/xian-tours', tours),
    generateBreadcrumbListSchema([
      { name: 'Home', url: '/' },
      { name: 'Tours', url: '/tours' },
      { name: 'China Tours', url: '/china-tours' },
      { name: "Xi'an", url: '/xian-tours' }
    ])
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <CityTourHub
        cityName={xianToursMeta.cityName}
        heroTitle={xianToursMeta.h1}
        heroSubtitle={xianToursMeta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/xian-terracotta.jpg"
        introText={xianToursMeta.introText}
        highlights={xianToursMeta.highlights}
        bestTimeToVisit={xianToursMeta.bestTimeToVisit}
        tours={tours}
        faqs={xianToursMeta.faqs}
        proseSections={xianHub.prose}
        departureRows={buildDepartureRows(tours, xianHub.cityPattern)}
        sampleItinerary={buildSampleItinerary(xianHub)}
        guideLinks={[
          { label: "Xi'an Travel Guide", href: '/xian-travel-guide', icon: 'landmark', description: 'City sights, food & planning' },
          { label: 'Terracotta Warriors Guide', href: '/terracotta-warriors-travel-guide', icon: 'landmark', description: 'Visitor guide to the Terracotta Army' },
          { label: "Xi'an City Wall Guide", href: '/xian-city-wall-travel-guide', icon: 'landmark', description: 'Walking and cycling the ancient wall' },
          { label: 'Terracotta Warriors History', href: '/blog/terracotta-warriors-history', icon: 'landmark', description: 'Qin Shi Huang and the army underground' },
          { label: "Xi'an Street Food", href: '/blog/xian-street-food-adventure', icon: 'utensils', description: 'What to eat in the Muslim Quarter' },
          { label: 'Beijing to Xi\'an by Train', href: '/blog/beijing-to-xian-high-speed-train', icon: 'train', description: 'Route and timings for the high-speed link' },
        ]}
      />
    </>
  );
}
