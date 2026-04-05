import { Metadata } from 'next';
import DestinationGuide from '@/components/seo/DestinationGuide';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getGuideBySlug } from '@/lib/data/guides';

const SLUG = 'guilin-travel-guide';
const SITE = 'https://chinatravel-zloe.onrender.com';

export async function generateMetadata(): Promise<Metadata> {
  const guide = getGuideBySlug(SLUG);
  if (!guide) return { title: 'Travel Guide | CTS Tours' };

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords?.join(', '),
    openGraph: {
      type: 'article',
      url: `${SITE}/${SLUG}`,
      title: guide.metaTitle,
      description: guide.metaDescription,
      siteName: 'CTS Tours — China Travel Specialists',
      images: [
        {
          url: `${SITE}${guide.heroImage}`,
          width: 1200,
          height: 630,
          alt: guide.h1,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
      images: [`${SITE}${guide.heroImage}`],
    },
    alternates: { canonical: `${SITE}/${SLUG}` },
    robots: { index: true, follow: true },
  };
}

export default function GuidePage() {
  const guide = getGuideBySlug(SLUG);
  if (!guide) return <div className="text-center py-20 text-gray-500">Guide not found</div>;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.h1,
      description: guide.metaDescription,
      image: `${SITE}${guide.heroImage}`,
      datePublished: guide.createdAt,
      dateModified: guide.updatedAt,
      author: { '@type': 'Organization', name: 'CTS Tours', url: SITE },
      publisher: {
        '@type': 'Organization',
        name: 'CTS Tours',
        url: SITE,
        logo: { '@type': 'ImageObject', url: `${SITE}/images/cts-logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/${SLUG}` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Travel Guides', item: `${SITE}/china-tours` },
        { '@type': 'ListItem', position: 3, name: guide.destinationName, item: `${SITE}/${SLUG}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guide.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  return (
    <>
      <SchemaMarkup data={schema} />
      <DestinationGuide guide={guide} />
    </>
  );
}
