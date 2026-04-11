import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Asiascape Holidays | On-Ground Operations for Agents | CTS Tours',
  description:
    'Asiascape Holidays is the ground operations arm of CTS Tours across China, Japan, Korea, and Vietnam — one coordinated system for agents and clients from arrival to departure.',
  keywords: [
    'Asiascape Holidays',
    'CTS Tours agents',
    'Asia ground operations',
    'China tour agents New Zealand',
    'meet and greet Asia',
  ],
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-gray-700 leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AsianEscapesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-accent via-accent/95 to-primary/80 py-20 text-white md:py-24">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute left-20 top-20 h-80 w-80 rounded-full border-2 border-white/30" />
          <div className="absolute bottom-10 right-20 h-60 w-60 rounded-full border border-white/20" />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-secondary">
            For travel agents · A CTS Tours brand
          </p>
          <h1 className="mx-auto max-w-4xl text-center font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Asiascape Holidays — Your Clients&apos; On-Ground Experience
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              Asiascape Holidays is the ground operations arm of CTS Tours across China, Japan, Korea, and
              Vietnam. It is the brand your clients will see and interact with from the moment they arrive at
              their destination — ensuring consistent, high-quality service from arrival to departure.
            </p>
            <p>
              For agents, this is an important part of the CTS story. You are not booking separate, unrelated
              ground operators in each country. You are working with one coordinated system, backed by CTS&apos;s
              direct operational presence.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-warm-200 bg-warm-50/50 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-10 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
            What Your Clients Will Experience
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-accent">On arrival</h3>
              <BulletList
                items={[
                  'Meet and greet at the airport with Asiascape signage — clear identification for peace of mind',
                  'Local Asiascape representative ready to assist immediately',
                  'Coordinated transfer to hotel — no confusion, no waiting',
                ]}
              />
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-accent">During the trip</h3>
              <BulletList
                items={[
                  'Professional local guides and drivers, coordinated by Asiascape',
                  'Asiascape flag and branding for easy group recognition at meeting points and during tours',
                  'Coordinated transfers, sightseeing, and daily logistics handled seamlessly',
                ]}
              />
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-accent">Extras (by programme)</h3>
              <BulletList
                items={[
                  'Branded lanyards, hats, or umbrellas for group identification',
                  "Emergency contact support through Asiascape's local teams",
                  'On-ground assistance when clients need help — from restaurant recommendations to medical support',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-serif text-2xl font-bold text-gray-900 md:text-3xl">Why this helps you sell</h2>
          <BulletList
            items={[
              'Removes uncertainty for first-time Asia travellers — they know exactly who to look for on arrival',
              'Easy to explain to clients: “Look for the Asiascape sign when you land — your guide will be right there”',
              'Consistent service standard across multiple destinations — same operational system in China, Japan, Korea, and Vietnam',
              'Reliable local teams backed by CTS Tours — not outsourced to a third-party ground handler your client has never heard of',
              'Reduces complaints and confusion on arrival — the handoff from flight to ground is managed, not left to chance',
            ]}
          />

          <p className="mt-10 text-lg leading-relaxed text-gray-700">
            <strong>Your advantage with CTS + Asiascape:</strong> You are not booking separate operators in each
            country. You are working with one coordinated system. When a client travels to China with CTS, the
            Asiascape team on the ground is part of the same organisation — not a subcontractor. That&apos;s a
            genuine differentiator, and it&apos;s worth saying out loud to clients.
          </p>
        </div>
      </section>

      <section className="bg-accent py-16 text-white md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-center font-serif text-xl font-bold uppercase tracking-wide text-white/95 md:text-2xl">
            Client-ready script
          </h2>
          <blockquote className="rounded-2xl border border-white/20 bg-white/10 p-8 text-lg leading-relaxed text-white/95 backdrop-blur-sm md:p-10">
            When you arrive in China, you&apos;ll be met at the airport by the Asiascape team — they&apos;re the
            local operations arm of CTS Tours. You&apos;ll see their signage straight away. They handle everything
            on the ground: your guide, your driver, your transfers, your daily logistics. It&apos;s all coordinated
            by one team, not pieced together from different suppliers.
          </blockquote>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900">Next steps</h2>
          <p className="mb-8 text-gray-600">
            Selling China? Point clients to CTS product pages. For agent tools and support, use the links below.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/agents"
              className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-colors hover:bg-primary/90"
            >
              Agent resources
            </Link>
            <Link
              href="/tours/china"
              className="inline-block rounded-lg border-2 border-primary px-8 py-3 font-semibold text-primary transition-colors hover:bg-primary/5"
            >
              Explore China tours
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded-lg border-2 border-gray-300 px-8 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-50"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
