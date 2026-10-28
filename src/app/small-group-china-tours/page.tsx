import { Metadata } from 'next';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import { Icon, type IconName } from '@/components/ui/Icon';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';
import { formatPublishedTourCities, getPublishedChinaTours } from '@/lib/data/published-tour-catalog';

/** Published tours and departures refresh after each ME publish and at most every 15 seconds. */
export const revalidate = 15;

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'Small-Group China Tours from New Zealand | CTS Tours',
    description:
      'Small-group China tours designed for New Zealand travellers. Compare current itineraries, published prices and departure dates from CTS Tours.',
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

export default async function SmallGroupChinaToursPage() {
  const siteUrl = getSiteUrl();
  const tours = await getPublishedChinaTours();

  const featuredTours = ['beijing-xian', 'shanghai-surroundings', 'essentials'].flatMap((slug) => {
    const tour = tours.find((item) => item.tier === 'discovery' && item.slug === slug && !item.soldOut);
    if (!tour) return [];
    return [{ tour, href: `/tours/${tour.destination}/${tour.tier}/${tour.slug}` }];
  });

  const faqs = [
    {
      question: 'How small is a "small group"?',
      answer:
        'Our Discovery and Signature tours run as small groups. This keeps the group cohesive for meals, transfers, and sightseeing while still justifying the per-person cost of a private coach and dedicated guide.',
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
      question: 'When are the next small-group departures?',
      answer:
        `Our scheduled departures leave from Auckland. ${featuredTours.map(({ tour }) => `${tour.name}${tour.departureDates?.length ? ` departs ${tour.departureDates.join(' & ')}` : ': ask us for the next departure date'}`).join('. ')}. Check each live tour page for exact dates and availability.`,
    },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Small-Group China Tours from New Zealand',
      description:
        'Small-group guided China tours from New Zealand with CTS Tours. Current tour facts and departure dates come from the published CTS catalogue.',
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
            Intimate groups. Expert guides. {featuredTours.length} active featured tours.
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

              {/* Quick Answer — Featured Snippet / AI Overview target */}
              <aside
                aria-label="Quick answer"
                className="border-l-4 border-primary bg-warm-50/60 rounded-r-lg p-5 md:p-6"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-primary mb-2">
                  Quick answer
                </p>
                <p className="text-gray-800 leading-relaxed">
                  CTS Tours runs <strong>small-group</strong> China tours from New Zealand. Compare {featuredTours.map(({ tour }) => `${tour.name} (${tour.duration}, ${tour.price})`).join('; ') || 'currently active published tours'} below. Names, duration, routes, itinerary highlights, prices and departure dates come from the latest ME version CTS has published. NZ passport holders can enter China visa-free for up to 30 days — no visa application needed.
                </p>
              </aside>

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
                  Our groups stay small — small enough to move as one unit,
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
                  {([
                    { icon: 'plane', label: 'Return flights from NZ', desc: 'Return international airfares from Auckland included in tour price' },
                    { icon: 'building', label: 'Hand-picked hotels', desc: '4-star hotels selected for location and quality, not just price' },
                    { icon: 'ticket', label: 'All entrance fees', desc: 'Great Wall, Forbidden City, Terracotta Warriors — no surprise costs' },
                    { icon: 'utensils', label: 'Most meals included', desc: 'Breakfasts daily, select lunches and dinners at quality local restaurants' },
                    { icon: 'bus', label: 'Private coach throughout', desc: 'Your own coach and driver for the group — no shared buses with strangers' },
                    { icon: 'message', label: 'English-speaking guide', desc: 'Experienced China guide; the same guide stays with the group throughout' },
                  ] as { icon: IconName; label: string; desc: string }[]).map((item) => (
                    <div key={item.label} className="flex gap-4 p-4 bg-warm-50 rounded-lg border border-warm-100">
                      <Icon name={item.icon} className="w-6 h-6 shrink-0 text-primary" />
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: upcoming departures */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">Upcoming Departures</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Current product details below come from tours that are active in the latest ME publication.
                </p>
                <div className="space-y-4">
                  {featuredTours.map(({ tour, href }, index) => (
                    <div key={tour.id} className="border-l-4 border-primary bg-warm-50 rounded-r-xl p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="font-serif font-bold text-xl text-gray-900">{tour.name}</h3>
                          <p className="text-gray-600 mt-1">
                            {tour.duration}{tour.tourCities?.length ? ` · ${formatPublishedTourCities(tour.tourCities, ' + ')}` : ''}
                          </p>
                          {tour.highlights.length ? <p className="text-gray-700 text-sm mt-2">{tour.highlights.slice(0, 5).join(' · ')}</p> : null}
                          <p className="mt-3">
                            <span className="font-bold text-primary text-lg">{tour.price}</span>
                            <span className="text-gray-500 text-sm ml-2">· {tour.departureDates?.length ? `Departs ${tour.departureDates.join(' · ')}` : 'Ask us for the next departure'}</span>
                          </p>
                        </div>
                        <Link
                          href={href}
                          className="shrink-0 rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:opacity-90"
                        >
                          View &amp; Enquire →
                        </Link>
                      </div>
                    </div>
                  ))}
                  {featuredTours.length === 0 ? <p className="text-gray-700">No featured tours are currently active.</p> : null}
                </div>
              </section>

              {/* Section 4: The guide difference */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  The Guide Makes the Difference
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Our China specialists know the ground. They know which section of the
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
                      About CTS — China travel specialists — Auckland-based, backed by CTS
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
                  <h3 className="font-serif font-bold text-lg mb-3">Limited places per departure</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Small groups mean limited seats. Enquire now to check availability and hold your place.
                  </p>
                  <Link
                    href="/tours/china/discovery/beijing-xian"
                    className="block w-full bg-white text-accent font-bold py-3 px-4 rounded-lg text-center hover:bg-warm-50 transition mb-3"
                  >
                    Beijing &amp; Xi&apos;an →
                  </Link>
                  <Link
                    href="/tours/china/discovery/shanghai-surroundings"
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
                      <dd className="font-semibold text-gray-900">Small group</dd>
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
