import Link from 'next/link';
import { getTourBySlug } from '@/lib/data/tours';
import { OCTOBER_2026_DISCOVERY_BY_SLUG } from '@/lib/campaigns/october-2026-discovery';

/**
 * Mid-page CTAs on the NZ visa guide: links to October 2026 Discovery campaign LPs.
 * Anchor: #october-discovery-cta
 */
export default function VisaGuideOctoberCampaignCtas() {
  const taleTour = getTourBySlug('china', 'discovery', 'beijing-xian');
  const shanghaiTour = getTourBySlug('china', 'discovery', 'shanghai-surroundings');
  if (!taleTour || !shanghaiTour) return null;

  const taleCfg = OCTOBER_2026_DISCOVERY_BY_SLUG['tale-of-two-cities'];
  const shCfg = OCTOBER_2026_DISCOVERY_BY_SLUG['shanghai-surroundings'];
  const taleDep = taleCfg.heroDepartureOrder[0] ?? '15 October';
  const shDep = shCfg.heroDepartureOrder[0] ?? '14 October';

  const cards = [
    {
      href: '/campaigns/october-2026/tale-of-two-cities',
      title: taleTour.name,
      blurb: 'Beijing & Xi’an by high-speed train — Great Wall, Forbidden City, Terracotta Warriors.',
      departure: taleDep,
      price: taleTour.price,
    },
    {
      href: '/campaigns/october-2026/shanghai-surroundings',
      title: shanghaiTour.name,
      blurb: 'Yangtze Delta Discovery — Shanghai, Suzhou, Hangzhou & water towns.',
      departure: shDep,
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
        October 2026 group departures
      </h2>
      <p className="mt-2 text-sm text-gray-600 md:text-base">
        NZ passport holders can enter China visa-free for tourism (see above). These 10-day China
        Discovery tours fit within a 30-day stay — featured October departures from Auckland.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <li key={c.href}>
            <Link
              href={c.href}
              className="flex h-full flex-col rounded-xl border border-warm-200 bg-white p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                Featured · {c.departure} 2026
              </span>
              <span className="mt-2 font-serif text-lg font-bold text-accent">{c.title}</span>
              <span className="mt-2 flex-1 text-sm text-gray-600">{c.blurb}</span>
              <span className="mt-4 text-primary font-bold">{c.price}</span>
              <span className="mt-3 text-sm font-semibold text-primary">View campaign page →</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
