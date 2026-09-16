import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { type Tour, getAllActiveTours, getDestinationBySlug } from '@/lib/data/tours';
import { getTourPageFaqsForTour } from '@/lib/schema-tour';
import { experiences, includesExperience, matchingOffer, tourUrl } from '@/lib/tour-discovery';
import JourneyGallery from './JourneyGallery';
import GoldenBooking from './GoldenBooking';
import ExperienceDiscovery from './ExperienceDiscovery';
import TourRouteMap from '@/components/tours/TourRouteMap';
import TourInclusions from '@/components/tours/TourInclusions';
import TourSupportingContentLinks from '@/components/tours/TourSupportingContentLinks';
import ItineraryActions from '@/components/tours/ItineraryActions';
import TrustBar from '@/components/TrustBar';
import TourTrustSignals from '@/components/tours/TourTrustSignals';
import FAQSection from '@/components/FAQSection';
// Editorial headings for the pilot; complete source itinerary text remains below each heading.
const dayHeadings: Record<number,string> = {1:'Your journey begins',2:'A welcome to Beijing',3:'The heart of imperial Beijing',4:'Walk the Great Wall',5:'Hutong life & palace gardens',6:'By rail to ancient Xi’an',7:'Meet the Terracotta Warriors',8:'City walls to Shanghai skylines',9:'A water town & an evening river cruise',10:'Gardens, museums & the Bund',11:'Shanghai at your own pace',12:'Welcome home'};
const photos = [
 {src:'/images/cts-upgrade/experience-wall.webp',alt:'The Great Wall, China'},
 {src:'/images/cts-upgrade/tour-terracotta.webp',alt:'The Terracotta Warriors in Xi’an'},
 {src:'/images/cts-upgrade/search-bund.webp',alt:'Shanghai’s waterfront skyline'},
 {src:'/images/cts-upgrade/tour-temple.webp',alt:'The Temple of Heaven in Beijing'},
];
export default function GoldenTourPage({tour}:{tour:Tour}) {
 const related=getAllActiveTours().filter(t=>t.slug!==tour.slug && t.destination===tour.destination && matchingOffer(t,{})).sort((a,b)=>Number(b.tier===tour.tier)-Number(a.tier===tour.tier)).filter((t,i,all)=>all.findIndex(o=>o.name.replace(/Christchurch/gi,'').trim()===t.name.replace(/Christchurch/gi,'').trim())===i).slice(0,3);
 return <div className="bg-surface text-ink">
  <div className="mx-auto max-w-7xl px-4 pb-10 pt-6"><nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-muted"><Link href="/">Home</Link> / <Link href="/tours/find">Tours</Link> / {tour.name}</nav>
   <div className="mb-8 max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[.2em] text-primary">China · {tour.tier} · {tour.duration}</p><h1 className="mt-4 font-serif text-4xl md:text-6xl">Golden China</h1><p className="mt-5 text-lg leading-relaxed text-ink-muted">{tour.shortDescription}</p></div>
   <JourneyGallery images={photos}/>
  </div><TrustBar/><TourTrustSignals/>
  <nav aria-label="On this page" className="border-y border-warm-200 bg-white"><div className="mx-auto flex max-w-7xl flex-wrap gap-x-7 gap-y-3 px-4 py-5 text-sm font-semibold">{[['overview','Overview'],['route-map','Route map'],['itinerary','Day by day'],['inclusions','Inclusions'],['planning-resources','Travel guides'],['enquiry','Enquire']].map(([id,label])=><a key={id} href={'#'+id} className="text-primary hover:underline">{label}</a>)}</div></nav>
  <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-12 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]"><div className="min-w-0 space-y-14">
   <section id="overview" className="scroll-mt-24"><h2 className="font-serif text-3xl">A journey through China’s icons.</h2><ul className="mt-6 grid gap-4 sm:grid-cols-2">{tour.highlights.map(h=><li key={h} className="flex gap-3 rounded-xl border border-warm-200 bg-white p-4 text-sm leading-relaxed"><span className="text-primary" aria-hidden>✦</span>{h}</li>)}</ul><h3 className="mt-8 font-semibold">Experiences included in this journey</h3><div className="mt-3 flex flex-wrap gap-2">{experiences.filter(e=>includesExperience(tour,e.id)).map(e=><Link key={e.id} href={'/tours/find?experience='+e.id} className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm text-primary">{e.title} ↗</Link>)}</div></section>
   <section id="route-map" className="scroll-mt-24"><h2 className="mb-6 font-serif text-3xl">Your route at a glance.</h2><TourRouteMap slug={tour.slug} tourName={tour.name}/></section>
   <section id="itinerary" className="scroll-mt-24"><div className="mb-8 flex flex-wrap items-center justify-between gap-5"><h2 className="font-serif text-3xl">Your journey, day by day.</h2><ItineraryActions tourName={tour.name} tourSlug={tour.slug} destination={tour.destination} tier={tour.tier} variant="toolbar"/></div>
    <div className="ml-3 border-l border-secondary/50 pl-7 md:pl-10">{tour.itinerary.map(day=><details key={day.day} open={day.day===1} className="relative border-b border-warm-200 py-6 first:pt-0"><span className="absolute -left-[35px] top-7 h-3 w-3 rounded-full border-2 border-surface bg-primary md:-left-[47px]" aria-hidden/><summary className="cursor-pointer list-none"><span className="text-xs font-semibold uppercase tracking-[.15em] text-primary">Day {String(day.day).padStart(2,'0')}</span><h3 className="mt-2 flex justify-between gap-4 font-serif text-xl md:text-2xl">{dayHeadings[day.day] || day.title}<span className="text-lg text-primary" aria-hidden>＋</span></h3><p className="mt-2 text-sm text-ink-muted">{day.title} · View details</p></summary><div className="mt-5 text-ink-muted"><p className="whitespace-pre-line leading-relaxed">{day.description}</p><p className="mt-4 text-sm"><strong>Meals:</strong> {day.meals.length ? day.meals.join(', ') : 'See day description'}</p>{day.accommodation && <p className="mt-2 text-sm"><strong>Stay:</strong> {day.accommodation}</p>}</div></details>)}</div>
   </section>
   <section id="inclusions" className="scroll-mt-24"><TourInclusions inclusions={tour.inclusions} exclusions={tour.exclusions} itinerary={tour.itinerary}/>{tour.singleSupplement && <p className="mt-4 text-sm">Single supplement: {tour.singleSupplement}</p>}</section>
   <TourSupportingContentLinks tour={tour}/>
  </div><Suspense fallback={<a href="/contact">Contact CTS to enquire about this journey</a>}><GoldenBooking tour={tour}/></Suspense></div>
  <section className="mx-auto max-w-7xl px-4 py-12"><h2 className="font-serif text-3xl">You may also like.</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{related.map(t=>{const offer=matchingOffer(t,{})!;return <Link href={tourUrl(t)+(offer.date?'?date='+offer.date:'')} key={t.id} className="overflow-hidden rounded-2xl border border-warm-200 bg-white"><div className="relative aspect-[16/10]"><Image src={t.heroImage} alt={t.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover"/></div><div className="p-6"><p className="text-xs uppercase tracking-widest text-primary">{t.duration} · {t.tier}</p><h3 className="mt-3 font-serif text-2xl">{t.name}</h3><p className="mt-3 line-clamp-2 text-sm text-ink-muted">{t.shortDescription}</p><p className="mt-5 text-sm">{offer.label}</p><p className="mt-2 font-semibold text-primary">{offer.price} <span className="text-xs font-normal">per person</span> →</p></div></Link>})}</div></section>
  <ExperienceDiscovery/><FAQSection faqs={getTourPageFaqsForTour(tour,getDestinationBySlug(tour.destination)!.name)} />
 </div>;
}
