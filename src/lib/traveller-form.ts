export interface TourOption {
  /** destination/tier/slug — slugs alone repeat across destinations (e.g. "highlights"). */
  key: string;
  /** Short list the guest picks first, e.g. "China Discovery". */
  group: string;
  /** Name shown in the second list, without the group prefix. */
  shortName: string;
  name: string;
  /** Upcoming departures, formatted like the tour data, e.g. "13 May 2027". */
  dates: string[];
}

export type PassportStatus = 'ok' | 'short' | 'expired' | 'unknown';

export const MIN_PASSPORT_VALIDITY_MONTHS = 6;

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/** Parses "13 May 2027" (as used in tours.ts) into a UTC date; null if the format is different. */
export function parseDepartureDate(value: string): Date | null {
  const match = value.trim().match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTHS.indexOf(match[2].toLowerCase());
  if (month < 0) return null;
  const date = new Date(Date.UTC(Number(match[3]), month, Number(match[1])));
  return date.getUTCDate() === Number(match[1]) ? date : null;
}

/** Parses an <input type="date"> value (YYYY-MM-DD) into a UTC date. */
export function parseIsoDate(value: string): Date | null {
  const match = value.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.getUTCMonth() === Number(match[2]) - 1 ? date : null;
}

function addMonthsUtc(date: Date, months: number): Date {
  const result = new Date(date.getTime());
  const day = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);
  const lastDay = new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate();
  result.setUTCDate(Math.min(day, lastDay));
  return result;
}

/**
 * Self-check for a passport expiry date against the travel date.
 * With no known departure, the check runs against today so the traveller still gets a useful hint.
 */
export function passportStatus(expiry: string, departure: Date | null, today: Date): PassportStatus {
  const expiryDate = parseIsoDate(expiry);
  if (!expiryDate) return 'unknown';
  const travelDate = departure ?? today;
  if (expiryDate.getTime() < travelDate.getTime()) return 'expired';
  const recommended = addMonthsUtc(travelDate, MIN_PASSPORT_VALIDITY_MONTHS);
  return expiryDate.getTime() >= recommended.getTime() ? 'ok' : 'short';
}

/** Only departures that have not happened yet are offered to travellers. */
export function upcomingDates(dates: string[] | undefined, today: Date): string[] {
  return (dates ?? []).filter((value) => {
    const parsed = parseDepartureDate(value);
    return parsed !== null && parsed.getTime() >= today.getTime();
  });
}
