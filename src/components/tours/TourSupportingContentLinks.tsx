import Link from 'next/link';
import type { Tour } from '@/lib/data/tours';
import { getTourSupportingLinks, type SupportingContentLink } from '@/lib/tour-supporting-links';

interface TourSupportingContentLinksProps {
  tour: Tour;
}

/**
 * Internal links to tours + guides relevant to this itinerary (SEO + UX).
 * Anchor: #planning-resources
 *
 * P1 #4 visual refactor — labels are bucketed into two groups so the chip
 * cloud has a clear primary/secondary visual hierarchy:
 *
 *   Related tours (chip = burgundy filled, white text)
 *     ↳ labels matching /\b(tours|spotlight|hub)\b/i
 *
 *   Travel guides (chip = warm-cream outlined, dark text)
 *     ↳ labels matching /\b(guide|blog)\b/i
 *
 *   Anything else falls into the "Related tours" bucket as a safe default
 *   (the upstream data is curated, so this is a belt-and-braces guard, not
 *   a regular path).
 */
type Bucketed = { tours: SupportingContentLink[]; guides: SupportingContentLink[] };

function bucketLinks(links: SupportingContentLink[]): Bucketed {
  const tours: SupportingContentLink[] = [];
  const guides: SupportingContentLink[] = [];
  for (const link of links) {
    // Order matters: a label like "Beijing travel guide" must hit `guide`
    // first, even though "tours" appears nowhere — checked anyway for safety.
    if (/\b(guide|blog)\b/i.test(link.label)) {
      guides.push(link);
    } else {
      tours.push(link);
    }
  }
  return { tours, guides };
}

export default function TourSupportingContentLinks({ tour }: TourSupportingContentLinksProps) {
  const links = getTourSupportingLinks(tour);
  if (links.length === 0) return null;

  const { tours, guides } = bucketLinks(links);

  return (
    <section
      id="planning-resources"
      className="scroll-mt-24 rounded-2xl border border-warm-200 bg-warm-50/80 p-6 md:p-8"
    >
      <h2 className="font-serif text-2xl font-bold text-gray-900">Plan your trip</h2>
      <p className="mt-2 text-sm text-gray-600 md:text-base">
        Related tours plus the guides our team uses for visa timing, seasons, and the places on this route.
      </p>

      {tours.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
            Related tours
          </h3>
          <ul className="flex flex-wrap gap-2">
            {tours.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span>{item.label}</span>
                  <span className="opacity-70 group-hover:translate-x-0.5 transition-transform" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {guides.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Travel guides
          </h3>
          <ul className="flex flex-wrap gap-2">
            {guides.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-warm-300 bg-white px-4 py-2 text-sm font-medium text-accent transition-all hover:border-primary/40 hover:text-primary"
                >
                  <span>{item.label}</span>
                  <span className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" aria-hidden>
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
