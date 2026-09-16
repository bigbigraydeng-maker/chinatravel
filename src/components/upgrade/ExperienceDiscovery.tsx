import Image from 'next/image';
import Link from 'next/link';
import { experiences } from '@/lib/tour-discovery';
export default function ExperienceDiscovery() {
 return <section id="experience-discovery" className="mx-auto max-w-7xl px-4 py-14 md:py-20">
  <p className="mb-3 text-xs font-semibold uppercase tracking-[.2em] text-primary">Follow your curiosity</p><h2 className="font-serif text-3xl md:text-4xl">What would you love to experience?</h2><p className="mt-4 max-w-2xl text-ink-muted">You don’t need to know every city. Start with the moments you’re travelling for, and discover the journeys that include them.</p>
  <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{experiences.filter(e=>!e.customRequest).map(e=><Link key={e.id} href={e.customRequest ? `/tailor-made?experience=${e.id}#enquiry-form` : `/tours/find?experience=${e.id}`} className="group overflow-hidden rounded-2xl border border-warm-200 bg-white">
    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-ink to-primary">{e.image ? <Image unoptimized={e.image.startsWith('/')} src={e.image} alt={e.title} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105"/> : <span className="absolute inset-0 flex items-center justify-center text-7xl text-secondary" aria-hidden>✦</span>}</div>
    <div className="p-5"><span className="text-xs uppercase tracking-widest text-primary">{e.category}</span><h3 className="mt-2 font-serif text-xl">{e.title}</h3><p className="mt-2 text-sm text-ink-muted">{e.subtitle}</p><p className="mt-4 text-sm font-semibold text-primary">{e.customRequest ? 'Ask about a tailor-made visit' : 'Find tours with this experience'} →</p></div>
  </Link>)}</div>
 </section>;
}
