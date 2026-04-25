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
import { chengduPandaSanctuaryMeta } from '@/lib/data/seo-pages';

const TOUR_IMG =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: chengduPandaSanctuaryMeta.title,
    description: chengduPandaSanctuaryMeta.description,
    path: '/chengdu-panda-sanctuary',
    ogImagePath: `${TOUR_IMG}/chengdu-pandas.jpg`,
    ogImageAlt: 'Chengdu Giant Panda Sanctuary — CTS Tours NZ',
    keywords: ['Chengdu panda sanctuary', 'giant panda tour Chengdu', 'Chengdu panda base', 'chengdu panda tour New Zealand', 'China panda tour NZ'],
    ogType: 'website',
  });
}

const visitInfo = [
  { label: 'Best Visit Time', value: '8:00am–10:00am (morning feeding)' },
  { label: 'Address', value: '1375 Panda Ave, Chengdu' },
  { label: 'Opening Hours', value: '7:30am–6:00pm daily' },
  { label: 'Adult Ticket', value: 'CNY 58 (~NZD 13)' },
  { label: 'Suggested Duration', value: '2.5–3 hours' },
  { label: 'Getting There', value: 'Metro Line 3 — Panda Base Station' },
  { label: 'Best Months', value: 'March–May, September–November' },
  { label: 'What You\'ll See', value: 'Giant pandas, red pandas, panda cubs (seasonal)' },
];

export default function ChengduPandaSanctuaryPage() {
  const allTours = getAllChinaTours();
  const featuredTours = allTours.filter(t => t.slug === 'chongqing-chengdu');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'China', url: '/china-tours' },
    { name: 'Chengdu', url: '/chengdu-tours' },
    { name: 'Panda Sanctuary', url: '/chengdu-panda-sanctuary' },
  ];

  const schemas = [
    generateWebPageSchema(
      chengduPandaSanctuaryMeta.title,
      chengduPandaSanctuaryMeta.description,
      '/chengdu-panda-sanctuary'
    ),
    generateBreadcrumbListSchema(breadcrumbs),
    generateFAQPageSchema('/chengdu-panda-sanctuary', chengduPandaSanctuaryMeta.faqs),
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
        title={chengduPandaSanctuaryMeta.h1}
        subtitle={chengduPandaSanctuaryMeta.heroSubtitle}
        backgroundImage={`${TOUR_IMG}/chengdu-pandas.jpg`}
        imageClassName="object-[center_40%]"
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
                  The World&apos;s Leading Panda Conservation Centre
                </h2>
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  {chengduPandaSanctuaryMeta.introText.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
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
                  title="See Giant Pandas on Our Chongqing &amp; Chengdu Tour"
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
                      <dt className="text-gray-600">Pandas on site</dt>
                      <dd className="font-medium">200+ giant &amp; red pandas</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Established</dt>
                      <dd className="font-medium">1987</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Peak viewing</dt>
                      <dd className="font-medium">8:00–10:00am daily</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Entry (NZ passport)</dt>
                      <dd className="font-medium">Visa-free up to 30 days</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                  <div className="text-3xl mb-3">🐼</div>
                  <h4 className="font-bold text-gray-900 mb-2">Included in Fire &amp; Fuzz</h4>
                  <p className="text-sm text-gray-700">
                    Day 7 morning visit to the panda base is built into our Chongqing &amp; Chengdu Discovery tour. No separate booking needed.
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
      <FAQSection faqs={chengduPandaSanctuaryMeta.faqs} />

      {/* Final CTA */}
      <CTASection
        title="Ready to See Giant Pandas in Chengdu?"
        description="Our team handles everything — flights, transfers, panda base entry, and expert guide commentary."
        primaryButtonText="View Fire &amp; Fuzz Itinerary"
        primaryButtonLink="/tours/china/discovery/chongqing-chengdu"
        secondaryButtonText="Talk to Our Team"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
