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
import { Icon } from '@/components/ui/Icon';
import { formatPublishedTourCities, getPublishedChinaTours } from '@/lib/data/published-tour-catalog';
import { headlinePrice } from '@/lib/tour-price';
import { generateWebPageSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { chinaToursFromNZMeta } from '@/lib/data/seo-pages';
import { getSiteUrl } from '@/lib/site';

const TOUR_IMG =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

export async function generateMetadata(): Promise<Metadata> {
  const tours = await getPublishedChinaTours();
  const description = `Compare ${tours.length} current China tours from New Zealand. Tour names, routes, durations, prices and departures reflect the latest ME publication.`;
  return buildCtsPageMetadata({
    title: 'China Tours from New Zealand | CTS Tours',
    description,
    path: '/china-tours-from-new-zealand',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg',
    ogImageAlt: 'China Tours from New Zealand - Expert-Led Itineraries with CTS Tours',
    keywords: ['China tours from New Zealand', 'Kiwi China travel', 'NZ China tours', 'CTS Tours New Zealand'],
    ogType: 'website',
  });
}

export const revalidate = 15;

export default async function ChinaToursFromNZPage() {
  const allTours = await getPublishedChinaTours();
  // Feature 6-8 premium tours for this geo-targeted page
  const featuredTours = allTours.filter(t => t.tier === 'signature').slice(0, 8);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'China', url: '/china-tours' },
    { name: 'From New Zealand', url: '/china-tours-from-new-zealand' }
  ];

  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/china-tours-from-new-zealand`;

  // 4 flagship China tours for NZ travellers — used in comparison table A
  // and ItemList schema. Prices are read from the tour data (the same source as the tour pages), so a price
  // change there cannot leave this table behind; a tour that is not in the data is left out, never printed blank.
  // The selected comparison products remain editorial; their current public
  // facts always come from the ME snapshot.
  const flagshipRefs = [
    { tier: 'discovery', slug: 'beijing-xian', bestFor: 'First-time visitors who want imperial highlights' },
    { tier: 'discovery', slug: 'essentials', bestFor: 'Classic China highlights and broader coverage' },
    { tier: 'discovery', slug: 'shanghai-surroundings', bestFor: 'Water towns, gardens and culinary culture' },
    { tier: 'signature', slug: 'silk-road', bestFor: 'Repeat visitors interested in western China' },
  ] as const;
  const flagshipTours = flagshipRefs.flatMap((ref) => {
    const tour = allTours.find((item) => item.tier === ref.tier && item.slug === ref.slug && !item.soldOut);
    if (!tour) return [];
    return [{
      name: tour.name,
      slug: tour.slug,
      url: `/tours/${tour.destination}/${tour.tier}/${tour.slug}`,
      duration: tour.duration,
      cities: formatPublishedTourCities(tour.tourCities, ' + '),
      price: headlinePrice(tour.price),
      bestFor: ref.bestFor,
    }];
  });
  const flagshipBySlug = (slug: string) => flagshipTours.find((tour) => tour.slug === slug);
  const priceValue = (price: string) => Number(price.replace(/[^\d]/g, '')) || Number.POSITIVE_INFINITY;
  const collectionPrice = (tier: 'discovery' | 'signature') => {
    const tour = allTours.filter((item) => item.tier === tier)
      .sort((a, b) => priceValue(a.price) - priceValue(b.price))[0];
    return tour ? headlinePrice(tour.price) : 'See current tours';
  };
  const flagshipSummary = flagshipTours.length
    ? flagshipTours.map((tour) => `${tour.name} (${tour.duration}, ${tour.price})`).join('; ')
    : 'No selected flagship tours are currently published';
  const currentFaqs = chinaToursFromNZMeta.faqs.map((faq) => faq.question.startsWith('What are the most popular China tours')
    ? { ...faq, answer: `Current selected published tours: ${flagshipSummary}. Routes, duration and prices are taken from the latest ME publication.` }
    : faq);
  const quickAnswer = `CTS Tours lists ${allTours.length} active China tours for travellers from New Zealand. Current selected products: ${flagshipSummary}. Tour facts are taken from the latest ME publication; check each product's inclusions, exclusions and departure-specific price before enquiring.`;

  // AI Overview / ChatGPT / Perplexity citation signal — Article with named
  // author Person Baker Gu, consistent with blog post schemas. Magic Engine
  // Phase 5 organic continuation.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: chinaToursFromNZMeta.h1,
    description: quickAnswer,
    image: `${siteUrl}/great-wall-mist.jpg`,
    datePublished: '2026-06-26',
    dateModified: '2026-06-26',
    author: {
      '@type': 'Person',
      name: 'Baker Gu',
      jobTitle: 'China Travel Specialist, CTS Tours NZ',
      worksFor: {
        '@type': 'Organization',
        name: 'CTS Tours NZ',
        url: siteUrl,
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'CTS Tours',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/images/cts-logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    keywords: 'China tours from New Zealand, Kiwi China travel, NZ China tours, CTS Tours New Zealand, China tour packages NZ',
    articleSection: 'Destinations',
  };

  // 4 flagship tours as ItemList — Google rich result eligibility for
  // "China tours from NZ" query. List items link to product/campaign pages.
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `CTS Tours NZ — ${flagshipTours.length} selected China tours`,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: flagshipTours.length,
    itemListElement: flagshipTours.map((tour, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteUrl}${tour.url}`,
      name: tour.name,
      description: `${tour.duration} · ${tour.cities} · from ${tour.price}`,
    })),
  };

  const schemas = [
    generateWebPageSchema(
      'China Tours from New Zealand | CTS Tours',
      quickAnswer,
      '/china-tours-from-new-zealand',
      { name: 'New Zealand', address: 'Auckland, New Zealand' }
    ),
    generateBreadcrumbListSchema(breadcrumbs),
    articleSchema,
    itemListSchema,
    // Note: FAQPage schema is auto-emitted by <FAQSection /> below.
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
        subtitle={`${allTours.length} active China tours · Current product details from ME`}
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
              {/* Author byline — E-E-A-T signal for Google SERP + AI Overview */}
              <div className="flex items-center gap-3 text-sm text-gray-600 border-b border-warm-100 pb-4">
                <span className="font-semibold text-gray-800">By Baker Gu</span>
                <span className="text-gray-400">·</span>
                <span>China Travel Specialist, CTS Tours NZ</span>
                <span className="text-gray-400">·</span>
                <span>Updated June 2026</span>
              </div>

              {/* Quick Answer (LLM-friendly TL;DR for AI Overview citation) */}
              <aside
                aria-label="Quick answer"
                className="border-l-4 border-primary bg-warm-50/60 rounded-r-lg p-5 md:p-6"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-primary mb-2">
                  Quick answer
                </p>
                <p className="text-gray-800 leading-relaxed">
                  {quickAnswer} Travel logistics and entry requirements can change; confirm them with
                  the relevant current sources before travel.
                </p>
              </aside>

              {/* Table A: 4 Flagship Tours at a glance (SEO + decision aid) */}
              <section aria-labelledby="flagship-tours-heading">
                <h2 id="flagship-tours-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  {flagshipTours.length} Selected China Tours from NZ — Quick Compare
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Compare current published names, routes, durations and prices. The inclusion list on
                  each product page is the source for what that tour provides.
                </p>
                <div className="overflow-x-auto rounded-xl border border-warm-200 shadow-sm">
                  <table className="w-full text-sm bg-white">
                    <thead className="bg-warm-50 text-gray-900">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold">Tour</th>
                        <th className="text-left px-4 py-3 font-bold">Days</th>
                        <th className="text-left px-4 py-3 font-bold">Cities</th>
                        <th className="text-left px-4 py-3 font-bold">From (NZD)</th>
                        <th className="text-left px-4 py-3 font-bold">Best for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flagshipTours.map((tour) => (
                        <tr key={tour.slug} className="border-t border-warm-100">
                          <td className="px-4 py-3 font-semibold">
                            <Link href={tour.url} className="text-primary hover:underline">
                              {tour.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{tour.duration}</td>
                          <td className="px-4 py-3 text-gray-700">{tour.cities}</td>
                          <td className="px-4 py-3 font-semibold text-gray-900">{tour.price}</td>
                          <td className="px-4 py-3 text-gray-700">{tour.bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Prices are per person, twin share, lead-in. Final pricing depends on departure date and cabin choice.
                  Connecting domestic flights from Wellington / Christchurch / regional NZ to Auckland are quoted separately.
                </p>
              </section>

              {/* Table B: Discovery vs Signature comparison */}
              <section aria-labelledby="discovery-vs-signature-heading">
                <h2 id="discovery-vs-signature-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Discovery vs Signature — Which Collection Fits Your Trip?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Every CTS China tour from New Zealand falls into one of two collections. The difference is hotel category,
                  group size, and pacing — not the headline sights (both visit the same Great Wall, Forbidden City, Terracotta
                  Warriors, etc.).
                </p>
                <div className="overflow-x-auto rounded-xl border border-warm-200 shadow-sm">
                  <table className="w-full text-sm bg-white">
                    <thead className="bg-warm-50 text-gray-900">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold">Aspect</th>
                        <th className="text-left px-4 py-3 font-bold">Discovery</th>
                        <th className="text-left px-4 py-3 font-bold">Signature</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Current lead-in price</td><td className="px-4 py-3 text-gray-700">{collectionPrice('discovery')}</td><td className="px-4 py-3 text-gray-700">{collectionPrice('signature')}</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Hotels</td><td className="px-4 py-3 text-gray-700">3–4 star city centre</td><td className="px-4 py-3 text-gray-700">4–5 star premium</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Pace</td><td className="px-4 py-3 text-gray-700">Active sightseeing</td><td className="px-4 py-3 text-gray-700">Relaxed with free time</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Meals</td><td className="px-4 py-3 text-gray-700">Daily breakfast, most lunches</td><td className="px-4 py-3 text-gray-700">Daily breakfast + most lunches + select dinners</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Best for</td><td className="px-4 py-3 text-gray-700">Value-conscious first-timers</td><td className="px-4 py-3 text-gray-700">Premium experience, smaller groups</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Table C: Month-by-month decision matrix */}
              <section aria-labelledby="best-time-heading">
                <h2 id="best-time-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Best Time to Travel from NZ to China — Month by Month
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  When you can travel matters as much as where. October is universally the best month, but NZ school holidays
                  and personal preferences shift the calculation. See our deeper {' '}
                  <Link href="/best-time-to-visit-china" className="text-primary font-medium hover:underline">
                    Best Time to Visit China
                  </Link>{' '}guide for region-by-region detail.
                </p>
                <div className="overflow-x-auto rounded-xl border border-warm-200 shadow-sm">
                  <table className="w-full text-sm bg-white">
                    <thead className="bg-warm-50 text-gray-900">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold">Month</th>
                        <th className="text-left px-4 py-3 font-bold">Weather</th>
                        <th className="text-left px-4 py-3 font-bold">Crowds</th>
                        <th className="text-left px-4 py-3 font-bold">Recommend</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Mar–May</td><td className="px-4 py-3 text-gray-700">Mild spring, 15-22°C</td><td className="px-4 py-3 text-gray-700">Moderate</td><td className="px-4 py-3 text-gray-700">✅✅ Top pick</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Jun</td><td className="px-4 py-3 text-gray-700">Warming 22-28°C</td><td className="px-4 py-3 text-gray-700">Moderate</td><td className="px-4 py-3 text-gray-700">✅ Good</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Jul–Aug</td><td className="px-4 py-3 text-gray-700">Hot 32-38°C, humid</td><td className="px-4 py-3 text-gray-700">High (school holidays)</td><td className="px-4 py-3 text-gray-700">❌ Avoid if possible</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Sep–Oct</td><td className="px-4 py-3 text-gray-700">Mild 18-25°C, clear</td><td className="px-4 py-3 text-gray-700">Moderate–high</td><td className="px-4 py-3 text-gray-700">✅✅ Best month</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Nov</td><td className="px-4 py-3 text-gray-700">Cooling 12-18°C</td><td className="px-4 py-3 text-gray-700">Low</td><td className="px-4 py-3 text-gray-700">✅ Good, quiet</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Dec–Feb</td><td className="px-4 py-3 text-gray-700">Cool 0-12°C (north)</td><td className="px-4 py-3 text-gray-700">Low (avoid CNY)</td><td className="px-4 py-3 text-gray-700">⚠️ OK if you don&apos;t mind cold</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Avoid Chinese Golden Week (1–7 October) and Chinese New Year (late Jan / early Feb) — domestic travel surge.
                  October dates outside the first week of October are ideal.
                </p>
              </section>

              {/* Table D: CTS Tours NZ vs Generic NZ Operators */}
              <section aria-labelledby="cts-vs-generic-heading">
                <h2 id="cts-vs-generic-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  CTS Tours NZ vs Generic NZ Travel Operators
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Why book a China tour with a China-specific specialist instead of a general NZ travel agency? Here&apos;s the
                  honest comparison. Both can work — but the trade-offs are real.
                </p>
                <div className="overflow-x-auto rounded-xl border border-warm-200 shadow-sm">
                  <table className="w-full text-sm bg-white">
                    <thead className="bg-warm-50 text-gray-900">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold">Feature</th>
                        <th className="text-left px-4 py-3 font-bold">CTS Tours NZ</th>
                        <th className="text-left px-4 py-3 font-bold">Generic NZ Operators</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Auckland office</td><td className="px-4 py-3 text-gray-700">Yes, Auckland-based team</td><td className="px-4 py-3 text-gray-700">Often Australia-based</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">NZD pricing</td><td className="px-4 py-3 text-gray-700">Yes, locked at booking</td><td className="px-4 py-3 text-gray-700">Sometimes AUD with FX markup</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">Direct China operations</td><td className="px-4 py-3 text-gray-700">Yes (backed by CTS group)</td><td className="px-4 py-3 text-gray-700">Usually re-sold via brokers</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">TAANZ bonding</td><td className="px-4 py-3 text-gray-700">Yes — NZ payment protection</td><td className="px-4 py-3 text-gray-700">Varies — check before booking</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">In-country English guides</td><td className="px-4 py-3 text-gray-700">CTS own guides every city</td><td className="px-4 py-3 text-gray-700">Often contracted local guides</td></tr>
                      <tr className="border-t border-warm-100"><td className="px-4 py-3 font-semibold">NZ school holiday awareness</td><td className="px-4 py-3 text-gray-700">Yes — Kiwi-led booking</td><td className="px-4 py-3 text-gray-700">Generic global calendar</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Introduction */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Tailored for Kiwis
                </h2>
                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  {chinaToursFromNZMeta.introText.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              <section
                aria-labelledby="nz-quick-links-heading"
                className="rounded-2xl border border-warm-200 bg-warm-50/80 p-6 md:p-8"
              >
                <h2 id="nz-quick-links-heading" className="text-xl font-serif font-bold text-gray-900 mb-3">
                  Popular NZ planning links
                </h2>
                <p className="text-gray-700 text-sm md:text-base mb-4">
                  Direct links to the product pages and guides most NZ travellers read before they enquire.
                </p>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm">
                  <li>
                    <Link href="/china-visa-guide-for-new-zealanders" className="text-primary font-medium hover:underline">
                      China entry &amp; visa-free guide (NZ passports)
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-tours" className="text-primary font-medium hover:underline">
                      Full China tours hub
                    </Link>
                  </li>
                  <li>
                    <Link href="/tours/china/discovery/beijing-xian" className="text-primary font-medium hover:underline">
                      Discovery · Beijing &amp; Xi&apos;an (standard product)
                    </Link>
                  </li>
                  <li>
                    <Link href="/tours/china/discovery/shanghai-surroundings" className="text-primary font-medium hover:underline">
                      Discovery · Shanghai &amp; Surroundings (standard product)
                    </Link>
                  </li>
                  <li>
                    <Link href="/great-wall-travel-guide" className="text-primary font-medium hover:underline">
                      Great Wall travel guide (Mutianyu, Badaling, Jinshanling)
                    </Link>
                  </li>
                  <li>
                    <Link href="/terracotta-warriors-travel-guide" className="text-primary font-medium hover:underline">
                      Terracotta Warriors travel guide — Xi&apos;an
                    </Link>
                  </li>
                </ul>
              </section>

              {/* Inline imagery — classic gateways */}
              <section className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-gray-900">
                  Classic gateways from New Zealand
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Most CTS journeys begin in Shanghai or Beijing after your direct flight from Auckland.
                  From there you can head to imperial landmarks, ancient capitals, river landscapes, and
                  modern megacities — all with English-speaking guides and hand-picked hotels.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <figure className="rounded-xl overflow-hidden border border-warm-100 bg-warm-50 shadow-sm">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={`${TOUR_IMG}/shanghai-skyline.jpg`}
                        alt="Shanghai skyline at dusk — a common first stop after flying from New Zealand"
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
                    src="/images/tours/li-river-karst-boats.jpg"
                    alt="Karst peaks and bamboo rafts on the Li River near Guilin"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <h2 className="text-2xl font-serif font-bold text-gray-900">
                    Nature &amp; pacing for Kiwi travellers
                  </h2>
                  <p>
                    New Zealanders often ask for a mix of iconic sights and breathing room. Routes that
                    combine Guilin or Zhangjiajie with Shanghai or Chengdu give you dramatic landscapes
                    without sacrificing comfort — sensible driving days, time for coffee or a wander, and
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
                    for month-by-month notes. Entry rules for NZ passports are summarised in our{' '}
                    <a
                      href="/china-visa-guide-for-new-zealanders"
                      className="text-primary font-medium hover:underline"
                    >
                      China entry guide for New Zealanders
                    </a>
                    .
                  </p>
                </div>
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
                      title: 'Backed by CTS',
                      desc: 'CTS Tours NZ takes New Zealand travellers to China from our Auckland office, backed by China Travel Service. Trust & reliability.'
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

              {/* Most Popular Itineraries by Trip Length (NZ traveller decision aid) */}
              <section aria-labelledby="itineraries-by-length-heading">
                <h2 id="itineraries-by-length-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Most Popular Itineraries by Trip Length
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  How long should you spend in China? For most NZ travellers, 10-15 days hits the sweet spot — enough to see
                  iconic sights without rushing, and matched to common NZ school holiday windows.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-warm-200 bg-warm-50/50 p-5">
                    <p className="text-xs font-bold uppercase text-primary mb-1 tracking-wide">7-10 days</p>
                    <h3 className="font-serif font-bold text-lg mb-2 text-gray-900">Short City Tour</h3>
                    <p className="text-sm text-gray-700 mb-3">Two cities, focused on highlights. Best for first-time visitors who want a taste of China without long PTO.</p>
                    {flagshipBySlug('beijing-xian') ? <Link href={flagshipBySlug('beijing-xian')!.url} className="text-primary text-sm font-medium hover:underline">
                      {flagshipBySlug('beijing-xian')!.name} · {flagshipBySlug('beijing-xian')!.duration} →
                    </Link> : null}
                  </div>
                  <div className="rounded-xl border-2 border-primary bg-primary/5 p-5">
                    <p className="text-xs font-bold uppercase text-primary mb-1 tracking-wide">⭐ 12-15 days</p>
                    <h3 className="font-serif font-bold text-lg mb-2 text-gray-900">Classic China</h3>
                    <p className="text-sm text-gray-700 mb-3">The Kiwi sweet spot — three or four cities, breathing room for jet lag, and time for at least one day trip or river cruise.</p>
                    {flagshipBySlug('essentials') ? <Link href={flagshipBySlug('essentials')!.url} className="text-primary text-sm font-medium hover:underline">
                      {flagshipBySlug('essentials')!.name} · {flagshipBySlug('essentials')!.duration} · {flagshipBySlug('essentials')!.cities} →
                    </Link> : null}
                  </div>
                  <div className="rounded-xl border border-warm-200 bg-warm-50/50 p-5">
                    <p className="text-xs font-bold uppercase text-primary mb-1 tracking-wide">18+ days</p>
                    <h3 className="font-serif font-bold text-lg mb-2 text-gray-900">Deep Discovery</h3>
                    <p className="text-sm text-gray-700 mb-3">For repeat visitors or those wanting to go beyond imperial highlights — Silk Road, Yunnan, Tibet, or extended Yangtze cruise.</p>
                    {flagshipBySlug('silk-road') ? <Link href={flagshipBySlug('silk-road')!.url} className="text-primary text-sm font-medium hover:underline">
                      {flagshipBySlug('silk-road')!.name} · {flagshipBySlug('silk-road')!.duration} →
                    </Link> : null}
                  </div>
                </div>
              </section>

              {/* Plan by Theme (cluster page entry points) */}
              <section aria-labelledby="plan-by-theme-heading">
                <h2 id="plan-by-theme-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Plan by Theme
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Not sure which itinerary fits? Browse by the trip style that matches what you&apos;re after.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <Link href="/blog/yangtze-river-cruise-from-chongqing" className="block rounded-lg border border-warm-100 bg-white hover:border-primary hover:shadow-sm transition-all p-4">
                    <p className="font-semibold text-gray-900">🚢 Yangtze River Cruise</p>
                    <p className="text-gray-600 mt-1">Chongqing → Three Gorges → Yichang. Slow travel, premium ships.</p>
                  </Link>
                  <Link href="/blog/chongqing-vs-chengdu" className="block rounded-lg border border-warm-100 bg-white hover:border-primary hover:shadow-sm transition-all p-4">
                    <p className="font-semibold text-gray-900">🌶️ Sichuan Region</p>
                    <p className="text-gray-600 mt-1">Pandas, hotpot, monorail through buildings. Chongqing vs Chengdu.</p>
                  </Link>
                  <Link href="/great-wall-travel-guide" className="block rounded-lg border border-warm-100 bg-white hover:border-primary hover:shadow-sm transition-all p-4">
                    <p className="font-semibold text-gray-900">🏯 Great Wall Focus</p>
                    <p className="text-gray-600 mt-1">Mutianyu, Badaling, Jinshanling — which section, which time of year.</p>
                  </Link>
                  <Link href="/terracotta-warriors-travel-guide" className="block rounded-lg border border-warm-100 bg-white hover:border-primary hover:shadow-sm transition-all p-4">
                    <p className="font-semibold text-gray-900">🛡️ Terracotta Warriors</p>
                    <p className="text-gray-600 mt-1">Xi&apos;an gateway, history depth, museum vs site planning.</p>
                  </Link>
                  <Link href="/tours/china/signature" className="block rounded-lg border border-warm-100 bg-white hover:border-primary hover:shadow-sm transition-all p-4">
                    <p className="font-semibold text-gray-900">🏜️ Silk Road</p>
                    <p className="text-gray-600 mt-1">Xi&apos;an → Dunhuang → Turpan → Urumqi. Off the imperial highlights trail.</p>
                  </Link>
                  <Link href="/tailor-made" className="block rounded-lg border border-warm-100 bg-white hover:border-primary hover:shadow-sm transition-all p-4">
                    <p className="font-semibold text-gray-900">✈️ Family / Multi-gen</p>
                    <p className="text-gray-600 mt-1">Private tailor-made tours for couples, families, special interests.</p>
                  </Link>
                </div>
              </section>

              {/* Recent NZ Traveller Stories (blog cluster entry) */}
              <section aria-labelledby="recent-stories-heading">
                <h2 id="recent-stories-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Recent NZ Traveller Reading
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Practical planning guides for Kiwi travellers, written by our Auckland-based China specialist Baker Gu.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <li>
                    <Link href="/blog/chongqing-vs-chengdu" className="text-primary font-medium hover:underline">
                      Chongqing vs Chengdu — Which Should NZ Travellers Visit?
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/how-many-days-in-chongqing" className="text-primary font-medium hover:underline">
                      How Many Days in Chongqing? 3, 5 &amp; 7-Day Plans
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/yangtze-river-cruise-from-chongqing" className="text-primary font-medium hover:underline">
                      Yangtze River Cruise from Chongqing — Complete NZ Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/liziba-monorail-chongqing-guide" className="text-primary font-medium hover:underline">
                      Liziba Monorail Through-the-Building — How to Visit
                    </Link>
                  </li>
                </ul>
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
                  <Icon name="globe" className="w-10 h-10 text-primary mb-3" />
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
      <FAQSection faqs={currentFaqs} />

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
