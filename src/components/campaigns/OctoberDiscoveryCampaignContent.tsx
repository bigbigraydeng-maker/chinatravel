import Link from 'next/link';
import type { Tour } from '@/lib/data/tours';
import type { October2026DiscoverySlug } from '@/lib/campaigns/october-2026-discovery';

type Props = {
  tour: Tour;
  campaignSlug: October2026DiscoverySlug;
  otherCampaignSlug: October2026DiscoverySlug;
  otherTourTitle: string;
};

export default function OctoberDiscoveryCampaignContent({
  tour,
  campaignSlug,
  otherCampaignSlug,
  otherTourTitle,
}: Props) {
  const mainTourHref = `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
  const otherCampaignHref = `/campaigns/october-2026/${otherCampaignSlug}`;

  if (campaignSlug === 'shanghai-surroundings') {
    return (
      <div className="space-y-14">
        <section className="rounded-2xl border border-warm-200 bg-warm-50/40 p-6 md:p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Why this departure</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This Discovery tour is built around the <strong>Yangtze Delta</strong> — moving from{' '}
            <strong>Shanghai</strong> to <strong>Suzhou</strong>, <strong>Wuxi</strong>,{' '}
            <strong>Xinshi Ancient Town</strong>, <strong>Hangzhou</strong>, then back to{' '}
            <strong>Shanghai</strong> before your return to Auckland. It is the same published itinerary
            as our main tour page, with this page spotlighting the <strong>14 October</strong> group
            departure (year as per your booking confirmation).
          </p>
          <p className="text-gray-700 leading-relaxed">
            You fly <strong>Auckland — Shanghai</strong>; land transport between cities is included as
            specified — for example about <strong>1.5 hours</strong> Shanghai–Suzhou, about{' '}
            <strong>1 hour</strong> Suzhou–Wuxi, about <strong>1.5 hours</strong> Wuxi–Xinshi, and about{' '}
            <strong>2 hours</strong> Hangzhou–Shanghai on the published day-by-day plan.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Tour highlights</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
            {tour.highlights.map((h, i) => (
              <li key={`${i}-${h.slice(0, 24)}`}>{h}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mt-4">
            Optional extras such as the <strong>Shanghai Acrobatics Show</strong> and{' '}
            <strong>Maglev</strong> ride are <strong>not included</strong> in the tour price (see
            inclusions on this page).
          </p>
        </section>

        <section className="rounded-2xl border border-warm-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Inclusions &amp; the fine print</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Included:</strong> international and domestic airfares; hotel accommodation as specified;
            English-speaking tour guide; entrance fees and meals as specified in the itinerary; land
            transfer.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Not included:</strong> Travel insurance (strongly recommended); personal expenses;
            transport and guide during free time; meals not listed; tips (suggested NZD $10 per day per
            person); optional activities; anything not specifically mentioned as included — exactly as
            listed on the main tour page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Compare with our other October spotlight
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If your priority is <strong>imperial Beijing</strong>, the <strong>Great Wall</strong>, and{' '}
            <strong>Xi&apos;an</strong> including the <strong>Terracotta Warriors</strong> linked by{' '}
            <strong>high-speed train</strong>, see{' '}
            <Link href={otherCampaignHref} className="text-primary font-semibold hover:underline">
              {otherTourTitle}
            </Link>{' '}
            (featured <strong>15 October</strong> departure).
          </p>
          <p className="text-gray-700 leading-relaxed">
            This Shanghai &amp; Surroundings route does <strong>not</strong> include Beijing or Xi&apos;an —
            it is a <strong>single-region Delta + Shanghai</strong> journey at <strong>{tour.price}</strong>{' '}
            for {tour.duration.toLowerCase()}.
          </p>
        </section>

        <p className="text-sm text-gray-500">
          Full legal wording and any updates always follow the{' '}
          <Link href={mainTourHref} className="text-primary hover:underline">
            official tour page
          </Link>
          .
        </p>
      </div>
    );
  }

  // tale-of-two-cities — itinerary is Beijing + Xi'an (URL slug is beijing-shanghai)
  return (
    <div className="space-y-14">
      <section className="rounded-2xl border border-amber-200 bg-amber-50/30 p-6 md:p-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Which two cities?</h2>
        <p className="text-gray-800 leading-relaxed mb-4">
          On this tour, <strong>&ldquo;A Tale of Two Cities&rdquo;</strong> means{' '}
          <strong>Beijing</strong> and <strong>Xi&apos;an</strong> — not Shanghai. You start with{' '}
          <strong>Auckland — Beijing</strong>, explore Beijing including the <strong>Temple of Heaven</strong>,{' '}
          <strong>Tiananmen Square</strong>, <strong>Forbidden City</strong>, <strong>Great Wall</strong>,{' '}
          Olympic park photo stops, and a <strong>hutong pedi-cab tour with a family visit</strong>; then you
          board a <strong>high-speed train</strong> to Xi&apos;an (published example:{' '}
          <strong>G89</strong>, afternoon departure, second-class or similar).
        </p>
        <p className="text-gray-800 leading-relaxed">
          In Xi&apos;an you visit the <strong>Terracotta Warriors</strong> (including Circle Vision and Bronze
          Chariot where specified), the <strong>ancient City Wall</strong>, <strong>Big Wild Goose Pagoda</strong>,{' '}
          the <strong>Small Wild Goose Pagoda Museum</strong>, and <strong>Huimin Street</strong> — matching the
          published day-by-day itinerary — before flying back via Beijing to Auckland.
        </p>
      </section>

      <section>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Tour highlights</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
          {tour.highlights.map((h, i) => (
            <li key={`${i}-${h.slice(0, 24)}`}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-warm-200 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Inclusions &amp; exclusions</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          <strong>Included:</strong> international and domestic airfares; 4-star hotel accommodation throughout;
          English-speaking tour guide; entrance fees as specified; meals as specified; land transfers.
        </p>
        <p className="text-gray-700 leading-relaxed">
          <strong>Not included:</strong> Travel insurance (strongly recommended); personal expenses;
          transport and guide during free time; meals not listed; tips (suggested NZD $10 per day per
          person); anything not specifically mentioned as included.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
          Compare with Shanghai &amp; Surroundings (14 Oct)
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Want <strong>Jiangnan gardens</strong>, <strong>West Lake</strong>, and <strong>Shanghai</strong>{' '}
          instead of Beijing and Xi&apos;an? See{' '}
          <Link href={otherCampaignHref} className="text-primary font-semibold hover:underline">
            {otherTourTitle}
          </Link>{' '}
          — <strong>10 days from NZD $2,999</strong> per person on the published page.
        </p>
        <p className="text-gray-700 leading-relaxed">
          This Beijing &amp; Xi&apos;an route is priced <strong>{tour.price}</strong> for {tour.duration.toLowerCase()}{' '}
          on the published page.
        </p>
      </section>

      <p className="text-sm text-gray-500">
        Authoritative itinerary and gallery:{' '}
        <Link href={mainTourHref} className="text-primary hover:underline">
          main tour page
        </Link>
        .
      </p>
    </div>
  );
}
