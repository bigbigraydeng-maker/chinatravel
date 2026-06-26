import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getSiteUrl } from '@/lib/site';
import { generateWebPageSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';

/**
 * NEW Pillar — /china-tours-for-seniors (CTS topic cluster).
 *
 * Validation: Google Ads search terms (CTS C2 28-day data, scanned 6/26)
 * shows "china tours for seniors" Phrase match generating 21.43% CTR /
 * 3 clicks / 14 impressions — well above campaign avg of 15.68%. Strong
 * intent + Senior demographic has highest LTV among NZ China travellers.
 *
 * Strategic role: NEW target market segment. Senior travellers research
 * for months before booking — they need depth, clarity on mobility, pace,
 * and what's actually included. This page becomes the cornerstone for
 * everything CTS publishes about senior China travel.
 *
 * Schema pattern matches PR #86 (blogs) / PR #87 (Pillar A) / PR #88 (Pillar C):
 * WebPage + BreadcrumbList + Article (Person Baker Gu) + ItemList + FAQPage.
 *
 * Brand integrity: "China Travel Service since 1928, NZ team 25 years"
 * phrasing. No fabricated review counts or tour prices. All prices match
 * existing master_brief tour data.
 */

const TOUR_IMG =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

const PAGE_TITLE = 'China Tours for Seniors 2026-27 · NZ-Friendly Pace, Mobility-Aware | CTS Tours';
const PAGE_DESCRIPTION =
  'China tours for NZ seniors — relaxed pace, mobility-aware itineraries, English-speaking guides, and Auckland direct flights. Lead-in NZD $3,399. 25 years arranging China trips for Kiwi retirees. Visa-free for NZ passports through 31 Dec 2026.';
const PAGE_H1 = 'China Tours for New Zealand Seniors (2026-27)';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: '/china-tours-for-seniors',
    ogImagePath: `${TOUR_IMG}/forbidden-city-aerial.jpg`,
    ogImageAlt: 'China tours designed for New Zealand seniors and retirees — CTS Tours NZ',
    keywords: [
      'China tours for seniors',
      'China tours for retirees',
      'NZ senior China tours',
      'mobility-friendly China tours',
      'relaxed pace China holiday',
      'CTS Tours seniors',
    ],
    ogType: 'website',
  });
}

const seniorFriendlyTours = [
  {
    name: 'Shanghai & Surroundings',
    slug: 'shanghai-surroundings',
    url: '/campaigns/october-2026/shanghai-surroundings',
    duration: '10 days',
    pace: 'Relaxed — multiple half-day options',
    walkingLevel: 'Low to moderate',
    priceFrom: 'NZD $3,399',
    seniorWhy: 'Flat city terrain, hotels in central walkable areas, water town day trip on smooth boat decks',
  },
  {
    name: 'Tale of Two Cities',
    slug: 'tale-of-two-cities',
    url: '/campaigns/october-2026/tale-of-two-cities',
    duration: '10 days',
    pace: 'Moderate — built-in afternoon rest',
    walkingLevel: 'Moderate (Great Wall has alternatives)',
    priceFrom: 'NZD $3,480',
    seniorWhy: 'Imperial highlights without overload; Mutianyu Great Wall has cable car alternative for both up and down',
  },
  {
    name: 'Best of China',
    slug: 'best-of-china',
    url: '/campaigns/best-of-china',
    duration: '15 days',
    pace: 'Relaxed — 4 cities at sensible pace',
    walkingLevel: 'Moderate (cable cars + private coach transfers)',
    priceFrom: 'NZD $3,880',
    seniorWhy: 'Most popular with NZ retirees — see iconic China with built-in breathing room',
  },
  {
    name: 'Best of China + Yangtze Cruise',
    slug: 'best-of-china-yangtze',
    url: '/yangtze-river-cruise',
    duration: '14-18 days',
    pace: 'Most relaxed — ship is the hotel for 3 nights',
    walkingLevel: 'Low (most touring from cruise + elevators onboard)',
    priceFrom: 'NZD $4,500',
    seniorWhy: 'NZ seniors\' favourite — unpack once for cruise leg, slow river travel, lecture programs onboard',
  },
];

const mobilityCheckpoints = [
  {
    site: 'Great Wall of China',
    challenge: 'Steep steps at some sections',
    seniorOption: 'Mutianyu section: cable car BOTH up and down · Badaling: slope car alternative · we recommend Mutianyu for senior groups',
  },
  {
    site: 'Forbidden City (Beijing)',
    challenge: 'Long ~2km walk through palace complex',
    seniorOption: 'Wheelchairs available at entrance · we plan rest breaks at major halls · pace adjusted to group',
  },
  {
    site: 'Terracotta Warriors (Xi\'an)',
    challenge: 'Long museum walk, some standing in pit galleries',
    seniorOption: 'Electric shuttle from car park to entrance · indoor seating at each pit · ~3 hours total with breaks',
  },
  {
    site: 'Three Gorges Dam',
    challenge: 'Viewing platform involves stair climb',
    seniorOption: 'Alternative shorter walk option available · cruise ships provide guides who tailor the visit',
  },
  {
    site: 'Yangtze Cruise (Chongqing → Yichang)',
    challenge: 'Boarding ship + shore excursions',
    seniorOption: 'Premium ships (Century, Victoria, President) have elevators · most shore excursions 2-3h with seating · medical staff onboard',
  },
];

const faqs = [
  {
    question: 'Are CTS China tours suitable for seniors and retirees?',
    answer:
      'Yes — NZ seniors are one of our most common client groups. CTS Tours NZ designs tours specifically with mobility-aware planning: cable car alternatives at the Great Wall (Mutianyu has cable car up AND down), electric shuttles at major sites, private coach transfers between hotels, ground-level rooms when requested, and pace adjusted to the group. Our most popular senior itineraries are 10-day Shanghai & Surroundings (low walking demand) and 14-15 day Best of China with optional Yangtze Cruise. Auckland-based team understands NZ retirees\' preferences and expectations.',
  },
  {
    question: 'What\'s the best China tour for first-time senior travellers?',
    answer:
      'For most NZ seniors travelling to China for the first time, we recommend Tale of Two Cities (10 days, Beijing + Xi\'an, NZD $3,480) or Shanghai & Surroundings (10 days, NZD $3,399). Both pace at moderate levels, cover iconic sights without overload, and offer afternoon free time. For seniors with more travel experience or longer holidays, Best of China (15 days, 4 cities, NZD $3,880) is the most popular — see iconic China with breathing room. If mobility is a primary concern, add the Yangtze River Cruise (3 nights cabin accommodation, ship is the hotel) — many senior travellers consider this the most enjoyable leg.',
  },
  {
    question: 'How walking-intensive are CTS senior China tours?',
    answer:
      'Generally moderate. A typical sightseeing day involves 4-6 km of walking spread across 2-3 stops with breaks, not continuous. Major exceptions like the Forbidden City (~2 km loop) and Terracotta Warriors museum (~1 km) are paced with rest stops. Cable cars are available at both Great Wall sections we visit. For seniors with reduced mobility, we can substitute: longer hotel rests, shorter shore excursions, alternative attractions, or upgrade to private tour with car-based touring. Discuss specific concerns with your CTS consultant before booking.',
  },
  {
    question: 'What if I have a pre-existing medical condition?',
    answer:
      'Inform your CTS consultant during booking. We work with NZ travel insurance brokers experienced with pre-existing condition cover (Southern Cross Travel Insurance, AA, Cover-More are common starting points). For mainland China specifically: major cities have international hospitals with English-speaking staff (Beijing United Family Hospital, Shanghai East International Medical Centre), Western pharmacies in city centres, and rapid evacuation insurance is recommended for travellers with cardiac, mobility, or chronic conditions. Bring 2 weeks more medication than your trip length, in original packaging with prescription copies.',
  },
  {
    question: 'Do New Zealand seniors need a visa for China?',
    answer:
      'No. NZ ordinary passport holders can enter mainland China visa-free for up to 30 days per visit, valid through 31 December 2026. There is no age restriction on the visa-free entry. You need a valid NZ passport (6+ months remaining), return ticket, and accommodation confirmation. CTS tour documentation covers all entry requirements automatically. See our China visa guide for full details.',
  },
  {
    question: 'Is travel insurance more expensive for older NZ travellers to China?',
    answer:
      'Yes, generally. Premiums for NZ travellers aged 60+ typically range NZD $150-400 per person for a 2-week China trip, depending on age, pre-existing conditions, and cover level. Look for policies that explicitly cover: mainland China medical (international hospitals accept Western insurance), medical evacuation back to NZ if needed, trip cancellation/curtailment, and pre-existing condition cover (often requires medical declaration and may have a premium loading). Southern Cross Travel Insurance, AA Insurance, and Cover-More offer suitable NZ-targeted policies for senior travellers.',
  },
  {
    question: 'Can I do a private (non-group) China tour as a senior traveller?',
    answer:
      'Yes. Private tailor-made China tours are popular with NZ retirees who want full pace control, private dining preferences, or specific accessibility needs. Private tours use the same CTS network (direct China operations, English-speaking guides, NZD pricing) but with a dedicated private car, driver, and guide — no group schedule to keep up with. Pricing varies by city count, hotel category, and duration; expect roughly 1.5-2x the equivalent group tour price for couples. Contact our Auckland team for a tailored quote.',
  },
];

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'China Tours', url: '/china-tours' },
  { name: 'For Seniors', url: '/china-tours-for-seniors' },
];

export default function ChinaToursForSeniorsPage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/china-tours-for-seniors`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_H1,
    description: PAGE_DESCRIPTION,
    image: `${siteUrl}/seniors-china-tour.jpg`,
    datePublished: '2026-06-27',
    dateModified: '2026-06-27',
    author: {
      '@type': 'Person',
      name: 'Baker Gu',
      jobTitle: 'China Travel Specialist, CTS Tours NZ',
      worksFor: { '@type': 'Organization', name: 'CTS Tours NZ', url: siteUrl },
    },
    publisher: {
      '@type': 'Organization',
      name: 'CTS Tours',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/images/cts-logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    keywords:
      'China tours for seniors, China tours for retirees, NZ senior China tours, mobility-friendly China tours, relaxed pace China holiday',
    articleSection: 'Travel Tips',
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CTS Tours NZ — Senior-Friendly China Tour Packages 2026-27',
    numberOfItems: seniorFriendlyTours.length,
    itemListElement: seniorFriendlyTours.map((tour, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}${tour.url}`,
      name: tour.name,
      description: `${tour.duration} · ${tour.pace} · from ${tour.priceFrom}`,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const schemas = [
    generateWebPageSchema(PAGE_TITLE, PAGE_DESCRIPTION, '/china-tours-for-seniors', {
      name: 'New Zealand',
      address: 'Auckland, New Zealand',
    }),
    generateBreadcrumbListSchema(breadcrumbs),
    articleSchema,
    itemListSchema,
    faqSchema,
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
      <section className="relative h-80 md:h-96">
        <Image
          src={`${TOUR_IMG}/forbidden-city-aerial.jpg`}
          alt="China tours designed for New Zealand seniors and retirees"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">
              {PAGE_H1}
            </h1>
            <p className="text-white/90 text-lg">
              Relaxed pace · Mobility-aware itineraries · Auckland direct flights · NZD pricing · Visa-free entry
            </p>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Author byline */}
              <div className="flex items-center gap-3 text-sm text-gray-600 border-b border-warm-100 pb-4">
                <span className="font-semibold text-gray-800">By Baker Gu</span>
                <span className="text-gray-400">·</span>
                <span>China Travel Specialist, CTS Tours NZ</span>
                <span className="text-gray-400">·</span>
                <span>Published June 2026</span>
              </div>

              {/* Quick Answer */}
              <aside
                aria-label="Quick answer"
                className="border-l-4 border-primary bg-warm-50/60 rounded-r-lg p-5 md:p-6"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-primary mb-2">Quick answer</p>
                <p className="text-gray-800 leading-relaxed">
                  CTS Tours NZ designs China tours specifically for New Zealand seniors and retirees —
                  relaxed pace with built-in afternoon rest, mobility-aware planning (cable cars at the Great
                  Wall, electric shuttles at major sites, private coach transfers), English-speaking guides
                  who understand Western seniors&apos; expectations, and Auckland-based booking support.
                  Most popular senior itineraries: <strong>Shanghai &amp; Surroundings (10 days, NZD $3,399)</strong>
                  {' '}for low-walking comfort, <strong>Tale of Two Cities (10 days, NZD $3,480)</strong>{' '}
                  for first-time imperial highlights, and <strong>Best of China + Yangtze River Cruise
                  (15-18 days)</strong> for senior travellers&apos; favourite — the cruise leg means unpacking
                  once for 3 nights. NZ passport holders enter visa-free up to 30 days (through 31 Dec 2026).
                  CTS has been arranging China tours for Kiwi retirees for 25 years.
                </p>
              </aside>

              {/* Senior-friendly tour comparison */}
              <section aria-labelledby="senior-tours-heading">
                <h2 id="senior-tours-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  4 Most Senior-Friendly China Itineraries
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Not all CTS Tours fit every traveller. These four are the ones our Auckland-based consultants
                  most often recommend for NZ seniors and retirees based on actual pace, walking demand, and
                  built-in rest opportunities.
                </p>
                <div className="overflow-x-auto rounded-xl border border-warm-200 shadow-sm">
                  <table className="w-full text-sm bg-white">
                    <thead className="bg-warm-50 text-gray-900">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold">Tour</th>
                        <th className="text-left px-4 py-3 font-bold">Pace</th>
                        <th className="text-left px-4 py-3 font-bold">Walking</th>
                        <th className="text-left px-4 py-3 font-bold">From (NZD)</th>
                        <th className="text-left px-4 py-3 font-bold">Why we recommend for seniors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seniorFriendlyTours.map((tour) => (
                        <tr key={tour.slug} className="border-t border-warm-100">
                          <td className="px-4 py-3 font-semibold">
                            <Link href={tour.url} className="text-primary hover:underline">
                              {tour.name}
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{tour.pace}</td>
                          <td className="px-4 py-3 text-gray-700">{tour.walkingLevel}</td>
                          <td className="px-4 py-3 font-semibold text-gray-900">{tour.priceFrom}</td>
                          <td className="px-4 py-3 text-gray-700">{tour.seniorWhy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  All four include Auckland return flights, hotels, English-speaking guides, daily breakfast, most lunches,
                  and Auckland-based pre-trip support. Connecting domestic flights from regional NZ to Auckland quoted separately.
                </p>
              </section>

              {/* Mobility checkpoints */}
              <section aria-labelledby="mobility-heading">
                <h2 id="mobility-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Mobility &amp; Accessibility — Honest Answers
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The big China sights have a mix of accessibility — some have improved hugely in recent years
                  (Forbidden City, Terracotta Warriors), others are inherently challenging by terrain. Here&apos;s
                  what to expect at the headline stops, and what CTS arranges to make them workable.
                </p>
                <div className="space-y-4">
                  {mobilityCheckpoints.map((m) => (
                    <div key={m.site} className="rounded-xl border border-warm-200 bg-warm-50/30 p-5">
                      <h3 className="font-serif font-bold text-lg text-gray-900 mb-1">{m.site}</h3>
                      <p className="text-sm text-gray-600 mb-2"><strong>Challenge:</strong> {m.challenge}</p>
                      <p className="text-sm text-gray-700"><strong>CTS arrangement:</strong> {m.seniorOption}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  For senior travellers with specific mobility concerns (wheelchair use, walking aids, hearing or
                  vision impairment), please tell us during booking. We arrange ground-level rooms, accessible
                  hotels, slower-paced guides, and shorter sightseeing days as needed.
                </p>
              </section>

              {/* Why seniors choose CTS */}
              <section aria-labelledby="why-cts-heading">
                <h2 id="why-cts-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Why NZ Retirees Choose CTS for China
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      title: '25 Years Serving NZ Retirees',
                      detail: 'Our Auckland-based team understands what NZ seniors actually want — and don\'t want — from a China trip. No backpacker dorms, no overnight buses, no 6am starts.',
                    },
                    {
                      title: 'Direct Flights from Auckland',
                      detail: 'AKL is the only NZ airport with direct flights to mainland China. Less travel fatigue, fewer connections, more energy on the ground.',
                    },
                    {
                      title: 'Cable Cars + Coach Transfers',
                      detail: 'Where mobility is a real factor (Great Wall, Three Gorges Dam), our itineraries default to cable cars and private coaches — not local public transit.',
                    },
                    {
                      title: 'NZD Pricing, No Surprises',
                      detail: 'All tours quoted and paid in NZD. No AUD-NZD FX conversion. No mid-trip price changes. Senior travellers especially appreciate the budget clarity.',
                    },
                    {
                      title: 'English-Speaking Guides Everywhere',
                      detail: 'Every city, every site, every coach transfer. Not contracted local guides — CTS-trained guides who explain history and culture in context.',
                    },
                    {
                      title: 'TAANZ-Bonded Payment Protection',
                      detail: 'Your deposit is protected. Auckland office contact throughout. Real human support if anything changes — flight cancellation, medical issue, weather event.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-warm-200 bg-warm-50/40 p-5">
                      <h3 className="font-serif font-bold text-base text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Related reading */}
              <section aria-labelledby="related-heading">
                <h2 id="related-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Related Reading for NZ Senior Travellers
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <li>
                    <Link href="/china-tours-from-new-zealand" className="text-primary font-medium hover:underline">
                      🏛️ China Tours from NZ — Main Hub
                    </Link>
                  </li>
                  <li>
                    <Link href="/yangtze-river-cruise" className="text-primary font-medium hover:underline">
                      🚢 Yangtze River Cruise (Senior Favourite)
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/yangtze-river-cruise-from-chongqing" className="text-primary font-medium hover:underline">
                      📘 Yangtze Cruise from Chongqing — Deep-Dive
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/how-many-days-in-chongqing" className="text-primary font-medium hover:underline">
                      📘 How Many Days in Chongqing?
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/chongqing-vs-chengdu" className="text-primary font-medium hover:underline">
                      📘 Chongqing vs Chengdu — Which Suits You?
                    </Link>
                  </li>
                  <li>
                    <Link href="/best-time-to-visit-china" className="text-primary font-medium hover:underline">
                      📅 Best Time to Visit China
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-visa-guide-for-new-zealanders" className="text-primary font-medium hover:underline">
                      🛂 China Visa-Free for NZ Passports
                    </Link>
                  </li>
                  <li>
                    <Link href="/tailor-made" className="text-primary font-medium hover:underline">
                      ✏️ Tailor-Made Private Tours
                    </Link>
                  </li>
                </ul>
              </section>

              {/* FAQ */}
              <section aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((f, idx) => (
                    <details key={idx} className="rounded-xl border border-warm-200 bg-white p-5 group">
                      <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                        {f.question}
                        <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="text-gray-700 text-sm leading-relaxed mt-3">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section className="rounded-2xl bg-gradient-to-br from-warm-50 to-amber-50 border border-warm-100 p-6 md:p-8 text-center">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                  Talk to a CTS senior travel specialist
                </h2>
                <p className="text-gray-700 mb-5 max-w-2xl mx-auto">
                  Tell us your mobility level, preferred pace, and trip length. Our Auckland-based consultants will
                  match the right itinerary, ship, and hotel category to your specific needs. China Travel Service
                  since 1928, NZ team 25 years.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                >
                  Plan My Senior China Tour →
                </Link>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Senior Travel Quick Facts</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-600">Lead-in price</dt>
                      <dd className="font-medium">NZD $3,399</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Most-booked senior trip</dt>
                      <dd className="font-medium">Best of China + Yangtze (14-18d)</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Flight from Auckland</dt>
                      <dd className="font-medium">12-13 hours direct</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Entry (NZ passport)</dt>
                      <dd className="font-medium">Visa-free 30 days (through 31 Dec 2026)</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Best months</dt>
                      <dd className="font-medium">Apr-May, Sep-Oct</dd>
                    </div>
                  </dl>
                </div>

                <Link
                  href="/contact"
                  className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
                >
                  Talk to a Senior Specialist
                </Link>

                <div className="rounded-xl border border-warm-100 bg-white p-5">
                  <p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">
                    Why this page exists
                  </p>
                  <p className="text-sm text-gray-700">
                    NZ seniors are one of our largest client segments. We built this page so the planning answers
                    you actually need are upfront — not buried under generic marketing.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
