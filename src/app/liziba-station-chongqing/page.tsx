import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import HubHero from '@/components/seo/HubHero';
import TourGrid from '@/components/seo/TourGrid';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getAllChinaTours } from '@/lib/data/tours';
import { generateWebPageSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { lizibastationChongqingMeta } from '@/lib/data/seo-pages';

const TOUR_IMG =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: lizibastationChongqingMeta.title,
    description: lizibastationChongqingMeta.description,
    path: '/liziba-station-chongqing',
    ogImagePath: `${TOUR_IMG}/chongqing-travel-guide.jpg`,
    ogImageAlt: 'Liziba Station Chongqing — Train Through a Building — CTS Tours NZ',
    keywords: ['Liziba Station Chongqing', 'train through building Chongqing', 'monorail building Chongqing', 'Chongqing things to do', 'Fire & Fuzz tour NZ'],
    ogType: 'website',
  });
}

const visitInfo = [
  { label: 'Address', value: 'Liziba Zheng Jie, Yuzhong District' },
  { label: 'Transit Line', value: 'Line 2 — Liziba Station' },
  { label: 'Viewing Cost', value: 'Free (street-level observation area)' },
  { label: 'Ride Cost', value: 'CNY 4 (~NZD 1) for metro ticket' },
  { label: 'Train Frequency', value: 'Every 5–10 minutes' },
  { label: 'Suggested Duration', value: '30–60 minutes' },
  { label: 'Best Time', value: 'Afternoon 3–6pm (good light, moderate crowds)' },
  { label: 'Nearby', value: 'Ciqikou Ancient Town (~20 min walk)' },
];

export default function LizibaStationChongqingPage() {
  const allTours = getAllChinaTours();
  const featuredTours = allTours.filter(t => t.slug === 'chongqing-chengdu');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'China', url: '/china-tours' },
    { name: 'Chongqing', url: '/chongqing-tours' },
    { name: 'Liziba Station', url: '/liziba-station-chongqing' },
  ];

  const schemas = [
    generateWebPageSchema(
      lizibastationChongqingMeta.title,
      lizibastationChongqingMeta.description,
      '/liziba-station-chongqing'
    ),
    generateBreadcrumbListSchema(breadcrumbs),
    generateFAQPageSchema('/liziba-station-chongqing', lizibastationChongqingMeta.faqs),
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="text-gray-400">/</span>}
                <a href={crumb.url} className="hover:text-primary transition-colors">
                  {crumb.name}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <HubHero
        title={lizibastationChongqingMeta.h1}
        subtitle={lizibastationChongqingMeta.heroSubtitle}
        backgroundImage={`${TOUR_IMG}/chongqing-travel-guide.jpg`}
        imageClassName="object-[center_50%]"
      />

      <TrustBar />

      {/* Main Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">

              {/* Introduction */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  The Monorail That Runs Through a Residential Building
                </h2>
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  {lizibastationChongqingMeta.introText.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* What Makes It Unique */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  What Makes Liziba Station Unique
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'Only station of its kind', desc: 'The only rail transit station in the world built inside an occupied residential building.' },
                    { title: 'Built together, not retrofitted', desc: 'The station and building were co-constructed in 2004. The train route was planned first; the building designed around it.' },
                    { title: 'Rubber-tyred trains', desc: 'Chongqing\'s Line 2 uses rubber tyres instead of steel wheels, dramatically reducing noise and vibration for residents.' },
                    { title: 'Mountain city engineering', desc: 'Chongqing\'s extreme terrain — steep hills, limited flat land — forced creative infrastructure solutions. Liziba is the most famous result.' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-warm-50 border border-warm-100 rounded-lg p-5">
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-700">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Practical Visit Info */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Visitor Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {visitInfo.map((item, idx) => (
                    <div key={idx} className="bg-warm-50 border border-warm-100 rounded-lg p-4">
                      <dt className="text-sm text-gray-500 font-medium mb-1">{item.label}</dt>
                      <dd className="text-gray-900 font-semibold">{item.value}</dd>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Tour */}
              <section>
                <SectionTitle
                  title="See Liziba Station as Part of Our Chongqing &amp; Chengdu Tour"
                  subtitle="Fire &amp; Fuzz — 10 days from NZD $2,999"
                />
                <TourGrid tours={featuredTours} columns={2} />
              </section>

              {/* All Tours Link */}
              <section className="text-center py-8 border-t border-gray-200">
                <p className="text-gray-600 mb-4">Explore all our China tour options</p>
                <a
                  href="/china-tours"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                >
                  View All China Tours →
                </a>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Quick Facts</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-600">Built</dt>
                      <dd className="font-medium">2004 (opened June 2005)</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Line</dt>
                      <dd className="font-medium">Chongqing Rail Transit Line 2</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Entry cost</dt>
                      <dd className="font-medium">Free to watch from street</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Entry (NZ passport)</dt>
                      <dd className="font-medium">Visa-free up to 30 days</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="text-3xl mb-3">🚝</div>
                  <h4 className="font-bold text-gray-900 mb-2">Included in Fire &amp; Fuzz</h4>
                  <p className="text-sm text-gray-700">
                    Day 1 of the Chongqing &amp; Chengdu tour includes a guided Liziba visit — watch from the street and ride through the building.
                  </p>
                </div>

                <a
                  href="/tours/china/discovery/chongqing-chengdu"
                  className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
                >
                  View Fire &amp; Fuzz Itinerary →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <FAQSection faqs={lizibastationChongqingMeta.faqs} />

      {/* Final CTA */}
      <CTASection
        title="See Chongqing&apos;s Most Extraordinary Engineering on Tour"
        description="Liziba Station is Day 1 of our Fire &amp; Fuzz tour — guided, hassle-free, with full context from your expert guide."
        primaryButtonText="View Fire &amp; Fuzz Itinerary"
        primaryButtonLink="/tours/china/discovery/chongqing-chengdu"
        secondaryButtonText="Talk to Our Team"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
