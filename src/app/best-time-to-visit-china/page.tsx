import { Metadata } from 'next';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import SchemaMarkup from '@/components/SchemaMarkup';
import RelatedGuides from '@/components/seo/RelatedGuides';
import HubHero from '@/components/seo/HubHero';
import TourGrid from '@/components/seo/TourGrid';
import { getAllChinaTours } from '@/lib/data/tours';
import { generateArticleSchema, generateBreadcrumbListSchema, generateFAQPageSchema } from '@/lib/schema-seo';
import { bestTimeToVisitChinaMeta } from '@/lib/data/seo-pages';

export const metadata: Metadata = {
  title: bestTimeToVisitChinaMeta.title,
  description: bestTimeToVisitChinaMeta.description,
  keywords: ['Best time to visit China', 'China weather', 'China seasons', 'China travel guide'],
  openGraph: {
    title: bestTimeToVisitChinaMeta.title,
    description: bestTimeToVisitChinaMeta.description,
    type: 'article',
    url: '/best-time-to-visit-china',
    images: [{
      url: '/images/tours/great-wall-green.jpg',
      width: 1200,
      height: 630,
      alt: 'Best Time to Visit China'
    }]
  },
  alternates: { canonical: '/best-time-to-visit-china' }
};

export default function BestTimeToVisitChinaPage() {
  const tours = getAllChinaTours().slice(0, 6);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/china-tours' },
    { name: 'Best Time to Visit', url: '/best-time-to-visit-china' }
  ];

  const schemas = [
    generateArticleSchema(
      bestTimeToVisitChinaMeta.title,
      bestTimeToVisitChinaMeta.description,
      '/best-time-to-visit-china'
    ),
    generateBreadcrumbListSchema(breadcrumbs),
    generateFAQPageSchema('/best-time-to-visit-china', bestTimeToVisitChinaMeta.faqs)
  ];

  const relatedGuides = [
    {
      title: 'China Visa Guide',
      slug: 'china-visa-guide-for-new-zealanders',
      description: 'L-Visa requirements, timeline, costs for NZ citizens'
    },
    {
      title: 'All China Tours',
      slug: 'china-tours',
      description: 'Browse Signature, Discovery, and Stopover collections'
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
        title={bestTimeToVisitChinaMeta.h1}
        subtitle={bestTimeToVisitChinaMeta.heroSubtitle}
      />

      {/* Main Content */}
      <article className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12 prose prose-lg max-w-none">
              {/* Introduction */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Overview
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {bestTimeToVisitChinaMeta.introText}
                </p>
              </section>

              {/* Month-by-Month Guide */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  Month-by-Month Guide
                </h2>

                {[
                  {
                    month: 'January',
                    season: '❄️ Winter',
                    weather: 'Very cold in the north (Beijing: -5°C), mild in the south (Yunnan: 15-20°C)',
                    crowds: 'Low (except New Year holidays)',
                    highlights: 'Clear skies, crisp air, beautiful for photography',
                    best_for: ['Photography', 'Northern cities', 'Great Wall hikes']
                  },
                  {
                    month: 'February',
                    season: '🎆 Chinese New Year',
                    weather: 'Cold north, mild south. Lunar New Year period (usually late Jan-early Feb)',
                    crowds: 'VERY HIGH (holiday period)',
                    highlights: 'Festive celebrations, special events, unique cultural experiences',
                    best_for: ['Cultural immersion', 'Festival experiences', 'Family trips']
                  },
                  {
                    month: 'March-April',
                    season: '🌸 Spring',
                    weather: 'Mild to warm (15-25°C), spring flowers blooming',
                    crowds: 'Moderate',
                    highlights: 'Cherry blossoms, ideal hiking weather, comfortable temperatures',
                    best_for: ['All regions', 'Hiking', 'Photography']
                  },
                  {
                    month: 'May',
                    season: '☀️ Late Spring',
                    weather: 'Warm (20-30°C), occasional rain starting',
                    crowds: 'Moderate-high (May Golden Week holidays)',
                    highlights: 'Perfect weather, lush greenery, before summer heat',
                    best_for: ['General tourism', 'Outdoor activities']
                  },
                  {
                    month: 'June-August',
                    season: '☁️ Summer',
                    weather: 'Hot and humid (25-40°C), rainy season in some regions',
                    crowds: 'VERY HIGH (school holidays)',
                    highlights: 'Long daylight hours, some mountain areas still cool',
                    best_for: ['Mountain trekking', 'Swimming in Yangshuo', 'Night markets']
                  },
                  {
                    month: 'September-October',
                    season: '🍂 Autumn',
                    weather: 'Ideal conditions (15-30°C), clear skies, low humidity',
                    crowds: 'Moderate-high (October Golden Week)',
                    highlights: 'Best overall season, comfortable hiking, beautiful light',
                    best_for: ['All activities', 'All regions', '⭐ RECOMMENDED']
                  },
                  {
                    month: 'November',
                    season: '🍁 Late Autumn',
                    weather: 'Cooling down (10-25°C), crystal clear skies',
                    crowds: 'Low-moderate',
                    highlights: 'Fall colors, fewer tourists, excellent for sightseeing',
                    best_for: ['Photography', 'Great Wall', 'Hiking']
                  },
                  {
                    month: 'December',
                    season: '❄️ Early Winter',
                    weather: 'Cold in north (0-10°C), mild in south (10-20°C)',
                    crowds: 'Low (except end-of-year holidays)',
                    highlights: 'Few tourists, clear skies, festive atmosphere in some cities',
                    best_for: ['Southern regions', 'Photography', 'Quiet experiences']
                  }
                ].map((item, idx) => (
                  <div key={idx} className="border-l-4 border-primary pl-6 py-4">
                    <h3 className="text-xl font-bold mb-2">
                      {item.month} {item.season}
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Weather:</strong> {item.weather}</p>
                      <p><strong>Crowds:</strong> {item.crowds}</p>
                      <p><strong>Highlights:</strong> {item.highlights}</p>
                      <p><strong>Best for:</strong> {item.best_for.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </section>

              {/* Season Comparison */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  Season Comparison Table
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-warm-100">
                        <th className="border p-4 text-left font-bold">Season</th>
                        <th className="border p-4 text-left font-bold">Temperature</th>
                        <th className="border p-4 text-left font-bold">Crowds</th>
                        <th className="border p-4 text-left font-bold">Price</th>
                        <th className="border p-4 text-left font-bold">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-4">Spring (Mar-May)</td>
                        <td className="border p-4">Mild (15-25°C)</td>
                        <td className="border p-4">Moderate</td>
                        <td className="border p-4">Medium</td>
                        <td className="border p-4">⭐⭐⭐⭐⭐</td>
                      </tr>
                      <tr>
                        <td className="border p-4">Summer (Jun-Aug)</td>
                        <td className="border p-4">Hot (25-40°C)</td>
                        <td className="border p-4">Very High</td>
                        <td className="border p-4">High</td>
                        <td className="border p-4">⭐⭐⭐</td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="border p-4 font-bold">Autumn (Sept-Oct)</td>
                        <td className="border p-4 font-bold">Perfect (15-30°C)</td>
                        <td className="border p-4 font-bold">Moderate-High</td>
                        <td className="border p-4 font-bold">High</td>
                        <td className="border p-4 font-bold">⭐⭐⭐⭐⭐ BEST</td>
                      </tr>
                      <tr>
                        <td className="border p-4">Winter (Nov-Feb)</td>
                        <td className="border p-4">Cold (0-20°C)</td>
                        <td className="border p-4">Low</td>
                        <td className="border p-4">Low</td>
                        <td className="border p-4">⭐⭐⭐⭐</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Destination-Specific Tips */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  Destination-Specific Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      dest: 'Beijing & North',
                      tips: ['Avoid winter (too cold)', 'Spring/autumn ideal', 'Winter clear skies great for photography']
                    },
                    {
                      dest: 'Shanghai & East',
                      tips: ['Avoid humid summers', 'Spring/autumn comfortable', 'Winter mild, occasional rain']
                    },
                    {
                      dest: 'Yunnan & South',
                      tips: ['Year-round pleasant climate', 'Rainiest in May-June', 'Best: October-November']
                    },
                    {
                      dest: 'Guilin & Center',
                      tips: ['Avoid summer haze', 'Spring/autumn perfect for Li River', 'Winter cool but scenic']
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-warm-50 border border-warm-100 rounded-lg p-6">
                      <h4 className="font-bold text-lg mb-4 text-gray-900">{item.dest}</h4>
                      <ul className="space-y-2">
                        {item.tips.map((tip, i) => (
                          <li key={i} className="flex gap-3 text-gray-700">
                            <span className="text-primary font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tours by Season */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                  Popular China Tours
                </h2>
                <p className="text-gray-700 mb-6">
                  No matter what season you choose, we have perfectly timed tours ready for you.
                </p>
                <TourGrid tours={tours} columns={2} />
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Decision Box */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Quick Decision</h4>
                  <p className="text-sm text-gray-700 mb-4">
                    <strong>Can't decide?</strong> October is universally the best month—perfect weather across all of China.
                  </p>
                  <a
                    href="/tailor-made"
                    className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                  >
                    Plan My Trip
                  </a>
                </div>

                {/* Key Takeaways */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Key Takeaways</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Spring & Autumn ideal</li>
                    <li>✓ Avoid peak holidays</li>
                    <li>✓ Winter = cheap + clear</li>
                    <li>✓ Summer = hot + crowded</li>
                    <li>✓ Region matters</li>
                  </ul>
                </div>

                {/* Related Guides */}
                <div className="bg-warm-50 border border-warm-100 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-4">Next Steps</h4>
                  <ul className="space-y-3 text-sm">
                    {relatedGuides.map((guide) => (
                      <li key={guide.slug}>
                        <a
                          href={`/${guide.slug}`}
                          className="text-primary hover:underline font-medium"
                        >
                          → {guide.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* FAQs */}
      <FAQSection faqs={bestTimeToVisitChinaMeta.faqs} />

      {/* Related Resources */}
      <RelatedGuides guides={relatedGuides} />

      {/* Final CTA */}
      <CTASection
        title="Ready to Plan Your China Trip?"
        description="Choose your perfect season and let our specialists craft your ideal itinerary."
        primaryButtonText="Book Your Trip"
        primaryButtonLink="/tailor-made"
        secondaryButtonText="Browse Tours"
        secondaryButtonLink="/china-tours"
      />
    </>
  );
}
