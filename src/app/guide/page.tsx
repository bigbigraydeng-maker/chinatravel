import { Metadata } from 'next';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import { getAllGuides } from '@/lib/data/guides';
import { tourImage } from '@/lib/site-media';
import GuideExplorer from '@/components/guides/GuideExplorer';

export const metadata: Metadata = {
  title: 'China Travel Guides | 24 Expert Destination Guides | CTS Tours',
  description: 'Explore 24 comprehensive China travel guides: major cities, Yunnan, iconic landmarks, scenic regions and discovery tours. Expert tips from CTS Tours for New Zealand travellers.',
  keywords: [
    'China travel guides',
    'destination guides',
    'Beijing guide',
    'Shanghai guide',
    'travel tips China',
    'CTS Tours guides',
  ],
  openGraph: {
    title: 'China Travel Guides | CTS Tours',
    description: '24 comprehensive China travel guides with attractions, practical info, FAQs, and insider tips.',
    type: 'website',
  },
  alternates: { canonical: '/guide' },
};

const GuidePage = () => {
  const guides = getAllGuides();

  return (
    <div>
      <ImmersivePageHero
        eyebrow="Travel Guides"
        title="Find Your China"
        subtitle="From misty karst peaks to neon-lit megacities — 24 expert guides to inspire your next journey"
        imageSrc={tourImage('great-wall-mist.jpg')}
        imageAlt="Great Wall of China — China travel guides by CTS Tours"
        priority
      />

      <GuideExplorer guides={guides} />
    </div>
  );
};

export default GuidePage;
