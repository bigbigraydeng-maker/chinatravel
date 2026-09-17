import { aucklandToday, departures, includesExperience, matchingOffer, priceNumber } from '@/lib/tour-discovery';
import { getAllActiveTours, getTourBySlug } from '@/lib/data/tours';
const golden = getTourBySlug('china','discovery','golden-china')!;
const tour = {...golden, isActive:true, soldOut:false, tourCities:['Beijing'], departureDates:['1 October 2026','1 November 2026'], price:'NZD $4,000', departurePricing:{'1 October 2026':'NZD $5,200','1 November 2026':'NZD $3,800'}};
const today = '2026-09-17';
describe('Production tour discovery',()=>{
 test('combines date and budget using the same departure',()=>{
  expect(matchingOffer(tour,{month:'2026-10',budget:'5000'},today)).toBeNull();
  expect(matchingOffer(tour,{month:'2026-11',budget:'5000'},today)?.price).toBe('NZD $3,800');
  expect(matchingOffer(tour,{budget:'5000'},today)?.date).toBe('2026-11-01');
 });
 test('excludes past schedules but keeps unscheduled products without a month',()=>{
  expect(departures(tour,'2026-10-02').map(d=>d.date)).toEqual(['2026-11-01']);
  expect(matchingOffer(tour,{},'2027-01-01')).toBeNull();
  const flexible={...tour,departureDates:[]};
  expect(matchingOffer(flexible,{},today)?.label).toBe('Dates on request');
  expect(matchingOffer(flexible,{month:'2026-10'},today)).toBeNull();
 });
 test('matches cities and does not offer request-only experiences as included',()=>{
  expect(matchingOffer(tour,{city:'BEIJING'},today)).not.toBeNull();
  expect(matchingOffer(tour,{city:'Tokyo'},today)).toBeNull();
  expect(includesExperience(golden,'great-wall')).toBe(true);
  expect(includesExperience(golden,'universal-beijing')).toBe(false);
  expect(includesExperience({...golden,highlights:[]},'great-wall')).toBe(false);
 });
 test('uses Auckland calendar day and does not parse price on request as zero',()=>{
  expect(aucklandToday(new Date('2026-09-17T13:00:00Z'))).toBe('2026-09-18');
  expect(priceNumber('Price on request')).toBeNull();
  expect(priceNumber('From NZD $5,280')).toBe(5280);
 });
});

describe('Close alternatives for a small catalogue',()=>{
 const {nearbyOffers,tailorSearchHref}=require('@/lib/tour-discovery');
 test('keeps city intent and labels the actual departure price difference',()=>{
  const result=nearbyOffers([tour],{city:'Beijing',month:'2026-10',budget:'5000'},today);
  expect(result).toHaveLength(1);
  expect(result[0].offer.date).toBe('2026-10-01');
  expect(result[0].differences).toEqual(['NZ$200 above your budget per person']);
  expect(nearbyOffers([tour],{city:'Tokyo',budget:'100'},today)).toEqual([]);
 });
 test('does not include past schedules or mislabel exact matches as alternatives',()=>{
  expect(nearbyOffers([tour],{month:'2026-11',budget:'5000'},'2026-11-01')).toEqual([]);
  expect(nearbyOffers([tour],{budget:'100'},'2027-01-01')).toEqual([]);
 });
 test('preserves supported preferences in the enquiry link',()=>{
  const href=tailorSearchHref(new URLSearchParams('city=Beijing&month=2026-11&budget=3000&experience=great-wall&destination=china'));
  const url=new URL(href,'https://example.com');
  expect(url.searchParams.get('budget')).toBe('3000');
  expect(url.searchParams.get('city')).toBe('Beijing');
  expect(url.searchParams.get('month')).toBe('2026-11');
  expect(url.hash).toBe('#enquiry-form');
 });
});

describe('Golden China sold-out withdrawal',()=>{
 test('keeps the original URL data but removes all sales offers',()=>{
  expect(golden.soldOut).toBe(true);
  expect(getAllActiveTours().some(t=>t.slug==='golden-china')).toBe(false);
  expect(departures(golden,today)).toEqual([]);
  expect(matchingOffer(golden,{},today)).toBeNull();
  expect(matchingOffer({...golden,isActive:true,departureDates:[]},{},today)).toBeNull();
 });
 test('marks machine-readable offers SoldOut',()=>{
  const {generateTourSchema,generateProductSchema}=require('@/lib/schema-tour');
  const {getDestinationBySlug}=require('@/lib/data/tours');
  expect(JSON.stringify(generateTourSchema(golden,getDestinationBySlug('china')))).toContain('https://schema.org/SoldOut');
  expect(JSON.stringify(generateProductSchema(golden))).toContain('https://schema.org/SoldOut');
  expect(JSON.stringify(generateProductSchema(golden))).not.toContain('https://schema.org/InStock');
 });
});
