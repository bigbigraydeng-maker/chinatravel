import { Metadata } from 'next';
import DestinationGuide from '@/components/seo/DestinationGuide';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getGuideBySlug } from '@/lib/data/guides';
import { getSiteUrl } from '@/lib/site';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';

const SLUG = 'chongqing-travel-guide';
export async function generateMetadata(): Promise<Metadata> {
  const guide = getGuideBySlug(SLUG);
  if (!guide) return { title: 'Travel Guide | CTS Tours' };

  return buildCtsPageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/${SLUG}`,
    ogImagePath: guide.heroImage,
    ogImageAlt: guide.h1,
    keywords: guide.keywords,
    ogType: 'article',
    openGraphTitle: guide.metaTitle,
    openGraphDescription: guide.metaDescription,
  });
}

export default function GuidePage() {
  const siteUrl = getSiteUrl();
  const guide = getGuideBySlug(SLUG);
  if (!guide) return <div className="text-center py-20 text-gray-500">Guide not found</div>;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.h1,
      description: guide.metaDescription,
      image: `${guide.heroImage.startsWith('http') ? guide.heroImage : `${siteUrl}${guide.heroImage}`}`,
      datePublished: guide.createdAt,
      dateModified: guide.updatedAt,
      author: { '@type': 'Organization', name: 'CTS Tours', url: siteUrl },
      publisher: {
        '@type': 'Organization',
        name: 'CTS Tours',
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/images/cts-logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/${SLUG}` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Travel Guides', item: `${siteUrl}/china-tours` },
        { '@type': 'ListItem', position: 3, name: guide.destinationName, item: `${siteUrl}/${SLUG}` },
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
      <section className="bg-purple-50 border-t border-purple-200 py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold text-purple-900 mb-3">
            Explore Chongqing & Chengdu Together
          </h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Combine Chongqing's Three Gorges and riverside culture with Chengdu's giant pandas. Experience Southwest China's most dynamic cities on one curated journey.
          </p>
          <a
            href="/chongqing-chengdu-discovery-guide"
            className="inline-block bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Chongqing & Chengdu Discovery Guide →
          </a>
        </div>
      </section>
      <section className="bg-warm-50 border-t border-warm-200 py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold text-accent mb-3">
            Book the Chongqing &amp; Chengdu Tour from New Zealand
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            CTS Tours offers <strong>China Discovery — Fire &amp; Fuzz</strong>: 10 days covering Liziba Station, Hongyadong, Dazu Rock Carvings, giant pandas, and the bullet train to Chengdu. From NZD $2,999. Auckland-based team, NZD pricing, small groups.
          </p>
          <a
            href="/tours/china/discovery/chongqing-chengdu"
            className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            View Fire &amp; Fuzz Tour →
          </a>
        </div>
      </section>
    </>
  );
}
