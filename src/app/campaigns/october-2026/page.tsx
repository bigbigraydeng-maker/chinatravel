import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import SchemaMarkup from '@/components/SchemaMarkup';
import FAQSection from '@/components/FAQSection';
import Testimonials from '@/components/Testimonials';

import { getTourBySlug } from '@/lib/data/tours';
import { OCTOBER_2026_SPOTLIGHT_TOURS } from '@/lib/campaigns/october-2026-spotlight';
import { getRemainingSeats } from '@/lib/campaigns/seat-availability';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'October 2026 China Tours from New Zealand | CTS Tours',
    description:
      "Three featured October & November 2026 group tours from NZ: Shanghai & Surroundings, Beijing & Xi'an, Chongqing & Chengdu. Limited seats. From NZD $2,750. Book direct.",
    path: '/campaigns/october-2026',
    ogImagePath:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/wuzhen-canal.jpg',
    ogImageAlt: 'October 2026 China Spotlight Tours — featured group departures from New Zealand',
    keywords: [
      'October 2026 China tours',
      'China group tours 2026',
      'New Zealand China tours',
      'CTS Tours October departures',
      'Shanghai tour October 2026',
      "Beijing Xi'an tour 2026",
      'Chongqing Chengdu tour November 2026',
    ],
  });
}

const OCTOBER_HUB_FAQS = [
  {
    question: 'Why book a small group tour vs a private tour?',
    answer:
      'Group tours give you the full CTS itinerary at a sharper per-person price, plus the social side of travelling with like-minded Kiwis. Group sizes are capped at 16–20 to keep things personal. If you prefer your own pace, ask us about converting any October/November departure into a fully private booking — same itinerary, same guides, your own van and timings.',
  },
  {
    question: 'Are international flights from New Zealand included?',
    answer:
      'Tour pricing covers all in-China services: hotels, daily breakfasts plus listed lunches/dinners, transfers, English-speaking guides, entrance fees, and high-speed rail/internal flights as scheduled. International flights from Auckland are arranged separately so you can choose airline, fare class, and stopovers — our team will quote and book flights for you on request.',
  },
  {
    question: 'Do I need a visa to visit China in October 2026?',
    answer:
      'Most New Zealand passport holders can enter China visa-free for up to 30 days for tourism under the policy currently published through 31 December 2026. You will need a valid passport, return/onward tickets, and your CTS booking confirmation. For business travel, longer stays, or non-NZ passports, a visa may still be required — confirm with us before booking.',
  },
  {
    question: 'What is the cancellation policy on October 2026 departures?',
    answer:
      'Each tour has its own published cancellation schedule based on time-to-departure. Early bookings (>90 days out) typically forfeit only the deposit; closer cancellations move on a sliding scale. We strongly recommend comprehensive travel insurance from the date you pay the deposit. Email auckland@cts.co.nz for the exact terms on the departure you are interested in.',
  },
  {
    question: 'How fast do these October departures sell out?',
    answer:
      'October is peak season for visa-free China travel from NZ — the Yangtze Delta, Beijing/Xi\'an and Chongqing/Chengdu group tours typically fill 6–10 weeks before departure. We recommend securing your seat with a refundable deposit early and finalising flights once confirmed. Limited single-supplement rooms are first-come, first-served.',
  },
];

export default function October2026CampaignIndexPage() {
  const siteUrl = getSiteUrl();

  // Build cards from spotlight config + tours.ts data.
  const cards = OCTOBER_2026_SPOTLIGHT_TOURS.map((spot) => {
    const tour = getTourBySlug(spot.destination, spot.tier, spot.slug);
    if (!tour) return null;
    return {
      spot,
      tour,
      remainingSeats: getRemainingSeats(spot.slug),
    };
  })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort(
      (a, b) =>
        new Date(a.spot.departureSortDate).valueOf() -
        new Date(b.spot.departureSortDate).valueOf()
    );

  // ItemList schema for rich-result eligibility.
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'October 2026 China Spotlight Tours',
    description:
      'Featured group tour departures for October and November 2026 with CTS Tours, New Zealand.',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: cards.length,
    itemListElement: cards.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: c.tour.name,
      url: `${siteUrl}${c.spot.href}`,
      image: c.tour.heroImage,
    })),
  };

  return (
    <>
      <SchemaMarkup data={itemListSchema} />

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-accent/95 to-accent/90 text-white">
        <div className="absolute inset-0 opacity-25" aria-hidden>
          <Image
            src="https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/great-wall-mist/great-wall-mist.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-accent/80 via-accent/70 to-accent/95" aria-hidden />
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/30 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-orange-400/20 blur-3xl"
          aria-hidden
        />

        <div className="relative z-10 container mx-auto px-4 pt-12 pb-20 md:pt-20 md:pb-28">
          <nav className="text-sm text-white/70 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">October 2026</span>
          </nav>

          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 border border-primary/30 backdrop-blur-sm px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-6">
              <span className="inline-block h-2 w-2 rounded-full bg-orange-400 animate-pulse" aria-hidden />
              Limited Departures · Book Now
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              October 2026 — Spotlight Departures
            </h1>

            <p className="text-lg md:text-xl text-white/85 leading-relaxed max-w-2xl mb-8">
              Three featured group tours departing October & November 2026.
              Limited seats. Book direct with New Zealand&apos;s China specialists since 1928.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10 max-w-2xl">
              {[
                { v: '3', l: 'Featured Tours' },
                { v: '6+', l: 'Destinations' },
                { v: '30+', l: 'Cities & Sites' },
                { v: 'NZD $2,750', l: 'From' },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-3"
                >
                  <div className="text-xl md:text-2xl font-serif font-bold text-primary">
                    {s.v}
                  </div>
                  <div className="text-[11px] md:text-xs uppercase tracking-wider text-white/70 mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#spotlight-tours"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-white shadow-lg shadow-primary/30 hover:bg-primary/90 hover:scale-[1.02] transition-all"
              >
                Browse Tours Below
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <Link
                href="/tailor-made"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-sm px-8 py-4 font-semibold text-white hover:bg-white/10 transition-all"
              >
                Or build a private trip →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 SPOTLIGHT TOUR CARDS ───────────────────────────────────────── */}
      <section
        id="spotlight-tours"
        className="scroll-mt-24 py-20 md:py-28 bg-gradient-to-b from-amber-50/40 via-white to-warm-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Featured October & November 2026 Departures
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Choose Your Journey
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Each tour is a confirmed group departure with set dates, fixed pricing, and limited seats.
              Click for full itineraries, day-by-day inclusions, and bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {cards.map(({ spot, tour, remainingSeats }) => (
              <Link
                key={spot.slug}
                href={spot.href}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl border border-warm-100/60 hover:border-primary/30 hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-warm-100">
                  <Image
                    src={tour.heroImage}
                    alt={tour.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  {/* Departure badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="bg-white/95 backdrop-blur-sm text-accent text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {spot.departureLabel}
                    </div>
                    {spot.badgeText && (
                      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg">
                        {spot.badgeText}
                      </div>
                    )}
                  </div>

                  {/* Route strip */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                    <div className="flex items-center gap-1 flex-wrap">
                      {spot.routeCities.map((city, i) => (
                        <span key={city} className="flex items-center gap-1">
                          <span className="text-white text-xs font-semibold tracking-wide drop-shadow">{city}</span>
                          {i < spot.routeCities.length - 1 && (
                            <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {tour.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3 flex-1">
                    {tour.shortDescription}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 flex items-center gap-1.5 text-sm">
                      <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {tour.duration}
                    </span>
                    <span className="text-primary font-bold text-lg">{tour.price}</span>
                  </div>

                  {/* Seats remaining urgency */}
                  <div className="flex items-center gap-2 px-3 py-2 mb-4 rounded-lg bg-orange-50 border border-orange-200/70">
                    <svg className="w-4 h-4 text-orange-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M19 7h-3V5.5C16 4.12 14.88 3 13.5 3h-3C9.12 3 8 4.12 8 5.5V7H5c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5V7h-4V5.5zM19 20H5V9h14v11z" />
                    </svg>
                    <span className="text-xs font-semibold text-orange-800">
                      Only {remainingSeats} seats remaining
                    </span>
                  </div>

                  <div className="inline-block w-full text-center py-3 rounded-full font-medium border-2 border-primary text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    View Tour Details →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY BOOK DIRECT ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              The CTS Tours Difference
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Why Book Direct With Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re not a reseller. We&apos;re the New Zealand–owned operator that has run China tours for nearly a century.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: 'Since 1928',
                body: 'Almost 100 years of China travel experience. We helped pioneer NZ–China tourism.',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Direct China Operations',
                body: 'Our own ground team in China — no middlemen, no markup, no broken-telephone surprises.',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: 'Auckland-Based Team',
                body: 'Talk to a real person in Auckland (NZST hours). Email, call, or stop in to our office.',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
              },
              {
                title: 'Best Price Guarantee',
                body: "Find the same itinerary published cheaper elsewhere? We'll match it. Our group rates are already direct-from-operator.",
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-warm-100 bg-gradient-to-b from-warm-50/40 to-white p-6 hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-warm-50/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
              Real Reviews from Kiwi Travellers
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              What Our Guests Say
            </h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Testimonials variant="sidebar" maxItems={3} />
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <FAQSection faqs={OCTOBER_HUB_FAQS} />

      {/* ─── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-orange-500 text-white py-20 md:py-24">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="absolute -bottom-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-orange-300/20 blur-3xl"
          aria-hidden
        />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
            Ready to explore China this October?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
            Book a featured group departure above, or talk to our Auckland team about a
            fully tailor-made private trip. Either way — limited seats, peak season pricing locks in
            now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/tailor-made"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-10 py-4 font-bold text-primary shadow-xl hover:scale-[1.03] transition-all"
            >
              Plan Your Journey
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <a
              href="mailto:auckland@cts.co.nz"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-sm px-10 py-4 font-semibold text-white hover:bg-white/20 transition-all"
            >
              Email Our Specialists
            </a>
          </div>
          <p className="mt-8 text-sm text-white/70">
            <Link href="/tours/china/discovery" className="hover:text-white underline-offset-4 hover:underline">
              Browse all China Discovery tours →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
