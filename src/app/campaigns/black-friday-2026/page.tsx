import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
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
  isOfferOver,
  BF_AFTER_OFFER_REDIRECT,
} from '@/lib/campaigns/black-friday-2026';
import { loadBlackFridayTours } from './_lib/load-tours';
import BlackFridayEnquiry from './_components/BlackFridayEnquiry';
import RealTravellers from './_components/RealTravellers';

/**
 * Black Friday 2026 landing page — the destination for the Black Friday Facebook posts, ads and emails.
 * Offer amounts live in `@/lib/campaigns/black-friday-2026`; tour names, prices, durations and dates come from
 * the published tour catalogue so this page never disagrees with the tour pages.
 * Copy rules (CTS): concrete dates and listed prices only — no countdowns, "limited time", "last chance" or seat counts.
 */
// Rendered per request (tour data itself stays cached by the catalog fetch) so the 5 Dec redirect is a real
// server-side 307 with a Location header, not a pre-built page that redirects only once its JavaScript runs.
export const dynamic = 'force-dynamic';

const PATH = '/campaigns/black-friday-2026';
const RED = '#B61E2E';
const GOLD = '#D6A756';

/**
 * Hero background footage: a short muted loop of travellers enjoying the places on these tours.
 * Set this to the licensed clip once it is bought; until then the hero shows the first tour's photo.
 * A local preview can point at a watermarked comp with BF26_HERO_VIDEO_PREVIEW — never honoured in production,
 * so an unlicensed comp can never go live.
 */
const LICENSED_HERO_VIDEO: { src: string; poster: string } | null = null;

function heroVideo(): { src: string; poster: string } | null {
  const preview = process.env.NODE_ENV !== 'production' ? process.env.BF26_HERO_VIDEO_PREVIEW : undefined;
  if (preview) return { src: preview, poster: preview.replace(/watermarked\.mp4$/, 'poster.jpg') };
  return LICENSED_HERO_VIDEO;
}

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
      'All 2027 departures of China Panorama, Legacy of China, Silk Road, Natural China, Best of China, A Tale of Two Cities and China Unveiled, as listed on this page. The 11 March 2027 Best of China departure and Shanghai & Surroundings are not included.',
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
  // From 5 Dec 2026 (NZ time) the savings no longer apply: send visitors to the China tours hub instead of showing
  // a sale that has ended.
  const now = new Date();
  if (isOfferOver(now)) redirect(BF_AFTER_OFFER_REDIRECT);

  const tours = await loadBlackFridayTours();
  const open = isOfferOpen(now);
  const siteUrl = getSiteUrl();
  const video = heroVideo();

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

      {/* Sale strip — dates only, no countdown (CTS copy rule) */}
      <div className="text-white text-center text-sm font-semibold px-4 py-2" style={{ backgroundColor: RED }}>
        <span className="font-black uppercase tracking-wider">Black Friday Sale</span> · Book 17 Nov – 4 Dec 2026 ·
        Save up to NZ$2,000 on 2027 China tours
      </div>

      {/* Hero — bright footage card on a white page */}
      <section id="hero" className="bg-white">
        <div className="container mx-auto px-4 pt-6 md:pt-8">
          <div className="relative overflow-hidden rounded-3xl min-h-[460px] md:min-h-[540px]">
            {video ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={video.src}
                poster={video.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            ) : (
              tours[0] && (
                <Image src={tours[0].tour.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
              )
            )}
            {/* Soft shade only behind the words, so the footage stays bright */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/55 via-black/10 to-transparent" />

            <div className="relative flex min-h-[460px] md:min-h-[540px] flex-col justify-end p-6 md:p-12 text-white">
              <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-4 py-1 text-xs md:text-sm font-extrabold uppercase tracking-[0.18em]" style={{ color: RED }}>
                2027 China tours · Book by 4 Dec
              </p>
              <h1 className="mt-4 font-sans text-5xl md:text-7xl font-black leading-[0.95] tracking-tight drop-shadow">
                Black Friday <span style={{ color: GOLD }}>Sale</span>
              </h1>
              <p className="mt-3 text-2xl md:text-4xl font-extrabold drop-shadow [font-variant-numeric:lining-nums]">
                Travel together, save up to NZ$2,000
              </p>
              <p className="mt-3 max-w-xl text-base md:text-lg text-white/95 drop-shadow">
                Bring your bestie, your mates or the whole family — early-bird prices are held until 4 December.
              </p>
              {!open && (
                <p className="mt-4 max-w-xl rounded-lg bg-white/90 px-4 py-3 text-sm text-gray-900">
                  This offer is for bookings made 17 November – 4 December 2026. Please contact us for current prices.
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#tours"
                  className="rounded-full px-6 py-3 font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                  style={{ backgroundColor: RED }}
                >
                  See the tours
                </a>
                <a
                  href="#enquiry"
                  className="rounded-full bg-white px-6 py-3 font-bold text-gray-900 shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Enquire now
                </a>
              </div>
            </div>
          </div>

          {/* The three savings, set like a printed price list */}
          <dl className="mx-auto mt-8 max-w-3xl border-y-2 border-gray-900 [font-variant-numeric:lining-nums]">
            {[
              { label: 'Couple Travel', note: '', amount: 'NZ$1,000', pre: 'save up to', post: 'per couple' },
              { label: 'Bestie or Mate', note: 'group of 4', amount: 'NZ$2,000', pre: 'save up to', post: '' },
              { label: 'Family Travel', note: '', amount: 'NZ$500', pre: 'save up to', post: 'per person' },
            ].map((r, i) => (
              <div
                key={r.label}
                className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 ${i < 2 ? 'border-b border-gray-200' : ''}`}
              >
                <dt className="text-lg md:text-xl font-semibold text-gray-900">
                  {r.label}
                  {r.note && <span className="ml-2 text-sm font-normal text-gray-500">({r.note})</span>}
                </dt>
                <dd className="text-lg md:text-xl text-gray-900">
                  {r.pre}{' '}
                  <strong className="text-2xl md:text-3xl font-black" style={{ color: RED }}>
                    {r.amount}
                  </strong>
                  {r.post && <span className="ml-1 text-gray-600">{r.post}</span>}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-center text-sm text-gray-600">
            Questions? Call{' '}
            <a href={CTS_PHONE_HREF} className="font-bold underline underline-offset-2" style={{ color: RED }}>
              {CTS_PHONE_DISPLAY}
            </a>{' '}
            — our Auckland team is happy to help.
          </p>
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
            <div className="min-w-0 rounded-2xl bg-white p-5 md:p-6 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-serif font-bold" style={{ color: RED }}>
                Travel with your Bestie or Mate
              </h3>
              <p className="mt-2 text-gray-700">The more of you on one booking, the more each of you saves.</p>
              <table className="mt-5 w-full text-left text-[13px] sm:text-sm md:text-base">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-2 pr-2 font-semibold">People</th>
                    <th className="py-2 pr-2 font-semibold">Signature (each)</th>
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

            <div className="min-w-0 rounded-2xl bg-white p-5 md:p-6 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-serif font-bold" style={{ color: RED }}>
                Couple &amp; Family Travel
              </h3>
              <p className="mt-2 text-gray-700">Book together as a family — couples count as family.</p>
              <div className="mt-5 grid grid-cols-2 gap-3 md:gap-4">
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
            2027 departures. Prices are per person, twin share, including return flights from Auckland.
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
      <section className="bg-[#FFF4DE]">
        <div className="container mx-auto px-4 py-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">How to book</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ['Choose your tour and date', 'Pick any 2027 departure listed above.'],
              [
                'Book by 4 December 2026',
                `Pay a ${nzd(BF_DEPOSIT_PER_PERSON_NZD)} deposit per person within 3 working days to secure your seats.`,
              ],
              ['Your saving comes off the final payment', 'We apply the offer that saves you more — one per booking.'],
            ].map(([title, body], i) => (
              <li key={title} className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="flex h-11 w-11 items-center justify-center rounded-full text-xl font-black text-white" style={{ backgroundColor: RED }}>
                  {i + 1}
                </p>
                <p className="mt-3 text-lg font-bold text-gray-900">{title}</p>
                <p className="mt-1 text-gray-700">{body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-gray-700">
            Full rules, eligible departures and worked examples:{' '}
            <Link href={`${PATH}/terms`} className="font-bold underline underline-offset-4" style={{ color: RED }}>
              Black Friday offer terms
            </Link>
          </p>
        </div>
      </section>

      <TrustBar />
      <TourTrustSignals />

      {/* Real travellers — CTS's own group photos plus verbatim Google reviews */}
      <section id="reviews" className="bg-white scroll-mt-24">
        <div className="container mx-auto px-4 py-14">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em]" style={{ color: RED }}>
            Real CTS travellers
          </p>
          <h2 className="mt-2 text-3xl md:text-4xl font-serif font-bold text-gray-900">Our groups, on tour in China</h2>
          <p className="mt-3 max-w-3xl text-gray-700">
            Photos from recent CTS groups — and what our travellers say about us on Google.
          </p>
          <div className="mt-8">
            <RealTravellers />
          </div>
          <div className="mt-10">
            <Testimonials variant="compact" maxItems={4} />
          </div>
        </div>
      </section>

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
