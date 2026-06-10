import DaysCountdown from './DaysCountdown';

/**
 * OctoberUrgencyBar — countdown strip rendered just below TourHero on
 * October 2026 / November 2026 campaign LPs. Shows days until departure;
 * the value is rendered by <DaysCountdown> (client component) so it stays
 * current even on statically-prerendered pages.
 */

interface OctoberUrgencyBarProps {
  /** ISO date string of the departure, e.g. '2026-10-14'. */
  departureSortDate: string;
}

export default function OctoberUrgencyBar({
  departureSortDate,
}: OctoberUrgencyBarProps) {
  return (
    <section
      aria-label="Departure countdown"
      className="bg-gradient-to-r from-primary/10 via-orange-50 to-primary/10 border-y border-orange-200/80"
    >
      <div className="container mx-auto px-4 py-5 md:py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 rounded-xl bg-white/70 backdrop-blur-sm border border-orange-200/60 px-4 py-3 md:py-4 shadow-sm">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-500 text-white flex-shrink-0">
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
            </div>
            <div className="min-w-0">
              <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-primary">
                Days to departure
              </p>
              <p className="text-xl md:text-2xl font-serif font-bold text-accent leading-tight truncate">
                <DaysCountdown departureSortDate={departureSortDate} />
              </p>
              <p className="text-xs text-gray-600 leading-snug">
                until your group flies from Auckland
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
