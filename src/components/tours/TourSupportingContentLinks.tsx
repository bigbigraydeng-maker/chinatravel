import Link from 'next/link';
import type { Tour } from '@/lib/data/tours';
import { getTourSupportingLinks } from '@/lib/tour-supporting-links';

interface TourSupportingContentLinksProps {
  tour: Tour;
}

/**
 * Internal links to guides and hub pages relevant to this itinerary (SEO + UX).
 * Anchor: #planning-resources
 */
export default function TourSupportingContentLinks({ tour }: TourSupportingContentLinksProps) {
  const links = getTourSupportingLinks(tour);
  if (links.length === 0) return null;

  return (
    <section id="planning-resources" className="scroll-mt-24 rounded-2xl border border-warm-200 bg-warm-50/80 p-6 md:p-8">
      <h2 className="font-serif text-2xl font-bold text-gray-900">Plan your trip</h2>
      <p className="mt-2 text-sm text-gray-600 md:text-base">
        Official guides and destination hubs to help you prepare—visa timing, seasons, and places on this route.
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-start gap-2 rounded-xl border border-transparent bg-white/80 px-4 py-3 text-sm font-medium text-accent shadow-sm transition hover:border-primary/30 hover:bg-white"
            >
              <span className="mt-0.5 text-primary" aria-hidden>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className="group-hover:text-primary">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
