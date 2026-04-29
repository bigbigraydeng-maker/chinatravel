import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQPageTemplate from '@/components/seo/FAQPageTemplate';
import {
  faqPlanningYourChinaTrip,
  faqBeijingTravel,
  faqGreatWall
} from '@/lib/data/faq-pages';
import { generateArticleSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';

// Map slug to FAQ page data
const faqPages: Record<string, typeof faqPlanningYourChinaTrip> = {
  'planning-your-china-trip': faqPlanningYourChinaTrip,
  'beijing-travel': faqBeijingTravel,
  'great-wall-of-china': faqGreatWall
};

// Generate static params for all FAQ pages
export async function generateStaticParams() {
  return Object.keys(faqPages).map(slug => ({ slug }));
}

// Generate metadata dynamically
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = faqPages[params.slug];
  if (!page) return {};

  return buildCtsPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: `/faq/${page.slug}`,
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-green.jpg',
    ogImageAlt: page.title,
    keywords: [page.title, 'China FAQ', 'China travel questions'],
    ogType: 'article',
  });
}

export default function FAQPage({ params }: { params: { slug: string } }) {
  const page = faqPages[params.slug];

  if (!page) {
    return <div className="container mx-auto px-4 py-16 text-center">FAQ page not found</div>;
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' },
    { name: page.title.split(':')[0], url: `/faq/${page.slug}` }
  ];

  // Generate schemas
  const schemas = [
    generateArticleSchema(page.title, page.metaDescription, `/faq/${page.slug}`),
    generateBreadcrumbListSchema(breadcrumbs),
    generateFAQPageSchema(
      `/faq/${page.slug}`,
      page.faqs.map(faq => ({
        question: faq.question,
        answer: faq.answer
      }))
    )
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />
      <FAQPageTemplate page={page} breadcrumbs={breadcrumbs} />
    </>
  );
}
