import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { xianToursMeta } from '@/lib/data/seo-pages';
import { xianHub, buildDepartureRows, buildSampleItinerary, cheapestPrice, resolveHubTours } from '@/lib/data/destination-hubs';

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
        departureRows={buildDepartureRows(tours.slice(0, xianHub.featuredCount ?? tours.length), xianHub.cityPattern)}
        sampleItinerary={buildSampleItinerary(xianHub)}
        offerSummary={xianHub.offerSummary}
        startingFrom={cheapestPrice(tours)}
        featuredCount={xianHub.featuredCount}
        guideLinks={[
          { label: 'Terracotta Warriors History', href: '/blog/terracotta-warriors-history', icon: 'landmark', description: 'History, discovery and what you will see' },
          { label: 'Terracotta Warriors Guide for NZ', href: '/blog/terracotta-warriors-guide-nz', icon: 'landmark', description: 'What to expect on your visit' },
          { label: 'First Time in China: Beijing & Xi\'an', href: '/blog/first-time-china-beijing-xian', icon: 'map', description: 'Why this pairing suits a first trip' },
          { label: 'Beijing & Xi\'an Discovery Guide', href: '/beijing-xian-discovery-guide', icon: 'compass', description: 'The Beijing and Xi\'an route' },
          { label: 'Why the Silk Road', href: '/blog/why-silk-road-should-be-your-next-adventure', icon: 'compass', description: 'Why the Silk Road belongs on your list' },
        ]}
      />
    </>
  );
}
