// Builds what the online brochure shows from the published tour data, in the shape of the PDF brochure.
// Rule: every value comes from the tour record; when the record lacks a value the field is null and the page
// leaves that box out. Nothing here may fill a gap with a guess.
import type { Tour } from '@/lib/data/tours';
import { departures, priceNumber, tourCities, tourUrl } from '@/lib/tour-discovery';
import { headlinePrice } from '@/lib/tour-price';
import { toBrochureCard, tourDays, type BrochureCard } from './picker';

export interface DepartureRow {
  date: string;
  departs: string;
  returns: string | null;
  price: string;
}

export interface MealCount {
  total: number;
  breakfast: number;
  lunch: number;
  dinner: number;
}

export interface TourPage {
  anchor: string;
  path: string;
  name: string;
  collection: string;
  index: number;
  heroImage: string;
  days: number;
  when: string | null;
  flag: string;
  route: string;
  fromPrice: string;
  solo: { price: string; note: string | null } | null;
  meals: MealCount | null;
  hotels: { stars: string; orSimilar: boolean } | null;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  departures: DepartureRow[];
}

export interface CollectionSummary {
  tours: number;
  departures: number;
  minDays: number;
  maxDays: number;
  fromPrice: string;
}

export interface StopoverRow {
  path: string;
  place: string;
  days: number;
  price: string;
}

export interface BrochureView {
  guidedTours: number;
  guidedDepartures: number;
  guidedFrom: string | null;
  discovery: CollectionSummary | null;
  signature: CollectionSummary | null;
  stopoverCount: number;
  stopoverFrom: string | null;
  stopoverMinDays: number;
  stopoverMaxDays: number;
  tourPages: TourPage[];
  stopovers: StopoverRow[];
  asia: BrochureCard[];
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatNzd(amount: number): string {
  return `NZD $${new Intl.NumberFormat('en-NZ', { maximumFractionDigits: 0 }).format(amount)}`;
}

/** "2027-03-11" -> "11 Mar 2027". */
export function shortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "China Discovery — Best of China" -> "Best of China"; other names stay as they are. */
export function shortTourName(name: string): string {
  return name.replace(/^China\s+(?:Discovery|Signature)\s*[—–-]\s*/, '').trim();
}

/** "China Stopover — Beijing Express (3 Days)" -> "Beijing Express". */
export function stopoverPlace(name: string): string {
  return name
    .replace(/^China\s+Stopover\s*[—–-]\s*/, '')
    .replace(/\s*\(\d+\s*days?\)\s*$/i, '')
    .trim();
}

function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/**
 * Return date of one departure: the day the route's last day falls on. A departure that runs one of the tour's
 * alternative routes uses that route's own length. No length known -> null (the page then shows no return date).
 */
export function returnDate(tour: Tour, label: string, iso: string): string | null {
  const variant = tour.routeVariants?.find((v) => v.departureDates.includes(label));
  const length = variant ? variant.itinerary.length : tourDays(tour);
  return length > 0 ? addDays(iso, length - 1) : null;
}

export function departureRows(tour: Tour, today: string): DepartureRow[] {
  return departures(tour, today).map((d) => {
    const ret = returnDate(tour, d.label, d.date);
    return { date: d.date, departs: shortDate(d.date), returns: ret ? shortDate(ret) : null, price: headlinePrice(d.price) };
  });
}

/** Lowest price of the tour's open departures, or of the tour itself when it has none. */
export function lowestPrice(tour: Tour, today: string): number | null {
  const prices = departures(tour, today)
    .map((d) => priceNumber(d.price))
    .filter((n): n is number => n !== null);
  if (prices.length > 0) return Math.min(...prices);
  return priceNumber(tour.price);
}

/** Days with breakfast / lunch / dinner in the itinerary, as the PDF counts them. Null when the itinerary names none. */
export function mealCount(tour: Tour): MealCount | null {
  const has = (prefix: string) =>
    tour.itinerary.filter((day) => day.meals.some((m) => m.trim().toLowerCase().startsWith(prefix))).length;
  const breakfast = has('breakfast');
  const lunch = has('lunch');
  const dinner = has('dinner');
  const total = breakfast + lunch + dinner;
  return total > 0 ? { total, breakfast, lunch, dinner } : null;
}

const STAR = /(\d)\s*(?:[–-]\s*(\d)\s*)?[-\s]?star/gi;

function starDigits(lines: string[]): number[] {
  const out = new Set<number>();
  for (const line of lines) {
    for (const m of Array.from(line.matchAll(STAR))) {
      out.add(Number(m[1]));
      if (m[2]) out.add(Number(m[2]));
    }
  }
  return Array.from(out).sort((a, b) => a - b);
}

/** Hotel standard from the inclusions' hotel line, else from the nightly hotels. Null when neither names a star rating. */
export function hotelStandard(tour: Tour): { stars: string; orSimilar: boolean } | null {
  const hotelLines = tour.inclusions.filter((l) => /hotel/i.test(l));
  const nights = tour.itinerary.map((d) => d.accommodation ?? '').filter(Boolean);
  let digits = starDigits(hotelLines);
  if (digits.length === 0) digits = starDigits(nights);
  if (digits.length === 0) return null;
  const lo = digits[0];
  const hi = digits[digits.length - 1];
  return {
    stars: lo === hi ? `${lo}★` : `${lo}–${hi}★`,
    orSimilar: nights.some((n) => /or similar/i.test(n)),
  };
}

/** "Mar–Oct 2027", "11 Mar 2027" for a single date, or a span across two years. Null without departures. */
export function departureSpan(rows: DepartureRow[]): string | null {
  if (rows.length === 0) return null;
  if (rows.length === 1) return rows[0].departs;
  const first = rows[0].date;
  const last = rows[rows.length - 1].date;
  const [fy, fm] = first.split('-').map(Number);
  const [ly, lm] = last.split('-').map(Number);
  if (fy !== ly) return `${MONTHS[fm - 1]} ${fy}–${MONTHS[lm - 1]} ${ly}`;
  if (fm === lm) return `${MONTHS[fm - 1]} ${fy}`;
  return `${MONTHS[fm - 1]}–${MONTHS[lm - 1]} ${fy}`;
}

function departureFlag(rows: DepartureRow[]): string {
  if (rows.length === 0) return 'Enquire for dates';
  const years = new Set(rows.map((r) => r.date.slice(0, 4)));
  const noun = rows.length === 1 ? 'departure' : 'departures';
  return years.size === 1 ? `${rows.length} ${noun} in ${Array.from(years)[0]}` : `${rows.length} ${noun}`;
}

const COLLECTION: Record<string, string> = { discovery: 'Discovery Collection', signature: 'Signature Collection' };

export function toTourPage(tour: Tour, index: number, today: string): TourPage {
  const rows = departureRows(tour, today);
  const low = lowestPrice(tour, today);
  return {
    anchor: `tour-${tour.slug}`,
    path: tourUrl(tour),
    name: shortTourName(tour.name),
    collection: COLLECTION[tour.tier] ?? tour.tier,
    index,
    heroImage: tour.heroImage,
    days: tourDays(tour),
    when: departureSpan(rows),
    flag: departureFlag(rows),
    route: tourCities(tour).join(' · '),
    fromPrice: low !== null ? formatNzd(low) : headlinePrice(tour.price),
    solo: tour.singleSupplement
      ? { price: `+${headlinePrice(tour.singleSupplement)}`, note: tour.singleSupplementNote ?? null }
      : null,
    meals: mealCount(tour),
    hotels: hotelStandard(tour),
    highlights: tour.highlights,
    inclusions: tour.inclusions,
    exclusions: tour.exclusions,
    departures: rows,
  };
}

function byLength(a: Tour, b: Tour): number {
  return tourDays(a) - tourDays(b) || a.name.localeCompare(b.name);
}

function summarise(tours: Tour[], today: string): CollectionSummary | null {
  if (tours.length === 0) return null;
  const days = tours.map(tourDays).filter((d) => d > 0);
  const prices = tours.map((t) => lowestPrice(t, today)).filter((n): n is number => n !== null);
  if (days.length === 0 || prices.length === 0) return null;
  return {
    tours: tours.length,
    departures: tours.reduce((n, t) => n + departures(t, today).length, 0),
    minDays: Math.min(...days),
    maxDays: Math.max(...days),
    fromPrice: formatNzd(Math.min(...prices)),
  };
}

export function buildBrochureView(tours: Tour[], today: string): BrochureView {
  const china = tours.filter((t) => t.destination === 'china');
  const discovery = china.filter((t) => t.tier === 'discovery').sort(byLength);
  const signature = china.filter((t) => t.tier === 'signature').sort(byLength);
  const guided = [...discovery, ...signature];
  const stopoverTours = china.filter((t) => t.tier === 'stopover');
  const guidedPrices = guided.map((t) => lowestPrice(t, today)).filter((n): n is number => n !== null);
  const stopovers = stopoverTours
    .map((t) => ({ path: tourUrl(t), place: stopoverPlace(t.name), days: tourDays(t), price: headlinePrice(t.price), n: priceNumber(t.price) }))
    .sort((a, b) => (a.n ?? Infinity) - (b.n ?? Infinity) || a.place.localeCompare(b.place));
  const stopPrices = stopovers.map((s) => s.n).filter((n): n is number => n !== null);
  const stopDays = stopovers.map((s) => s.days).filter((d) => d > 0);
  return {
    guidedTours: guided.length,
    guidedDepartures: guided.reduce((n, t) => n + departures(t, today).length, 0),
    guidedFrom: guidedPrices.length > 0 ? formatNzd(Math.min(...guidedPrices)) : null,
    discovery: summarise(discovery, today),
    signature: summarise(signature, today),
    stopoverCount: stopovers.length,
    stopoverFrom: stopPrices.length > 0 ? formatNzd(Math.min(...stopPrices)) : null,
    stopoverMinDays: stopDays.length > 0 ? Math.min(...stopDays) : 0,
    stopoverMaxDays: stopDays.length > 0 ? Math.max(...stopDays) : 0,
    tourPages: guided.map((t, i) => toTourPage(t, i + 1, today)),
    stopovers: stopovers.map(({ path, place, days, price }) => ({ path, place, days, price })),
    asia: tours
      .filter((t) => t.destination === 'japan' || t.destination === 'vietnam')
      .sort(byLength)
      .map((t) => toBrochureCard(t, today)),
  };
}
