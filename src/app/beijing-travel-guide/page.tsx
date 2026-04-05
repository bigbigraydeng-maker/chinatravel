import { Metadata } from 'next';
import DestinationGuide from '@/components/seo/DestinationGuide';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getGuideBySlug } from '@/lib/data/guides';

const slug = 'beijing-travel-guide';

export const metadata: Metadata = {
  title: 'Travel Guide | ChinaTravel',
  description: 'Comprehensive travel guide with attractions, practical information, and insider tips.',
  openGraph: { type: 'website', url: '/beijing-travel-guide' },
  alternates: { canonical: '/beijing-travel-guide' },
};

export default function GuidePage() {
  const guide = getGuideBySlug('beijing-travel-guide');
  if (!guide) return <div className="text-center py-20">Guide not found</div>;
  return (
    <>
      <SchemaMarkup data={[]} />
      <DestinationGuide guide={guide} />
    </>
  );
}
