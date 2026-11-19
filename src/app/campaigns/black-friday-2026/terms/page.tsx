import { Metadata } from 'next';
import Link from 'next/link';
import SchemaMarkup from '@/components/SchemaMarkup';
import { generateBreadcrumbSchema } from '@/lib/schema-tour';
import { getSiteUrl, CTS_PHONE_DISPLAY, CTS_PHONE_HREF } from '@/lib/site';
import {
  BF_DEPOSIT_PER_PERSON_NZD,
  FAMILY_SAVING,
  FRIENDS_SAVING,
  bestSavingPerPerson,
} from '@/lib/campaigns/black-friday-2026';
import { loadBlackFridayTours } from '../_lib/load-tours';

/**
 * Black Friday 2026 offer terms. States only rules CTS has agreed (see `@/lib/campaigns/black-friday-2026`);
 * anything not settled there is deliberately left to "ask us before booking" rather than invented here.
 * Eligible tours and departures come from the same loader as the landing page, so the two pages cannot disagree.
 */
export const revalidate = 3600;

const LP_PATH = '/campaigns/black-friday-2026';
const PATH = `${LP_PATH}/terms`;
const RED = '#B61E2E';

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const title = 'Black Friday 2026 Offer Terms | CTS Tours';
  const description =
    'Full terms of the CTS Tours Black Friday 2026 offer on 2027 China tours: booking dates, eligible tours and departures, how the friends and family savings work, and examples.';
  return {
    title,
    description,
    openGraph: { title, description, type: 'website', url: `${siteUrl}${PATH}` },
    alternates: { canonical: `${siteUrl}${PATH}` },
  };
}

const nzd = (n: number) => `NZ$${n.toLocaleString('en-NZ')}`;

function Section({ id, n, title, children }: { id: string; n: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-serif font-bold text-gray-900">
        <span style={{ color: RED }}>{n}.</span> {title}
      </h2>
      <div className="mt-4 space-y-3 text-gray-800 leading-relaxed">{children}</div>
    </section>
  );
}

const EXAMPLES: Array<{ who: string; tier: 'signature' | 'discovery'; people: number; family: boolean }> = [
  { who: 'One person on a Signature tour', tier: 'signature', people: 1, family: false },
  { who: 'A couple on a Signature tour', tier: 'signature', people: 2, family: false },
  { who: 'A family of three on a Signature tour', tier: 'signature', people: 3, family: true },
  { who: 'Three friends on a Signature tour', tier: 'signature', people: 3, family: false },
  { who: 'Four friends on a Signature tour', tier: 'signature', people: 4, family: false },
  { who: 'A couple on a Discovery tour', tier: 'discovery', people: 2, family: false },
  { who: 'Two friends on a Discovery tour', tier: 'discovery', people: 2, family: false },
  { who: 'Four friends on a Discovery tour', tier: 'discovery', people: 4, family: false },
];

export default async function BlackFridayTermsPage() {
  const tours = await loadBlackFridayTours();
  const siteUrl = getSiteUrl();

  return (
    <>
      <SchemaMarkup
        data={[
          generateBreadcrumbSchema(
            [
              { name: 'Home', url: '/' },
              { name: 'Black Friday Sale', url: LP_PATH },
              { name: 'Offer terms', url: PATH },
            ],
            siteUrl
          ),
        ]}
      />

      <section className="bg-[#FFF4DE]">
        <div className="container mx-auto px-4 py-12">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em]" style={{ color: RED }}>
            CTS Tours · Black Friday 2026
          </p>
          <h1 className="mt-3 font-serif text-4xl md:text-5xl font-bold text-gray-900">Black Friday offer terms</h1>
          <p className="mt-4 max-w-3xl text-gray-700">
            The full rules of our Black Friday offer on 2027 China tours, in plain English. If anything here is unclear for
            your booking, please ask us before you book — call{' '}
            <a href={CTS_PHONE_HREF} className="font-bold underline">
              {CTS_PHONE_DISPLAY}
            </a>
            .
          </p>
          <Link href={LP_PATH} className="mt-6 inline-block font-bold underline underline-offset-4" style={{ color: RED }}>
            ← Back to the Black Friday sale
          </Link>
        </div>
      </section>

      <div className="bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-12 space-y-10">
          <Section id="dates" n={1} title="When to book">
            <p>
              The offer applies to bookings made between <strong>17 November 2026 and 4 December 2026</strong> (New Zealand
              time), with the deposit of <strong>{nzd(BF_DEPOSIT_PER_PERSON_NZD)} per person</strong> paid within 3 working
              days of booking.
            </p>
            <p>Early-bird prices on the tours below are held until 4 December 2026. From 5 December 2026, tour prices return to standard.</p>
          </Section>

          <Section id="tours" n={2} title="Which tours and departures">
            <p>The offer applies to these 2027 departures only:</p>
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2 pr-4 font-semibold">Tour</th>
                  <th className="py-2 pr-4 font-semibold">Series</th>
                  <th className="py-2 font-semibold">Departures in the offer</th>
                </tr>
              </thead>
              <tbody>
                {tours.map(({ tour, tier, departures }) => (
                  <tr key={tour.slug} className="border-b border-gray-100 align-top">
                    <td className="py-2 pr-4 font-semibold text-gray-900">
                      <Link href={`/tours/${tour.destination}/${tour.tier}/${tour.slug}`} className="underline underline-offset-2">
                        {tour.name}
                      </Link>
                    </td>
                    <td className="py-2 pr-4">{tier === 'signature' ? 'Signature' : 'Discovery'}</td>
                    <td className="py-2">{departures.join(' · ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              Not included: Best of China and Shanghai &amp; Surroundings (no departures of either tour), and any tour or departure not listed above.
            </p>
          </Section>

          <Section id="offers" n={3} title="The two offers">
            <p>
              <strong>Travel with your Bestie or Mate.</strong> Everyone on the same booking gets the same saving per person,
              and it grows with the number of people on the booking:
            </p>
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2 font-semibold">People on the booking</th>
                  <th className="py-2 font-semibold">Signature (per person)</th>
                  <th className="py-2 font-semibold">Discovery (per person)</th>
                </tr>
              </thead>
              <tbody>
                {['1', '2', '3', '4 or more'].map((label, i) => (
                  <tr key={label} className="border-b border-gray-100">
                    <td className="py-2">{label}</td>
                    <td className="py-2 font-semibold">{nzd(FRIENDS_SAVING.signature[i])}</td>
                    <td className="py-2 font-semibold">{nzd(FRIENDS_SAVING.discovery[i])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              <strong>Family Travel.</strong> When a family books together, each traveller saves{' '}
              <strong>{nzd(FAMILY_SAVING.signature)}</strong> on a Signature tour or{' '}
              <strong>{nzd(FAMILY_SAVING.discovery)}</strong> on a Discovery tour. A couple travelling together is not a
              family booking: it saves the same as two friends ({nzd(FRIENDS_SAVING.signature[1] * 2)} in total on a Signature tour, {nzd(FRIENDS_SAVING.discovery[1] * 2)} on a Discovery tour). If you are not sure whether your group counts as family, please ask us before you book.
            </p>
          </Section>

          <Section id="one-offer" n={4} title="One offer per booking">
            <p>
              The two offers cannot be combined. We apply whichever one gives your booking the larger saving. For example,
              a family of three on a Signature tour receives the family saving of {nzd(FAMILY_SAVING.signature)} each, not the
              three-person friends saving of {nzd(FRIENDS_SAVING.signature[2])} each.
            </p>
            <p>“Save NZ$600” is the total for a couple on a Signature tour ({nzd(FRIENDS_SAVING.signature[1])} × 2).</p>
            <p>“Save up to NZ$2,000” is the total for four friends on one Signature booking ({nzd(FRIENDS_SAVING.signature[3])} × 4).</p>
          </Section>

          <Section id="examples" n={5} title="Examples">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2 pr-4 font-semibold">Booking</th>
                  <th className="py-2 pr-4 font-semibold">Saving per person</th>
                  <th className="py-2 font-semibold">Total saving</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLES.map((e) => {
                  const each = bestSavingPerPerson(e.tier, e.people, e.family);
                  return (
                    <tr key={e.who} className="border-b border-gray-100">
                      <td className="py-2 pr-4">{e.who}</td>
                      <td className="py-2 pr-4 font-semibold">{nzd(each)}</td>
                      <td className="py-2 font-semibold">{nzd(each * e.people)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Section>

          <Section id="payment" n={6} title="How the saving is applied">
            <p>
              Your saving is deducted from your final payment. The deposit of {nzd(BF_DEPOSIT_PER_PERSON_NZD)} per person is
              non-refundable, as on all CTS bookings.
            </p>
            <p>
              All other conditions — including payment dates, changes and cancellations — follow our{' '}
              <Link href="/terms-and-conditions" className="font-semibold underline underline-offset-2">
                Terms &amp; Conditions of Booking
              </Link>
              .
            </p>
          </Section>

          <div className="rounded-2xl bg-[#FBF7F0] p-6">
            <p className="font-semibold text-gray-900">Questions about your booking?</p>
            <p className="mt-1 text-gray-700">
              Call{' '}
              <a href={CTS_PHONE_HREF} className="font-bold underline" style={{ color: RED }}>
                {CTS_PHONE_DISPLAY}
              </a>{' '}
              or{' '}
              <Link href={`${LP_PATH}#enquiry`} className="font-bold underline" style={{ color: RED }}>
                send us an enquiry
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
