'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Tour } from '@/lib/data/tours';
import TourEnquiry from '@/components/tours/TourEnquiry';
import { departures } from '@/lib/tour-discovery';
import SingleRoomPricing from '@/components/tours/SingleRoomPricing';
import type { EarlyBirdPrice } from '@/lib/pricing/early-bird';

function shortTourName(tour: Tour) {
  return tour.name.replace(/^[^—]+—\s*/, '');
}

function displayPrice(price: string) {
  return price.replace(/\s*(?:per\s+person|pp)\s*$/i, '');
}

export default function UpgradedTourBooking({
  tour,
  earlyBird = {},
}: {
  tour: Tour;
  /** Early bird prices by departure label, worked out once on the server so this card agrees with the rest of the page. */
  earlyBird?: Record<string, EarlyBirdPrice>;
}) {
  const params = useSearchParams();
  const options = departures(tour);
  const [date, setDate] = useState(
    options.find((departure) => departure.date === params.get('date'))?.date || options[0]?.date || '',
  );
  const [pax, setPax] = useState('2');
  const [roomPreference, setRoomPreference] = useState<'twin' | 'single' | 'discuss'>('twin');
  const offer = options.find((departure) => departure.date === date);
  const earlyBirdOffer = offer ? earlyBird[offer.label] : undefined;
  // The price shown for the chosen departure: early bird while the promotion is open, regular otherwise.
  const offerPrice = earlyBirdOffer ? earlyBirdOffer.price : offer?.price || tour.price;

  const handlePaxChange = (value: string) => {
    setPax(value);
    if (value === '1') setRoomPreference('single');
  };

  if (tour.soldOut) {
    const soldOutDate = tour.departureDates?.[0];
    const isGoldenChina = tour.slug === 'golden-china';
    return (
      <aside id="enquiry" className="rounded-2xl border border-warm-200 bg-white p-6 lg:sticky lg:top-28">
        <p className="font-serif text-3xl text-primary">Sold Out</p>
        <p className="mt-4 text-ink-muted">
          {isGoldenChina
            ? 'The 16 November 2026 Golden China departure is fully booked.'
            : soldOutDate
              ? `The ${soldOutDate} ${shortTourName(tour)} departure is fully booked.`
              : 'This departure is fully booked.'}
        </p>
        <a href="/tours/china/discovery" className="mt-6 block rounded-full bg-primary px-6 py-3 text-center font-semibold text-white">
          Explore available tours →
        </a>
      </aside>
    );
  }

  return (
    <aside id="enquiry" className="scroll-mt-28 rounded-2xl border border-warm-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
      <p className="text-xs uppercase tracking-widest text-primary">Your {shortTourName(tour)} journey</p>
      <p className="mt-3 font-serif text-3xl">{displayPrice(offerPrice)}</p>
      {earlyBirdOffer && <p className="mt-1 text-xs font-medium text-primary">{earlyBirdOffer.label}</p>}
      <p className="mt-2 text-sm text-ink-muted">Per person · twin share · NZD</p>
      {tour.singleSupplement && (
        <div className="mt-4">
          <SingleRoomPricing
            basePrice={offerPrice}
            singleSupplement={tour.singleSupplement}
            compact
          />
        </div>
      )}
      <label className="mt-6 block text-sm font-medium">
        Departure
        <select value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full rounded-lg border border-warm-200 p-3">
          {options.length
            ? options.map((departure) => <option key={departure.date} value={departure.date}>{departure.label}</option>)
            : <option value="">Ask about future dates</option>}
        </select>
      </label>
      <label className="mt-4 block text-sm font-medium">
        Travellers
        <select value={pax} onChange={(event) => handlePaxChange(event.target.value)} className="mt-2 w-full rounded-lg border border-warm-200 p-3">
          {['1', '2', '3', '4', '5', '6', '7', '8+'].map((number) => <option key={number}>{number}</option>)}
        </select>
      </label>
      <label className="mt-4 block text-sm font-medium">
        Room preference
        <select
          value={roomPreference}
          onChange={(event) => setRoomPreference(event.target.value as 'twin' | 'single' | 'discuss')}
          className="mt-2 w-full rounded-lg border border-warm-200 p-3"
        >
          {pax !== '1' && <option value="twin">Twin share · two people per room</option>}
          <option value="single">Private room{tour.singleSupplement ? ` · + ${tour.singleSupplement}` : ''}</option>
          {pax !== '1' && <option value="discuss">Please advise me</option>}
        </select>
      </label>
      <p className="my-4 text-xs leading-relaxed text-ink-muted">
        Send an enquiry to confirm availability and your final quote. No payment or booking is made here.
      </p>
      <TourEnquiry
        compact
        tourName={tour.name}
        tourSlug={tour.slug}
        destination={tour.destination}
        tier={tour.tier}
        enquiryContext={`Preferred departure: ${offer?.label || 'Future dates requested'}\nTravellers: ${pax}\nRoom preference: ${roomPreference === 'twin' ? 'Twin share' : roomPreference === 'single' ? 'Private room' : 'Please advise'}\nDisplayed twin-share price per person: ${displayPrice(offerPrice)}${earlyBirdOffer ? ` (${earlyBirdOffer.label})` : ''}${tour.singleSupplement ? `\nPrivate-room supplement per solo traveller: ${tour.singleSupplement}` : ''}`}
      />
    </aside>
  );
}
