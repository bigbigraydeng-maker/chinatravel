import { getAllActiveTours } from '@/lib/data/tours';
import TourSearchControls from './TourSearchControls';
import { departures, tourCities, priceNumber, matchingOffer, tourUrl } from '@/lib/tour-discovery';
export default function TourSearch() {
  const tours = getAllActiveTours();
  const available = tours.filter(t=>matchingOffer(t,{}));
  const rows = available.flatMap(t=>{const dates=departures(t);return (dates.length?dates:[{date:'',price:t.price}]).map(d=>({id:t.id,cities:tourCities(t),month:d.date.slice(0,7),price:priceNumber(d.price)}));});
  const upcoming = available.map(t=>({tour:t,offer:matchingOffer(t,{})!})).filter(item=>item.offer.date).sort((a,b)=>a.offer.date.localeCompare(b.offer.date)).slice(0,3);
  return <section aria-label="Find your tour" className="relative z-10 mx-auto max-w-7xl px-4 pb-8 md:-mt-10">
    <form action="/tours/find" method="get" className="rounded-2xl border border-warm-200 bg-white p-6 shadow-xl md:p-8">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2"><h2 className="font-serif text-2xl text-ink">Where will your next story begin?</h2><span className="text-sm text-ink-muted">Choose one filter, or combine a few.</span></div>
      <TourSearchControls rows={rows} />
      <p className="mt-3 text-xs text-ink-muted">Published tour prices per person. Inclusions vary by itinerary; final availability is confirmed by CTS.</p>
    </form>
    <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-3 text-sm"><span className="font-semibold text-ink">Or explore an upcoming journey:</span>{upcoming.map(({tour,offer})=><a key={tour.id} href={tourUrl(tour)+'?date='+offer.date} className="text-primary underline decoration-primary/30 underline-offset-4">{tour.name.replace(/^China (Discovery|Signature) — /,'')} · {offer.label} →</a>)}</div>
  </section>;
}
