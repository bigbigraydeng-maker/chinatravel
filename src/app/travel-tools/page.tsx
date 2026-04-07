import Link from 'next/link';
import { Metadata } from 'next';
import SchemaMarkup from '@/components/SchemaMarkup';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'China Travel Planning Tools | Trip Planner & Destination Matcher',
    description:
      'Free interactive tools for New Zealand travellers: seasonal guide, trip planner, destination matcher, and local food map. Plan your China journey with CTS.',
    path: '/travel-tools',
    ogImagePath: 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?w=1200&q=80',
    keywords: [
      'travel planner',
      'destination matcher',
      'seasonal guide',
      'China food guide',
      'CTS Tours',
    ],
    ogType: 'website',
  });
}

const tools = [
  {
    href: '/seasonal-guide',
    emoji: '🗓️',
    title: 'Seasonal guide',
    description: 'Compare weather, crowds, and pricing month by month across China.',
  },
  {
    href: '/trip-planner',
    emoji: '🧭',
    title: 'Trip planner',
    description: 'Match duration, interests, budget, and season to tours, articles, and guides.',
  },
  {
    href: '/destination-matcher',
    emoji: '🎯',
    title: 'Destination matcher',
    description: 'Find destinations that fit your pace, travel party, and travel style.',
  },
  {
    href: '/local-food-guide',
    emoji: '🥟',
    title: 'Local food map',
    description: 'Explore regional flavours and plan culinary stops across China.',
  },
];

export default function TravelToolsPage() {
  const site = getSiteUrl();

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'China Travel Planning Tools',
    description:
      'Hub page for CTS interactive travel tools including seasonal guide, trip planner, destination matcher, and food guide.',
    url: `${site}/travel-tools`,
    inLanguage: 'en-NZ',
    isPartOf: {
      '@type': 'WebSite',
      name: 'CTS Tours',
      url: site,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site },
      { '@type': 'ListItem', position: 2, name: 'Travel tools', item: `${site}/travel-tools` },
    ],
  };

  return (
    <>
      <SchemaMarkup data={[webPageSchema, breadcrumbSchema]} />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-rose-600 to-rose-800 px-4 py-16 text-white md:py-24">
          <div className="container relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
              China Travel Planning Tools
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 md:text-xl">
              Interactive tools to help you plan your perfect China journey — from seasons and
              destinations to itineraries and flavours.
            </p>
          </div>
        </section>

        <section className="container mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <article
                key={tool.href}
                className="group flex flex-col rounded-2xl border border-warm-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
              >
                <span className="text-4xl" aria-hidden>
                  {tool.emoji}
                </span>
                <h2 className="mt-4 font-serif text-xl font-semibold text-accent group-hover:text-primary">
                  {tool.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-gray-600">{tool.description}</p>
                <Link
                  href={tool.href}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-red-500 px-5 py-2.5 text-center text-sm font-semibold text-white transition group-hover:opacity-95"
                >
                  Try it now
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-warm-200 bg-warm-50/80 px-4 py-16">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-bold text-accent md:text-3xl">
              Ready to plan your China trip?
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/tours/china"
                className="rounded-full border-2 border-accent bg-white px-8 py-3 font-semibold text-accent transition hover:bg-accent hover:text-white"
              >
                Browse China tours
              </Link>
              <Link
                href="/tailor-made"
                className="rounded-full bg-accent px-8 py-3 font-semibold text-white shadow-md transition hover:bg-accent/90"
              >
                Tailor-made journey
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
