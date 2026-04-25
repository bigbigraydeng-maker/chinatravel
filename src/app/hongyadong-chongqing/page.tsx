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
import { hongyadongChongqingMeta } from '@/lib/data/seo-pages';

const TOUR_IMG =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: hongyadongChongqingMeta.title,
    description: hongyadongChongqingMeta.description,
    path: '/hongyadong-chongqing',
    ogImagePath: `/blog/chongqing-night-skyline-hongyadong.jpg`,
    ogImageAlt: 'Hongyadong Chongqing Night — CTS Tours NZ',
    keywords: ['Hongyadong Chongqing', 'Chongqing night market', 'Chongqing cliffside', 'Chongqing Spirited Away', 'Fire & Fuzz tour NZ'],
    ogType: 'website',
  });
}

const visitInfo = [
  { label: 'Address', value: '88 Jialing Riverside Rd, Yuzhong District' },
  { label: 'Opening Hours', value: 'All day (shops open to ~10:00pm)' },
  { label: 'Entry Fee', value: 'Free' },
  { label: 'Best Time', value: 'After dark — 7:30pm to 10:00pm' },
  { label: 'Best Viewpoint', value: 'Qiansimen Bridge (~10 min walk)' },
  { label: 'Suggested Duration', value: '1.5–2 hours' },
  { label: 'Getting There', value: 'Metro Line 1 or 6 — Xiaoshizi Station' },
  { label: 'Nearby', value: 'Jiefangbei (10 min walk), River cruise departures' },
];

export default function HongyadongChongqingPage() {
  const allTours = getAllChinaTours();
  const featuredTours = allTours.filter(t => t.slug === 'chongqing-chengdu');

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'China', url: '/china-tours' },
    { name: 'Chongqing', url: '/chongqing-tours' },
    { name: 'Hongyadong', url: '/hongyadong-chongqing' },
  ];

  const schemas = [
    generateWebPageSchema(
      hongyadongChongqingMeta.title,
      hongyadongChongqingMeta.description,
      '/hongyadong-chongqing'
    ),
    generateBreadcrumbListSchema(breadcrumbs),
    generateFAQPageSchema('/hongyadong-chongqing', hongyadongChongqingMeta.faqs),
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
        title={hongyadongChongqingMeta.h1}
        subtitle={hongyadongChongqingMeta.heroSubtitle}
        backgroundImage={`${TOUR_IMG}/chongqing-night-skyline-hongyadong.jpg`}
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
                  Chongqing&apos;s Most Iconic Landmark
                </h2>
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  {hongyadongChongqingMeta.introText.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* The Miyazaki Connection */}
              <section className="bg-warm-50 border border-warm-100 rounded-2xl p-6 md:p-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  The Spirited Away Connection
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-3">
                  <p>
                    In 2019, a Japanese social media user posted a side-by-side comparison of Hongyadong at night and the bathhouse in Studio Ghibli&apos;s <em>Spirited Away</em>. The visual similarities were striking: layered glowing windows stacked up a cliffside, surrounded by steam and atmospheric light, overlooking water below.
                  </p>
                  <p>
                    The post spread globally. Studio Ghibli never officially confirmed any connection — and likely none exists — but the comparison accelerated Chongqing&apos;s rise as an international travel destination. The city&apos;s visitor numbers grew sharply from 2019 onward, driven in part by travellers who wanted to stand in front of the building that looked like it came from a film they loved.
                  </p>
                  <p>
                    The comparison works because Hongyadong is genuinely extraordinary: a real, functioning mixed-use complex built directly into a clifftop, illuminated at night in a way that has no real Western parallel. The Ghibli comparison helped people who had never been to China understand what they were looking at.
                  </p>
                </div>
              </section>

              {/* Evening Itinerary Suggestion */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Suggested Evening Itinerary
                </h2>
                <ol className="space-y-4">
                  {[
                    { time: '6:30pm', desc: 'Chongqing hot pot dinner near Jiefangbei — your guide recommends local restaurants, not tourist traps.' },
                    { time: '8:00pm', desc: 'Walk to Hongyadong (10 min). Enter the complex and explore levels via staircases and lifts. Free to enter.' },
                    { time: '8:45pm', desc: 'Walk to Qiansimen Bridge for the full panoramic view — the entire lit facade reflected in the Jialing River.' },
                    { time: '9:15pm', desc: 'Optional: Jialing River night cruise (45–60 min) — pass Hongyadong from the water at its most dramatic angle. Included in Fire & Fuzz tour.' },
                  ].map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="flex-shrink-0 w-16 text-sm font-bold text-primary">{step.time}</span>
                      <p className="text-gray-700">{step.desc}</p>
                    </li>
                  ))}
                </ol>
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
                  title="See Hongyadong After Dark on Our Chongqing &amp; Chengdu Tour"
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
                      <dt className="text-gray-600">Storeys</dt>
                      <dd className="font-medium">11 levels of restaurants, bars &amp; shops</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Best after</dt>
                      <dd className="font-medium">7:30pm (full lighting on)</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Entry cost</dt>
                      <dd className="font-medium">Free</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Entry (NZ passport)</dt>
                      <dd className="font-medium">Visa-free up to 30 days</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <div className="text-3xl mb-3">🏮</div>
                  <h4 className="font-bold text-gray-900 mb-2">Included in Fire &amp; Fuzz</h4>
                  <p className="text-sm text-gray-700">
                    Day 4 evening includes Hongyadong visit plus Jialing River night cruise — the best way to see the lit facade from the water.
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
      <FAQSection faqs={hongyadongChongqingMeta.faqs} />

      {/* Final CTA */}
      <CTASection
        title="Experience Hongyadong on Our Chongqing Tour"
        description="Day 4 evening: Hongyadong after dark, followed by a Jialing River cruise past the illuminated cliffside."
        primaryButtonText="View Fire &amp; Fuzz Itinerary"
        primaryButtonLink="/tours/china/discovery/chongqing-chengdu"
        secondaryButtonText="Talk to Our Team"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
