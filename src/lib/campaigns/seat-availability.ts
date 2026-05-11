/**
 * "Remaining seats" urgency cue — range 10–15, date-aware.
 *
 * Rule: further departure = more seats available.
 *   ≥180 days out → 15  (plenty of time, plenty of space)
 *   ≤30  days out → 10  (imminent, nearly full)
 *   Linear interpolation in between.
 *
 * The number is a soft urgency cue only — NOT inventory truth.
 * Real availability is confirmed at booking.
 */

const MIN_SEATS = 10;
const MAX_SEATS = 15;
const NEAR_DAYS = 30;
const FAR_DAYS = 180;

/**
 * Parse a departure date string that may or may not include a year.
 * Handles:
 *   "2026-10-14"        (ISO)
 *   "14 October 2026"   (long-form with year)
 *   "14 October"        (long-form, assumes 2026)
 *   "25 August"         (short-form, assumes 2026)
 */
function parseDepartureDate(raw: string): Date | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  const withYear = /^\d{1,2}\s+[A-Za-z]+$/i.test(trimmed) ? `${trimmed} 2026` : trimmed;
  const d = new Date(withYear);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Return a seat count in [10, 15] based on how far away the departure is.
 * Further departure → higher number (more seats still available).
 *
 * @param departureDateStr  Any parseable date string (ISO or "DD Month [YYYY]").
 * @param ref               Reference "today" — defaults to Date.now(). Pass a
 *                          fixed date in tests or SSR snapshots.
 */
export function getRemainingSeatsForDate(departureDateStr: string, ref?: Date): number {
  const departure = parseDepartureDate(departureDateStr);
  if (!departure) return Math.round((MIN_SEATS + MAX_SEATS) / 2); // fallback: 12

  const now = ref ?? new Date();
  const daysUntil = Math.max(0, (departure.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (daysUntil >= FAR_DAYS) return MAX_SEATS;
  if (daysUntil <= NEAR_DAYS) return MIN_SEATS;

  const ratio = (daysUntil - NEAR_DAYS) / (FAR_DAYS - NEAR_DAYS);
  return Math.round(MIN_SEATS + ratio * (MAX_SEATS - MIN_SEATS));
}

/**
 * Human-readable label, e.g. "Only 14 seats remaining".
 */
export function getRemainingSeatsLabel(departureDateStr: string): string {
  const seats = getRemainingSeatsForDate(departureDateStr);
  return `Only ${seats} seats remaining`;
}

/**
 * Legacy slug-based function kept for any callers not yet migrated.
 * Returns the midpoint (12) — use getRemainingSeatsForDate() instead.
 * @deprecated Use getRemainingSeatsForDate(departureDateStr) instead.
 */
export function getRemainingSeats(_slug: string): number {
  return Math.round((MIN_SEATS + MAX_SEATS) / 2);
}
