import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'China Travel Planning Tools | CTS Tours NZ',
  description:
    'Free tools to help New Zealand travellers plan their China holiday — find the right tour with our Trip Planner, or estimate costs with the Budget Calculator.',
  alternates: {
    canonical: 'https://www.ctstours.co.nz/tools',
  },
  openGraph: {
    title: 'China Travel Planning Tools | CTS Tours NZ',
    description:
      'Find your perfect China tour and estimate your travel budget with our free interactive planning tools.',
    url: 'https://www.ctstours.co.nz/tools',
    type: 'website',
  },
};

const TOOLS = [
  {
    href: '/tools/trip-planner',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
        />
      </svg>
    ),
    label: 'Trip Planner',
    description:
      'Answer four quick questions about your duration, interests, budget, and travel season — we match you with the tours, blog articles, and destination guides that fit best.',
    badge: 'Personalised',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    href: '/tools/cost-calculator',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.598 4.5 4.598v17.255a.75.75 0 0 0 1.239.572l1.261-1.12 1.26 1.12a.75.75 0 0 0 .993 0l1.26-1.12 1.26 1.12a.75.75 0 0 0 .994 0l1.26-1.12 1.26 1.12a.75.75 0 0 0 .993 0l1.26-1.12 1.261 1.12A.75.75 0 0 0 19.5 21.853V4.598c0-1-.807-1.898-1.807-2.026A48.659 48.659 0 0 0 12 2.25Z"
        />
      </svg>
    ),
    label: 'Budget Calculator',
    description:
      'Get an indicative cost breakdown — flights from Auckland, tour fee by tier, and optional extras — in under a minute. Seasonal flight pricing included.',
    badge: 'Instant',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
];

export default function ToolsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <header className="mb-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Planning tools</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-accent md:text-5xl">
          Plan your China adventure
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Two free tools to help New Zealand travellers research, budget, and build the right China
          itinerary — before speaking to our team.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {TOOLS.map((tool) => (
          <article
            key={tool.href}
            className="flex flex-col overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-soft transition hover:shadow-warm"
          >
            <div className="flex items-start gap-4 p-8 pb-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {tool.icon}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-serif text-2xl font-bold text-accent">{tool.label}</h2>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tool.badgeColor}`}
                  >
                    {tool.badge}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{tool.description}</p>
              </div>
            </div>
            <div className="mt-auto border-t border-warm-100 px-8 py-5">
              <Link
                href={tool.href}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-medium text-white shadow-md transition hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Start
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-16 rounded-2xl bg-gradient-to-br from-warm-50 to-warm-100 p-10 text-center">
        <h2 className="font-serif text-2xl font-bold text-accent">
          Still not sure where to start?
        </h2>
        <p className="mt-3 text-gray-600">
          Our China specialists are happy to help you design a custom itinerary that fits your exact
          budget, time, and travel style.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-accent px-8 py-3 font-medium text-white transition hover:bg-accent/90"
          >
            Talk to a specialist
          </Link>
          <Link
            href="/china-tours"
            className="rounded-full border border-warm-300 px-8 py-3 font-medium text-accent transition hover:bg-white"
          >
            Browse all tours
          </Link>
        </div>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-3 text-sm text-gray-600">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-accent">Travel budget guide</h3>
          <Link href="/china-tours-from-new-zealand" className="text-primary hover:underline">
            China tours from New Zealand
          </Link>
          <Link href="/best-time-to-visit-china" className="text-primary hover:underline">
            Best time to visit China
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-accent">Visa &amp; entry</h3>
          <Link href="/china-visa-guide-for-new-zealanders" className="text-primary hover:underline">
            China visa guide for NZ travellers
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-accent">Top destinations</h3>
          <Link href="/beijing-travel-guide" className="text-primary hover:underline">
            Beijing travel guide
          </Link>
          <Link href="/shanghai-travel-guide" className="text-primary hover:underline">
            Shanghai travel guide
          </Link>
        </div>
      </section>
    </main>
  );
}
