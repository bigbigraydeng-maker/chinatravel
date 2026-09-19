import Image from 'next/image';
import Link from 'next/link';
import type { Tour } from '@/lib/data/tours';
import SchemaMarkup from '@/components/SchemaMarkup';
import TourCard from '@/components/tours/TourCard';

interface ChinaStopoverLandingPageProps {
  tours: Tour[];
}

const stopoverFaqs = [
  {
    question: 'How long are the published China stopover packages?',
    answer:
      'The current CTS collection ranges from 2 to 5 days. Each tour page shows its exact sightseeing, meals, accommodation and exclusions so you can compare what fits your wider journey.',
  },
  {
    question: 'Can I add a China stopover when travelling to Europe, Japan or South Korea?',
    answer:
      'Potentially. It depends on the cities in your international routing, the time between sectors, ticket conditions and entry requirements for your passport. Send CTS your full flight itinerary before booking so the stopover can be checked against the actual connection.',
  },
  {
    question: 'Are international flights included in a stopover price?',
    answer:
      'Do not assume they are. Check the Included and Not Included sections on the individual tour page. International airfare, through-ticketing and connection changes are confirmed separately unless a product explicitly states otherwise.',
  },
  {
    question: 'Do New Zealand travellers need a visa for a China stopover?',
    answer:
      'Entry eligibility depends on passport, travel date, length of stay and routing. Read the current CTS visa guide, then reconfirm the requirements that apply to your exact trip before ticketing.',
  },
  {
    question: 'What should I send CTS before asking for a stopover quote?',
    answer:
      'Send the full flight itinerary, passenger passport nationalities, preferred China city, available dates and the number of travellers. This lets the team check timing, entry rules and the published land package together.',
  },
];

const journeyFits = [
  {
    eyebrow: 'Europe-bound journeys',
    title: 'Make a China connection part of the holiday',
    copy: 'If your selected airfare routes through a Chinese gateway, CTS can check whether a published 2–5 day city package fits between sectors.',
  },
  {
    eyebrow: 'Japan or South Korea',
    title: 'Add a second East Asia chapter',
    copy: 'A short China stay may complement a wider North Asia itinerary. The route, ticket rules and entry conditions must be reviewed before the stopover is confirmed.',
  },
  {
    eyebrow: 'Journey home to New Zealand',
    title: 'Break up a longer return journey',
    copy: 'Where the confirmed routing permits it, a planned city stay can turn travel time into a guided introduction to China before the final flight home.',
  },
];

export default function ChinaStopoverLandingPage({ tours }: ChinaStopoverLandingPageProps) {
  const sortedTours = [...tours].sort((a, b) => Number.parseInt(a.duration, 10) - Number.parseInt(b.duration, 10));

  return (
    <>
      <SchemaMarkup
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: stopoverFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }}
      />

      <section className="relative isolate min-h-[620px] overflow-hidden bg-ink text-white">
        <Image
          src="/images/tours/shanghai-skyline.jpg"
          alt="Shanghai skyline, one of the China gateways available in the CTS stopover collection"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-end px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/75">
              <Link href="/tours" className="hover:text-white">Tours</Link>
              <span className="mx-2">/</span>
              <Link href="/tours/china" className="hover:text-white">China</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Stopover</span>
            </nav>
            <p className="text-sm font-semibold uppercase tracking-[.2em] text-secondary">2–5 day guided city stays</p>
            <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Turn a connection into part of the holiday.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
              If your wider itinerary routes through China, add a short guided stay before you continue to Europe, Japan, South Korea or home to New Zealand. CTS checks the published land package against your actual flights before confirmation.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#stopover-tours" className="rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:bg-[#981827]">
                Compare stopover tours
              </a>
              <Link href="/contact" className="rounded-full border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-ink">
                Check my flight routing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-warm-200 bg-surface">
        <div className="mx-auto grid max-w-7xl gap-px bg-warm-200 sm:grid-cols-3">
          {[
            ['Short and flexible', 'Published options from 2 to 5 days'],
            ['Clear inclusions', 'Sightseeing, meals and stays listed by tour'],
            ['Checked before booking', 'Routing and entry conditions reviewed together'],
          ].map(([title, copy]) => (
            <div key={title} className="bg-surface px-6 py-7 text-center">
              <p className="font-semibold text-ink">{title}</p>
              <p className="mt-1 text-sm text-ink-muted">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-primary">Where a stopover can fit</p>
            <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">One trip, with more of the journey included.</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted">
              A stopover is useful only when it works with the real ticket. These are planning scenarios, not route guarantees; CTS checks the complete itinerary before you commit.
            </p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {journeyFits.map((item, index) => (
              <article key={item.title} className="rounded-2xl border border-warm-200 bg-warm-50 p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">0{index + 1}</span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[.16em] text-primary">{item.eyebrow}</p>
                <h3 className="mt-2 font-serif text-2xl text-ink">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-warm-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-primary">Plan it in the right order</p>
            <h2 className="mt-3 font-serif text-4xl text-ink">Start with your flights, then choose the city.</h2>
            <p className="mt-5 leading-relaxed text-ink-muted">
              This prevents a good-looking package from being attached to an impossible connection. CTS uses the same flight dates, passport information and stopover product when checking feasibility.
            </p>
            <Link href="/china-visa-guide-for-new-zealanders" className="mt-6 inline-flex font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
              Read the China visa and entry guide →
            </Link>
          </div>
          <ol className="space-y-4">
            {[
              ['Share the full itinerary', 'Send every flight sector, travel date, passenger nationality and ticket status.'],
              ['Choose the stopover style', 'Compare the published city, duration, sightseeing, meals and accommodation.'],
              ['Confirm the complete journey', 'CTS checks timing and entry conditions, then confirms the land package and any flight implications.'],
            ].map(([title, copy], index) => (
              <li key={title} className="flex gap-5 rounded-2xl border border-warm-200 bg-white p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-semibold text-white">{index + 1}</span>
                <div>
                  <h3 className="font-semibold text-ink">{title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="stopover-tours" className="scroll-mt-24 bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[.18em] text-primary">Choose the actual stopover</p>
              <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">{tours.length} published China stopover tours.</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-muted">
                Open any tour to see the exact daily itinerary, inclusions, exclusions and lead-in price. Availability and the fit with your international flights are confirmed before booking.
              </p>
            </div>
            <Link href="/contact" className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
              Ask CTS which one fits →
            </Link>
          </div>
          <div className="mt-10 grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedTours.map((tour) => (
              <TourCard key={tour.id} tour={tour} destination="china" tier="stopover" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold uppercase tracking-[.18em] text-primary">Before you book</p>
          <h2 className="mt-3 text-center font-serif text-4xl text-ink">China stopover questions.</h2>
          <div className="mt-10 divide-y divide-warm-200 border-y border-warm-200">
            {stopoverFaqs.map((faq) => (
              <details key={faq.question} className="group py-6 first:pt-0 last:pb-0">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 font-semibold text-ink">
                  {faq.question}
                  <span className="text-xl text-primary transition group-open:rotate-45" aria-hidden>＋</span>
                </summary>
                <p className="mt-4 max-w-3xl leading-relaxed text-ink-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[.18em] text-white/75">A practical first step</p>
            <h2 className="mt-3 font-serif text-4xl">Send us the flights you are considering.</h2>
            <p className="mt-4 leading-relaxed text-white/85">We’ll review the routing alongside the published stopover tours and explain which options are realistic before you book.</p>
          </div>
          <Link href="/contact" className="shrink-0 rounded-full bg-white px-7 py-3 font-semibold text-primary transition hover:bg-warm-50">
            Check my stopover options
          </Link>
        </div>
      </section>
    </>
  );
}
