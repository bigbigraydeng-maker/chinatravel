import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import SectionTitle from '@/components/SectionTitle';
import { getAllGuides } from '@/lib/data/guides';
import { tourImage } from '@/lib/site-media';

export const metadata: Metadata = {
  title: 'China Travel Guides | 21 Expert Destination Guides | CTS Tours',
  description: 'Explore 21 comprehensive China travel guides: 7 major destinations, 4 Yunnan sub-regions, 5 iconic landmarks, and 5 scenic regions. Expert tips from CTS Tours for New Zealand travellers.',
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
    description: '21 comprehensive China travel guides with attractions, practical info, FAQs, and insider tips.',
    type: 'website',
  },
};

// Guide card component
function GuideCard({ guide }: { guide: any }) {
  return (
    <Link href={`/${guide.slug}`} className="block group">
      <div className="overflow-hidden rounded-lg shadow-md mb-3 bg-gray-100">
        <Image
          src={guide.heroImage}
          alt={guide.destinationName}
          width={400}
          height={400}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover w-full aspect-square transition-transform duration-500 group-hover:scale-105 ${guide.heroImageClassName ?? ''}`}
          loading="lazy"
        />
      </div>
      <h3 className="font-semibold text-accent text-sm group-hover:text-primary transition-colors line-clamp-2">
        {guide.destinationName}
      </h3>
      <p className="text-xs text-gray-500 mt-1">Travel Guide</p>
    </Link>
  );
}

const GuidePage = () => {
  const guides = getAllGuides();

  // Group guides by category
  const majorDestinations = guides.filter(g =>
    ['beijing-travel-guide', 'xian-travel-guide', 'shanghai-travel-guide', 'chengdu-travel-guide', 'guilin-travel-guide', 'zhangjiajie-travel-guide', 'yunnan-travel-guide'].includes(g.slug)
  );

  const yunnanSubguides = guides.filter(g =>
    ['lijiang-travel-guide', 'dali-travel-guide', 'kunming-travel-guide', 'shangri-la-travel-guide'].includes(g.slug)
  );

  const landmarks = guides.filter(g =>
    ['great-wall-travel-guide', 'forbidden-city-travel-guide', 'terracotta-warriors-travel-guide', 'leshan-buddha-travel-guide', 'tianmen-mountain-travel-guide'].includes(g.slug)
  );

  const regions = guides.filter(g =>
    ['yangshuo-travel-guide', 'li-river-travel-guide', 'hangzhou-travel-guide', 'suzhou-travel-guide', 'chongqing-travel-guide'].includes(g.slug)
  );

  const discoveryGuides = guides.filter(g =>
    ['beijing-xian-discovery-guide', 'chongqing-chengdu-discovery-guide', 'shanghai-surroundings-discovery-guide'].includes(g.slug)
  );

  return (
    <div>
      <ImmersivePageHero
        eyebrow="Travel guide"
        title="China Travel Guides"
        subtitle="21 expert destination guides from CTS Tours specialists"
        imageSrc={tourImage('great-wall-mist.jpg')}
        imageAlt="Great Wall of China — China travel guides by CTS Tours"
        priority
      />

      {/* Content */}
      <section className="section bg-white">
        <div className="container">
          <SectionTitle subtitle="Complete Library" title="Explore All 21 Guides" center />
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16 -mt-4">
            Comprehensive travel guides for major destinations, regional specialties, iconic landmarks, and hidden gems. Each guide features attractions, practical information, FAQs, and insider tips from our China specialists.
          </p>

          {/* Discovery Tour Guides */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-accent mb-2">✈️ China Discovery Tour Guides</h2>
            <p className="text-gray-600 mb-8">3 in-depth itinerary guides for our Discovery tours — what to see, when to go, and how to make the most of each route</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {discoveryGuides.map((guide) => (
                <Link key={guide.id} href={`/${guide.slug}`} className="block group bg-warm-50 rounded-xl overflow-hidden border border-warm-100 hover:shadow-lg transition-shadow">
                  <div className="overflow-hidden h-48 bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={guide.heroImage}
                      alt={guide.destinationName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wide">Discovery Guide</span>
                    <h3 className="font-serif text-lg font-bold text-accent mt-1 mb-2 group-hover:text-primary transition-colors">
                      {guide.destinationName}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {(guide.introText[0]?.substring(0, 110) ?? '').trim()}{guide.introText[0] ? '...' : ''}
                    </p>
                    <span className="inline-block mt-3 text-primary text-sm font-medium group-hover:underline">Read the guide →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Major Destinations */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-accent mb-2">🏙️ Major Destinations</h2>
            <p className="text-gray-600 mb-8">7 essential destination guides covering China's most iconic cities</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
              {majorDestinations.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>

          {/* Yunnan Sub-guides */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-accent mb-2">🌄 Yunnan Region</h2>
            <p className="text-gray-600 mb-8">4 detailed guides to Yunnan's most beautiful cities and cultural centers</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {yunnanSubguides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>

          {/* Iconic Landmarks */}
          <div className="mb-20">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-accent mb-2">🏯 Iconic Landmarks</h2>
            <p className="text-gray-600 mb-8">5 must-see UNESCO World Heritage sites and natural wonders</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {landmarks.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>

          {/* Scenic Regions */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-accent mb-2">🛶 Scenic Regions</h2>
            <p className="text-gray-600 mb-8">5 picturesque areas known for natural beauty and cultural heritage</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {regions.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-warm-50 to-warm-100 rounded-2xl text-center">
            <h3 className="text-2xl font-bold font-serif text-accent mb-4">Ready to Explore?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Browse our complete guide collection or connect with a CTS specialist to plan your personalized China journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog" prefetch={false} className="bg-primary text-white px-8 py-3 rounded-full hover:shadow-lg transition-shadow font-medium">
                Read Our Blog
              </Link>
              <Link href="/contact" className="border-2 border-primary text-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-colors font-medium">
                Contact a Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuidePage;
