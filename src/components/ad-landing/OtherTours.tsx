import Image from 'next/image';
import Link from 'next/link';
import type { Tour } from '@/lib/data/tours';
import type { AccentId } from '@/lib/ad-landing/types';
import SectionHeading from './SectionHeading';

/** Where a tour's own page lives. */
function tourHref(tour: Tour): string {
  return `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
}

/**
 * Cards for the other tours on sale, each linking to its own page. Name, length and price are read from the tour
 * data as published. A visitor who is not sold on this tour has somewhere to go that is not the back button.
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
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {tours.map((tour) => (
          <li key={`${tour.tier}/${tour.slug}`}>
            <Link
              href={tourHref(tour)}
              className="group flex h-full overflow-hidden rounded-2xl border border-warm-200 bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative w-28 shrink-0 sm:w-36">
                <Image
                  src={tour.heroImage}
                  alt=""
                  fill
                  sizes="9rem"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center gap-1 p-4">
                <p className="font-serif text-lg leading-snug text-gray-900">{tour.name.replace(/^China \w+ — /, '')}</p>
                <p className="text-sm text-gray-600">{tour.duration}</p>
                <p className="text-base font-semibold text-primary">{tour.price}</p>
                <span className="text-sm font-semibold text-gray-900 underline decoration-primary underline-offset-4">
                  See this tour
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        <Link href="/china-tours" className="text-base font-semibold text-gray-900 underline decoration-primary underline-offset-4">
          See all China tours
        </Link>
      </p>
    </section>
  );
}
