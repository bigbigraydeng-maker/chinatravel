import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TrustBar from '@/components/TrustBar';
import TourTrustSignals from '@/components/tours/TourTrustSignals';
import Testimonials from '@/components/Testimonials';
import FAQSection from '@/components/FAQSection';
import FacebookFollowStrip from '@/components/FacebookFollowStrip';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateBreadcrumbSchema } from '@/lib/schema-tour';
import { getSiteUrl, CTS_PHONE_DISPLAY, CTS_PHONE_HREF } from '@/lib/site';
import {
  BF_DEPOSIT_PER_PERSON_NZD,
  FAMILY_SAVING,
  FRIENDS_SAVING,
  bestSavingPerPerson,
  isOfferOpen,
} from '@/lib/campaigns/black-friday-2026';
import { loadBlackFridayTours } from './_lib/load-tours';
import BlackFridayEnquiry from './_components/BlackFridayEnquiry';

/**
 * Black Friday 2026 landing page — the destination for the Black Friday Facebook posts, ads and emails.
 * Offer amounts live in `@/lib/campaigns/black-friday-2026`; tour names, prices, durations and dates come from
 * the published tour catalogue so this page never disagrees with the tour pages.
 * Copy rules (CTS): concrete dates and listed prices only — no countdowns, "limited time", "last chance" or seat counts.
 */
export const revalidate = 3600;

const PATH = '/campaigns/black-friday-2026';
const RED = '#B61E2E';
const GOLD = '#D6A756';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const title = 'Black Friday Sale on 2027 China Tours | CTS Tours';
  const description =
    'Book a 2027 China tour between 17 November and 4 December 2026: couples save up to NZ$1,000, a group of four friends saves up to NZ$2,000, and families save NZ$500 per person on Signature tours.';
  return {
    title,
    description,
    openGraph: { title, description, type: 'website', url: `${siteUrl}${PATH}` },
    alternates: { canonical: `${siteUrl}${PATH}` },
  };
}

const nzd = (n: number) => `NZ$${n.toLocaleString('en-NZ')}`;

const FAQS = [
  {
    question: 'Which tours and departures are in the Black Friday sale?',
    answer:
      'All 2027 departures from May onward of China Panorama, Legacy of China, Silk Road, Natural China, Best of China and A Tale of Two Cities, as listed on this page. March 2027 departures and Shanghai & Surroundings are not included.',
  },
  {
    question: 'When do I need to book?',
    answer:
      'Book between 17 November and 4 December 2026 and pay a NZ$1,000 deposit per person within 3 working days. From 5 December 2026 tour prices return to standard.',
  },
  {
    question: 'Can I combine the friends and family offers?',
    answer:
      'No — one offer per booking. We apply whichever saves you more. Couples count as family.',
  },
  {
    question: 'When is the saving taken off?',
    answer:
      'The saving is deducted from your final payment. Your NZ$1,000 deposit per person is non-refundable, as on all CTS bookings.',
  },
  {
    question: 'How do the friends savings work?',
    answer:
      'Everyone on the same booking gets the same saving, and it grows with the group. On Signature tours: 1 person NZ$200, 2 friends NZ$300 each, 3 friends NZ$400 each, 4 or more NZ$500 each. On Discovery tours: NZ$100, NZ$150, NZ$200 and NZ$250 each.',
  },
];

export default async function BlackFridayLandingPage() {
  const tours = await loadBlackFridayTours();
  const open = isOfferOpen(new Date());
  const siteUrl = getSiteUrl();

  const schemas = [
    generateBreadcrumbSchema(
      [
        { name: 'Home', url: '/' },
        { name: 'Black Friday Sale', url: PATH },
      ],
      siteUrl
    ),
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />

      {/* Hero */}
      <section id="hero" className="bg-[#111010] text-white">
        <div className="container mx-auto px-4 py-12 md:py-20 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm md:text-base font-extrabold uppercase tracking-[0.2em]" style={{ color: GOLD }}>
              2027 China tours · 17 Nov – 4 Dec 2026
            </p>
            <h1 className="mt-3 font-sans text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tight">
              Black Friday
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span
                className="inline-block -rotate-3 px-4 py-1 text-3xl md:text-5xl font-black uppercase tracking-[0.14em] text-white"
                style={{ backgroundColor: RED }}
              >
                Sale
              </span>
              <span className="text-sm md:text-base font-extrabold uppercase tracking-wide">
                Couples, families &amp; friends save more
              </span>
            </div>
            <p className="mt-6 max-w-xl text-lg text-gray-200 leading-relaxed">
              Early-bird prices on our 2027 China tours are held until 4 December, and you can save more when you travel
              together.
            </p>
            {!open && (
              <p className="mt-4 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-gray-100">
                This offer is for bookings made 17 November – 4 December 2026. Please contact us for current prices.
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#tours"
                className="rounded-full px-6 py-3 font-bold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: RED }}
              >
                See the tours
              </a>
              <a
                href="#enquiry"
                className="rounded-full border-2 px-6 py-3 font-bold transition-colors hover:bg-white hover:text-[#111010]"
                style={{ borderColor: GOLD, color: GOLD }}
              >
                Enquire now
              </a>
              <a href={CTS_PHONE_HREF} className="rounded-full px-6 py-3 font-bold text-white underline-offset-4 hover:underline">
                Call {CTS_PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Offer badges */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              { label: 'Couple Travel', big: '$1,000', small: 'save up to · per couple' },
              { label: 'Bestie or Mate', big: '$2,000', small: 'save up to · group of 4' },
              { label: 'Family Travel', big: '$500', small: 'save · per person' },
            ].map((b) => (
              <div
                key={b.label}
                className="rounded-2xl p-5 text-center"
                style={{ backgroundColor: RED, boxShadow: `0 0 0 3px #111010, 0 0 0 5px ${GOLD}` }}
              >
                <p className="text-xs font-extrabold uppercase tracking-widest">{b.label}</p>
                <p className="mt-1 font-serif text-5xl font-black leading-none [font-variant-numeric:lining-nums]">{b.big}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider">NZD · {b.small}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The two offers */}
      <section className="bg-[#FBF7F0]">
        <div className="container mx-auto px-4 py-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Two ways to save</h2>
          <p className="mt-3 max-w-3xl text-gray-700">
            One offer per booking — we apply whichever saves you more. Savings are per person and come off your final
            payment.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-serif font-bold" style={{ color: RED }}>
                Travel with your Bestie or Mate
              </h3>
              <p className="mt-2 text-gray-700">The more of you on one booking, the more each of you saves.</p>
              <table className="mt-5 w-full text-left text-sm md:text-base">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-2 font-semibold">People on the booking</th>
                    <th className="py-2 font-semibold">Signature (each)</th>
                    <th className="py-2 font-semibold">Discovery (each)</th>
                  </tr>
                </thead>
                <tbody>
                  {['1 person', '2 friends', '3 friends', '4 or more'].map((label, i) => (
                    <tr key={label} className="border-b border-gray-100">
                      <td className="py-2 text-gray-900">{label}</td>
                      <td className="py-2 font-bold text-gray-900">{nzd(FRIENDS_SAVING.signature[i])}</td>
                      <td className="py-2 font-bold text-gray-900">{nzd(FRIENDS_SAVING.discovery[i])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-sm text-gray-600">
                Four friends on a Signature tour save {nzd(FRIENDS_SAVING.signature[3] * 4)} in total.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-serif font-bold" style={{ color: RED }}>
                Couple &amp; Family Travel
              </h3>
              <p className="mt-2 text-gray-700">Book together as a family — couples count as family.</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-[#FBF7F0] p-4">
                  <p className="text-sm text-gray-600">Signature tours</p>
                  <p className="mt-1 text-3xl font-serif font-bold text-gray-900">{nzd(FAMILY_SAVING.signature)}</p>
                  <p className="text-sm text-gray-600">off per person</p>
                </div>
                <div className="rounded-xl bg-[#FBF7F0] p-4">
                  <p className="text-sm text-gray-600">Discovery tours</p>
                  <p className="mt-1 text-3xl font-serif font-bold text-gray-900">{nzd(FAMILY_SAVING.discovery)}</p>
                  <p className="text-sm text-gray-600">off per person</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                A couple on a Signature tour saves {nzd(FAMILY_SAVING.signature * 2)}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tours */}
      <section id="tours" className="bg-white scroll-mt-24">
        <div className="container mx-auto px-4 py-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Tours in the sale</h2>
          <p className="mt-3 max-w-3xl text-gray-700">
            2027 departures from May onward. Prices are per person, twin share, including return flights from Auckland.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tours.map(({ tour, tier, departures }) => {
              const href = `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
              const couple = bestSavingPerPerson(tier, 2, true);
              const four = bestSavingPerPerson(tier, 4, false);
              return (
                <article key={tour.slug} className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                  <div className="relative h-52">
                    <Image
                      src={tour.heroImage}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span
                      className="absolute left-3 top-3 rounded px-2 py-1 text-xs font-black uppercase tracking-wider text-white"
                      style={{ backgroundColor: RED }}
                    >
                      Black Friday
                    </span>
                    <span className="absolute right-3 top-3 rounded bg-black/70 px-2 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {tier === 'signature' ? 'Signature' : 'Discovery'}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-xl font-serif font-bold text-gray-900">{tour.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {tour.duration} · {tour.price}
                    </p>
                    <p className="mt-3 text-sm font-semibold" style={{ color: RED }}>
                      Couples save {nzd(couple)} each · four friends save {nzd(four)} each
                    </p>
                    <p className="mt-3 text-sm text-gray-700">
                      <span className="font-semibold">Departures:</span> {departures.join(' · ')}
                    </p>
                    <div className="mt-auto flex gap-3 pt-5">
                      <Link
                        href={href}
                        className="flex-1 rounded-full border-2 border-gray-900 px-4 py-2 text-center text-sm font-bold text-gray-900 hover:bg-gray-900 hover:text-white"
                      >
                        See the itinerary
                      </Link>
                      <a
                        href="#enquiry"
                        className="flex-1 rounded-full px-4 py-2 text-center text-sm font-bold text-white hover:opacity-90"
                        style={{ backgroundColor: RED }}
                      >
                        Enquire
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How to book */}
      <section className="bg-[#111010] text-white">
        <div className="container mx-auto px-4 py-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold" style={{ color: GOLD }}>
            How to book
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ['Choose your tour and date', 'Pick any 2027 departure from May onward listed above.'],
              [
                'Book by 4 December 2026',
                `Pay a ${nzd(BF_DEPOSIT_PER_PERSON_NZD)} deposit per person within 3 working days to secure your seats.`,
              ],
              ['Your saving comes off the final payment', 'We apply the offer that saves you more — one per booking.'],
            ].map(([title, body], i) => (
              <li key={title} className="rounded-2xl border border-white/15 p-6">
                <p className="text-4xl font-black" style={{ color: RED }}>
                  {i + 1}
                </p>
                <p className="mt-2 text-lg font-bold">{title}</p>
                <p className="mt-1 text-gray-300">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-gray-300">
            Full rules, eligible departures and worked examples:{' '}
            <Link href={`${PATH}/terms`} className="font-bold underline underline-offset-4" style={{ color: GOLD }}>
              Black Friday offer terms
            </Link>
          </p>
        </div>
      </section>

      <TrustBar />
      <TourTrustSignals />

      {/* Enquiry */}
      <section id="enquiry" className="bg-[#FBF7F0] scroll-mt-24">
        <div className="container mx-auto px-4 py-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Ask us about the Black Friday sale</h2>
            <p className="mt-3 text-gray-700">
              Tell us which tour and who is travelling, and our Auckland team will confirm your saving and dates. Prefer
              to talk? Call{' '}
              <a href={CTS_PHONE_HREF} className="font-bold underline" style={{ color: RED }}>
                {CTS_PHONE_DISPLAY}
              </a>
              .
            </p>
            <div className="mt-8">
              <Testimonials variant="compact" maxItems={2} />
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <BlackFridayEnquiry
              tours={tours.map(({ tour }) => ({
                name: tour.name,
                slug: tour.slug,
                destination: tour.destination,
                tier: tour.tier,
              }))}
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-4 pt-12 text-center">
          <Link href={`${PATH}/terms`} className="font-bold underline underline-offset-4" style={{ color: RED }}>
            Read the full Black Friday offer terms →
          </Link>
        </div>
      </section>

      <FAQSection faqs={FAQS} />
      <FacebookFollowStrip />
    </>
  );
}
