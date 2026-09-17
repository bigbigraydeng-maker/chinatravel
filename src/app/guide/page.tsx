import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import SchemaMarkup from '@/components/SchemaMarkup';
import GuideExplorer from '@/components/guides/GuideExplorer';
import { getAllGuides } from '@/lib/data/guides';
import { getBlogPostBySlug } from '@/lib/data/blogs';
import { getSiteUrl } from '@/lib/site';
import { tourImage } from '@/lib/site-media';

const guides = getAllGuides();
const site = getSiteUrl();

export const metadata: Metadata = {
  title: `${guides.length} China Travel Guides for New Zealanders | CTS Tours`,
  description:
    'Plan a China holiday from New Zealand with expert city, landmark and regional guides. Compare routes, seasons, food, entry advice and practical travel tips.',
  keywords: [
    'China travel guide New Zealand',
    'China destination guides',
    'things to do in China',
    'China trip planning',
    'China travel tips for New Zealanders',
  ],
  alternates: { canonical: '/guide' },
  openGraph: {
    title: 'China Travel Guide Hub for New Zealanders | CTS Tours',
    description:
      'City guides, iconic landmarks, route ideas and practical advice for planning a China holiday from New Zealand.',
    type: 'website',
    url: `${site}/guide`,
    images: [
      {
        url: tourImage('great-wall-mist.jpg'),
        width: 1200,
        height: 630,
        alt: 'The Great Wall of China in mountain mist',
      },
    ],
  },
};

const planningEssentials = [
  {
    eyebrow: 'Start here',
    title: 'First-time China travel tips',
    description: 'Payments, apps, transport, language and the practical details Kiwi travellers ask about most.',
    href: '/blog/first-time-china-travel-tips',
  },
  {
    eyebrow: 'Entry requirements',
    title: 'China entry guide for NZ passports',
    description: 'Check the current rules, documents and arrival steps before you book or fly.',
    href: '/china-visa-guide-for-new-zealanders',
  },
  {
    eyebrow: 'When to go',
    title: 'Best time to visit China',
    description: 'Compare weather, crowds and travel conditions across China month by month.',
    href: '/best-time-to-visit-china',
  },
  {
    eyebrow: 'What to eat',
    title: 'China local food guide',
    description: 'Explore regional flavours and signature dishes before deciding where your journey should lead.',
    href: '/local-food-guide',
  },
];

const routeIdeas = [
  {
    label: 'A first journey',
    title: 'Beijing, Xi’an & Shanghai',
    description: 'Imperial history, the Terracotta Warriors and modern China in one clear route.',
    links: [
      ['Beijing', '/beijing-travel-guide'],
      ['Xi’an', '/xian-travel-guide'],
      ['Shanghai', '/shanghai-travel-guide'],
    ],
  },
  {
    label: 'Landscapes & nature',
    title: 'Guilin, Yangshuo & Zhangjiajie',
    description: 'Karst rivers, countryside paths and the sandstone peaks associated with Avatar.',
    links: [
      ['Guilin', '/guilin-travel-guide'],
      ['Li River', '/li-river-travel-guide'],
      ['Zhangjiajie', '/zhangjiajie-travel-guide'],
    ],
  },
  {
    label: 'A slower China',
    title: 'Shanghai, Suzhou & Hangzhou',
    description: 'A city-and-gardens route with water towns, classical landscapes and easy rail connections.',
    links: [
      ['The Bund', '/the-bund-travel-guide'],
      ['Suzhou', '/suzhou-travel-guide'],
      ['West Lake', '/west-lake-travel-guide'],
    ],
  },
  {
    label: 'Southwest culture',
    title: 'Kunming, Dali & Lijiang',
    description: 'Highland scenery, heritage towns and a more relaxed journey through Yunnan.',
    links: [
      ['Kunming', '/kunming-travel-guide'],
      ['Dali', '/dali-travel-guide'],
      ['Lijiang', '/lijiang-travel-guide'],
    ],
  },
];

const articleSlugs = [
  'what-to-pack-china-complete-packing-list-by-season',
  'essential-travel-apps-china-navigation-communication-payment',
  'first-trip-china-beijing-or-shanghai',
];

const articles = articleSlugs
  .map((slug) => getBlogPostBySlug(slug))
  .filter((post): post is NonNullable<typeof post> => Boolean(post));

const faqs = [
  {
    question: 'Where should a first-time visitor to China go?',
    answer:
      'Beijing, Xi’an and Shanghai make a strong first route: Beijing introduces imperial China and the Great Wall, Xi’an adds the Terracotta Warriors, and Shanghai shows the country’s modern side. Allow roughly 10–14 days for a comfortable guided journey.',
  },
  {
    question: 'How many days do New Zealand travellers need for China?',
    answer:
      'Ten to fourteen days is a practical starting point for two or three major regions. A shorter stopover can work for one city, while three weeks gives enough time to add Yunnan, Sichuan, Guilin or Zhangjiajie without rushing.',
  },
  {
    question: 'What is the best season to visit China?',
    answer:
      'Spring and autumn are the easiest all-round seasons for many classic routes. China covers several climate zones, so the best month depends on the cities and landscapes in your itinerary. Check the seasonal guide before choosing dates.',
  },
  {
    question: 'Can CTS help turn these guides into an itinerary?',
    answer:
      'Yes. Use the guides to shortlist places and experiences, then send CTS your dates, pace, budget and interests. A New Zealand-based China specialist can recommend a group tour or shape a tailor-made itinerary.',
  },
];

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'China Travel Guides for New Zealanders',
    description:
      'A planning hub of city, landmark, scenic-region and practical China travel guides from CTS Tours New Zealand.',
    url: `${site}/guide`,
    inLanguage: 'en-NZ',
    isPartOf: { '@type': 'WebSite', name: 'CTS Tours', url: site },
    about: { '@type': 'Country', name: 'China' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site },
      { '@type': 'ListItem', position: 2, name: 'Travel Guides', item: `${site}/guide` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'CTS China destination and landmark guides',
    numberOfItems: guides.length,
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: guide.destinationName,
      url: `${site}/${guide.slug}`,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  },
];

export default function GuidePage() {
  return (
    <div className="bg-[#fbf8f2]">
      <SchemaMarkup data={schemas} />

      <ImmersivePageHero
        eyebrow="China Travel Guide"
        title="Find Your China"
        subtitle={`${guides.length} expert guides for New Zealand travellers — from first-trip essentials to the places worth building a journey around`}
        imageSrc={tourImage('great-wall-mist.jpg')}
        imageAlt="The Great Wall of China in mountain mist"
        priority
      />

      <section className="border-b border-warm-200 bg-white py-10 md:py-14">
        <div className="container grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Plan with context</p>
            <h2 className="max-w-3xl font-serif text-3xl leading-tight text-accent md:text-5xl">
              Start with the experience. Then choose the cities.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-7 text-gray-600">
            <p>
              China is too varied to plan from a single checklist. Use this library to compare cities, landmarks,
              landscapes and practical questions before deciding which route fits your time and interests.
            </p>
            <p>
              Every guide connects you to relevant places, reading and tours, so research can lead naturally to a
              workable itinerary.
            </p>
          </div>
        </div>
      </section>

      <GuideExplorer guides={guides} />

      <section className="bg-accent py-16 text-white md:py-20">
        <div className="container">
          <div className="mb-9 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Before you choose a route</p>
            <h2 className="font-serif text-3xl md:text-5xl">The practical China guides Kiwi travellers need first.</h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-white/15 md:grid-cols-2 lg:grid-cols-4">
            {planningEssentials.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-accent p-6 transition-colors hover:bg-white/10 md:p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">{item.eyebrow}</p>
                <h3 className="mt-4 font-serif text-2xl leading-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{item.description}</p>
                <span className="mt-6 inline-flex text-sm font-semibold text-white">Read the guide&nbsp; →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Route ideas</p>
            <h2 className="font-serif text-3xl text-accent md:text-5xl">See which places belong together.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-gray-600">
              These are starting points, not fixed itineraries. Follow each place into its full guide, then compare
              the route with your dates and preferred pace.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {routeIdeas.map((route, index) => (
              <article key={route.title} className="rounded-2xl border border-warm-200 bg-white p-6 shadow-sm md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{route.label}</p>
                  <span className="font-serif text-3xl text-warm-300">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-serif text-3xl text-accent">{route.title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{route.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {route.links.map(([label, href]) => (
                    <Link
                      key={href}
                      href={href}
                      className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                    >
                      {label} →
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {articles.length > 0 && (
        <section className="border-y border-warm-200 bg-white py-16 md:py-20">
          <div className="container">
            <div className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Planning advice</p>
                <h2 className="font-serif text-3xl text-accent md:text-5xl">Read before you leave New Zealand.</h2>
              </div>
              <Link href="/blog" className="text-sm font-semibold text-primary underline-offset-4 hover:underline">
                Browse all stories and advice →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-warm-100">
                    <Image
                      src={article.heroImage}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {article.category.replace('-', ' ')} · {article.readTime}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-tight text-accent group-hover:text-primary">
                    {article.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">{article.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Good to know</p>
            <h2 className="font-serif text-3xl text-accent md:text-5xl">China travel planning questions.</h2>
            <p className="mt-5 leading-7 text-gray-600">
              Clear starting answers for New Zealand travellers. Each topic links into deeper destination and
              practical guidance across the site.
            </p>
          </div>
          <div className="divide-y divide-warm-200 border-y border-warm-200">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-xl text-accent">
                  {faq.question}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pt-4 leading-7 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-14 text-white md:py-16">
        <div className="container flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Turn research into a journey</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Tell us what caught your attention.</h2>
            <p className="mt-3 leading-7 text-white/80">
              Share your dates, preferred pace and the places you saved. A CTS China specialist will help turn the
              shortlist into a realistic route.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/tailor-made" className="rounded-full bg-white px-7 py-3 text-center text-sm font-bold text-primary">
              Plan a tailor-made trip
            </Link>
            <Link href="/tours" className="rounded-full border border-white/50 px-7 py-3 text-center text-sm font-bold text-white">
              Browse tours
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
