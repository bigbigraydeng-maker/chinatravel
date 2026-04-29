import { Metadata } from 'next';
import MarkdownContent from '@/components/MarkdownContent';
import SchemaMarkup from '@/components/SchemaMarkup';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import { getDiscoveryGuideBySlug } from '@/lib/data/discovery-guides';
import { getSiteUrl } from '@/lib/site';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';

const SLUG = 'shanghai-surroundings-discovery-guide';

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
        { '@type': 'ListItem', position: 2, name: 'Discovery Guides', item: `${siteUrl}/guide` },
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

      {/* Immersive hero with full-bleed photo */}
      <ImmersivePageHero
        eyebrow="Discovery Guide · Shanghai & Surroundings"
        title={guide.h1}
        imageSrc={guide.heroImage}
        imageAlt={guide.destinationName}
        priority
        layout="bottom"
        textAlign="left"
      />

      {/* Article body */}
      <article className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Article meta strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-10 pb-6 border-b border-gray-100 text-sm text-gray-400">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">CTS Tours</span>
            <span className="text-gray-200">·</span>
            <span>Updated April 2026</span>
            <span className="text-gray-200">·</span>
            <span>~15 min read</span>
          </div>

          {/* Lead paragraph */}
          <p className="text-xl text-gray-600 font-light leading-relaxed mb-10 border-l-4 border-warm-200 pl-5">
            {guide.metaDescription}
          </p>

          {/* Main article content */}
          <MarkdownContent content={guide.content} />

          {/* FAQ accordion */}
          {guide.faqs.length > 0 && (
            <section className="mt-16 border-t border-gray-100 pt-12">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {guide.faqs.map((faq, idx) => (
                  <details key={idx} className="group border border-gray-200 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 bg-gray-50 hover:bg-warm-50 transition-colors list-none">
                      <span className="font-semibold text-base text-gray-900 pr-4">{faq.question}</span>
                      <span className="text-primary text-xl shrink-0 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="px-6 py-5 text-gray-700 text-base leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* Tour CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-warm-50 to-warm-100 border-t border-warm-200">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">Ready to Go?</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-accent mb-5">
            Shanghai &amp; Surroundings Discovery
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed text-base md:text-lg">
            Explore the Bund, Suzhou&apos;s classical gardens, West Lake in Hangzhou, and the water towns of Jiangnan — on a curated multi-city route designed for NZ travellers. From <strong className="text-accent">NZD $2,999</strong>.
          </p>
          <a
            href="/tours/china/discovery/shanghai-surroundings"
            className="inline-block bg-primary text-white font-semibold px-10 py-4 rounded-full hover:opacity-90 transition text-base shadow-md hover:shadow-lg"
          >
            View the Shanghai &amp; Surroundings Tour →
          </a>
        </div>
      </section>
    </>
  );
}
