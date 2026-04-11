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
import { chinaToursFromAucklandMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: chinaToursFromAucklandMeta.title,
    description: chinaToursFromAucklandMeta.description,
    path: '/china-tours-from-auckland',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg',
    ogImageAlt: 'China Tours from Auckland - Direct Departures with CTS Tours',
    keywords: ['China tours from Auckland', 'Auckland China travel', 'CTS Tours Auckland'],
    ogType: 'website',
  });
}

export default function ChinaToursFromAucklandPage() {
  const allTours = getAllChinaTours();
  const featuredTours = allTours.filter(t => t.tier === 'signature').slice(0, 8);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'China', url: '/china-tours' },
    { name: 'From Auckland', url: '/china-tours-from-auckland' }
  ];

  const schemas = [
    generateWebPageSchema(
      chinaToursFromAucklandMeta.title,
      chinaToursFromAucklandMeta.description,
      '/china-tours-from-auckland',
      { name: 'Auckland', address: 'Auckland, New Zealand' }
    ),
    generateBreadcrumbListSchema(breadcrumbs),
    generateFAQPageSchema('/china-tours-from-auckland', chinaToursFromAucklandMeta.faqs)
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
        title={chinaToursFromAucklandMeta.h1}
        subtitle={chinaToursFromAucklandMeta.heroSubtitle}
        backgroundImage="linear-gradient(135deg, rgba(139, 90, 60, 0.8) 0%, rgba(212, 165, 116, 0.8) 100%), url('https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg')"
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
                  Direct from Auckland
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {chinaToursFromAucklandMeta.introText}
                </p>
              </section>

              {/* Auckland Advantages */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  Auckland Advantages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      emoji: '✈️',
                      title: 'Non-Stop Flights',
                      desc: 'Direct AKL-Shanghai or AKL-Beijing departures. No connections, no delays.'
                    },
                    {
                      emoji: '🏢',
                      title: 'Auckland Office',
                      desc: 'Visit our local office in Auckland. Meet consultants face-to-face.'
                    },
                    {
                      emoji: '🚗',
                      title: 'Airport Transfers',
                      desc: 'We arrange door-to-door transport from your home to AKL Airport.'
                    },
                    {
                      emoji: '📞',
                      title: 'Local Support',
                      desc: 'AKL-based team working your hours. Same timezone support & advice.'
                    },
                    {
                      emoji: '💳',
                      title: 'NZD Pricing',
                      desc: 'All costs in NZ dollars. No currency conversion surprises.'
                    },
                    {
                      emoji: '🎓',
                      title: 'Expert Consultants',
                      desc: 'CTS specialists with personal China experience based in Aotearoa.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-warm-50 border border-warm-100 rounded-lg p-6">
                      <div className="text-3xl mb-3">{item.emoji}</div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-700 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Featured Tours */}
              <section>
                <SectionTitle
                  title="Popular Departures from Auckland"
                  subtitle="Choose your ideal China adventure"
                />
                <TourGrid tours={featuredTours} columns={2} />
              </section>

              {/* How to Book */}
              <section className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-8">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  How to Book Your Auckland Departure
                </h3>
                <ol className="space-y-4">
                  {[
                    'Browse tours on this page or visit /china-tours',
                    'Contact our Auckland office or call us with your preferred tour',
                    'Discuss entry requirements, dates, and any customizations with your consultant',
                    'Arrange your departure from Auckland Airport (AKL)',
                    'We handle all logistics—flights, hotels, guides—everything',
                    'Enjoy your China adventure!'
                  ].map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-white font-bold text-sm">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="text-gray-700">{step}</div>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Auckland Info</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-600">Departure Airport</dt>
                      <dd className="font-medium">Auckland (AKL)</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Flight Time</dt>
                      <dd className="font-medium">12-13 hours direct</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Arrival Hubs</dt>
                      <dd className="font-medium">Shanghai or Beijing</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">CTS Office</dt>
                      <dd className="font-medium">Auckland, NZ</dd>
                    </div>
                  </dl>
                </div>

                {/* Contact Box */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Visit Our Auckland Office</h4>
                  <p className="text-sm text-gray-700 mb-4">
                    Meet our team in person to discuss your China tour. Coffee on us!
                  </p>
                  <a
                    href="/contact"
                    className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                  >
                    Get Office Details
                  </a>
                </div>

                {/* CTA Button */}
                <a
                  href="/tailor-made"
                  className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
                >
                  Plan My Departure
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <FAQSection faqs={chinaToursFromAucklandMeta.faqs} />

      {/* Final CTA */}
      <CTASection
        title="Ready to Depart from Auckland?"
        description="Contact our Auckland office today. Let's plan your perfect China journey."
        primaryButtonText="Contact Us Now"
        primaryButtonLink="/contact"
        secondaryButtonText="Browse All Tours"
        secondaryButtonLink="/china-tours"
      />
    </>
  );
}
