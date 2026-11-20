import Image from 'next/image';
import Link from 'next/link';
import type { Tour } from '@/lib/data/tours';
import { getDepartureRows } from '@/components/tours/TourGoldenBlocks';
import type { AccentId } from '@/lib/ad-landing/types';
import SectionHeading from './SectionHeading';

const TIER_ORDER = ['discovery', 'signature'] as const;
const TIER_LABEL: Record<string, string> = {
  discovery: 'China Discovery',
  signature: 'China Signature',
};

/** Where a tour's own page lives. */
function tourHref(tour: Tour): string {
  return `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
}

/** "China Discovery — Best of China" -> "Best of China". */
function shortName(tour: Tour): string {
  return tour.name.replace(/^China \w+ — /, '');
}

function TourCard({ tour }: { tour: Tour }) {
  const next = getDepartureRows(tour)[0];
  return (
    <li>
      <Link
        href={tourHref(tour)}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
      >
        <div className="relative aspect-[3/2] w-full bg-warm-100">
          <Image src={tour.heroImage} alt="" fill sizes="(min-width: 640px) 22rem, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-1 p-5">
          <h3 className="font-serif text-2xl leading-tight text-gray-900">{shortName(tour)}</h3>
          <p className="text-base text-gray-700">{tour.duration}</p>
          <p className="mt-2 text-2xl font-bold text-primary">{tour.price}</p>
          {next ? <p className="text-sm text-gray-700">Next departure {next.label}</p> : null}
          <span className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-full border-2 border-primary px-6 text-base font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            See this tour
          </span>
        </div>
      </Link>
    </li>
  );
}

/**
 * The other tours on sale as large picture cards, grouped by tier, each linking to its own page. Name, length, price
 * and next departure are read from the tour data as published.
 */
export default function OtherTours({
  title,
  tours,
  accent,
}: {
  title: string;
  tours: Tour[];
  accent: AccentId;
}) {
  if (tours.length === 0) return null;

  return (
    <section id="other-tours" aria-labelledby="other-tours-heading" className="scroll-mt-24">
      <SectionHeading id="other-tours-heading" title={title} accent={accent} />
      {TIER_ORDER.map((tier) => {
        const group = tours.filter((tour) => tour.tier === tier);
        if (group.length === 0) return null;
        return (
          <div key={tier} className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800">{TIER_LABEL[tier]}</h3>
            <ul className="mt-4 grid gap-5 sm:grid-cols-2">
              {group.map((tour) => (
                <TourCard key={tour.slug} tour={tour} />
              ))}
            </ul>
          </div>
        );
      })}
      <p className="mt-8">
        <Link href="/china-tours" className="text-base font-semibold text-gray-900 underline decoration-primary underline-offset-4">
          See all China tours
        </Link>
      </p>
    </section>
  );
}
