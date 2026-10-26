import { Metadata } from 'next';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';
import { formatPublishedTourCities, getPublishedTours } from '@/lib/data/published-tour-catalog';
import type { Tour } from '@/lib/data/tours';

export const revalidate = 15;

const COMPARE_TOUR_REFS = [
  { slug: 'shanghai-surroundings', bestFor: 'Gardens · water towns · culinary' },
  { slug: 'beijing-xian', bestFor: 'First visits · Great Wall · Terracotta Warriors' },
  { slug: 'essentials', bestFor: 'Broad coverage · China highlights' },
  { slug: 'silk-road', bestFor: 'Western China · Mogao Caves · ancient routes' },
] as const;

interface TourCompareRow {
  tour: Tour;
  href: string;
  cities: string;
  bestFor: string;
}

function compareRows(tours: Tour[]): TourCompareRow[] {
  return COMPARE_TOUR_REFS.flatMap((ref) => {
    const tour = tours.find((item) => item.destination === 'china' && item.slug === ref.slug && item.isActive && !item.soldOut);
    if (!tour) return [];
    return [{
      tour,
      href: `/tours/${tour.destination}/${tour.tier}/${tour.slug}`,
      cities: formatPublishedTourCities(tour.tourCities),
      bestFor: ref.bestFor,
    }];
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const rows = compareRows(await getPublishedTours());
  const comparison = rows.map(({ tour }) => `${tour.name} (${tour.duration}, ${tour.price})`).join(' · ');
  return buildCtsPageMetadata({
    title: 'Best China Tours from NZ · Compare Current Itineraries | CTS',
    description: comparison
      ? `Compare currently published China tours from New Zealand: ${comparison}. See current itinerary details and departures from CTS.`
      : 'Compare currently published China tours from New Zealand and see each itinerary and departure directly from CTS.',
    path: '/best-china-tours',
    ogImagePath:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
    ogImageAlt: 'Best China tours from New Zealand — compare 4 itineraries',
    keywords: [
      'best china tours',
      'best china tours from nz',
      'best china tour packages',
      'top china tours new zealand',
      'compare china tours',
      'best china tour for first timers',
      'china tour comparison',
    ],
    ogType: 'website',
  });
}

export default async function BestChinaToursPage() {
  const rows = compareRows(await getPublishedTours());
  const firstTripTour = rows.find(({ tour }) => tour.slug === 'beijing-xian')?.tour;
  const valueTour = rows.find(({ tour }) => tour.slug === 'shanghai-surroundings')?.tour;
  const broadTour = rows.find(({ tour }) => tour.slug === 'essentials')?.tour;
  const adventureTour = rows.find(({ tour }) => tour.slug === 'silk-road')?.tour;
  const siteUrl = getSiteUrl();

  const faqs = [
    {
      question: 'Which China tours are currently published for New Zealand travellers?',
      answer: `The currently published comparison includes ${rows.map(({ tour }) => `${tour.name} (${tour.duration}, ${tour.price})`).join('; ') || 'no active tours at this time'}. The table below is built from the latest published ME tour records.`,
    },
    {
      question: 'Which is the best China tour for first-time visitors from NZ?',
      answer: firstTripTour
        ? `${firstTripTour.name} is a strong first-trip option, with ${firstTripTour.duration} and a route through ${formatPublishedTourCities(firstTripTour.tourCities, ', ')}. See its current itinerary and price on the tour page.`
        : 'The first-trip comparison will appear here when that tour is active in the published ME catalogue.',
    },
    {
      question: 'Which China tour has the lowest NZD price?',
      answer: valueTour
        ? `${valueTour.name} currently displays ${valueTour.price} for ${valueTour.duration}. Prices and included services can change when CTS publishes a new tour version; check the live tour page before enquiring.`
        : 'Current tour prices appear in the comparison table when tours are active in the published ME catalogue.',
    },
    {
      question: 'What is the most comprehensive China tour you offer?',
      answer: broadTour
        ? `${broadTour.name} currently covers ${formatPublishedTourCities(broadTour.tourCities, ', ')} over ${broadTour.duration}. Its published inclusions and itinerary are shown on the tour page.`
        : 'The broad-coverage option will appear here when it is active in the published ME catalogue.',
    },
    {
      question: 'How is "best" decided — by price, length, or destination?',
      answer: `Compare current published routes, durations and prices in the table below${adventureTour ? `, including ${adventureTour.name} for travellers interested in western China` : ''}. Tour details on this page come from the latest version published in ME.`,
    },
    {
      question: 'Are the prices final or are there extras?',
      answer:
        'Check the selected tour’s published inclusions, exclusions and single-room supplement on its tour page. Those fields update from the latest tour version published by CTS in ME.',
    },
  ];

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'China Tours', url: '/china-tours' },
    { name: 'Best China Tours', url: '/best-china-tours' },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Best China Tours from New Zealand',
      description: 'Compare currently active China tours by published price, duration and route.',
      url: `${siteUrl}/best-china-tours`,
      provider: {
        '@type': 'TravelAgency',
        name: 'CTS Tours',
        url: siteUrl,
        founder: {
          '@type': 'Organization',
          name: 'China Travel Service (CTS)',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      numberOfItems: rows.length,
      itemListElement: rows.map(({ tour, href, cities }, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'TouristTrip',
          name: tour.name,
          url: `${siteUrl}${href}`,
          itinerary: cities,
          duration: `P${tour.duration.match(/\d+/)?.[0] ?? ''}D`,
          offers: {
            '@type': 'Offer',
            price: tour.price.replace(/[^\d.]/g, ''),
            priceCurrency: 'NZD',
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: `${siteUrl}${b.url}`,
      })),
    },
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

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-warm-50 to-orange-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Best China Tours from New Zealand
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Compare {rows.length} active itineraries · current routes and prices
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Four China tours, four very different reasons to go. Below you&apos;ll find a side-by-side
            comparison of price, length, cities and best-for guidance — designed to help Kiwi
            travellers pick the right itinerary without endless tabs.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Quick Answer (LLM-friendly) */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <aside
            aria-label="Quick answer"
            className="border-l-4 border-primary bg-warm-50/60 rounded-r-lg p-5 md:p-6 mb-12"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-primary mb-2">
              Quick answer
            </p>
            <p className="text-gray-800 leading-relaxed">
              CTS Tours&apos; currently published China itineraries:{' '}
              {rows.map(({ tour }, index) => (
                <span key={tour.id}>
                  {index > 0 ? '; ' : ''}<strong>{tour.name}</strong> ({tour.duration}, {tour.price})
                </span>
              ))}
              {rows.length === 0 ? ' There are no active tours to compare at this time.' : '. Current itinerary, cities, price and availability are read from the ME published catalogue.'}
            </p>
          </aside>

          {/* Compare table */}
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
            Compare All 4 Tours
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gray-50 border-b-2 border-gray-200">
                  <th className="text-left py-3 px-3 font-bold text-gray-900">Tour</th>
                  <th className="text-left py-3 px-3 font-bold text-gray-900">Tier</th>
                  <th className="text-left py-3 px-3 font-bold text-gray-900">Days</th>
                  <th className="text-left py-3 px-3 font-bold text-gray-900">From NZD</th>
                  <th className="text-left py-3 px-3 font-bold text-gray-900 hidden md:table-cell">
                    Cities
                  </th>
                  <th className="text-left py-3 px-3 font-bold text-gray-900">Best For</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ tour, href, cities, bestFor }) => (
                  <tr key={tour.id} className="border-b border-gray-100 hover:bg-warm-50/30">
                    <td className="py-3 px-3">
                      <Link
                        href={href}
                        className="font-bold text-primary hover:underline"
                      >
                        {tour.name}
                      </Link>
                    </td>
                    <td className="py-3 px-3 text-gray-700">{tour.tier}</td>
                    <td className="py-3 px-3 text-gray-700">{tour.duration}</td>
                    <td className="py-3 px-3 text-gray-900 font-bold">
                      {tour.price}
                    </td>
                    <td className="py-3 px-3 text-gray-700 hidden md:table-cell">{cities || 'See itinerary'}</td>
                    <td className="py-3 px-3 text-gray-700">{bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to decide */}
          <section className="mt-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              How to Pick the Right Tour
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rows.map(({ tour, href, cities, bestFor }) => (
                <div key={tour.id} className="rounded-xl border border-warm-100 bg-warm-50/50 p-6">
                  <h3 className="mb-2 text-lg font-bold">{tour.name}</h3>
                  <p className="mb-3 text-gray-700">
                    {bestFor}. {tour.duration} · {tour.price}{cities ? ` · ${cities}` : ''}.
                  </p>
                  <Link href={href} className="font-bold text-primary hover:underline">
                    View live itinerary →
                  </Link>
                </div>
              ))}
              {rows.length === 0 ? <p className="text-gray-700">No China tours are currently active in the ME published catalogue.</p> : null}
            </div>
          </section>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection faqs={faqs} />

      {/* CTA */}
      <CTASection
        title="Not sure which is best?"
        description="Tell our Auckland-based China specialists what you want from the trip — pace, interests, budget — and we'll match you with the right itinerary in NZD."
        primaryButtonText="Get a Free Recommendation"
        primaryButtonLink="/tailor-made"
        secondaryButtonText="Contact Our Team"
        secondaryButtonLink="/contact"
      />

    </>
  );
}
