import Link from 'next/link';
import { Metadata } from 'next';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import SchemaMarkup from '@/components/SchemaMarkup';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';
import { tourImage } from '@/lib/site-media';
import { TOOLS, type ToolData } from '@/lib/data/tools-data';
import { Icon } from '@/components/ui/Icon';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'China Travel Planning Tools | Free Tools for NZ Travellers | CTS Tours',
    description:
      'Free interactive planning tools for New Zealand travellers heading to China. Check visa requirements, find the best time to visit, estimate your trip cost, and plan your itinerary — all in one place.',
    path: '/travel-tools',
    ogImagePath: tourImage('yunnan-rice-terraces.jpg'),
    ogImageAlt: 'China travel planning tools — CTS Tours New Zealand',
    keywords: [
      'China travel planning tools',
      'China trip planner NZ',
      'China visa NZ',
      'best time to visit China',
      'China tour packages New Zealand',
      'China holidays New Zealand',
      'China travel guide NZ',
    ],
    ogType: 'website',
  });
}

function StatusBadge({ status }: { status: ToolData['status'] }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-700 border border-green-200">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
        Available
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-700 border border-amber-200">
      Coming soon
    </span>
  );
}

function ToolCard({ tool }: { tool: ToolData }) {
  const isLive = tool.status === 'live';

  const inner = (
    <article
      id={tool.id}
      className={`group flex flex-col h-full rounded-2xl border bg-white p-6 shadow-sm transition duration-300 scroll-mt-24 ${
        isLive
          ? 'border-warm-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl cursor-pointer'
          : 'border-warm-200 opacity-80'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <Icon name={tool.icon} className="w-8 h-8 text-primary" />
        <StatusBadge status={tool.status} />
      </div>

      <h2 className="font-serif text-lg font-semibold text-accent group-hover:text-primary transition-colors leading-snug">
        {tool.title}
      </h2>
      <p className="mt-2 flex-1 text-sm text-gray-600 leading-relaxed">
        {tool.longDescription}
      </p>

      {isLive ? (
        <span className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-red-500 px-5 py-2.5 text-sm font-semibold text-white transition group-hover:opacity-95">
          Open tool →
        </span>
      ) : (
        <span className="mt-5 inline-flex items-center justify-center rounded-full border border-warm-300 bg-warm-50 px-5 py-2.5 text-sm font-medium text-gray-400">
          Coming soon
        </span>
      )}
    </article>
  );

  if (!isLive) return inner;

  return (
    <Link href={tool.url} aria-label={`Open ${tool.title}`}>
      {inner}
    </Link>
  );
}

export default function TravelToolsPage() {
  const site = getSiteUrl();

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'China Travel Planning Tools for New Zealand Travellers',
    description:
      'Free interactive planning tools for NZ travellers: visa checker, best time to visit guide, trip cost estimator, seasonal guide, trip planner, and local food map.',
    url: `${site}/travel-tools`,
    inLanguage: 'en-NZ',
    isPartOf: { '@type': 'WebSite', name: 'CTS Tours', url: site },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site },
      { '@type': 'ListItem', position: 2, name: 'Travel Planning Tools', item: `${site}/travel-tools` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do New Zealand passport holders need a visa for China?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'New Zealand citizens can visit China visa-free for up to 30 days under the current bilateral agreement. Check our Visa Requirement Checker for the latest rules and any conditions that apply.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best time to visit China from New Zealand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Spring (April–May) and autumn (September–October) are generally the best times to visit China. The weather is mild, crowds are manageable, and scenery is at its most photogenic. Use our Best Time to Visit tool for destination-specific advice.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does a China tour cost from New Zealand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CTS Tours China packages start from around NZD $2,999 per person for a 7–8 day Stopover tour, rising to NZD $5,000–$7,000+ for Signature 14-day tours. Flights from Auckland are additional. Use our Cost Calculator for a personalised estimate.',
        },
      },
    ],
  };

  const liveTools = TOOLS.filter((t) => t.status === 'live');
  const comingSoonTools = TOOLS.filter((t) => t.status === 'coming-soon');

  return (
    <>
      <SchemaMarkup data={[webPageSchema, breadcrumbSchema, faqSchema]} />
      <main>
        <ImmersivePageHero
          eyebrow="Plan smarter"
          title="Free China Travel Planning Tools"
          subtitle="Everything a New Zealand traveller needs before booking — visa checks, seasonal guides, cost estimates, and more."
          imageSrc={tourImage('yunnan-rice-terraces.jpg')}
          imageAlt="Yunnan rice terraces — China travel planning tools for NZ travellers, CTS Tours"
          priority
        />

        {/* Intro content — supports 'China travel guide NZ' and 'China tour packages' keywords */}
        <section className="container mx-auto max-w-3xl px-4 pt-14 pb-4 text-center">
          <p className="text-gray-600 leading-relaxed">
            Planning a China holiday from New Zealand involves a few key decisions: <strong>when to go</strong>,{' '}
            <strong>what it will cost</strong>, and <strong>whether you need a visa</strong>. Our free tools give you
            clear, NZ-specific answers — so you arrive at the enquiry form knowing exactly what you want.
          </p>
        </section>

        {/* Live tools */}
        <section className="container mx-auto max-w-6xl px-4 py-10">
          <h2 className="font-serif text-2xl font-bold text-accent mb-2">Available now</h2>
          <p className="text-sm text-gray-500 mb-8">Use these tools right now to plan your China trip.</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {liveTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Coming soon tools */}
        {comingSoonTools.length > 0 && (
          <section className="container mx-auto max-w-6xl px-4 pb-14">
            <h2 className="font-serif text-xl font-bold text-accent mb-2">Coming soon</h2>
            <p className="text-sm text-gray-500 mb-8">We&apos;re building these tools — enquire via the form below in the meantime.</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {comingSoonTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* FAQ — targets informational queries + FAQPage schema */}
        <section className="border-t border-warm-200 bg-warm-50/60 px-4 py-14">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl font-bold text-accent mb-8 text-center">
              Common questions before booking a China tour
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Do New Zealand passport holders need a visa for China?',
                  a: 'New Zealand citizens can visit China visa-free for up to 30 days under the current bilateral agreement. Use our Visa Requirement Checker for the latest conditions and entry rules.',
                  link: '/china-visa-guide-for-new-zealanders',
                  linkText: 'Check visa requirements →',
                },
                {
                  q: 'What is the best time to visit China from New Zealand?',
                  a: 'Spring (April–May) and autumn (September–October) offer the most comfortable weather and scenic conditions across most of China. Use our seasonal guide for destination-specific advice.',
                  link: '/best-time-to-visit-china',
                  linkText: 'See seasonal guide →',
                },
                {
                  q: 'How much does a China tour cost from New Zealand?',
                  a: 'CTS Tours China packages start from around NZD $2,999 per person for a 7–8 day Stopover tour, with Signature 14-day tours from NZD $5,000–$7,000+. Flights from Auckland are additional.',
                  link: '/tailor-made',
                  linkText: 'Get a personalised quote →',
                },
              ].map(({ q, a, link, linkText }) => (
                <div key={q} className="rounded-xl bg-white border border-warm-200 p-6">
                  <h3 className="font-semibold text-accent mb-2">{q}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                  <Link
                    href={link}
                    className="mt-3 inline-block text-sm text-primary font-medium hover:underline"
                  >
                    {linkText}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-warm-200 bg-white px-4 py-16">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-2xl font-bold text-accent md:text-3xl">
              Ready to plan your China trip?
            </h2>
            <p className="mt-3 text-gray-600 text-sm max-w-xl mx-auto">
              Browse our handcrafted China tour packages for New Zealand travellers, or tell us what you have in mind and we&apos;ll tailor the perfect itinerary.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/china-tours"
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

        {/* Internal link — team page */}
        <p className="py-4 text-center text-xs text-gray-400">
          <Link
            href="/travel-tools/ai-marketing-2026"
            className="underline decoration-warm-300 underline-offset-2 hover:text-primary"
          >
            CTS team · 2026 AI × SEO / ads workflow (internal, noindex)
          </Link>
        </p>
      </main>
    </>
  );
}
