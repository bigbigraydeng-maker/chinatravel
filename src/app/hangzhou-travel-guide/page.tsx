import { Metadata } from 'next';
import DestinationGuide from '@/components/seo/DestinationGuide';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getGuideBySlug } from '@/lib/data/guides';

const slug = 'hangzhou-travel-guide';

export const metadata: Metadata = {
  title: 'Travel Guide | ChinaTravel',
  description: 'Comprehensive travel guide with attractions, practical information, and insider tips.',
  openGraph: { type: 'website', url: '/hangzhou-travel-guide' },
  alternates: { canonical: '/hangzhou-travel-guide' },
};

export default function GuidePage() {
  const guide = getGuideBySlug('hangzhou-travel-guide');
  if (!guide) return <div className="text-center py-20">Guide not found</div>;
  return (
    <>
      <SchemaMarkup data={[]} />
      <DestinationGuide guide={guide} />
    </>
  );
}
