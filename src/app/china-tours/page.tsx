import { Metadata } from 'next';
import HubHero from '@/components/seo/HubHero';
import TourGrid from '@/components/seo/TourGrid';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import RelatedGuides from '@/components/seo/RelatedGuides';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getAllChinaTours } from '@/lib/data/tours';
import { getSiteUrl } from '@/lib/site';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { generateCollectionPageSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { chinaToursMeta } from '@/lib/data/seo-pages';

const siteUrl = getSiteUrl();

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: chinaToursMeta.title,
    description: chinaToursMeta.description,
    path: '/china-tours',
    ogImagePath: '/images/tours/forbidden-city-aerial.jpg',
    ogImageAlt: 'China Tours, CTS Tours',
    keywords: [
      'China tours',
      'China tours from New Zealand',
      'China travel',
      'Signature tours',
      'Discovery tours',
      'Stopover tours',
      'CTS Tours',
    ],
    ogType: 'website',
    openGraphTitle: chinaToursMeta.title,
    openGraphDescription: chinaToursMeta.description,
  });
}

export default function ChinaToursPage() {
  const tours = getAllChinaTours();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'China Tours', url: '/china-tours' }
  ];

  const schemas = [
    generateCollectionPageSchema(
      chinaToursMeta.title,
      chinaToursMeta.description,
      '/china-tours',
      tours
    ),
    generateBreadcrumbListSchema(breadcrumbs),
    generateFAQPageSchema('/china-tours', chinaToursMeta.faqs)
  ];

  const relatedGuides = [
    {
      title: 'Best Time to Visit China',
      slug: 'best-time-to-visit-china',
      description: 'Month-by-month guide to planning your perfect China trip'
    },
    {
      title: 'China Visa Guide for NZ Citizens',
      slug: 'china-visa-guide-for-new-zealanders',
      description: 'Complete L-Visa requirements, timeline, and costs'
    }
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />

      {/* Breadcrumb Navigation */}
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
        title={chinaToursMeta.h1}
        subtitle={chinaToursMeta.heroSubtitle}
        backgroundImage="linear-gradient(135deg, rgba(139, 90, 60, 0.8) 0%, rgba(212, 165, 116, 0.8) 100%), url('/images/tours/forbidden-city-aerial.jpg')"
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
                  Explore Our Collections
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {chinaToursMeta.introText}
                </p>
              </section>

              {/* Tours Grid */}
              <section id="tours-section">
                <SectionTitle
                  title="All China Tours"
                  subtitle="Browse our complete collection"
                />
                <TourGrid tours={tours} columns={2} />
              </section>

              {/* Signature Tours Highlight */}
              {tours.filter(t => t.tier === 'signature').length > 0 && (
                <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-8">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                    ⭐ CTS Signature Collection
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our premium collection features boutique 4-5 star accommodations, small group sizes (max 16 passengers), and locally-led experiences designed by our China specialists. Perfect for travellers seeking depth and immersion.
                  </p>
                  <a
                    href="/tours/china/signature"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                  >
                    View All Signature Tours →
                  </a>
                </section>
              )}

              {/* Discovery Tours Highlight */}
              {tours.filter(t => t.tier === 'discovery').length > 0 && (
                <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                    💚 CTS Discovery Collection
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Reliable, well-organized China experiences at excellent value. Our Discovery collection features 3-4 star hotels, must-see itineraries, and expert guides—ideal for first-time visitors and those seeking great value.
                  </p>
                  <a
                    href="/tours/china/discovery"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                  >
                    View All Discovery Tours →
                  </a>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Quick Facts</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-600">Total Tours</dt>
                      <dd className="font-medium">{tours.length}+</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Destinations</dt>
                      <dd className="font-medium">7 regions</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Collections</dt>
                      <dd className="font-medium">Signature, Discovery, Stopover</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Experience</dt>
                      <dd className="font-medium">98 years</dd>
                    </div>
                  </dl>
                </div>

                {/* CTA Button */}
                <a
                  href="/tailor-made"
                  className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
                >
                  Tailor My Trip
                </a>

                {/* Tip Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <span className="font-bold">💡 Tip:</span> Filter by destination to explore Beijing, Shanghai, Xi'an, and more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Guides */}
      <RelatedGuides
        guides={relatedGuides}
        title="Plan Your China Journey"
        subtitle="Get expert guidance on timing and visas"
      />

      {/* FAQs */}
      <FAQSection faqs={chinaToursMeta.faqs} />

      {/* Final CTA */}
      <CTASection
        title="Ready for China?"
        description="Our specialists are ready to create your perfect China itinerary. Let's start planning!"
        primaryButtonText="Plan My China Trip"
        primaryButtonLink="/tailor-made"
        secondaryButtonText="Contact Our Team"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
