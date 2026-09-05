import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import { migratedSite } from '@/lib/site-media';
import { getTourBySlug } from '@/lib/data/tours';
import { OCTOBER_2026_SPOTLIGHT_TOURS } from '@/lib/campaigns/october-2026-spotlight';

export const metadata: Metadata = {
  title: 'Agent Hub — Christmas & New Year in China | CTS Tours',
  description:
    "CTS Tours trade hub for New Zealand agents. This December's one-off Christmas & New Year in China departure, current spotlight tours, 2027 releases coming, and China Unlocked training.",
  keywords: [
    'Agent hub',
    'CTS Tours trade',
    'Christmas China tour',
    'New Zealand travel agents',
    'China Unlocked',
    'Spotlight tours',
  ],
  openGraph: {
    title: 'Agent Hub — Christmas & New Year in China | CTS Tours',
    description:
      "CTS Tours trade hub. Christmas 2026 one-off departure, spotlight tours, and 2027 releases.",
    type: 'website',
  },
  alternates: { canonical: '/agents' },
};

const CHINA_UNLOCKED_REGISTER_URL =
  'https://os.ctstours.co.nz/widget/form/zBLTPanEAiP9Eifa1qAb';
const CHINA_UNLOCKED_PORTAL_URL = 'https://chinaunlocked.ctstours.co.nz';

// Shared photo used by both the ad and the campaign card
const CHRISTMAS_HERO_IMAGE =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-night-red/shanghai-night-red.jpg';

const AgentsPage = () => {
  const christmasAkl = getTourBySlug('china', 'discovery', 'china-icons-collection');
  const christmasChc = getTourBySlug(
    'china',
    'discovery',
    'china-icons-collection-christchurch',
  );
  const otherSpotlight = OCTOBER_2026_SPOTLIGHT_TOURS.filter(
    (c) => c.slug !== 'china-icons-collection',
  ).map((card) => ({
    card,
    tour: getTourBySlug(card.destination, card.tier, card.slug),
  }));

  return (
    <div>
      <ImmersivePageHero
        eyebrow="Agent hub · one December departure only"
        title="Christmas & New Year in China"
        subtitle="A Christmas Eve in Shanghai. A New Year's Eve in Xi'an. Small group of 18 · direct ex Christchurch."
        imageSrc={migratedSite('forbidden-city-aerial-portrait.jpg')}
        imageAlt="CTS Tours agent hub — Christmas & New Year in China"
        priority
      />

      {/* PRIMARY CAMPAIGN — Christmas & New Year in China */}
      <section className="section bg-warm-50">
        <div className="container">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3">
              This December&apos;s one-off
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              Christmas &amp; New Year in China
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Two of China&apos;s biggest nights in two of its most iconic
              cities — Christmas Eve under Shanghai&apos;s skyline, and New
              Year&apos;s Eve on Xi&apos;an&apos;s ancient city wall. Book your
              clients before this one departure is gone.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-warm-100 shadow-sm bg-white">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[380px]">
                <Image
                  src={CHRISTMAS_HERO_IMAGE}
                  alt="Shanghai Bund at night — Christmas Eve in Shanghai"
                  fill
                  className="object-cover"
                  sizes="(min-width:768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5 text-white">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-1 h-5 bg-secondary" />
                    <span className="italic font-serif text-lg">
                      A Christmas Eve in Shanghai.
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-10 space-y-5">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-xs uppercase text-gray-500 tracking-widest mb-1">
                      Ex Auckland
                    </div>
                    <div className="font-bold text-gray-900">
                      {christmasAkl?.duration ?? '16 Days'} · from{' '}
                      <span className="text-primary">NZD $7,188pp</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase text-gray-500 tracking-widest mb-1">
                      Ex Christchurch
                    </div>
                    <div className="font-bold text-gray-900">
                      {christmasChc?.duration ?? '15 Days'} · from{' '}
                      <span className="text-primary">NZD $6,188pp</span>
                    </div>
                  </div>
                </div>

                <ul className="text-sm text-gray-700 space-y-2 border-t border-warm-100 pt-4">
                  <li>
                    <b>Departs:</b> 22 December 2026
                  </li>
                  <li>
                    <b>Small group:</b> maximum 18 travellers
                  </li>
                  <li>
                    <b>Route:</b> Shanghai · Beijing · Xi&apos;an · Chongqing ·
                    Guangzhou
                  </li>
                  <li>
                    <b>Airline:</b> China Southern (direct ex Christchurch)
                  </li>
                </ul>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/tours/china/discovery/china-icons-collection"
                    className="btn-primary"
                  >
                    16-day AKL itinerary →
                  </Link>
                  <Link
                    href="/tours/china/discovery/china-icons-collection-christchurch"
                    className="btn-secondary"
                  >
                    15-day CHC itinerary →
                  </Link>
                </div>

                <div className="text-xs text-gray-500 italic pt-3 border-t border-warm-100">
                  Kiwi-led for 25 years · part of China Travel Service · flying
                  with China Southern
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER SPOTLIGHT TOURS */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3">
              Also in current spotlight
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif">
              More departures your clients can book now
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {otherSpotlight.map(({ card, tour }) => {
              if (!tour) return null;
              const displayName = tour.name.replace(/^China Discovery — /, '');
              return (
                <Link
                  key={card.slug}
                  href={card.href}
                  className="group block rounded-2xl overflow-hidden border border-warm-100 shadow-sm bg-white transition hover:shadow-md"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={tour.heroImage}
                      alt={tour.title}
                      fill
                      className="object-cover"
                      sizes="(min-width:768px) 50vw, 100vw"
                    />
                    {card.badgeText && (
                      <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full tracking-wider uppercase">
                        {card.badgeText}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-serif mb-2">
                      {displayName}
                    </h3>
                    <div className="text-sm text-gray-600 mb-3">
                      {tour.duration} · Departs {card.departureLabel} ·{' '}
                      {card.routeCities.join(' · ')}
                    </div>
                    <div className="text-lg font-bold text-primary">
                      {tour.price}
                    </div>
                    <div className="mt-4 text-sm font-bold text-primary group-hover:underline">
                      View itinerary →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2027 TEASER */}
      <section className="section bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3">
              Coming in 2027
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-5">
              More first-time China tours than ever
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              We&apos;re releasing our biggest programme yet next year — new
              routes, new regions, and small-group departures we&apos;ve never
              offered before.
            </p>
            <p className="text-sm text-gray-600 italic mb-8">
              Enrol in the China Unlocked programme to be first to see the 2027
              line-up.
            </p>
            <a
              href={CHINA_UNLOCKED_REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Enrol in China Unlocked →
            </a>
          </div>
        </div>
      </section>

      {/* CHINA UNLOCKED — preserved from original, promoted as the primary training CTA */}
      <section className="section bg-white">
        <div className="container">
          <div className="rounded-2xl border border-warm-100 bg-white p-6 md:p-10 shadow-sm">
            <div className="flex flex-col items-center text-center gap-5 md:gap-6">
              <Image
                src="/images/brand/china-unlocked-cts-lockup.jpg"
                alt="China Unlocked and CTS Tours logo lockup"
                width={1000}
                height={200}
                className="h-auto w-full max-w-[640px]"
              />
              <div className="space-y-2 max-w-2xl">
                <p className="text-gray-800 text-sm md:text-base font-medium">
                  China Travel Specialist certification programme designed for
                  New Zealand travel agents.
                </p>
                <p className="text-gray-700 text-sm md:text-base">
                  Learn to sell China with confidence: visa-free access, product
                  tiers, client objection-handling, and CTS positioning.
                </p>
              </div>
              <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href={CHINA_UNLOCKED_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-primary/90 sm:flex-initial sm:min-w-[200px]"
                >
                  Register
                </a>
                <a
                  href={CHINA_UNLOCKED_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center rounded-xl border-2 border-primary bg-white px-6 py-3.5 text-center text-sm font-bold text-primary transition-colors hover:bg-primary/5 sm:flex-initial sm:min-w-[200px]"
                >
                  Already registered
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT — Book with CTS */}
      <section className="section bg-warm-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-3">
              Book with CTS
            </h2>
            <p className="text-gray-600 mb-8">
              Reach the CTS trade team direct to secure your clients&apos; seats
              or discuss tailor-made itineraries.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <a
                href="mailto:info@ctstours.co.nz"
                className="rounded-xl border-2 border-primary bg-white p-5 hover:bg-primary/5 transition"
              >
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                  Business email
                </div>
                <div className="font-bold text-primary">
                  info@ctstours.co.nz
                </div>
              </a>
              <a
                href="tel:0800287888"
                className="rounded-xl border-2 border-primary bg-white p-5 hover:bg-primary/5 transition"
              >
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                  Trade line
                </div>
                <div className="font-bold text-primary">0800 CTS 888</div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgentsPage;
