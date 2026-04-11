import { Metadata } from 'next';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import Link from 'next/link';
import HubHero from '@/components/seo/HubHero';
import TourGrid from '@/components/seo/TourGrid';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getAllChinaTours } from '@/lib/data/tours';
import { generateWebPageSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { chinaToursFromNZMeta } from '@/lib/data/seo-pages';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: chinaToursFromNZMeta.title,
    description: chinaToursFromNZMeta.description,
    path: '/china-tours-from-new-zealand',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg',
    ogImageAlt: 'China Tours from New Zealand - Expert-Led Itineraries with CTS Tours',
    keywords: ['China tours from New Zealand', 'Kiwi China travel', 'NZ China tours', 'CTS Tours New Zealand'],
    ogType: 'website',
  });
}

export default function ChinaToursFromNZPage() {
  const allTours = getAllChinaTours();
  // Feature 6-8 premium tours for this geo-targeted page
  const featuredTours = allTours.filter(t => t.tier === 'signature').slice(0, 8);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'China', url: '/china-tours' },
    { name: 'From New Zealand', url: '/china-tours-from-new-zealand' }
  ];

  const schemas = [
    generateWebPageSchema(
      chinaToursFromNZMeta.title,
      chinaToursFromNZMeta.description,
      '/china-tours-from-new-zealand',
      { name: 'New Zealand', address: 'Auckland, New Zealand' }
    ),
    generateBreadcrumbListSchema(breadcrumbs),
    generateFAQPageSchema('/china-tours-from-new-zealand', chinaToursFromNZMeta.faqs)
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
        title={chinaToursFromNZMeta.h1}
        subtitle={chinaToursFromNZMeta.heroSubtitle}
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
                  Tailored for Kiwis
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {chinaToursFromNZMeta.introText}
                </p>
              </section>

              {/* Why Choose CTS for NZ Travellers */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  Why Kiwis Choose CTS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Direct Flights from Auckland',
                      desc: 'Non-stop flights from AKL to Shanghai or Beijing. No multi-city connections.'
                    },
                    {
                      title: 'NZD Pricing',
                      desc: 'All prices in New Zealand dollars. No hidden currency fluctuations.'
                    },
                    {
                      title: 'Local Aotearoa Support',
                      desc: 'CTS team based in Auckland. NZ office hours. Kiwi expertise.'
                    },
                    {
                      title: '98 Years Experience',
                      desc: 'Since 1928, taking New Zealand travellers to China. Trust & reliability.'
                    },
                    {
                      title: 'Entry for NZ passports',
                      desc: 'Clear advice on the China visa-free window for NZ ordinary passports (30 days; confirm dates and documents before travel).'
                    },
                    {
                      title: 'Flexible Payments',
                      desc: 'Payment plans available. Direct debit from NZ bank accounts.'
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
                  title="Featured Signature Journeys"
                  subtitle="Curated for New Zealand travellers"
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
                      <dd className="font-medium">12-13 hours direct</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Time Difference</dt>
                      <dd className="font-medium">6 hours behind (winter)</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Best Season</dt>
                      <dd className="font-medium">Sept - Oct</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Entry (NZ passport)</dt>
                      <dd className="font-medium">Visa-free up to 30 days (confirm policy before travel)</dd>
                    </div>
                  </dl>
                </div>

                {/* NZ Flag Feature */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6">
                  <div className="text-4xl mb-3">🇳🇿</div>
                  <h4 className="font-bold text-gray-900 mb-2">Kiwi Travellers Welcome</h4>
                  <p className="text-sm text-gray-700">
                    CTS proudly serves New Zealand with expert China travel advice and local support.
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
      <FAQSection faqs={chinaToursFromNZMeta.faqs} />

      {/* Final CTA */}
      <CTASection
        title="Ready to Discover China from New Zealand?"
        description="Our Aotearoa-based team is ready to help. Let's plan your perfect China journey."
        primaryButtonText="Start Planning"
        primaryButtonLink="/tailor-made"
        secondaryButtonText="Talk to Our Team"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
