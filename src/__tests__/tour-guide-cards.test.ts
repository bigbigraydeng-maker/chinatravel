import { getTourGuideCards } from '@/lib/tour-guide-cards';
import { getTourBySlug, getAllActiveTours } from '@/lib/data/tours';
import { existsSync } from 'fs';
import path from 'path';

test('Golden China promotes its route without unrelated panda or Avatar destinations', () => {
 const tour = getTourBySlug('china', 'discovery', 'golden-china')!;
 const hrefs = getTourGuideCards(tour).map(c => c.href);
 expect(hrefs).toEqual(expect.arrayContaining(['/beijing-travel-guide','/great-wall-travel-guide','/xian-travel-guide','/terracotta-warriors-travel-guide','/shanghai-travel-guide']));
 expect(hrefs).not.toContain('/chengdu-travel-guide');
 expect(hrefs).not.toContain('/zhangjiajie-travel-guide');
});
test('all promoted guides have existing pages, without duplicates or more than six cards', () => {
 for (const tour of getAllActiveTours()) {
  const cards = getTourGuideCards(tour);
  expect(cards.length).toBeLessThanOrEqual(6);
  expect(new Set(cards.map(c => c.href)).size).toBe(cards.length);
  for (const card of cards) expect(existsSync(path.join(process.cwd(),'src/app',card.href,'page.tsx'))).toBe(true);
 }
});
test('a city visit alone does not imply its landmarks are included', () => {
 const tour = getTourBySlug('china','discovery','golden-china')!;
 expect(getTourGuideCards({...tour,tourCities:['beijing'],highlights:[],itinerary:[]}).map(c=>c.href)).toEqual(['/beijing-travel-guide']);
});

test('itinerary landmarks link to their dedicated guide pages', () => {
 const tour = getTourBySlug('china','discovery','golden-china')!;
 const cases = [
  ['beijing', 'Temple of Heaven', '/temple-of-heaven-travel-guide'],
  ['xian', "Xi'an City Wall", '/xian-city-wall-travel-guide'],
  ['xian', 'Big Wild Goose Pagoda', '/big-wild-goose-pagoda-travel-guide'],
  ['hangzhou', 'West Lake', '/west-lake-travel-guide'],
  ['shanghai', 'Yu Garden', '/yu-garden-travel-guide'],
  ['shanghai', 'The Bund', '/the-bund-travel-guide'],
 ] as const;
 for (const [city, highlight, expectedHref] of cases) {
  const hrefs = getTourGuideCards({
   ...tour,
   tourCities: [city],
   highlights: [highlight],
   itinerary: [],
  }).map(card => card.href);
  expect(hrefs).toContain(expectedHref);
 }
});
