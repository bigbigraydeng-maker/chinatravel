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
  /** e.g. "NZD $968" — shown when a traveller has a room to themselves. */
  singleSupplement?: string;
  singleSupplementNote?: string;
}

export type PassportStatus = 'ok' | 'short' | 'expired' | 'unknown';

export const MIN_PASSPORT_VALIDITY_MONTHS = 6;

export const EARLIEST_BIRTH_DATE = '1900-01-01';
/** Passports last 10 years at most; allow a little slack for typos-versus-real check. */
export const MAX_PASSPORT_YEARS_AHEAD = 11;

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

/** yyyy-mm-dd for a Date, in UTC. */
export function toIsoDate(date: Date): string {
  const year = String(date.getUTCFullYear()).padStart(4, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Why a date of birth cannot be right, or null when it is fine. Empty input returns null (the "required" check is separate). */
export function dobProblem(value: string, today: Date): string | null {
  if (!value.trim()) return null;
  const date = parseIsoDate(value);
  if (!date) return 'Please enter a real date of birth, e.g. 08/07/1960.';
  const todayUtc = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  if (date.getTime() > todayUtc.getTime()) return 'Date of birth cannot be in the future.';
  const earliest = parseIsoDate(EARLIEST_BIRTH_DATE);
  if (earliest && date.getTime() < earliest.getTime()) return 'Please check the year of birth.';
  return null;
}

/** Why a passport expiry date cannot be right, or null. Empty returns null. Past dates are fine here (the passport self-check reports them). */
export function passportExpiryProblem(value: string, today: Date): string | null {
  if (!value.trim()) return null;
  const date = parseIsoDate(value);
  if (!date) return 'Please enter a real expiry date.';
  if (date.getUTCFullYear() < 1990) return 'Please check the year of the expiry date.';
  const latest = new Date(Date.UTC(today.getUTCFullYear() + MAX_PASSPORT_YEARS_AHEAD, today.getUTCMonth(), today.getUTCDate()));
  if (date.getTime() > latest.getTime()) {
    return 'Please check the year — a passport is valid for 10 years at most.';
  }
  return null;
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
