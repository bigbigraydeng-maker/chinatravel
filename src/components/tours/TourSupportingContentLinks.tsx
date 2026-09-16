import Link from 'next/link';
import Image from 'next/image';
import { getTourGuideCards } from '@/lib/tour-guide-cards';
import type { Tour } from '@/lib/data/tours';
import { getTourSupportingLinks } from '@/lib/tour-supporting-links';

interface TourSupportingContentLinksProps {
  tour: Tour;
  wide?: boolean;
}

/**
 * Internal links to guides and hub pages relevant to this itinerary (SEO + UX).
 * Anchor: #planning-resources
 */
export default function TourSupportingContentLinks({ tour, wide = false }: TourSupportingContentLinksProps) {
  const cards = getTourGuideCards(tour);
  const links = getTourSupportingLinks(tour).filter(link => !cards.some(card => card.href === link.href));
  if (links.length === 0 && cards.length === 0) return null;

  return (
    <section id="planning-resources" className="scroll-mt-24 rounded-2xl border border-warm-200 bg-warm-50/80 p-6 md:p-8">
      {cards.length > 0 && <>
        <p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">Discover your destinations</p>
        <h2 className="mt-3 font-serif text-3xl text-ink">Explore the places on your journey.</h2>
        <p className="mt-4 text-ink-muted">Get to know the cities and landmarks along this route, with our guides to what to see and how to visit.</p>
        <div className={`mt-8 grid gap-5 sm:grid-cols-2 ${wide ? 'lg:grid-cols-3' : ''}`}>
          {cards.map(card => <Link key={card.href} href={card.href} className="overflow-hidden rounded-2xl border border-warm-200 bg-white transition-shadow hover:shadow-md focus-visible:outline-primary">
            <div className="relative aspect-[16/10]"><Image src={card.image} alt={card.title} fill unoptimized={card.image.startsWith('/')} sizes={wide ? '(max-width:640px) 100vw, 33vw' : '(max-width:640px) 100vw, 40vw'} className="object-cover" /></div>
            <div className="p-5"><p className="text-xs uppercase tracking-widest text-primary">{card.category}</p><h3 className="mt-3 font-serif text-xl text-ink">{card.title}</h3><p className="mt-4 text-sm font-semibold text-primary">Explore the guide →</p></div>
          </Link>)}
        </div>
      </>}
      <h2 className="mt-8 font-serif text-2xl text-ink">Plan your trip</h2>
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
