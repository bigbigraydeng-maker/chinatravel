/**
 * Deterministic "remaining seats" counter (5–10 inclusive) for a campaign tour slug.
 *
 * Why deterministic?
 *  - Stable across SSR/CSR — no hydration mismatch.
 *  - SEO-friendly — Google sees the same content per URL on every crawl.
 *  - Editorial-controlled — change the slug or the formula to refresh the number.
 *
 * The number is only intended as a soft urgency cue ("Only X seats remaining").
 * It is NOT inventory truth; the real availability is confirmed at booking.
 *
 * Mapping range: 5–10 (6 buckets) — feels scarce without being implausibly tiny.
 */

const MIN_SEATS = 5;
const SEAT_BUCKETS = 6; // 5,6,7,8,9,10

/**
 * Compute a stable seat count in [5, 10] from a slug string.
 *
 * Uses a simple polynomial rolling hash (Java-style 31x + char). Pure, no I/O,
 * no Date.now(), no Math.random() — same input always returns the same output.
 */
export function getRemainingSeats(slug: string): number {
  if (!slug) return MIN_SEATS;

  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    // Force unsigned 32-bit on each step to avoid negative results.
    hash = (Math.imul(hash, 31) + slug.charCodeAt(i)) >>> 0;
  }
  return MIN_SEATS + (hash % SEAT_BUCKETS);
}

/**
 * Human-readable label for the urgency badge, e.g. "Only 7 seats remaining".
 */
export function getRemainingSeatsLabel(slug: string): string {
  const seats = getRemainingSeats(slug);
  return `Only ${seats} seats remaining`;
}
