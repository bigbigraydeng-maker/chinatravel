import { Metadata } from 'next';
import Link from 'next/link';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateBreadcrumbListSchema } from '@/lib/schema-seo';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'China Travel FAQ - Common Questions Answered',
    description: 'Find answers to the most common questions about traveling to China from New Zealand. Budget, best time to visit, safety, visas, and more.',
    path: '/faq',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-green.jpg',
    ogImageAlt: 'China Travel Frequently Asked Questions',
    keywords: ['China travel FAQ', 'China travel questions', 'visiting China', 'China travel tips'],
    ogType: 'website',
  });
}

export default function FAQPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'FAQ', url: '/faq' }
  ];

  const schemas = [
    generateBreadcrumbListSchema(breadcrumbs)
  ];

  // Tier 1 FAQ Pages
  const tier1FAQs = [
    {
      slug: 'planning-your-china-trip',
      title: 'Planning Your China Trip',
      description: 'How long should your trip be? What\'s the best time? How much does it cost? Get answers to the essentials.',
      icon: '🗺️',
      priority: 'Tier 1 - High Priority'
    },
    {
      slug: 'beijing-travel',
      title: 'Beijing Travel Planning',
      description: 'Everything about visiting Beijing - how many days, best season, budget, and day trips to the Great Wall.',
      icon: '🏯',
      priority: 'Tier 1 - High Priority'
    },
    {
      slug: 'great-wall-of-china',
      title: 'Great Wall of China Guide',
      description: 'Complete FAQ about the Great Wall - length, best time to hike, Badaling vs Mutianyu, and difficulty levels.',
      icon: '🧗',
      priority: 'Tier 1 - High Priority'
    }
  ];

  // Tier 2 FAQ Pages (Coming Soon)
  const tier2FAQs = [
    {
      slug: 'shanghai-travel',
      title: 'Shanghai Travel Planning',
      description: 'Coming soon: Shanghai itineraries, water towns, and best experiences.',
      icon: '🌆',
      priority: 'Tier 2 - Coming June 2026'
    },
    {
      slug: 'xi-an-terracotta-warriors',
      title: 'Xi\'an & Terracotta Warriors',
      description: 'Coming soon: Terracotta Army visits, ancient Chinese history, and Xi\'an exploration.',
      icon: '⚔️',
      priority: 'Tier 2 - Coming June 2026'
    },
    {
      slug: 'china-transportation',
      title: 'Transportation in China',
      description: 'Coming soon: Trains, flights, buses, and getting around between cities.',
      icon: '🚄',
      priority: 'Tier 2 - Coming June 2026'
    }
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
                <Link href={crumb.url} className="hover:text-primary transition-colors">
                  {crumb.name}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-secondary/5 py-16 border-b border-warm-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-accent mb-4">
            China Travel FAQ
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Have questions about traveling to China? Find answers to common questions about planning, budget, safety, and more.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-white py-16">
        <div className="container mx-auto px-4">
          {/* Tier 1 - High Priority */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-accent mb-4">
                🎯 Essential Questions (Tier 1)
              </h2>
              <p className="text-gray-700">
                Start here for answers to the most common planning questions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tier1FAQs.map((faq) => (
                <Link
                  key={faq.slug}
                  href={`/faq/${faq.slug}`}
                  className="group flex flex-col border border-warm-100 rounded-xl hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden bg-white"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between p-6 pb-4">
                    <span className="text-4xl">{faq.icon}</span>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                      High Priority
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex-1 px-6 flex flex-col">
                    <h3 className="text-xl font-semibold text-accent mb-3 group-hover:text-primary transition-colors">
                      {faq.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
                      {faq.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-warm-50 border-t border-warm-100 text-sm text-primary font-semibold group-hover:text-primary/80 transition-colors flex items-center gap-2">
                    Read FAQ →
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Tier 2 - Coming Soon */}
          <section className="mb-16 pt-12 border-t border-warm-100">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-accent mb-4">
                📋 Destination-Specific Guides (Tier 2)
              </h2>
              <p className="text-gray-700">
                Coming in June 2026: In-depth guides for specific cities and topics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tier2FAQs.map((faq) => (
                <div
                  key={faq.slug}
                  className="flex flex-col border border-gray-200 rounded-xl bg-gray-50 overflow-hidden opacity-75"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between p-6 pb-4">
                    <span className="text-4xl">{faq.icon}</span>
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-gray-500 bg-gray-200 px-3 py-1 rounded-full whitespace-nowrap">
                      Coming June
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex-1 px-6 flex flex-col">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">
                      {faq.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed flex-1">
                      {faq.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-gray-100 border-t border-gray-200 text-sm text-gray-500 font-semibold">
                    Coming Soon
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Help Section */}
          <section className="mt-16 pt-12 border-t border-warm-100 bg-warm-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-serif font-bold text-accent mb-4">
              Didn't find what you're looking for?
            </h3>
            <p className="text-gray-700 mb-6">
              Our China travel specialists are ready to answer any question about your trip.
            </p>
            <a
              href="/tailor-made"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Chat with Our Experts
            </a>
          </section>
        </div>
      </article>
    </>
  );
}
