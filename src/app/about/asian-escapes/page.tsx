import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Asiascape Holidays | On-the-Ground Team in Asia | CTS Tours',
  description:
    'Asiascape Holidays is CTS Tours’ ground operations across China, Japan, Korea, and Vietnam — one coordinated team from airport meet-and-greet through every day of your trip.',
  keywords: [
    'Asiascape Holidays',
    'CTS Tours China',
    'Asia ground operations',
    'China tours New Zealand',
    'airport meet and greet China',
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
          <div className="mx-auto mb-8 flex max-w-lg justify-center rounded-2xl bg-white/95 p-6 shadow-xl ring-1 ring-white/30 md:mb-10 md:p-8">
            <Image
              src="/images/brand/asiascape-holidays-logo.png"
              alt="AsiaScape Holidays logo — map pin with Asian motifs and wordmark"
              width={440}
              height={280}
              className="h-auto w-full max-w-[min(100%,360px)] object-contain"
              priority
            />
          </div>
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-secondary">
            The on-the-ground face of CTS Tours in Asia
          </p>
          <h1 className="mx-auto max-w-4xl text-center font-serif text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            Asiascape Holidays — who meets you when you land
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="space-y-6 text-lg leading-relaxed text-gray-700">
            <p>
              Asiascape Holidays is CTS Tours’ ground operations across China, Japan, Korea, and Vietnam. From
              the moment you arrive, it is the name and team you will see at the airport, on transfers, and
              throughout your sightseeing — one consistent standard from arrival to departure.
            </p>
            <p>
              You are not pieced together from unrelated local suppliers in each country. Your itinerary is
              delivered by a coordinated CTS system, backed by our own operational presence on the ground.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-warm-200 bg-warm-50/50 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-10 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
            What you can expect on the ground
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-accent">When you arrive</h3>
              <BulletList
                items={[
                  'Airport meet and greet with clear Asiascape signage so you know who to look for',
                  'A local Asiascape representative on hand to help straight away',
                  'Coordinated transfer to your hotel — no guesswork or long waits',
                ]}
              />
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-accent">During your trip</h3>
              <BulletList
                items={[
                  'Professional local guides and drivers, organised by Asiascape',
                  'Asiascape flags and branding at meeting points so groups are easy to spot',
                  'Transfers, sightseeing, and day-to-day logistics handled as one flow',
                ]}
              />
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-accent">Extras (where your programme includes them)</h3>
              <BulletList
                items={[
                  'Branded lanyards, hats, or umbrellas on some departures for easy group recognition',
                  "Emergency contact through Asiascape's local teams",
                  'Practical help when you need it — from dining suggestions to arranging support if something goes wrong',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-8 font-serif text-2xl font-bold text-gray-900 md:text-3xl">
            Why that matters for your holiday
          </h2>
          <BulletList
            items={[
              'Less uncertainty for first-time visitors to Asia — you know exactly who is meeting you after a long flight',
              'A simple story: look for the Asiascape sign; your guide and driver are part of the same team',
              'The same operational approach across China, Japan, Korea, and Vietnam where we operate',
              'Local teams employed and trained within the CTS structure — not an unknown third-party ground handler',
              'A managed handoff from plane to hotel and each day after — not left to chance at the kerb',
            ]}
          />

          <p className="mt-10 text-lg leading-relaxed text-gray-700">
            <strong>CTS and Asiascape together:</strong> you are not booking a different ground operator in every
            destination. When you travel to China with CTS, the Asiascape team on the ground is part of the same
            organisation — not a one-off subcontractor. That continuity is something we are proud to stand behind.
          </p>
        </div>
      </section>

      <section className="bg-accent py-16 text-white md:py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-center font-serif text-xl font-bold uppercase tracking-wide text-white/95 md:text-2xl">
            In plain words
          </h2>
          <blockquote className="rounded-2xl border border-white/20 bg-white/10 p-8 text-lg leading-relaxed text-white/95 backdrop-blur-sm md:p-10">
            When you arrive in China, the Asiascape team meets you at the airport — they are CTS Tours’ local
            operations crew. You will see their signage right away. They look after the ground side of your trip:
            your guide, your driver, your transfers, and the day-to-day running order. It is one coordinated team,
            not a patchwork of unrelated suppliers.
          </blockquote>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-warm-50/50">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <h2 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">
                Our team on the ground
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                These are Asiascape&apos;s own team members — not casual day hires — at work on the Great Wall
                during a live CTS tour. They carry Asiascape signage, lead the group through ticketing and entry,
                and manage the full day on site.
              </p>
              <p className="text-gray-700 leading-relaxed">
                When you book with CTS, this is the kind of crew you travel with: trained, briefed, and part of the
                same organisation — not pulled from an anonymous pool on the morning of your visit.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/images/great-wall-cts-1.jpg"
                  alt="Asiascape staff member with CTS Tours signage at the Great Wall of China"
                  width={480}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/images/great-wall-cts-2.jpg"
                  alt="Asiascape staff member with CTS Tours signage at the Great Wall of China"
                  width={480}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
