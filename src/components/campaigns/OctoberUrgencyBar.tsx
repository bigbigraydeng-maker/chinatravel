import { getRemainingSeats } from '@/lib/campaigns/seat-availability';
import DaysCountdown from './DaysCountdown';

/**
 * OctoberUrgencyBar — soft scarcity strip rendered just below TourHero on
 * October 2026 / November 2026 campaign LPs.
 *
 * Shows two urgency cues:
 *   1. Countdown to departure — rendered by <DaysCountdown> (client component)
 *      so the value is always current, even on statically-prerendered pages.
 *   2. "Only X seats remaining" (deterministic via getRemainingSeats, SSR-safe).
 */

interface OctoberUrgencyBarProps {
  /** ISO date string of the departure, e.g. '2026-10-14'. */
  departureSortDate: string;
  /** Tour slug used to derive a stable seat count (5–10). */
  tourSlug: string;
}

export default function OctoberUrgencyBar({
  departureSortDate,
  tourSlug,
}: OctoberUrgencyBarProps) {
  const seats = getRemainingSeats(tourSlug);

  const cards = [
    {
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      label: 'Days to departure',
      value: <DaysCountdown departureSortDate={departureSortDate} />,
      subline: 'until your group flies from Auckland',
    },
    {
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      label: 'Seats remaining',
      value: `${seats}`,
      subline: 'group capped at 16–20 travellers',
    },
  ];

  return (
    <section
      aria-label="Departure urgency"
      className="bg-gradient-to-r from-primary/10 via-orange-50 to-primary/10 border-y border-orange-200/80"
    >
      <div className="container mx-auto px-4 py-5 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 max-w-3xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-4 rounded-xl bg-white/70 backdrop-blur-sm border border-orange-200/60 px-4 py-3 md:py-4 shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-500 text-white flex-shrink-0">
                {card.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-primary">
                  {card.label}
                </p>
                <p className="text-xl md:text-2xl font-serif font-bold text-accent leading-tight truncate">
                  {card.value}
                </p>
                <p className="text-xs text-gray-600 leading-snug">{card.subline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
