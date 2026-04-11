import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';
import { migratedUnsplash } from '@/lib/site-media';
import SeasonalGuide from '@/components/tools/SeasonalGuide';
import SchemaMarkup from '@/components/SchemaMarkup';

const site = getSiteUrl();

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'Best Time to Visit China | Seasonal Weather Guide by Month',
    description:
      'Discover the best time to visit China by month. Compare weather conditions, prices, crowds, and activities. Plan your perfect China trip with our interactive seasonal guide.',
    path: '/seasonal-guide',
    ogImagePath: migratedUnsplash('photo-1473163928189-364b2c4e1135'),
    keywords: [
      'best time to visit China',
      'China weather by month',
      'seasonal guide China',
      'when to visit China',
      'China travel seasons',
    ],
    ogType: 'website',
  });
}

// JSON-LD Schema Data
const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Best Time to Visit China - Seasonal Weather Guide',
  description:
    'Interactive seasonal guide for visiting China. Compare weather, prices, and crowds by month.',
  url: `${site}/seasonal-guide`,
  isPartOf: {
    '@type': 'WebSite',
    name: 'CTS Tours - China Travel Specialists',
    url: site,
  },
  datePublished: '2026-04-07',
  dateModified: '2026-04-07',
  inLanguage: 'en-NZ',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: site,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Travel Guides',
      item: `${site}/guide`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Seasonal Guide',
      item: `${site}/seasonal-guide`,
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'When is the best time to visit China?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best time to visit China depends on your preferences. Spring (April-May) and autumn (September-October) offer ideal weather with comfortable temperatures and clear skies. Summer is hot and humid, while winter is cold in the north but mild in the south.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are peak tourism seasons in China?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Peak tourism seasons in China are spring (especially around Qingming Festival in early April) and autumn (especially around National Golden Week in early October). During these periods, prices are highest and attractions are most crowded.',
      },
    },
    {
      '@type': 'Question',
      name: 'When is the cheapest time to visit China?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'January and February are generally the cheapest times to visit China, with the lowest prices on flights and accommodations. However, the weather is cold in northern regions and the New Year period can be crowded.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I pack for visiting China?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Packing depends on the season. Spring and autumn require light jackets and comfortable walking shoes. Summer needs lightweight, breathable clothing and sun protection. Winter in the north requires heavy coats, thermal underwear, and waterproof boots.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there festivals or holidays I should plan around?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Major holidays include Chinese New Year (lunar calendar), Qingming Festival (early April), Dragon Boat Festival (lunar calendar), and National Golden Week (October 1-7). During these periods, prices increase and crowds are heaviest.',
      },
    },
  ],
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'China Seasonal Guide Tool',
  description: 'Interactive tool to help you choose the best time to visit China based on weather, prices, and crowds.',
  applicationCategory: 'Utility',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'NZD',
  },
};

export default function SeasonalGuidePage() {
  return (
    <>
      <SchemaMarkup
        data={[webPageSchema, breadcrumbSchema, faqSchema, toolSchema]}
      />
      <SeasonalGuide />
    </>
  );
}
