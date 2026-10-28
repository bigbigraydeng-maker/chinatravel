import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import CityTourHub from '@/components/seo/CityTourHub';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateTouristDestinationSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { xianToursMeta as baseMeta } from '@/lib/data/seo-pages';
import { cityHubMetaForTours } from '@/lib/data/destination-hub-meta';
import { xianHub, buildDepartureRows, buildSampleItinerary, cheapestPrice, resolveHubTours, hubProseForTours } from '@/lib/data/destination-hubs';
import { getPublishedTours } from '@/lib/data/published-tour-catalog';

// Departures and prices come from tours.ts; revalidate so a data edit reaches the live page.
export const revalidate = 15;

export async function generateMetadata(): Promise<Metadata> {
  const meta = cityHubMetaForTours(baseMeta, await getPublishedTours());
  return buildCtsPageMetadata({
    title: meta.title,
    description: meta.description,
    path: '/xian-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/xian-terracotta.jpg',
    ogImageAlt: "Xi'an Tours - Terracotta Warriors, Ancient City Wall, CTS Tours",
    keywords: ['Xian tours New Zealand', 'Terracotta Warriors', 'Xian travel', 'CTS Tours'],
    ogType: 'website',
  });
}

export default async function XianToursPage() {
  const publishedTours = await getPublishedTours();
  const meta = cityHubMetaForTours(baseMeta, publishedTours);
  const tours = resolveHubTours(xianHub.tourRefs, publishedTours, xianHub.cityPattern);

  const schemas = [
    generateTouristDestinationSchema("Xi'an", meta.description, '/xian-tours', tours),
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
        cityName={meta.cityName}
        heroTitle={meta.h1}
        heroSubtitle={meta.heroSubtitle}
        heroImage="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/xian-terracotta.jpg"
        introText={meta.introText}
        highlights={meta.highlights}
        bestTimeToVisit={meta.bestTimeToVisit}
        tours={tours}
        faqs={meta.faqs}
        proseSections={hubProseForTours(xianHub, publishedTours)}
        departureRows={buildDepartureRows(tours.slice(0, xianHub.featuredCount ?? tours.length), xianHub.cityPattern)}
        sampleItinerary={buildSampleItinerary(xianHub, publishedTours)}
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
