'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { getTourCardMedia } from '@/lib/tour-card-media';
import { matchingOffer, tourCities, departures, experiences, nearbyOffers, tourUrl, tailorSearchHref } from '@/lib/tour-discovery';
import Link from 'next/link';
import {
  type Tour,
  collectTourTagSummaries,
  slugifyTourTag,
  tourHasTagSlug,
} from '@/lib/data/tours';

interface TourFinderProps {
  tours: Tour[];
}

export default function TourFinder({ tours }: TourFinderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || '';
  const month = searchParams.get('month') || '';
  const budget = searchParams.get('budget') || '';
  const experience = searchParams.get('experience') || '';
  const updateFilter = (key: string, value: string) => { const params = new URLSearchParams(searchParams.toString()); if(value) params.set(key,value); else params.delete(key); router.replace('/tours/find?' + params.toString(), {scroll:false}); };
  const offers = new Map(tours.map(t => [t.id, matchingOffer(t,{city,month,budget,experience})]));
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [destination, setDestination] = useState(searchParams.get('destination') || '');
  const [interest, setInterest] = useState(searchParams.get('interest') || '');
  const [tagSlug, setTagSlug] = useState(searchParams.get('tag') || '');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setDestination(searchParams.get('destination') || '');
    setInterest(searchParams.get('interest') || '');
    setTagSlug(searchParams.get('tag') || '');
  }, [searchParams]);

  const tagSummaries = useMemo(() => collectTourTagSummaries(tours), [tours]);

  const interestKeywords: Record<string, string[]> = {
    culture: ['culture', 'history', 'heritage', 'temple', 'forbidden city', 'terracotta', 'ancient', 'museum', 'palace'],
    food: ['food', 'culinary', 'cuisine', 'cooking', 'dumpling', 'tea', 'dining'],
    nature: ['nature', 'mountain', 'river', 'landscape', 'scenic', 'hiking', 'park', 'gorge', 'cruise'],
    family: ['family', 'kid', 'child', 'panda', 'zoo', 'fun'],
    luxury: ['luxury', 'premium', 'signature', 'boutique', 'exclusive', 'private'],
    photography: ['photography', 'photo', 'scenic', 'sunrise', 'landscape', 'view'],
  };

  // Strip apostrophes and hyphens so "xian" matches "Xi'an" and vice-versa.
  const normalize = (s: string) => s.toLowerCase().replace(/['\-]/g, '');

  const eligible = tours.filter((tour) => {
    const tagBlob = (tour.tags ?? []).join(' ').toLowerCase();
    const searchText = `${tour.name} ${tour.shortDescription} ${tour.highlights.join(' ')} ${tagBlob} ${tour.destination} ${tour.tier} ${(tour.tourCities ?? []).join(' ')}`.toLowerCase();

    if (query) {
      const q = query.toLowerCase().trim();
      const matchesFreeText = searchText.includes(q) || normalize(searchText).includes(normalize(q));
      const matchesTag = (tour.tags ?? []).some((label) => {
        const s = slugifyTourTag(label);
        return s.includes(q.replace(/\s+/g, '-')) || label.toLowerCase().includes(q);
      });
      if (!matchesFreeText && !matchesTag) return false;
    }
    if (destination && tour.destination !== destination) return false;
    if (interest && interestKeywords[interest]) {
      const keywords = interestKeywords[interest];
      if (!keywords.some(kw => searchText.includes(kw))) return false;
    }
    if (tagSlug && !tourHasTagSlug(tour, tagSlug)) return false;
    return true;
  });

  const filtered = eligible.filter(tour=>offers.get(tour.id));
  const nearby = filtered.length ? [] : nearbyOffers(eligible,{city,month,budget,experience});
  const tailorHref = tailorSearchHref(new URLSearchParams(searchParams.toString()));

  const hasActiveFilters = Boolean(query || destination || interest || tagSlug || city || month || budget || experience);

  const clearAll = () => {
    setQuery('');
    setDestination('');
    setInterest('');
    setTagSlug('');
    router.replace('/tours/find', { scroll: false });
  };

  return (
    <div>
      <div className="mb-6 grid gap-4 rounded-xl border border-warm-200 bg-white p-6 sm:grid-cols-2 lg:grid-cols-4">
        <label>City<select aria-label="City" className="mt-2 block w-full rounded border p-3" value={city} onChange={e=>updateFilter('city',e.target.value)}><option value="">Any city</option>{Array.from(new Set(tours.flatMap(tourCities))).sort().map(c=><option key={c}>{c}</option>)}</select></label>
        <label>Month<select aria-label="Month" className="mt-2 block w-full rounded border p-3" value={month} onChange={e=>updateFilter('month',e.target.value)}><option value="">Any month</option>{Array.from(new Set(tours.flatMap(t=>departures(t).map(d=>d.date.slice(0,7))))).sort().map(m=><option key={m}>{m}</option>)}</select></label>
        <label>Budget · NZD per person<select aria-label="Budget" className="mt-2 block w-full rounded border p-3" value={budget} onChange={e=>updateFilter('budget',e.target.value)}><option value="">Any budget</option><option value="3000">Up to $3,000</option><option value="5000">Up to $5,000</option><option value="8000">Up to $8,000</option></select></label>
        <label>Experience<select aria-label="Experience" className="mt-2 block w-full rounded border p-3" value={experience} onChange={e=>updateFilter('experience',e.target.value)}><option value="">Any experience</option>{experiences.filter(e=>!e.customRequest).map(e=><option key={e.id} value={e.id}>{e.title}</option>)}</select></label>
      </div>
      {/* Search Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => {setQuery(e.target.value);updateFilter('q',e.target.value);}}
                placeholder="Tours, interests, or tags (e.g. Mogao Caves, Peking duck)…"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <select value={destination} onChange={(e) => {setDestination(e.target.value);updateFilter('destination',e.target.value);}}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
              <option value="">All Destinations</option>
              <option value="china">China</option>
              <option value="japan">Japan</option>
              <option value="vietnam">Vietnam</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
            <select value={interest} onChange={(e) => {setInterest(e.target.value);updateFilter('interest',e.target.value);}}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none">
              <option value="">All Interests</option>
              <option value="culture">Culture & History</option>
              <option value="food">Food & Culinary</option>
              <option value="nature">Nature & Adventure</option>
              <option value="family">Family</option>
              <option value="luxury">Luxury</option>
              <option value="photography">Photography</option>
            </select>
          </div>
        </div>

        {tagSummaries.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <details><summary className="mb-3 cursor-pointer text-sm font-medium text-gray-700">More ways to explore: tour tags</summary>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/tours/find"
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${!tagSlug ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-700 hover:border-primary/40 hover:text-primary'}`}
              >
                All tags
              </Link>
              {tagSummaries.map(({ slug, label, count }) => (
                <Link
                  key={slug}
                  href={'/tours/find?' + new URLSearchParams({...Object.fromEntries(searchParams.entries()),tag:slug}).toString()}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${tagSlug === slug ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-700 hover:border-primary/40 hover:text-primary'}`}
                >
                  {label}
                  <span className={`ml-1 opacity-80 ${tagSlug === slug ? '' : 'text-gray-500'}`}>({count})</span>
                </Link>
              ))}
            </div>
          </details></div>
        )}

        <p className="mb-4 text-sm text-ink-muted">Prices per person in NZD. Check each tour’s inclusions and request availability from CTS.</p>
        {hasActiveFilters && (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500">{filtered.length} tour{filtered.length !== 1 ? 's' : ''} found</span>
            <button type="button" onClick={clearAll} className="text-sm text-primary hover:underline">Clear filters</button>
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <section aria-label="Alternative journeys">
          <div className="rounded-2xl border border-warm-200 bg-white p-7 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">Let’s find a way to make it work</p>
            <h2 className="mt-3 font-serif text-3xl">No exact match — but your journey can still start here.</h2>
            <p className="mt-4 max-w-2xl text-ink-muted">We have a carefully selected collection of tours. {nearby.length ? 'These journeys keep your city and experience preferences, with the differences shown below.' : 'Try a different month or budget, or ask us to design a journey around your plans.'} Your selected filters have not been changed.</p>
            <div className="mt-6 flex flex-wrap gap-4"><Link href={tailorHref} className="rounded-lg bg-primary px-5 py-3 font-semibold text-white">Plan around my preferences →</Link><button type="button" onClick={clearAll} className="rounded-lg border border-warm-200 px-5 py-3 font-semibold text-primary">Browse all available tours</button></div>
            <p className="mt-3 text-sm text-ink-muted">Your selections will be carried into the tailor-made enquiry.</p>
          </div>
          {nearby.length > 0 && <><h3 className="mb-5 mt-10 font-serif text-2xl">A few close alternatives</h3><div className="grid gap-6 md:grid-cols-3">{nearby.map(({tour,offer,differences}) => { const media = getTourCardMedia(tour); return <article key={tour.id} className="overflow-hidden rounded-2xl border border-warm-200 bg-white"><Link href={tourUrl(tour)+(offer.date?'?date='+offer.date:'')}><div className="relative aspect-video"><Image src={media.src} alt={tour.name} fill unoptimized={media.src.startsWith('/')} sizes="(max-width:768px) 100vw, 33vw" className="object-cover" style={{ objectPosition: media.objectPosition }}/></div><div className="p-5"><p className="text-xs uppercase tracking-widest text-primary">{tour.duration} · {tour.tier}</p><h4 className="mt-3 font-serif text-xl">{tour.name}</h4><div className="mt-4 rounded-lg bg-surface p-3"><p className="mb-2 text-xs font-semibold uppercase text-primary">What’s different</p><ul className="space-y-2 text-sm text-ink-muted">{differences.map(d=><li key={d}>{d}</li>)}</ul></div><p className="mt-4 text-sm">{offer.label}</p><p className="mt-2 font-semibold text-primary">{offer.price}</p><p className="mt-4 text-sm font-semibold text-primary">Explore this alternative →</p></div></Link></article>; })}</div></>}
        </section>
      ) : (
        <div className="grid grid-cols-1 items-start md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((tour) => {
            const media = getTourCardMedia(tour);
            return (
            <Link key={tour.id} href={`/tours/${tour.destination}/${tour.tier}/${tour.slug}${offers.get(tour.id)?.date ? "?date=" + offers.get(tour.id)!.date : ""}`}
              className="min-w-0 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
              <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-warm-100">
                <Image
                  src={media.src}
                  alt={tour.name}
                  fill
                  unoptimized={media.src.startsWith('/')}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: media.objectPosition }}
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {tour.tier}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-primary uppercase">{tour.destination}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-xs text-gray-500">{tour.duration}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{tour.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{tour.shortDescription}</p>
                {tour.tags && tour.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {tour.tags.slice(0, 4).map((label) => (
                      <span
                        key={label}
                        className="text-[10px] font-medium uppercase tracking-wide text-primary/90 bg-primary/5 px-2 py-0.5 rounded"
                      >
                        {label}
                      </span>
                    ))}
                    {tour.tags.length > 4 ? (
                      <span className="text-[10px] text-gray-500 self-center">+{tour.tags.length - 4}</span>
                    ) : null}
                  </div>
                )}
                <p className="mb-3 text-sm text-ink-muted">{offers.get(tour.id)?.label} · per person</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">{offers.get(tour.id)?.price}</span>
                  <span className="text-sm text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    View Tour
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
