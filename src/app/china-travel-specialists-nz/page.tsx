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
    title: 'China Travel Specialists NZ | CTS Tours Auckland — Since 1928',
    description:
      "New Zealand's longest-running China travel specialists. 98 years of expertise, 1,200+ Kiwi travellers, direct on-ground China operations. Auckland-based team.",
    path: '/china-travel-specialists-nz',
    ogImagePath:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg',
    ogImageAlt: 'China travel specialists NZ — CTS Tours Auckland',
    keywords: [
      'china travel specialists nz',
      'china travel agency new zealand',
      'china travel agency auckland',
      'china specialists nz',
      'best china tour operator nz',
      'china tour operator new zealand',
    ],
    ogType: 'website',
  });
}

export default function ChinaTravelSpecialistsNzPage() {
  const siteUrl = getSiteUrl();

  const faqs = [
    {
      question: 'How are you different from online booking platforms?',
      answer:
        'Online platforms aggregate suppliers from many countries. CTS has direct on-ground operations in China — our guides, logistics, and hotel relationships are managed by our own team, not subcontracted out. That means one accountable team from your first enquiry to your return flight.',
    },
    {
      question: 'Do you arrange visas for China?',
      answer:
        'Many NZ passport holders can enter China visa-free for up to 30 days (leisure trips; valid until 31 Dec 2026 — confirm dates before booking). Our team can advise on current entry requirements and point you to our detailed NZ entry guide.',
    },
    {
      question: "What's included in your tour prices?",
      answer:
        'Return international airfares from New Zealand, hotel accommodation as specified, English-speaking guides, entrance fees and meals as listed, and all land transfers. Each tour page lists full inclusions and exclusions.',
    },
    {
      question: 'Why does NZD pricing matter?',
      answer:
        'Many China tour operators price in AUD or USD, which exposes Kiwi travellers to currency risk and unexpected cost blowouts. All CTS prices are in New Zealand dollars — what you see is what you pay.',
    },
    {
      question: 'Are you a New Zealand registered travel agency?',
      answer:
        'Yes. CTS Tours is a TAANZ member and IATA-accredited agency based in Auckland, New Zealand. We operate under NZ consumer protection laws with full financial accountability.',
    },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'CTS Tours',
      url: siteUrl,
      foundingDate: '1928',
      description:
        "New Zealand's longest-running China travel specialists. Direct on-ground China operations, Auckland-based team, TAANZ member and IATA-accredited.",
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NZ',
        addressLocality: 'Auckland',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'China Tours from New Zealand',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'TouristTrip',
              name: 'China Discovery — A Tale of Two Cities',
              description: 'Beijing + Xi\'an by high-speed train, 10 days from NZD $3,480',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'TouristTrip',
              name: 'China Discovery — Shanghai & Surroundings',
              description: 'Yangtze Delta loop, 10 days from NZD $3,399',
            },
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'China Travel Specialists NZ',
          item: `${siteUrl}/china-travel-specialists-nz`,
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
            <li className="text-gray-900 font-medium">China Travel Specialists NZ</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-accent text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            New Zealand&apos;s China Travel Specialists Since 1928
          </h1>
          <p className="text-xl opacity-90">
            98 years. 1,200+ Kiwi travellers. Direct operations across China.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Main Content */}
      <main className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">

              {/* Section 1: Why Specialists Beat Generalists */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  Why Specialists Beat Generalists
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Most Kiwis booking China tours are handed to a generalist agency that resells packages
                  assembled in Australia, the UK, or Hong Kong. Your tour is built on third-party
                  subcontracting — two or three layers removed from the people actually on the ground in China.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  CTS has been running China tours directly since 1928. Our China operations are our own —
                  guides, logistics, hotel relationships, and ground arrangements managed by our team, not
                  subcontracted out. When something changes in-destination (weather, closures, logistics),
                  our team solves it on the spot.
                </p>
              </section>

              {/* Section 2: How We're Different */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  How We&apos;re Different
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Direct China Operations',
                      desc: 'No middlemen. Our own team on the ground means better access, faster problem-solving, and consistent quality across every tour.',
                    },
                    {
                      title: 'ATAS & TAANZ Accredited',
                      desc: 'Fully licensed NZ travel agency — TAANZ member, IATA-accredited, Qualmark recognised. You are covered by NZ consumer protection laws.',
                    },
                    {
                      title: 'Auckland-Based Team',
                      desc: 'We are in Auckland, not a call centre offshore. Same business hours as you. Local knowledge about what Kiwis actually want from a China trip.',
                    },
                    {
                      title: 'Hand-Crafted Itineraries',
                      desc: 'Not packaged tours pulled off a shelf. Each CTS itinerary is built around how Kiwi travellers like to move — sensible pacing, breathing room, genuine local experiences.',
                    },
                    {
                      title: 'NZD Pricing, No Surprises',
                      desc: 'All prices in New Zealand dollars. No currency fluctuation risk, no hidden AUD-to-NZD conversions on your invoice.',
                    },
                    {
                      title: 'Specialist Knowledge',
                      desc: 'Our team has 20+ years of on-the-ground China experience. We know which sections of the Great Wall are worth the walk, which Terracotta Warrior pit is most impressive, and which local restaurants are actually local.',
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-warm-50 border border-warm-100 rounded-lg p-6">
                      <h3 className="font-bold text-lg mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 3: Social proof */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  1,200+ Kiwi Travellers Trust Us
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Since 1928, CTS has taken New Zealand families, couples, and solo travellers to China.
                  From first-timers nervous about navigating a country they&apos;ve never visited, to repeat
                  guests who come back for a different region each time.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our most-booked itineraries connect Beijing&apos;s imperial history with Xi&apos;an&apos;s
                  Terracotta Warriors, or take travellers through the Yangtze Delta — Suzhou, Hangzhou,
                  and Shanghai — with time to actually experience each city rather than sprint through it.
                </p>
              </section>

              {/* Section 4: Most-Booked Tours */}
              <section>
                <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                  Our Most-Booked Tours
                </h2>
                <div className="space-y-4">
                  <div className="border border-warm-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        A Tale of Two Cities — Beijing &amp; Xi&apos;an
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        10 days · Great Wall, Forbidden City, high-speed train, Terracotta Warriors
                      </p>
                      <p className="text-primary font-semibold mt-1">From NZD $3,480</p>
                    </div>
                    <Link
                      href="/campaigns/october-2026/tale-of-two-cities"
                      className="shrink-0 bg-primary text-white px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition text-center"
                    >
                      View Tour →
                    </Link>
                  </div>
                  <div className="border border-warm-200 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        Shanghai &amp; Surroundings
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        10 days · Suzhou, Wuxi, Hangzhou West Lake, Shanghai Bund
                      </p>
                      <p className="text-primary font-semibold mt-1">From NZD $3,399</p>
                    </div>
                    <Link
                      href="/campaigns/october-2026/shanghai-surroundings"
                      className="shrink-0 bg-primary text-white px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition text-center"
                    >
                      View Tour →
                    </Link>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Also: our{' '}
                  <Link href="/tours/china/discovery/essentials" className="text-primary font-medium hover:underline">
                    Best of China 15-day itinerary
                  </Link>{' '}
                  covers Beijing, Xi&apos;an, Hangzhou, Puyuan, and Shanghai in one seamless journey.
                </p>
              </section>

              {/* Internal links */}
              <section className="rounded-2xl border border-warm-200 bg-warm-50/80 p-6">
                <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">Plan Your Trip</h2>
                <ul className="grid gap-2 sm:grid-cols-2 text-sm">
                  <li>
                    <Link href="/great-wall-travel-guide" className="text-primary font-medium hover:underline">
                      Great Wall travel guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/terracotta-warriors-travel-guide" className="text-primary font-medium hover:underline">
                      Terracotta Warriors travel guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-visa-guide-for-new-zealanders" className="text-primary font-medium hover:underline">
                      China entry &amp; visa-free guide (NZ passports)
                    </Link>
                  </li>
                  <li>
                    <Link href="/china-tours-from-new-zealand" className="text-primary font-medium hover:underline">
                      All China tours from New Zealand
                    </Link>
                  </li>
                  <li>
                    <Link href="/small-group-china-tours" className="text-primary font-medium hover:underline">
                      Small-group China tours
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
                  <h3 className="font-serif font-bold text-lg mb-3">Speak with our specialists</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Questions about a specific itinerary, visa requirements, or travel timing? Our Auckland
                    team is here.
                  </p>
                  <Link
                    href="/contact"
                    className="block w-full bg-white text-accent font-bold py-3 px-4 rounded-lg text-center hover:bg-warm-50 transition"
                  >
                    Contact Us
                  </Link>
                  <Link
                    href="/tailor-made"
                    className="block w-full mt-3 border border-white/40 text-white font-semibold py-3 px-4 rounded-lg text-center hover:bg-white/10 transition"
                  >
                    Plan My Trip
                  </Link>
                </div>

                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Why CTS</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="text-gray-500">Founded</dt>
                      <dd className="font-semibold text-gray-900">1928 — 98 years</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Kiwi travellers</dt>
                      <dd className="font-semibold text-gray-900">1,200+</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Based in</dt>
                      <dd className="font-semibold text-gray-900">Auckland, NZ</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Accreditation</dt>
                      <dd className="font-semibold text-gray-900">TAANZ · IATA · Qualmark</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Pricing</dt>
                      <dd className="font-semibold text-gray-900">NZD — no surprises</dd>
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
        title="Ready to Travel to China with Specialists?"
        description="Speak with our Auckland-based team. We'll match you to the right itinerary, sort your documents, and take care of everything in between."
        primaryButtonText="Plan My Trip"
        primaryButtonLink="/tailor-made"
        secondaryButtonText="Contact Our Team"
        secondaryButtonLink="/contact"
      />
    </>
  );
}
