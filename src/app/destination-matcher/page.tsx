import { Metadata } from 'next';
import DestinationMatcher from '@/components/tools/DestinationMatcher';
import SchemaMarkup from '@/components/SchemaMarkup';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'China Destination Matcher | Find Your Perfect Destination',
    description:
      'Answer a few questions about interests, pace, travel party, and style. Get ranked China destination guides tailored to how you like to travel.',
    path: '/destination-matcher',
    ogImagePath: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200&q=80',
    keywords: ['destination matcher', 'China travel recommendations', 'where to go in China', 'CTS Tours'],
    ogType: 'website',
  });
}

export default function DestinationMatcherPage() {
  const site = getSiteUrl();

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'China Destination Matcher',
    description:
      'Interactive tool to shortlist Chinese destinations based on interests, fitness level, group type, and travel style.',
    url: `${site}/destination-matcher`,
    inLanguage: 'en-NZ',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CTS Tours',
      url: site,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site },
      { '@type': 'ListItem', position: 2, name: 'Travel tools', item: `${site}/travel-tools` },
      { '@type': 'ListItem', position: 3, name: 'Destination matcher', item: `${site}/destination-matcher` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the destination matcher?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It ranks CTS destination guides using your primary interest, preferred daily pace, who you travel with, and whether you prefer immersive, classic, or off-the-beaten-path experiences.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many destinations are shown?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Up to four destination guides are displayed with a simple star fit indicator.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this the same as booking a tour?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. It helps you research destinations. Use tour pages or contact CTS to convert ideas into a confirmed itinerary.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I change my answers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Use Start over to reset the questionnaire at any time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do star ratings guarantee availability?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Stars reflect how well a guide matches your inputs, not hotel or flight availability. Always confirm dates with CTS.',
        },
      },
    ],
  };

  return (
    <>
      <SchemaMarkup data={[webPageSchema, breadcrumbSchema, faqSchema]} />
      <DestinationMatcher />
    </>
  );
}
