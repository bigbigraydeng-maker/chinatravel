import Link from 'next/link';
import { getPublishedTours } from '@/lib/data/published-tour-catalog';

/**
 * Mid-page CTAs on the NZ visa guide: links to the two 10-day Discovery tour pages, with their next departures.
 * Anchor: #october-discovery-cta (the id is kept: the marketing board links to it).
 */
export default async function VisaGuideOctoberCampaignCtas() {
  const tours = await getPublishedTours();
  const taleTour = tours.find((tour) => tour.destination === 'china' && tour.tier === 'discovery' && tour.slug === 'beijing-xian');
  const shanghaiTour = tours.find((tour) => tour.destination === 'china' && tour.tier === 'discovery' && tour.slug === 'shanghai-surroundings');
  if (!taleTour?.isActive || taleTour.soldOut || !shanghaiTour?.isActive || shanghaiTour.soldOut) return null;

  // Every published departure (they include the year); a departure that has left is already dropped from the tour data.
  const taleDates = taleTour.departureDates?.join(' & ');
  const shanghaiDates = shanghaiTour.departureDates?.join(' & ');
  const departsLabel = (dates?: string) => (dates ? `Departs · ${dates}` : 'Ask us for the next departure');

  const cards = [
    {
      href: `/tours/${taleTour.destination}/${taleTour.tier}/${taleTour.slug}`,
      title: taleTour.name,
      blurb: taleTour.highlights.slice(0, 3).join(' · ') || taleTour.shortDescription,
      departure: departsLabel(taleDates),
      price: taleTour.price,
    },
    {
      href: `/tours/${shanghaiTour.destination}/${shanghaiTour.tier}/${shanghaiTour.slug}`,
      title: shanghaiTour.name,
      blurb: shanghaiTour.highlights.slice(0, 3).join(' · ') || shanghaiTour.shortDescription,
      departure: departsLabel(shanghaiDates),
      price: shanghaiTour.price,
    },
  ] as const;

  return (
    <section
      id="october-discovery-cta"
      className="scroll-mt-24 rounded-2xl border border-warm-200 bg-gradient-to-br from-warm-50 to-white p-6 md:p-8 shadow-sm"
      aria-labelledby="october-discovery-cta-heading"
    >
      <h2
        id="october-discovery-cta-heading"
        className="font-serif text-2xl font-bold text-gray-900 md:text-3xl"
      >
        Group departures from Auckland
      </h2>
      <p className="mt-2 text-sm text-gray-600 md:text-base">
        NZ passport holders can enter China visa-free for tourism (see above). The current tour duration, departure, route and price in each card come from CTS&apos;s published catalogue.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="flex h-full flex-col rounded-xl border border-warm-200 bg-white p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                {c.departure}
              </span>
              <span className="mt-2 font-serif text-lg font-bold text-accent">{c.title}</span>
              <span className="mt-2 flex-1 text-sm text-gray-600">{c.blurb}</span>
              <span className="mt-4 text-primary font-bold">{c.price}</span>
              <span className="mt-3 text-sm font-semibold text-primary">View tour →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
