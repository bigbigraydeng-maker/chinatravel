import { Metadata } from 'next';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'Small-Group China Tours from New Zealand | CTS Tours',
    description:
      'Small-group China tours designed for New Zealand travellers. Intimate groups, expert guides, hand-picked hotels, NZD pricing. October 2026 departures available.',
    path: '/small-group-china-tours',
    ogImagePath:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg',
    ogImageAlt: 'Small-group China tours from New Zealand — CTS Tours',
    keywords: [
      'small group china tours',
      'small group china tours new zealand',
      'guided china tour nz',
      'small group china tour operator',
      'intimate china tour nz',
      'china group tour new zealand',
    ],
    ogType: 'website',
  });
}

export default function SmallGroupChinaToursPage() {
  const siteUrl = getSiteUrl();

  const faqs = [
    {
      question: 'How small is a "small group"?',
      answer:
        'Our Discovery and Signature tours typically run with groups of 6–16 travellers. This keeps the group cohesive for meals, transfers, and sightseeing while still justifying the per-person cost of a private coach and dedicated guide.',
    },
    {
      question: 'Are the tours fully guided or self-guided?',
      answer:
        'Fully guided. An English-speaking CTS guide accompanies the group throughout. All entrance tickets, transfers, restaurant bookings, and logistics are pre-arranged so you can focus on experiencing China rather than navigating it.',
    },
    {
      question: 'What is included in the tour price?',
      answer:
        'Return international airfares from New Zealand, hotel accommodation as specified per tour, English-speaking guide throughout, entrance fees and meals as listed, and all in-destination transfers. Each tour page details full inclusions and exclusions.',
    },
    {
      question: 'Can I join a group tour as a solo traveller?',
      answer:
        'Yes. Solo travellers join our scheduled departures alongside other Kiwi travellers. If you prefer not to share a room, a single supplement applies — details are listed on each tour page.',
    },
    {
      question: 'What are the departure months for October 2026?',
      answer:
        'Our October 2026 Discovery departures leave mid-October from Auckland. The Tale of Two Cities (Beijing + Xi\'an) departs 15 October 2026. Shanghai & Surroundings departs on the same window. Check each campaign page for exact dates and seat availability.',
    },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Small-Group China Tours from New Zealand',
      description:
        'Small-group guided China tours from New Zealand with CTS Tours. Intimate groups, expert local guides, NZD pricing, October 2026 departures.',
      url: `${siteUrl}/small-group-china-tours`,
      provider: {
        '@type': 'Organization',
        name: 'CTS Tours',
        url: siteUrl,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Small-Group China Tours',
          item: `${siteUrl}/small-group-china-tours`,
        },
      ],
    },
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">Small-Group China Tours</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-accent text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Small-Group China Tours from New Zealand
          </h1>
          <p className="text-xl opacity-90">
            Intimate groups. Expert guides. October 2026 departures open.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Main content */}
      <main className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-12">

              {/* Section 1: Why small-group */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  Why Small-Group Matters in China
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  China&apos;s major sights — the Great Wall at dawn, the Terracotta Warriors at pit level,
                  the Li River at first light — are best experienced without 45 other people from four
                  different countries who all want to be at the same gate at the same time.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our groups run between 6 and 16 travellers. That&apos;s small enough to move as one unit,
                  get into restaurants locals actually use, and have a guide who remembers your name
                  by day two. It&apos;s large enough to share the per-person cost of a private coach and
                  dedicated specialist without paying luxury-tier prices.
                </p>
              </section>

              {/* Section 2: What's included */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  What&apos;s Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: '✈️', label: 'Return flights from NZ', desc: 'Return international airfares from Auckland included in tour price' },
                    { icon: '🏨', label: 'Hand-picked hotels', desc: '4-star hotels selected for location and quality, not just price' },
                    { icon: '🎫', label: 'All entrance fees', desc: 'Great Wall, Forbidden City, Terracotta Warriors — no surprise costs' },
                    { icon: '🍜', label: 'Most meals included', desc: 'Breakfasts daily, select lunches and dinners at quality local restaurants' },
                    { icon: '🚌', label: 'Private coach throughout', desc: 'Your own coach and driver for the group — no shared buses with strangers' },
                    { icon: '🗣️', label: 'English-speaking guide', desc: '20+ years China expertise; the same guide stays with the group throughout' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4 p-4 bg-warm-50 rounded-lg border border-warm-100">
                      <span className="text-2xl shrink-0">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: October 2026 departures */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  October 2026 Departures
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  October is peak season in China — clear skies, crisp autumn colour, and the Great
                  Wall blazing red and orange. Our two October 2026 small-group departures cover the
                  most-requested Kiwi itineraries.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary bg-warm-50 rounded-r-xl p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="font-serif font-bold text-xl text-gray-900">
                          A Tale of Two Cities
                        </h3>
                        <p className="text-gray-600 mt-1">
                          10 days · Beijing + Xi&apos;an by high-speed train
                        </p>
                        <p className="text-gray-700 text-sm mt-2">
                          Great Wall (Mutianyu), Forbidden City, Tiananmen Square, Terracotta Warriors,
                          Xi&apos;an City Wall, Muslim Quarter
                        </p>
                        <p className="mt-3">
                          <span className="font-bold text-primary text-lg">From NZD $3,480</span>
                          <span className="text-gray-500 text-sm ml-2">· Departs 15 October 2026</span>
                        </p>
                      </div>
                      <Link
                        href="/campaigns/october-2026/tale-of-two-cities"
                        className="shrink-0 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition text-center"
                      >
                        View & Enquire →
                      </Link>
                    </div>
                  </div>

                  <div className="border-l-4 border-secondary bg-warm-50 rounded-r-xl p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="font-serif font-bold text-xl text-gray-900">
                          Shanghai &amp; Surroundings
                        </h3>
                        <p className="text-gray-600 mt-1">
                          10 days · Yangtze Delta loop
                        </p>
                        <p className="text-gray-700 text-sm mt-2">
                          Suzhou gardens, Wuxi Taihu Lake, Hangzhou West Lake, Meijiawu tea
                          plantation, Shanghai Bund and Yu Garden
                        </p>
                        <p className="mt-3">
                          <span className="font-bold text-primary text-lg">From NZD $3,399</span>
                          <span className="text-gray-500 text-sm ml-2">· October 2026</span>
                        </p>
                      </div>
                      <Link
                        href="/campaigns/october-2026/shanghai-surroundings"
                        className="shrink-0 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition text-center"
                      >
                        View &amp; Enquire →
                      </Link>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Looking for a longer itinerary? Our{' '}
                  <Link href="/tours/china/discovery/essentials" className="text-primary font-medium hover:underline">
                    Best of China 15-day tour
                  </Link>{' '}
                  covers Beijing, Xi&apos;an, Puyuan, Hangzhou, and Shanghai — departing 3 November 2026
                  from NZD $3,880.
                </p>
              </section>

              {/* Section 4: The guide difference */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  The Guide Makes the Difference
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Our China specialists have 20+ years on the ground. They know which section of the
                  Great Wall is worth the climb for your fitness level, which Terracotta Warrior pit
                  has the best vantage, and which street food stall in Xi&apos;an has been running for
                  three generations. They also know what Kiwis like — honest itineraries with enough
                  breathing room to have a coffee and wander before the next big sight.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The same guide travels with your group from city to city — so you are never handed
                  off to a local subcontractor who has never met you.
                </p>
              </section>

              {/* Internal links */}
              <section className="rounded-2xl border border-warm-200 bg-warm-50/80 p-6">
                <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Plan Your Trip</h2>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm">
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
                  <li>
                    <Link href="/china-visa-guide-for-new-zealanders" className="text-primary font-medium hover:underline">
                      China entry &amp; visa-free guide (NZ passports)
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-travel-specialists-nz" className="text-primary font-medium hover:underline">
                      About CTS — China travel specialists since 1928
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-tours-from-new-zealand" className="text-primary font-medium hover:underline">
                      All China tours from New Zealand
                    </Link>
                  </li>
                  <li>
                    <Link href="/best-time-to-visit-china" className="text-primary font-medium hover:underline">
                      Best time to visit China
                    </Link>
                  </li>
                </ul>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-accent text-white rounded-2xl p-6">
                  <h3 className="font-serif font-bold text-lg mb-3">October 2026 seats filling fast</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Small groups mean limited seats. Enquire now to check availability and hold your place.
                  </p>
                  <Link
                    href="/campaigns/october-2026/tale-of-two-cities"
                    className="block w-full bg-white text-accent font-bold py-3 px-4 rounded-lg text-center hover:bg-warm-50 transition mb-3"
                  >
                    Beijing &amp; Xi&apos;an →
                  </Link>
                  <Link
                    href="/campaigns/october-2026/shanghai-surroundings"
                    className="block w-full border border-white/40 text-white font-semibold py-3 px-4 rounded-lg text-center hover:bg-white/10 transition"
                  >
                    Shanghai &amp; Surroundings →
                  </Link>
                </div>

                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Group Facts</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-500">Group size</dt>
                      <dd className="font-semibold text-gray-900">6–16 travellers</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Guide</dt>
                      <dd className="font-semibold text-gray-900">English-speaking specialist, 20+ yrs</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Transport</dt>
                      <dd className="font-semibold text-gray-900">Private group coach</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Pricing</dt>
                      <dd className="font-semibold text-gray-900">NZD — no currency risk</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Solo supplement</dt>
                      <dd className="font-semibold text-gray-900">Available on request</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FAQSection faqs={faqs} />

      <CTASection
        title="Ready to Join a Small-Group China Tour?"
        description="Enquire with our Auckland-based team. We'll confirm group dates, seat availability, and everything else you need to book with confidence."
        primaryButtonText="Enquire Now"
        primaryButtonLink="/contact"
        secondaryButtonText="Browse All Tours"
        secondaryButtonLink="/china-tours"
      />
    </>
  );
}
