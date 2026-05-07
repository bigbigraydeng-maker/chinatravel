'use client';

import { useEffect, useState } from 'react';

interface DaysCountdownProps {
  departureSortDate: string;
}

function computeDays(departureSortDate: string): number {
  const departure = new Date(departureSortDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.max(0, Math.ceil((departure.getTime() - Date.now()) / msPerDay));
}

/**
 * Client component that shows a live "days to departure" countdown.
 * Recomputes every minute so the value is always accurate regardless of
 * when the static page was last built.
 */
export default function DaysCountdown({ departureSortDate }: DaysCountdownProps) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    // Compute immediately on mount (avoids SSR/hydration mismatch by starting null)
    setDays(computeDays(departureSortDate));

    // Refresh every minute in case the page stays open overnight
    const timer = setInterval(() => {
      setDays(computeDays(departureSortDate));
    }, 60_000);

    return () => clearInterval(timer);
  }, [departureSortDate]);

  // Render a stable placeholder until the client has hydrated
  if (days === null) {
    return <span className="inline-block w-8 h-6 bg-gray-200 rounded animate-pulse" aria-hidden />;
  }

  return <>{days > 0 ? `${days}` : 'Departing soon'}</>;
}
