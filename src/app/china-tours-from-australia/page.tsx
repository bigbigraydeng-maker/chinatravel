import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import HubHero from '@/components/seo/HubHero';
import TourGrid from '@/components/seo/TourGrid';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getAllChinaTours } from '@/lib/data/tours';
import { generateWebPageSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { chinaToursFromAustraliaMeta } from '@/lib/data/seo-pages';

const TOUR_IMG =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: chinaToursFromAustraliaMeta.title,
    description: chinaToursFromAustraliaMeta.description,
    path: '/china-tours-from-australia',
    ogImagePath: `${TOUR_IMG}/great-wall-mist.jpg`,
    ogImageAlt: 'China Tours from Australia - Expert-Led Itineraries with CTS Tours',
    keywords: ['China tours from Australia', 'Australia China travel', 'AU China tours', 'CTS Tours Australia'],
    ogType: 'website',
  });
}

export default function ChinaToursFromAustraliaPage() {
  const allTours = getAllChinaTours();
  const featuredTours = allTours.filter(t => t.tier === 'signature').slice(0, 8);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'China', url: '/china-tours' },
    { name: 'From Australia', url: '/china-tours-from-australia' }
  ];

  const schemas = [
    generateWebPageSchema(
      chinaToursFromAustraliaMeta.title,
      chinaToursFromAustraliaMeta.description,
      '/china-tours-from-australia',
      { name: 'Australia', address: 'Sydney, Australia' }
    ),
    generateBreadcrumbListSchema(breadcrumbs)
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
        title={chinaToursFromAustraliaMeta.h1}
        subtitle={chinaToursFromAustraliaMeta.heroSubtitle}
        backgroundImage={`${TOUR_IMG}/great-wall-mist.jpg`}
        imageClassName="object-[center_35%]"
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
                  Tailored for Australians
                </h2>
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  {chinaToursFromAustraliaMeta.introText.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              <section
                aria-labelledby="au-quick-links-heading"
                className="rounded-2xl border border-warm-200 bg-warm-50/80 p-6 md:p-8"
              >
                <h2 id="au-quick-links-heading" className="text-xl font-serif font-bold text-gray-900 mb-3">
                  Popular AU planning links
                </h2>
                <p className="text-gray-700 text-sm md:text-base mb-4">
                  Browse our most popular itineraries for Australian visitors, from classic highlights to immersive regional journeys.
                </p>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm">
                  <li>
                    <Link href="/china-visa-guide-for-new-zealanders" className="text-primary font-medium hover:underline">
                      China entry &amp; visa-free guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-tours" className="text-primary font-medium hover:underline">
                      Full China tours hub
                    </Link>
                  </li>
                  <li>
                    <Link href="/tours/china/discovery/beijing-xian" className="text-primary font-medium hover:underline">
                      Discovery · Beijing &amp; Xi&apos;an
                    </Link>
                  </li>
                  <li>
                    <Link href="/campaigns/october-2026/tale-of-two-cities" className="text-primary font-medium hover:underline">
                      October 2026 · Beijing &amp; Xi&apos;an spotlight
                    </Link>
                  </li>
                  <li>
                    <Link href="/tours/china/discovery/shanghai-surroundings" className="text-primary font-medium hover:underline">
                      Discovery · Shanghai &amp; Surroundings
                    </Link>
                  </li>
                  <li>
                    <Link href="/best-time-to-visit-china" className="text-primary font-medium hover:underline">
                      Best time to visit China
                    </Link>
                  </li>
                </ul>
              </section>

              {/* Classic gateways */}
              <section className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-gray-900">
                  Classic gateways from Australia
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Most CTS journeys begin in Shanghai or Beijing after your direct flight from Sydney.
                  From there you can head to imperial landmarks, ancient capitals, river landscapes, and
                  modern megacities — all with English-speaking guides and hand-picked hotels.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <figure className="rounded-xl overflow-hidden border border-warm-100 bg-warm-50 shadow-sm">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={`${TOUR_IMG}/shanghai-skyline.jpg`}
                        alt="Shanghai skyline at dusk — a common first stop after flying from Australia"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <figcaption className="p-3 text-sm text-gray-600">
                      Shanghai — Pudong skyline and the Bund, often the first chapter of a China tour.
                    </figcaption>
                  </figure>
                  <figure className="rounded-xl overflow-hidden border border-warm-100 bg-warm-50 shadow-sm">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={`${TOUR_IMG}/forbidden-city-aerial.jpg`}
                        alt="Aerial view of Beijing's Forbidden City"
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <figcaption className="p-3 text-sm text-gray-600">
                      Beijing — Forbidden City and the Great Wall within easy reach of the capital.
                    </figcaption>
                  </figure>
                  <figure className="rounded-xl overflow-hidden border border-warm-100 bg-warm-50 shadow-sm">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={`${TOUR_IMG}/xian-terracotta.jpg`}
                        alt="Terracotta Army near Xi'an"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <figcaption className="p-3 text-sm text-gray-600">
                      Xi&apos;an — Terracotta Warriors and China&apos;s ancient capital culture.
                    </figcaption>
                  </figure>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-warm-100 shadow-sm">
                  <Image
                    src={`${TOUR_IMG}/guilin-mist.jpg`}
                    alt="Karst peaks and mist along the Li River near Guilin"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h2 className="text-2xl font-serif font-bold text-gray-900">
                    Nature &amp; pacing for Australian travellers
                  </h2>
                  <p>
                    Australians often ask for a mix of iconic sights and breathing room. Routes that
                    combine Guilin or Zhangjiajie with Shanghai or Chengdu give you dramatic landscapes
                    without sacrificing comfort — sensible driving days, time for exploring, and
                    guides who understand Western expectations around meals and rest.
                  </p>
                  <p>
                    If you are travelling as a family or a small group, tell us how you like to move:
                    we can lean toward earlier starts and free afternoons, or denser sightseeing with
                    built-in recovery days.
                  </p>
                  <p className="text-sm text-gray-600">
                    Seasonal timing: see{' '}
                    <a href="/best-time-to-visit-china" className="text-primary font-medium hover:underline">
                      best time to visit China
                    </a>{' '}
                    for month-by-month notes. Entry rules for Australian passports are covered in our{' '}
                    <a
                      href="/china-visa-guide-for-new-zealanders"
                      className="text-primary font-medium hover:underline"
                    >
                      China entry guide
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* Why Choose CTS for AU Travellers */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  Why Australians Choose CTS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Direct Flights from Sydney',
                      desc: 'Non-stop flights from SYD to Shanghai or Beijing in 11–12 hours. Services also from Melbourne and Brisbane.'
                    },
                    {
                      title: 'AUD Pricing',
                      desc: 'All prices quoted in Australian dollars. No hidden currency fluctuations or conversion fees.'
                    },
                    {
                      title: 'China Specialists',
                      desc: 'CTS consultants with deep China expertise. Over 90 years arranging China tours for Antipodean travellers.'
                    },
                    {
                      title: 'Visa-Free Entry',
                      desc: 'Australian passport holders can enter China visa-free for up to 30 days. We advise on entry requirements and documentation.'
                    },
                    {
                      title: 'Small Group Tours',
                      desc: 'Maximum 16 guests on Signature tours. Personal attention, flexible pacing, genuine local experiences.'
                    },
                    {
                      title: 'End-to-End Service',
                      desc: 'Flights, hotels, guides, domestic transport, and all bookings handled. Nothing left for you to figure out.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-warm-50 border border-warm-100 rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-700 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Tours */}
              <section>
                <SectionTitle
                  title="China Tours Departing from Australia"
                  subtitle="Signature itineraries for Australian travellers"
                />
                <TourGrid tours={featuredTours} columns={2} />
              </section>

              {/* All Tours Link */}
              <section className="text-center py-8 border-t border-gray-200">
                <p className="text-gray-600 mb-4">Ready to explore all our China collections?</p>
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
                {/* Quick Info Card */}
                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Travel Facts</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-600">Flight Duration</dt>
                      <dd className="font-medium">11–12 hours direct (SYD)</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Time Difference</dt>
                      <dd className="font-medium">3 hours behind (AEST)</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Best Season</dt>
                      <dd className="font-medium">Sept – Oct</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Entry (AU passport)</dt>
                      <dd className="font-medium">Visa-free up to 30 days (confirm policy before travel)</dd>
                    </div>
                  </dl>
                </div>

                {/* AU Flag Feature */}
                <div className="bg-gradient-to-br from-blue-50 to-yellow-50 border border-blue-200 rounded-xl p-6">
                  <div className="text-4xl mb-3">🇦🇺</div>
                  <h4 className="font-bold text-gray-900 mb-2">Australian Travellers Welcome</h4>
                  <p className="text-sm text-gray-700">
                    CTS proudly serves Australian travellers with expert China advice and seamless end-to-end tours.
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href="/tailor-made"
                  className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
                >
                  Plan My Trip
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <FAQSection faqs={chinaToursFromAustraliaMeta.faqs} />

      {/* Final CTA */}
      <CTASection
        title="Ready to Discover China from Australia?"
        description="Our China specialists are ready to help. Let's plan your perfect China journey from Sydney, Melbourne, or Brisbane."
        primaryButtonText="Start Planning"
        primaryButtonLink="/tailor-made"
        secondaryButtonText="Talk to Our Team"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
