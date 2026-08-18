/**
 * Departure/return date helpers for tour pages.
 *
 * `Tour.departureDates` stores scheduled departures as free-text strings
 * (e.g. "13 May 2027"). Each tour's `duration` (e.g. "10 Days") differs, so
 * the return date for a given departure must be computed per-tour rather
 * than assumed — a 10-day tour and an 18-day tour departing on the same
 * date return on different days.
 */

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/** Parses a "D Month YYYY" string (e.g. "13 May 2027") into a UTC date, or null if unparseable. */
export function parseDepartureDate(raw: string): Date | null {
  const match = raw.trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return null;

  const day = Number(match[1]);
  const monthIndex = MONTHS.indexOf(match[2].toLowerCase());
  const year = Number(match[3]);
  if (monthIndex === -1) return null;

  const date = new Date(Date.UTC(year, monthIndex, day));
  // Reject overflowed dates, e.g. "31 April" rolling into May.
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== monthIndex || date.getUTCDate() !== day) {
    return null;
  }
  return date;
}

/** Formats a UTC date back to the "D Month YYYY" convention used across tours.ts. */
export function formatScheduleDate(date: Date): string {
  const day = date.getUTCDate();
  const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

/** Extracts the day count from a duration string like "10 Days", or null if unparseable. */
export function parseDurationDays(duration: string): number | null {
  const match = duration.match(/(\d+)\s*Day/i);
  if (!match) return null;
  const days = Number(match[1]);
  return Number.isFinite(days) && days > 0 ? days : null;
}

/**
 * Computes the return date for a departure, given the tour's duration.
 * Day 1 of the itinerary is the departure day, so the return date is
 * `departureDate + (days - 1)`. Returns null when either input can't be
 * parsed, rather than guessing.
 */
export function computeReturnDate(departureDate: string, duration: string): string | null {
  const start = parseDepartureDate(departureDate);
  const days = parseDurationDays(duration);
  if (!start || !days) return null;

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + (days - 1));
  return formatScheduleDate(end);
}

export interface DepartureReturnPair {
  departure: string;
  /** Null when the departure date or duration couldn't be parsed. */
  returnDate: string | null;
}

/** Pairs each departure date in `departureDates` with its computed return date for this tour's duration. */
export function getDepartureReturnPairs(departureDates: string[], duration: string): DepartureReturnPair[] {
  return departureDates.map((departure) => ({
    departure,
    returnDate: computeReturnDate(departure, duration),
  }));
}
