import type { Tour } from '@/lib/data/tours';
import { parseDepartureDate } from '@/lib/data/tour-dates';
import { extractRouteFromItinerary } from '@/lib/itinerary-map/extractRouteFromItinerary';
import experiences from '@/lib/data/experiences.json';
export { experiences };
export const tourUrl = (tour: Tour) => `/tours/${tour.destination}/${tour.tier}/${tour.slug}`;
export const normalizeCity = (value: string) => value.toLowerCase().replace(/[’'\s-]/g, '');
export function tourCities(tour: Tour): string[] {
  const labels: Record<string,string> = {xian: "Xi'an", hongkong: 'Hong Kong'};
  const cities = [...(tour.tourCities ?? []), ...(extractRouteFromItinerary(tour.itinerary)?.stops.map(s => s.label) ?? [])];
  return Array.from(new Set(cities.map(c => labels[normalizeCity(c)] ?? c.toLowerCase().replace(/\b\w/g, l=>l.toUpperCase()))));
}
export function aucklandToday(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-NZ', { timeZone: 'Pacific/Auckland', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const part = (type: string) => parts.find(p => p.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}
export function departures(tour: Tour, today = aucklandToday()) {
  return (tour.departureDates ?? []).flatMap(label => {
    const parsed = parseDepartureDate(label);
    if (!parsed) return [];
    const date = parsed.toISOString().slice(0, 10);
    return date >= today ? [{ date, label, price: tour.departurePricing?.[label] ?? tour.price }] : [];
  }).sort((a,b) => a.date.localeCompare(b.date));
}
export function priceNumber(price: string): number | null {
  const match = price.match(/(?:NZD?\s*\$?|\$)\s*([\d,]+(?:\.\d+)?)/i);
  return match ? Number(match[1].replace(/,/g, '')) : null;
}
export function includesExperience(tour: Tour, id: string): boolean {
  const experience = experiences.find(e => e.id === id);
  return !!experience?.mappings.some(m => m.tourSlug === tour.slug && m.status === 'included' && tour.highlights.includes(m.evidence));
}
export function matchingOffer(tour: Tour, filters: {city?:string; month?:string; budget?:string; experience?:string}, today = aucklandToday()) {
  if (filters.city && !tourCities(tour).some(c => normalizeCity(c) === normalizeCity(filters.city!))) return null;
  if (filters.experience && !includesExperience(tour, filters.experience)) return null;
  const dates = departures(tour, today);
  // Scheduled products with no future departure are not currently bookable.
  if (tour.departureDates?.length && !dates.length) return null;
  const candidates = dates.length ? dates.filter(d => !filters.month || d.date.startsWith(filters.month)) : filters.month ? [] : [{date:'',label:'Dates on request',price:tour.price}];
  return candidates.find(d => !filters.budget || (priceNumber(d.price) !== null && priceNumber(d.price)! <= Number(filters.budget))) ?? null;
}

export type DiscoveryFilters = {city?:string; month?:string; budget?:string; experience?:string};
/** Keep destination/experience intent; relax only timing and price, explicitly. */
export function nearbyOffers(tours: Tour[], filters: DiscoveryFilters, today = aucklandToday()) {
  const monthIndex = (date: string) => Number(date.slice(0,4))*12 + Number(date.slice(5,7));
  return tours.flatMap(tour => {
    if (!matchingOffer(tour,{city:filters.city,experience:filters.experience},today)) return [];
    const dates = departures(tour,today);
    const candidates = dates.length ? dates : [{date:'',label:'Dates on request',price:tour.price}];
    const ranked = candidates.map(offer => {
      const differences: string[] = [];
      const price = priceNumber(offer.price);
      const monthGap = filters.month && offer.date ? Math.abs(monthIndex(offer.date)-monthIndex(filters.month)) : 0;
      if (filters.month && !offer.date) differences.push('Travel dates need confirmation');
      else if (filters.month && monthGap) differences.push(`Departs ${offer.label}, rather than your selected month`);
      const over = filters.budget && price !== null ? Math.max(0,price-Number(filters.budget)) : 0;
      if (filters.budget && price === null) differences.push('Price needs confirmation');
      if (over) differences.push(`NZ$${over.toLocaleString('en-NZ')} above your budget per person`);
      return {tour,offer,differences,score:differences.length*100000 + monthGap*1000 + over};
    }).filter(item=>item.differences.length).sort((a,b)=>a.score-b.score || a.offer.date.localeCompare(b.offer.date));
    return ranked.slice(0,1);
  }).sort((a,b)=>a.score-b.score || a.offer.date.localeCompare(b.offer.date)).slice(0,3);
}

export function tailorSearchHref(params: URLSearchParams) {
  const supported = ['city','month','budget','experience','destination','q','interest','tag'];
  const next = new URLSearchParams();
  for (const key of supported) { const value=params.get(key); if(value) next.set(key,value); }
  return '/tailor-made?' + next.toString() + '#enquiry-form';
}
