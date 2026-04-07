import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import LocalFoodGuide from '@/components/tools/LocalFoodGuide';
import SchemaMarkup from '@/components/SchemaMarkup';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'Chinese Local Food Guide | Regional Cuisines & Specialties',
    description:
      'Discover authentic Chinese regional cuisines. Explore local specialties, flavors, and where to find them. Your guide to Chinese food culture by destination.',
    path: '/local-food-guide',
    ogImagePath: '/images/guides/food-guide-hero.jpg',
    keywords: [
      'Chinese food guide',
      'local cuisines',
      'regional specialties',
      'Chinese food culture',
      'authentic recipes',
      'food destinations',
    ],
    ogType: 'website',
  });
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Chinese Local Food Guide - Regional Cuisines',
  description:
    'Interactive guide to authentic Chinese regional cuisines and local food specialties by destination.',
  url: 'https://chinatravel.co.nz/local-food-guide',
  isPartOf: {
    '@type': 'WebSite',
    name: 'CTS Tours - China Travel Specialists',
    url: 'https://chinatravel.co.nz',
  },
  datePublished: '2026-04-07',
  dateModified: '2026-04-07',
  inLanguage: 'en-NZ',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://chinatravel.co.nz' },
    { '@type': 'ListItem', position: 2, name: 'Travel Guides', item: 'https://chinatravel.co.nz/guide' },
    { '@type': 'ListItem', position: 3, name: 'Food Guide', item: 'https://chinatravel.co.nz/local-food-guide' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the most famous Chinese regional cuisines?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'China has eight major culinary traditions: Cantonese, Sichuan, Jiangsu, Zhejiang, Fujian, Anhui, Hunan, and Shandong. Each region has distinct flavors, cooking techniques, and signature dishes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where can I find authentic local Chinese food?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Local food is best found at small family-run restaurants, food markets, and street vendors in residential areas. Visit local food courts and wet markets for authentic experiences away from tourist areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are must-try dishes when visiting China?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Must-try dishes vary by region: Peking Duck in Beijing, Xiaolongbao in Shanghai, Hot Pot in Sichuan, Mapo Tofu, and regional street foods. Each destination offers unique culinary experiences.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I navigate food allergies and dietary restrictions in China?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Learn key phrases in Chinese for your dietary restrictions. Many restaurants are accommodating but language barriers exist. Consider using translation apps and booking tours with food-focused experiences.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best season for food experiences in China?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spring and autumn offer ideal weather for food exploration. Regional seasonal specialties vary—some foods are best enjoyed fresh in specific seasons. Check our seasonal guide for food availability by month.',
      },
    },
  ],
};

export default function LocalFoodGuidePage() {
  return (
    <>
      <SchemaMarkup data={[webPageSchema, breadcrumbSchema, faqSchema]} />
      <LocalFoodGuide />
    </>
  );
}
