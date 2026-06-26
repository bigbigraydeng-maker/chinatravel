import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import SchemaMarkup from '@/components/SchemaMarkup';
import { getSiteUrl } from '@/lib/site';
import { generateWebPageSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';

/**
 * Pillar C of CTS Tours NZ topic cluster (see docs/CTS_TOPIC_CLUSTER_ARCHITECTURE.md).
 *
 * Target queries: "yangtze river cruise" / "yangtze cruise from chongqing" /
 * "three gorges cruise" / "best yangtze river cruise from NZ".
 *
 * Competitive context: Luxury Escapes currently dominates "Best of China with
 * Yangtze Cruise" SERP (seen in 6/26 NZ scan). This pillar + the matching
 * /blog/yangtze-river-cruise-from-chongqing deep-dive together build the
 * authority needed to challenge them on NZ-targeted Yangtze queries.
 *
 * Internal-link role: receives inbound links from /china-tours-from-new-zealand
 * (Pillar A) and from all 4 Chongqing/Sichuan cluster blogs. Outbound to those
 * same cluster blogs + chongqing-tours + china-tours-from-new-zealand
 * (back to Pillar A).
 *
 * Schema: Article + Person Baker Gu + ItemList + WebPage + BreadcrumbList +
 * FAQPage — matches the schema pattern committed in PR #86 (blogs) and PR #87
 * (Pillar A rescue).
 *
 * Brand integrity: "China Travel Service since 1928, NZ team 25 years"
 * phrasing. No fabricated ship prices, no fabricated review counts. Ship names
 * (Century, Victoria, President) are real Yangtze operators.
 */

const TOUR_IMG =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images';

const PAGE_TITLE = 'Yangtze River Cruise from NZ 2026-27 · Three Gorges Guide | CTS Tours';
const PAGE_DESCRIPTION =
  'Complete Yangtze River cruise guide for New Zealand travellers — Chongqing to Yichang 4-day downstream itinerary, Three Gorges, ship choices (Century / Victoria / President), best time to go, NZ visa-free entry through 31 Dec 2026. By CTS Tours NZ.';
const PAGE_H1 = 'Yangtze River Cruise from New Zealand (2026-27)';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: '/yangtze-river-cruise',
    ogImagePath: `${TOUR_IMG}/forbidden-city-aerial.jpg`,
    ogImageAlt: 'Yangtze River cruise — Three Gorges passage with NZ traveller perspective',
    keywords: [
      'Yangtze River cruise',
      'Yangtze cruise from Chongqing',
      'Three Gorges cruise',
      'best Yangtze River cruise',
      'China river cruise from New Zealand',
      'CTS Tours Yangtze',
    ],
    ogType: 'website',
  });
}

const ships = [
  {
    name: 'Century Cruises',
    fleet: 'Century Glory, Century Sky, Century Paragon',
    cabin: 'Balcony cabins from 23 m², highest fit-out standard',
    bestFor: 'NZ travellers wanting the most consistent service tier',
  },
  {
    name: 'Victoria Cruises',
    fleet: 'Victoria Anna, Victoria Jenna, Victoria Sabrina',
    cabin: 'American-managed, deepest English-speaking staff',
    bestFor: 'English-only travellers, retirees, first-time China cruisers',
  },
  {
    name: 'President Cruises',
    fleet: 'President 7, President 8',
    cabin: 'Largest ships, broadest entertainment options',
    bestFor: 'Families with kids, multi-generation groups, larger parties',
  },
];

const itinerary = [
  {
    day: 'Day 1 — Chongqing embarkation',
    detail:
      'Board mid-afternoon at Chaotianmen Pier. Welcome briefing, Captain\'s reception in the evening. Ship departs during dinner — Chongqing skyline to riverside countryside is a beautiful first impression.',
  },
  {
    day: 'Day 2 — Fengdu Ghost City + Qutang Gorge',
    detail:
      'Morning shore excursion to Fengdu Ghost City (2,000-year-old temple complex on the riverbank). Back onboard for lunch. Afternoon enters Qutang Gorge — shortest but most dramatic of the three gorges, cliffs rising 1,200m directly from the water.',
  },
  {
    day: 'Day 3 — Wu Gorge + Lesser Three Gorges + Xiling Gorge',
    detail:
      'Morning sailing through Wu Gorge (longest and most photographed). Mid-morning excursion to Lesser Three Gorges at Wushan — smaller vessel into a tributary canyon. Lunch onboard. Afternoon Xiling Gorge (longest at 76 km).',
  },
  {
    day: 'Day 4 — Three Gorges Dam + Yichang disembark',
    detail:
      'Early morning ship lock transit through the Three Gorges Dam — about 4 hours descending five chambers. Mid-morning shore excursion to dam viewing platform. Disembark Yichang around midday. Onward flights to Shanghai (2 hours), Beijing (2.5 hours), or Hong Kong.',
  },
];

const months = [
  { range: 'Mar–May', weather: 'Mild 18-25°C, occasional spring rain', verdict: '✅✅ Best' },
  { range: 'Jun', weather: 'Warming 25-30°C, beginning rainy season', verdict: '✅ Good' },
  { range: 'Jul–Aug', weather: 'Hot 32-38°C, peak domestic crowds', verdict: '❌ Avoid' },
  { range: 'Sep–Oct', weather: 'Mild 20-26°C, clear autumn light', verdict: '✅✅ Best — golden gorges' },
  { range: 'Nov–Feb', weather: 'Cool 8-15°C, atmospheric mist on gorges', verdict: '⚠️ OK if you don\'t mind mist' },
];

const faqs = [
  {
    question: 'How long is a Yangtze River cruise from Chongqing?',
    answer:
      'A standard downstream Yangtze cruise from Chongqing to Yichang runs 4 days / 3 nights, covering the three main gorges (Qutang, Wu, Xiling), the Three Gorges Dam locks, plus shore excursions to Fengdu Ghost City, the Lesser Three Gorges at Wushan, and the Shibaozhai temple. Upstream cruises (Yichang to Chongqing) run 5 days / 4 nights because the ship moves against the current. Most NZ travellers take downstream.',
  },
  {
    question: 'Which Yangtze cruise ship is best for NZ travellers?',
    answer:
      'For Kiwi travellers wanting Western standards, the three premium operators are Century Cruises (Century Glory / Century Sky / Century Paragon), Victoria Cruises (Victoria Anna / Victoria Jenna / Victoria Sabrina), and President Cruises (President 7 / President 8). CTS Tours typically books on Century or Victoria for NZ groups based on cabin spec and shore excursion quality. See the ship comparison table above.',
  },
  {
    question: 'When is the best time to do a Yangtze cruise?',
    answer:
      'April-May (spring) and September-October (autumn) are the sweet spot — mild weather, lower mist on the gorges, and lower domestic tourist crowds. Spring brings flowering hillsides; autumn brings the iconic golden-red gorge reflections you see in photos. Avoid mid-July to mid-August (peak heat 35-40°C and domestic school holidays).',
  },
  {
    question: 'How do NZ travellers get from Auckland to Chongqing for embarkation?',
    answer:
      'No direct flights between Auckland (AKL) and Chongqing (CKG) currently. Typical routings go via Hong Kong, Singapore, Shanghai, or Guangzhou with one stop — total flying time approximately 14-16 hours including layover. Most CTS Tours NZ clients combine the Yangtze cruise with a multi-city China itinerary (Beijing → Xi\'an → Chongqing → cruise → Yichang → Shanghai → fly Auckland), so Chongqing arrival is mid-trip rather than direct from NZ.',
  },
  {
    question: 'Do New Zealanders need a visa for a Yangtze River cruise in 2026?',
    answer:
      'No. NZ ordinary passport holders can enter mainland China visa-free for up to 30 days per visit, valid through 31 December 2026. Both Chongqing (CKG) and Yichang (YIH) airports accept visa-free arrivals. The cruise itself stays within mainland China — no additional permits.',
  },
  {
    question: 'Is a Yangtze cruise suitable for Kiwi seniors?',
    answer:
      'Yes — one of the most popular China experiences for NZ retirees. The ship is the hotel, you only unpack once, daily pacing is gentle (most shore excursions 2-3 hours), elevators on all premium ships, English-speaking guides for medical and dietary questions, and lecture programs that older Kiwi travellers genuinely enjoy.',
  },
  {
    question: 'What\'s included in a CTS Yangtze cruise package?',
    answer:
      'Premium cruises typically include en-suite balcony cabin accommodation (3 nights), all meals onboard (Western and Chinese options), English-speaking onboard guides, shore excursions to Fengdu / Lesser Three Gorges / Three Gorges Dam viewing platform, multilingual lecture programs, and entertainment evenings. Not included: tips for crew (NZD 15-25 per person per day), optional shore excursions, drinks beyond meal-time, personal travel insurance.',
  },
];

const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'China Tours', url: '/china-tours' },
  { name: 'Yangtze River Cruise', url: '/yangtze-river-cruise' },
];

export default function YangtzeRiverCruisePage() {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/yangtze-river-cruise`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: PAGE_H1,
    description: PAGE_DESCRIPTION,
    image: `${siteUrl}/yangtze-three-gorges.jpg`,
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
      'Yangtze River cruise, Yangtze cruise from Chongqing, Three Gorges cruise, best Yangtze River cruise, China river cruise from New Zealand',
    articleSection: 'Experiences',
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Yangtze River Cruise Ships for NZ Travellers — Premium Tier',
    numberOfItems: ships.length,
    itemListElement: ships.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      description: `${s.fleet} — ${s.cabin}`,
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
    generateWebPageSchema(PAGE_TITLE, PAGE_DESCRIPTION, '/yangtze-river-cruise', {
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
          alt="Yangtze River — Three Gorges passage"
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
              Chongqing → Yichang · 4 days / 3 nights · NZD pricing · Visa-free for NZ passports
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
                  A Yangtze River cruise from Chongqing to Yichang runs <strong>4 days / 3 nights</strong>{' '}
                  downstream, passing through three iconic gorges (Qutang, Wu, Xiling), the Three Gorges Dam
                  locks, and shore excursions to Fengdu Ghost City and the Lesser Three Gorges at Wushan.
                  Premium ships (<strong>Century, Victoria, President</strong>) offer en-suite balcony
                  cabins, English-speaking guides, and Western-standard dining. For NZ travellers, the
                  cruise pairs naturally with a Beijing-Xi&apos;an-Chongqing-Shanghai 14-day China holiday
                  from Auckland. NZ passport holders enter visa-free up to 30 days through 31 December 2026.
                  CTS Tours NZ has been arranging Yangtze cruises for Kiwi travellers for 25 years.
                </p>
              </aside>

              {/* Ship comparison */}
              <section aria-labelledby="ships-heading">
                <h2 id="ships-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Choosing Your Ship — Premium Tier Comparison
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  There are dozens of Yangtze operators. For NZ travellers wanting Western standards, only three
                  operators consistently deliver. All three offer en-suite balcony cabins, English-speaking guides,
                  Western and Chinese menus, multilingual lectures, and Western-standard housekeeping.
                </p>
                <div className="overflow-x-auto rounded-xl border border-warm-200 shadow-sm">
                  <table className="w-full text-sm bg-white">
                    <thead className="bg-warm-50 text-gray-900">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold">Operator</th>
                        <th className="text-left px-4 py-3 font-bold">Fleet</th>
                        <th className="text-left px-4 py-3 font-bold">Cabin highlights</th>
                        <th className="text-left px-4 py-3 font-bold">Best for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ships.map((s) => (
                        <tr key={s.name} className="border-t border-warm-100">
                          <td className="px-4 py-3 font-semibold">{s.name}</td>
                          <td className="px-4 py-3 text-gray-700">{s.fleet}</td>
                          <td className="px-4 py-3 text-gray-700">{s.cabin}</td>
                          <td className="px-4 py-3 text-gray-700">{s.bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  CTS Tours typically books NZ groups on Century or Victoria based on departure dates and group size.
                  See the deep-dive at our{' '}
                  <Link href="/blog/yangtze-river-cruise-from-chongqing" className="text-primary font-medium hover:underline">
                    Yangtze cruise from Chongqing blog guide
                  </Link>{' '}for ship-by-ship details.
                </p>
              </section>

              {/* Day-by-day itinerary */}
              <section aria-labelledby="itinerary-heading">
                <h2 id="itinerary-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  4-Day Downstream Itinerary
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Standard CTS Tours NZ Yangtze cruise — Chongqing embarkation to Yichang disembark. Most NZ travellers
                  combine this with a multi-city China holiday before and/or after.
                </p>
                <ol className="space-y-5">
                  {itinerary.map((d) => (
                    <li key={d.day} className="rounded-xl border border-warm-200 bg-warm-50/30 p-5">
                      <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">{d.day}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{d.detail}</p>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Best time table */}
              <section aria-labelledby="best-time-heading">
                <h2 id="best-time-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Best Time to Cruise the Yangtze
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  October is widely considered the single best month — mild weather, golden gorge light, and
                  manageable crowds. NZ travellers find spring in NZ aligns with autumn in China, no weather shock.
                </p>
                <div className="overflow-x-auto rounded-xl border border-warm-200 shadow-sm">
                  <table className="w-full text-sm bg-white">
                    <thead className="bg-warm-50 text-gray-900">
                      <tr>
                        <th className="text-left px-4 py-3 font-bold">Month range</th>
                        <th className="text-left px-4 py-3 font-bold">Weather + visibility</th>
                        <th className="text-left px-4 py-3 font-bold">Recommend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {months.map((m) => (
                        <tr key={m.range} className="border-t border-warm-100">
                          <td className="px-4 py-3 font-semibold">{m.range}</td>
                          <td className="px-4 py-3 text-gray-700">{m.weather}</td>
                          <td className="px-4 py-3 text-gray-700">{m.verdict}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* What's included */}
              <section aria-labelledby="included-heading">
                <h2 id="included-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  What&apos;s Included on a CTS Yangtze Cruise
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-green-50 border border-green-100 p-5">
                    <h3 className="font-serif font-bold text-lg text-gray-900 mb-3">✅ Included</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>3 nights en-suite balcony cabin</li>
                      <li>All meals onboard (Western + Chinese)</li>
                      <li>English-speaking onboard guides</li>
                      <li>Shore excursions: Fengdu, Lesser Three Gorges, Three Gorges Dam</li>
                      <li>Multilingual lecture programs</li>
                      <li>Captain&apos;s reception + farewell dinner</li>
                    </ul>
                  </div>
                  <div className="rounded-xl bg-amber-50 border border-amber-100 p-5">
                    <h3 className="font-serif font-bold text-lg text-gray-900 mb-3">⚠️ Budget separately</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>Tips for crew (NZD 15-25 per person per day)</li>
                      <li>Optional shore excursions (NZD 100-150 per person)</li>
                      <li>Drinks beyond meal-time water and tea</li>
                      <li>Personal travel insurance (strongly recommended)</li>
                      <li>Pre-cruise hotel night in Chongqing if arriving early</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How it fits a full China tour from NZ */}
              <section aria-labelledby="fits-tour-heading">
                <h2 id="fits-tour-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  How the Yangtze Cruise Fits a Full China Tour from Auckland
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Most NZ travellers don&apos;t fly all the way to China for just the cruise. The typical 14-day
                  itinerary CTS Tours NZ runs:
                </p>
                <ul className="text-gray-700 space-y-1 mb-4">
                  <li><strong>Days 1-4:</strong> Beijing — Great Wall, Forbidden City, Temple of Heaven</li>
                  <li><strong>Days 5-7:</strong> Xi&apos;an — Terracotta Warriors, ancient city walls</li>
                  <li><strong>Days 8-9:</strong> Chongqing — Liziba monorail, Hongyadong, board cruise</li>
                  <li><strong>Days 10-12:</strong> Yangtze River cruise (3 nights to Yichang)</li>
                  <li><strong>Day 13:</strong> Yichang → Shanghai (fly, 2 hours)</li>
                  <li><strong>Day 14:</strong> Shanghai — Bund, fly Auckland evening</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Total return flying time from Auckland: ~26-28 hours including one stop each way. See our{' '}
                  <Link href="/campaigns/best-of-china" className="text-primary font-medium hover:underline">
                    Best of China itinerary
                  </Link>{' '}or the broader{' '}
                  <Link href="/china-tours-from-new-zealand" className="text-primary font-medium hover:underline">
                    China tours from NZ hub
                  </Link>{' '}for booking detail.
                </p>
              </section>

              {/* Related deep-dives */}
              <section aria-labelledby="related-heading">
                <h2 id="related-heading" className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Related Reading — Chongqing &amp; Sichuan Cluster
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <li>
                    <Link href="/blog/yangtze-river-cruise-from-chongqing" className="text-primary font-medium hover:underline">
                      📘 Yangtze River Cruise — Deep-Dive Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/how-many-days-in-chongqing" className="text-primary font-medium hover:underline">
                      📘 How Many Days in Chongqing?
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/chongqing-vs-chengdu" className="text-primary font-medium hover:underline">
                      📘 Chongqing vs Chengdu — Which Should NZ Travellers Visit?
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog/liziba-monorail-chongqing-guide" className="text-primary font-medium hover:underline">
                      📘 Liziba Monorail Through-the-Building
                    </Link>
                  </li>
                  <li>
                    <Link href="/chongqing-chengdu-discovery-guide" className="text-primary font-medium hover:underline">
                      📍 Chongqing &amp; Chengdu Discovery Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-visa-guide-for-new-zealanders" className="text-primary font-medium hover:underline">
                      🛂 China Visa-Free for NZ Passports
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

              {/* Final CTA */}
              <section className="rounded-2xl bg-gradient-to-br from-warm-50 to-amber-50 border border-warm-100 p-6 md:p-8 text-center">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                  Ready to plan your Yangtze cruise from NZ?
                </h2>
                <p className="text-gray-700 mb-5 max-w-2xl mx-auto">
                  Our Auckland-based team will match the ship to your dates, integrate the cruise with your wider
                  China itinerary, and quote everything in NZD. China Travel Service since 1928, NZ team 25 years.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                >
                  Talk to a CTS Specialist →
                </Link>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Yangtze Quick Facts</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-600">Cruise length</dt>
                      <dd className="font-medium">4 days / 3 nights (downstream)</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Embark / Disembark</dt>
                      <dd className="font-medium">Chongqing → Yichang</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Best months</dt>
                      <dd className="font-medium">Apr-May, Sep-Oct</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Entry (NZ passport)</dt>
                      <dd className="font-medium">Visa-free 30 days (through 31 Dec 2026)</dd>
                    </div>
                    <div>
                      <dt className="text-gray-600">Premium ships</dt>
                      <dd className="font-medium">Century · Victoria · President</dd>
                    </div>
                  </dl>
                </div>

                <Link
                  href="/contact"
                  className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
                >
                  Plan My Yangtze Trip
                </Link>

                <div className="rounded-xl border border-warm-100 bg-white p-5">
                  <p className="text-xs font-bold uppercase text-primary tracking-wide mb-2">
                    Topic cluster
                  </p>
                  <p className="text-sm text-gray-700">
                    This is part of CTS Tours NZ&apos;s Chongqing &amp; Sichuan cluster — 4 deep blog guides plus
                    this pillar page, all interlinked for full-coverage planning.
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
