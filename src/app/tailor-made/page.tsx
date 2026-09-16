import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import TailorMadeForm from '@/components/TailorMadeForm';
import TrustBar from '@/components/TrustBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import FAQSection from '@/components/FAQSection';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { generateBreadcrumbListSchema, generateWebPageSchema } from '@/lib/schema-seo';
const PAGE_PATH = '/tailor-made';
const PAGE_TITLE = 'Tailor Made Tours';
const PAGE_DESCRIPTION =
  'Design a flexible private or small-group Asia itinerary with CTS: your dates, pace, and hotels—backed by Auckland support, TAANZ bonding, and direct China operations. Enquire online or call 0800 CTS 888.';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
    ogImagePath:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
    ogImageAlt: 'Tailor-made China and Asia tours, CTS Tours',
    keywords: [
      'tailor made tours',
      'custom China itinerary',
      'bespoke travel New Zealand',
      'private China tour',
      'Asia custom tour',
      'CTS tailor made',
    ],
    ogType: 'website',
    openGraphTitle: PAGE_TITLE,
    openGraphDescription: PAGE_DESCRIPTION,
  });
}


const ideas = [
  {title:'Your first China journey',body:'Practical tips for your first China trip, from useful apps to getting around.',href:'/blog/first-time-china-travel-tips',image:'planner-palace',alt:'Palace architecture in Beijing'},
  {title:'Slow down and explore',body:'Explore Hangzhou’s West Lake, quiet causeways, tea villages and gardens.',href:'/blog/west-lake-hangzhou-travel-guide',image:'planner-westlake',alt:'West Lake in Hangzhou'},
  {title:'Follow the flavours',body:'Discover Peking duck, regional specialities and local dishes to try on your journey.',href:'/local-food-guide',image:'planner-food',alt:'Peking duck being carved by a chef'},
];
const faqs = [
  {question:'Do I need a finished itinerary before enquiring?',answer:'No. Share your interests, approximate timing and budget. Our team can help with destinations, routing and a suitable pace.'},
  {question:'Can I travel beyond China?',answer:'Yes. Tell us if you are considering Japan, Vietnam or a multi-country itinerary. Our Asia specialists will discuss a suitable route.'},
  {question:'Does submitting this form make a booking?',answer:'No. This is an enquiry. CTS will discuss your trip, prepare a proposal and confirm availability and pricing before you decide to book.'},
  {question:'Can I request theme parks or a particular experience?',answer:'Yes. Tell us the experience you have in mind, such as Universal Beijing Resort. Visits, tickets and any additional costs need to be checked and confirmed in your proposal.'},
];
export default function TailorMadePage() {
 return <div className="bg-surface text-ink">
  <SchemaMarkup data={[generateWebPageSchema(PAGE_TITLE,PAGE_DESCRIPTION,PAGE_PATH),generateBreadcrumbListSchema([{name:'Home',url:'/'},{name:'Tailor Made',url:PAGE_PATH}])]} />
  <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
    <div><p className="mb-5 text-xs font-semibold uppercase tracking-[.22em] text-primary">A journey designed around you</p><h1 className="font-serif text-4xl leading-tight md:text-6xl">Tailor-made China.<br/><span className="text-primary">Your kind of journey.</span></h1><p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">Your dates. Your pace. Your interests. Tell our Auckland specialists what you love, and we’ll help shape a China or Asia holiday that feels like you.</p><a href="#enquiry-form" className="mt-8 inline-block rounded-lg bg-primary px-7 py-4 font-semibold text-white">Start planning my trip →</a><p className="mt-4 text-sm text-ink-muted">No obligation. A real specialist, from the first conversation.</p></div>
    <div className="relative aspect-[5/4] overflow-hidden rounded-t-[6rem] rounded-b-2xl"><Image unoptimized src="/images/cts-upgrade/planner-palace.webp" alt="Beijing palace rooftops, inspiration for a tailor-made China journey" fill priority sizes="(max-width:768px) 100vw, 50vw" className="object-cover"/></div>
  </section><TrustBar />
  <section className="mx-auto max-w-7xl px-4 py-16"><p className="text-xs font-semibold uppercase tracking-widest text-primary">A little inspiration</p><h2 className="mt-3 font-serif text-3xl">There’s more than one way to see China.</h2><p className="mt-4 text-ink-muted">Explore our China travel guides for ideas to shape your own journey.</p><div className="mt-8 grid gap-6 md:grid-cols-3">{ideas.map(i=><Link key={i.title} href={i.href} className="overflow-hidden rounded-2xl border border-warm-200 bg-white"><div className="relative aspect-[16/10]"><Image unoptimized src={'/images/cts-upgrade/'+i.image+'.webp'} alt={i.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover"/></div><div className="p-6"><h3 className="font-serif text-xl">{i.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink-muted">{i.body}</p><p className="mt-5 font-semibold text-primary">Read the guide →</p></div></Link>)}</div></section>
  <section className="bg-white py-14"><div className="mx-auto max-w-7xl px-4"><h2 className="font-serif text-3xl">From an idea to your itinerary.</h2><div className="mt-8 grid gap-8 md:grid-cols-3">{[['01','Tell us your ideas','A few details are enough to begin. Tell us what matters most to you.'],['02','Shape it together','Your specialist helps refine the route, pace, hotels and budget.'],['03','Confirm your journey','Review your proposal, inclusions and availability before booking.']].map(([n,t,b])=><div key={n} className="border-t border-secondary pt-5"><span className="text-sm text-primary">{n}</span><h3 className="mt-3 font-serif text-2xl">{t}</h3><p className="mt-3 text-ink-muted">{b}</p></div>)}</div></div></section>
  <section id="enquiry-form" className="mx-auto grid max-w-7xl scroll-mt-24 items-start gap-10 px-4 py-16 lg:grid-cols-[1fr_2fr]">
    <aside className="lg:sticky lg:top-28"><p className="text-xs font-semibold uppercase tracking-widest text-primary">Let’s make it yours</p><h2 className="mt-4 font-serif text-3xl">Your journey starts with a conversation.</h2><p className="mt-5 leading-relaxed text-ink-muted">Not sure about dates or destinations? Leave them flexible. Your specialist will help you work it out.</p><div className="mt-8 flex items-center gap-4"><Image unoptimized src="/images/cts-upgrade/baker.webp" alt="Baker Gu, CTS travel specialist" width={72} height={72} className="h-18 w-18 rounded-full object-cover"/><div><Link href="/experts/baker-gu" className="font-semibold text-primary">Meet Baker Gu →</Link><p className="text-sm text-ink-muted">Your China travel specialist</p></div></div><a href="tel:0800287888" className="mt-6 inline-block font-semibold">Prefer to talk? 0800 CTS 888</a></aside>
    <Suspense fallback={<p>Loading your enquiry form…</p>}><TailorMadeForm /></Suspense>
  </section><FAQSection faqs={faqs} />
 </div>;
}
