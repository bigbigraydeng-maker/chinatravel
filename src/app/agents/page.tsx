import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Handshake,
  Headphones,
  Mail,
  MapPinned,
  Phone,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';

import { getTourBySlug } from '@/lib/data/tours';
import { OCTOBER_2026_SPOTLIGHT_TOURS } from '@/lib/campaigns/october-2026-spotlight';

export const metadata: Metadata = {
  title: 'Travel Agent Partnerships | CTS Tours New Zealand',
  description:
    'Partner with CTS Tours for China travel expertise, an Auckland-based trade team, direct China operations, agent training and end-to-end client support.',
  keywords: [
    'CTS Tours travel agent partnership',
    'China tours for New Zealand travel agents',
    'China travel trade support',
    'China Unlocked agent training',
    'New Zealand travel agent China specialist',
  ],
  openGraph: {
    title: 'Let’s Grow China Travel Together | CTS Tours',
    description:
      'A China specialist partner for New Zealand travel advisors — local support, direct operations, training and client-ready touring products.',
    type: 'website',
    images: [
      {
        url: '/blog/group-great-wall-cts.jpg',
        alt: 'CTS Tours guests and tour leaders together at the Great Wall of China',
      },
    ],
  },
  alternates: { canonical: '/agents' },
};

const CHINA_UNLOCKED_REGISTER_URL =
  'https://os.ctstours.co.nz/widget/form/zBLTPanEAiP9Eifa1qAb';
const CHINA_UNLOCKED_PORTAL_URL = 'https://chinaunlocked.ctstours.co.nz';

const CHRISTMAS_HERO_IMAGE =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/tours/shanghai-night-red/shanghai-night-red.jpg';

const partnershipPillars = [
  {
    icon: Handshake,
    title: 'Your client relationship comes first',
    body: 'You remain the trusted advisor. We bring destination depth, practical answers and reliable delivery behind every recommendation.',
  },
  {
    icon: Headphones,
    title: 'A team that answers',
    body: 'Talk to our Auckland team for product advice, itinerary questions and help before, during and after your client’s journey.',
  },
  {
    icon: BookOpenCheck,
    title: 'Confidence to sell China',
    body: 'China Unlocked training, client-ready itineraries and timely destination updates help your team turn interest into bookings.',
  },
];

const partnershipSteps = [
  {
    number: '01',
    title: 'Share the client brief',
    body: 'Tell us the dates, budget, interests and travel style. A rough brief is enough to start.',
  },
  {
    number: '02',
    title: 'Shape the right journey',
    body: 'Choose a group departure or work with us on a tailor-made route using our on-the-ground China knowledge.',
  },
  {
    number: '03',
    title: 'Present with confidence',
    body: 'We help clarify inclusions, routing, entry requirements and the practical details your client will ask about.',
  },
  {
    number: '04',
    title: 'Stay supported throughout',
    body: 'Our New Zealand and China teams stay connected from confirmation through to the client’s return home.',
  },
];

const AgentsPage = () => {
  const christmasAkl = getTourBySlug('china', 'discovery', 'china-icons-collection');
  const christmasChc = getTourBySlug(
    'china',
    'discovery',
    'china-icons-collection-christchurch',
  );
  const otherSpotlight = OCTOBER_2026_SPOTLIGHT_TOURS.filter(
    (card) => card.slug !== 'china-icons-collection',
  ).map((card) => ({
    card,
    tour: getTourBySlug(card.destination, card.tier, card.slug),
  }));

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-[#171923] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(196,30,58,0.28),transparent_38%)]" />
        <div className="relative mx-auto grid min-h-[680px] max-w-[1440px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative z-10 flex items-center px-6 py-20 md:px-12 lg:px-16 xl:px-24">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-secondary" aria-hidden />
                Built for New Zealand travel advisors
              </div>
              <h1 className="font-serif text-5xl font-semibold leading-[1.04] md:text-6xl xl:text-7xl">
                Let&apos;s grow China travel
                <span className="block text-secondary">together.</span>
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/78 md:text-xl">
                CTS values the expertise, trust and client relationships travel agents bring.
                We want to be the China partner behind your success — responsive in New Zealand,
                connected on the ground, and invested in growing alongside your business.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#trade-contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-bold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Talk to our trade team
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href={CHINA_UNLOCKED_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  Train with China Unlocked
                </a>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-white/60">
                <ShieldCheck className="h-4 w-4 text-secondary" aria-hidden />
                Your client relationship stays at the centre of every conversation.
              </p>
            </div>
          </div>

          <div className="relative min-h-[520px] lg:min-h-[680px]">
            <Image
              src="/blog/group-great-wall-cts.jpg"
              alt="CTS Tours guests and tour leaders together at the Great Wall of China"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="object-cover [object-position:center_62%]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171923] via-[#171923]/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-7 rounded-2xl border border-white/15 bg-black/45 p-5 backdrop-blur-md md:inset-x-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                One accountable partner
              </p>
              <p className="mt-2 font-serif text-xl text-white">
                Auckland support. Direct China operations. Shared commitment to the traveller.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-warm-100 bg-warm-50/70">
        <div className="container grid grid-cols-2 gap-px py-8 md:grid-cols-4">
          {[
            ['Auckland-based', 'Trade support'],
            ['Since 2000', 'New Zealand team'],
            ['Direct', 'China operations'],
            ['Dedicated', 'Agent training'],
          ].map(([value, label]) => (
            <div key={label} className="px-4 py-3 text-center md:border-r md:last:border-r-0 md:border-warm-100">
              <div className="font-serif text-2xl font-bold text-gray-900">{value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Our partnership promise
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-gray-900 md:text-5xl">
              Your expertise leads. Our China team delivers.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Strong agent partnerships are built through useful support, honest communication and
              a shared focus on the client. That is how we want to work with you.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
            {partnershipPillars.map(({ icon: Icon, title, body }) => (
              <article
                key={title}
                className="rounded-3xl border border-warm-100 bg-warm-50/55 p-7 transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-semibold text-gray-900">{title}</h3>
                <p className="mt-3 leading-relaxed text-gray-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section overflow-hidden bg-[#f7f2eb]">
        <div className="container grid items-start gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Easy to work together
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-gray-900 md:text-5xl">
              From first brief to welcome home.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              You do not need to be a China expert before contacting us. Bring the client insight;
              we will bring the destination knowledge and operational detail.
            </p>
            <a
              href="mailto:info@ctstours.co.nz?subject=Travel%20agent%20partnership%20enquiry"
              className="mt-7 inline-flex items-center gap-2 font-bold text-primary hover:underline"
            >
              Start with a client brief <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <ol className="space-y-4">
            {partnershipSteps.map((step) => (
              <li
                key={step.number}
                className="grid gap-4 rounded-3xl border border-white/80 bg-white p-6 shadow-sm sm:grid-cols-[72px_1fr] sm:p-7"
              >
                <div className="font-serif text-4xl font-semibold text-primary/35">{step.number}</div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-gray-600">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid overflow-hidden rounded-[2rem] border border-warm-100 bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[380px]">
              <Image
                src="/blog/group-temple-of-heaven-beijing.jpg"
                alt="CTS Tours travellers at the Temple of Heaven in Beijing"
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover [object-position:center_58%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="absolute inset-x-6 bottom-6 font-serif text-2xl text-white">
                Destination knowledge your team can use.
              </p>
            </div>
            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-14">
              <div className="flex items-center gap-3 text-primary">
                <BookOpenCheck className="h-7 w-7" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">China Unlocked</span>
              </div>
              <h2 className="mt-5 font-serif text-4xl font-semibold text-gray-900">
                Build confidence. Win the conversation.
              </h2>
              <p className="mt-5 leading-relaxed text-gray-600">
                Our China Travel Specialist programme is designed for New Zealand agents. Learn
                the product tiers, entry essentials, destination stories and answers that help
                clients feel ready to book.
              </p>
              <ul className="mt-6 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                {[
                  'Practical China product knowledge',
                  'Client objection handling',
                  'Visa and entry updates',
                  'Sales-ready destination stories',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={CHINA_UNLOCKED_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-center"
                >
                  Register for China Unlocked →
                </a>
                <a
                  href={CHINA_UNLOCKED_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-center"
                >
                  Agent login
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-warm-50">
        <div className="container">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Client-ready opportunities
            </span>
            <h2 className="mt-4 font-serif text-4xl font-semibold text-gray-900">
              Tours your clients can enquire about now
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Use these confirmed departures as a starting point, or ask us to adapt the journey
              around your client&apos;s dates and interests.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-warm-100 bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[360px]">
                <Image
                  src={CHRISTMAS_HERO_IMAGE}
                  alt="Shanghai skyline at night for the Christmas and New Year China tour"
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <div className="absolute inset-x-6 bottom-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                    22 December 2026
                  </p>
                  <p className="mt-2 font-serif text-2xl">Christmas &amp; New Year in China</p>
                </div>
              </div>
              <div className="p-7 md:p-10">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-2xl bg-warm-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Ex Auckland</p>
                    <p className="mt-2 font-serif text-xl font-semibold text-gray-900">
                      {christmasAkl?.duration ?? '16 Days'}
                    </p>
                    <p className="mt-1 font-bold text-primary">From NZD $7,188pp</p>
                  </div>
                  <div className="rounded-2xl bg-warm-50 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Ex Christchurch</p>
                    <p className="mt-2 font-serif text-xl font-semibold text-gray-900">
                      {christmasChc?.duration ?? '15 Days'}
                    </p>
                    <p className="mt-1 font-bold text-primary">From NZD $6,188pp</p>
                  </div>
                </div>
                <p className="mt-6 leading-relaxed text-gray-600">
                  Shanghai, Beijing, Xi&apos;an and Chongqing across the festive season, with two
                  New Zealand departure options for your clients.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href="/tours/china/discovery/china-icons-collection" className="btn-primary text-center">
                    Auckland itinerary →
                  </Link>
                  <Link
                    href="/tours/china/discovery/china-icons-collection-christchurch"
                    className="btn-secondary text-center"
                  >
                    Christchurch itinerary →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {otherSpotlight.map(({ card, tour }) => {
              if (!tour) return null;
              const displayName = tour.name.replace(/^China Discovery — /, '');
              return (
                <Link
                  key={card.slug}
                  href={card.href}
                  className="group grid overflow-hidden rounded-3xl border border-warm-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[0.42fr_0.58fr]"
                >
                  <div className="relative min-h-[230px]">
                    <Image
                      src={tour.heroImage}
                      alt={tour.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(min-width:768px) 24vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                      {card.departureLabel}
                    </p>
                    <h3 className="mt-3 font-serif text-2xl font-semibold text-gray-900">{displayName}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {tour.duration} · {card.routeCities.join(' · ')}
                    </p>
                    <p className="mt-4 font-bold text-primary">{tour.price}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:text-primary">
                      View itinerary <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="trade-contact" className="scroll-mt-24 bg-[#171923] py-20 text-white md:py-24">
        <div className="container grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
              Start the partnership
            </span>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl font-semibold md:text-5xl">
              Bring us the next client conversation.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
              Whether you need a quick product answer, a complete itinerary or support building
              your China business, our trade team is ready to work alongside you.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <a
              href="mailto:info@ctstours.co.nz?subject=Travel%20agent%20partnership%20enquiry"
              className="group rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition hover:border-secondary/60 hover:bg-white/10"
            >
              <Mail className="h-6 w-6 text-secondary" aria-hidden />
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-white/50">Trade email</p>
              <p className="mt-2 font-bold text-white">info@ctstours.co.nz</p>
            </a>
            <a
              href="tel:0800287888"
              className="group rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition hover:border-secondary/60 hover:bg-white/10"
            >
              <Phone className="h-6 w-6 text-secondary" aria-hidden />
              <p className="mt-5 text-xs font-bold uppercase tracking-widest text-white/50">Trade line</p>
              <p className="mt-2 font-bold text-white">0800 CTS 888</p>
            </a>
          </div>
        </div>
        <div className="container mt-12 grid gap-4 border-t border-white/10 pt-8 text-sm text-white/60 md:grid-cols-3">
          <p className="flex items-center gap-2"><UsersRound className="h-4 w-4 text-secondary" aria-hidden /> Agent-first collaboration</p>
          <p className="flex items-center gap-2"><MapPinned className="h-4 w-4 text-secondary" aria-hidden /> Direct China destination knowledge</p>
          <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-secondary" aria-hidden /> Support from enquiry to return</p>
        </div>
      </section>
    </main>
  );
};

export default AgentsPage;
