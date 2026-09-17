import type { Metadata } from 'next';
import DestinationGuide from '@/components/seo/DestinationGuide';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getGuideBySlug } from '@/lib/data/guides';
import { getSiteUrl } from '@/lib/site';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';

export function buildGuidePageMetadata(slug: string): Metadata {
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: 'Travel Guide | CTS Tours' };

  return buildCtsPageMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/${slug}`,
    ogImagePath: guide.heroImage,
    ogImageAlt: guide.h1,
    keywords: guide.keywords,
    ogType: 'article',
    openGraphTitle: guide.metaTitle,
    openGraphDescription: guide.metaDescription,
  });
}

export default function GuidePageShell({ slug }: { slug: string }) {
  const guide = getGuideBySlug(slug);
  if (!guide) return <div className="py-20 text-center text-gray-500">Guide not found</div>;

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${slug}`;
  const parentName = guide.parentDestination ?? 'China';
  const attractionId = `${pageUrl}#tourist-attraction`;
  const imageUrl = guide.heroImage.startsWith('http') ? guide.heroImage : `${siteUrl}${guide.heroImage}`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': pageUrl,
      headline: guide.h1,
      description: guide.metaDescription,
      image: imageUrl,
      abstract: guide.quickAnswer ?? guide.metaDescription,
      datePublished: guide.createdAt,
      dateModified: guide.updatedAt,
      author: { '@type': 'Organization', name: 'CTS Tours', url: siteUrl },
      reviewedBy: {
        '@type': 'Organization',
        name: 'CTS Tours China Travel Specialists',
        url: `${siteUrl}/about`,
      },
      publisher: {
        '@type': 'Organization',
        name: 'CTS Tours',
        url: siteUrl,
        logo: { '@type': 'ImageObject', url: `${siteUrl}/images/cts-logo.png` },
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      about: { '@id': attractionId },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      '@id': attractionId,
      name: guide.destinationName,
      description: guide.metaDescription,
      image: imageUrl,
      url: pageUrl,
      touristType: guide.visitPlanning?.bestFor,
      containedInPlace: {
        '@type': 'City',
        name: parentName,
      },
      subjectOf: { '@id': pageUrl },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Travel Guides', item: `${siteUrl}/guide` },
        { '@type': 'ListItem', position: 3, name: parentName, item: `${siteUrl}/${guide.relatedGuideSlugs[0] ?? 'guide'}` },
        { '@type': 'ListItem', position: 4, name: guide.destinationName, item: pageUrl },
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
