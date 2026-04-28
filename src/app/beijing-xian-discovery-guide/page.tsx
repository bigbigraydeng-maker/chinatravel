import { Metadata } from 'next';
import MarkdownContent from '@/components/MarkdownContent';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getDiscoveryGuideBySlug } from '@/lib/data/discovery-guides';
import { getSiteUrl } from '@/lib/site';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';

const SLUG = 'beijing-xian-discovery-guide';

export async function generateMetadata(): Promise<Metadata> {
  const guide = getDiscoveryGuideBySlug(SLUG);
  if (!guide) return { title: 'Discovery Guide | CTS Tours' };

  return buildCtsPageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/${SLUG}`,
    ogImagePath: guide.heroImage,
    ogImageAlt: guide.h1,
    keywords: guide.keywords.split(', '),
    ogType: 'article',
    openGraphTitle: guide.metaTitle,
    openGraphDescription: guide.metaDescription,
  });
}

export default function DiscoveryGuidePage() {
  const siteUrl = getSiteUrl();
  const guide = getDiscoveryGuideBySlug(SLUG);
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
        { '@type': 'ListItem', position: 2, name: 'Discovery Guides', item: `${siteUrl}/china-tours` },
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
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">{guide.h1}</h1>
            <p className="text-lg text-gray-600">{guide.metaDescription}</p>
          </header>
          <div className="mb-10 rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/tours/great-wall-mist.jpg"
              alt="The Great Wall of China at Mutianyu in morning mist"
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>
          <div className="mb-12">
            <MarkdownContent content={guide.content} />
          </div>
          {guide.faqs.length > 0 && (
            <section className="mt-16 border-t pt-12">
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              <div className="space-y-8">
                {guide.faqs.map((faq, idx) => (
                  <details key={idx} className="group border-b pb-6">
                    <summary className="font-semibold text-lg text-gray-900 cursor-pointer">{faq.question}</summary>
                    <p className="mt-4 text-gray-700 text-base">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <section className="bg-blue-50 border-t border-blue-200 py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold text-blue-900 mb-3">
            Explore Beijing & Xi&apos;an Together
          </h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Combine Beijing's imperial history with Xi&apos;an's ancient warriors. Experience the full arc of Chinese civilization on one epic journey.
          </p>
          <a
            href="/beijing-xian-discovery-guide"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Beijing & Xi&apos;an Discovery Guide →
          </a>
        </div>
      </section>
      <section className="bg-warm-50 border-t border-warm-200 py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-semibold text-accent mb-3">
            Book the Beijing &amp; Xi&apos;an Tour from New Zealand
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            CTS Tours offers <strong>Beijing &amp; Xi&apos;an: A Tale of Two Cities</strong>: 10 days covering the Forbidden City, Great Wall, Terracotta Warriors, and ancient hutongs. From NZD $3,480. Auckland-based team, NZD pricing, small groups.
          </p>
          <a
            href="/tours/china/discovery/beijing-xian"
            className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition"
          >
            View Beijing &amp; Xi&apos;an Tour →
          </a>
        </div>
      </section>
    </>
  );
}
