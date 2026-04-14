/**
 * URL query keys for /tailor-made enquiry pre-fill (?month=YYYY-MM&duration=…&pax=…&dest=…).
 * Not a booking engine — only seeds the enquiry form.
 */

export const TAILOR_MADE_DURATION_VALUES = [
  '3-5 days',
  '1 week',
  '10-14 days',
  '2-3 weeks',
  '3+ weeks',
  'Flexible',
] as const;

export type TailorMadeDurationValue = (typeof TAILOR_MADE_DURATION_VALUES)[number];

export function isTailorMadeDurationValue(v: string): v is TailorMadeDurationValue {
  return (TAILOR_MADE_DURATION_VALUES as readonly string[]).includes(v);
}

/** First day of month for <input type="date" /> */
export function monthToTravelDateInput(yyyyMm: string): string | null {
  const m = yyyyMm.trim();
  if (!/^\d{4}-\d{2}$/.test(m)) return null;
  const [y, mo] = m.split('-').map(Number);
  if (mo < 1 || mo > 12) return null;
  const d = new Date(y, mo - 1, 1);
  if (d.getFullYear() !== y || d.getMonth() !== mo - 1) return null;
  return `${y.toString().padStart(4, '0')}-${mo.toString().padStart(2, '0')}-01`;
}

export function paxToTravellersLabel(pax: number): string {
  if (!Number.isFinite(pax) || pax < 1) return '';
  if (pax === 1) return '1 traveller';
  return `${Math.min(20, Math.floor(pax))} travellers`;
}

export type PrefillPatch = Partial<{
  travelDate: string;
  duration: string;
  travellers: string;
  destinations: string[];
}>;

export function prefillFromSearchParams(searchParams: URLSearchParams): PrefillPatch {
  const patch: PrefillPatch = {};

  const month = searchParams.get('month');
  if (month) {
    const date = monthToTravelDateInput(month);
    if (date) patch.travelDate = date;
  }

  const duration = searchParams.get('duration');
  if (duration && isTailorMadeDurationValue(duration)) {
    patch.duration = duration;
  }

  const paxRaw = searchParams.get('pax');
  if (paxRaw !== null) {
    const n = parseInt(paxRaw, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= 20) {
      patch.travellers = paxToTravellersLabel(n);
    }
  }

  const dest = searchParams.get('dest');
  if (dest) {
    const list = dest
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (list.length) patch.destinations = list;
  }

  return patch;
}
