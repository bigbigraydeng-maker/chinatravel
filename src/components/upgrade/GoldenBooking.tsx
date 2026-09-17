'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Tour } from '@/lib/data/tours';
import TourEnquiry from '@/components/tours/TourEnquiry';
import { departures } from '@/lib/tour-discovery';
export default function GoldenBooking({tour}:{tour:Tour}) {
 const params=useSearchParams();const options=departures(tour);const [date,setDate]=useState(options.find(d=>d.date===params.get('date'))?.date || options[0]?.date || '');const [pax,setPax]=useState('2');const offer=options.find(d=>d.date===date);
 if (tour.soldOut) return <aside id="enquiry" className="rounded-2xl border border-warm-200 bg-white p-6 lg:sticky lg:top-28"><p className="font-serif text-3xl text-primary">Sold Out</p><p className="mt-4 text-ink-muted">The 16 November 2026 Golden China departure is fully booked.</p><a href="/campaigns/spotlight" className="mt-6 block rounded-full bg-primary px-6 py-3 text-center font-semibold text-white">Explore December tours →</a></aside>;
 return <aside id="enquiry" className="scroll-mt-28 rounded-2xl border border-warm-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
  <p className="text-xs uppercase tracking-widest text-primary">Your Golden China journey</p><p className="mt-3 font-serif text-3xl">{offer?.price || tour.price}</p><p className="mt-2 text-sm text-ink-muted">Per person · NZD · See inclusions below</p>
  <label className="mt-6 block text-sm font-medium">Departure<select value={date} onChange={e=>setDate(e.target.value)} className="mt-2 w-full rounded-lg border border-warm-200 p-3">{options.length ? options.map(d=><option key={d.date} value={d.date}>{d.label}</option>) : <option value="">Ask about future dates</option>}</select></label>
  <label className="mt-4 block text-sm font-medium">Travellers<select value={pax} onChange={e=>setPax(e.target.value)} className="mt-2 w-full rounded-lg border border-warm-200 p-3">{['1','2','3','4','5','6','7','8+'].map(n=><option key={n}>{n}</option>)}</select></label>
  <p className="my-4 text-xs leading-relaxed text-ink-muted">Send an enquiry to confirm availability and your final quote. No payment or booking is made here.</p>
  <TourEnquiry compact tourName={tour.name} tourSlug={tour.slug} destination={tour.destination} tier={tour.tier} enquiryContext={`Preferred departure: ${offer?.label || 'Future dates requested'}\nTravellers: ${pax}\nDisplayed price per person: ${offer?.price || tour.price}`} />
 </aside>;
}
