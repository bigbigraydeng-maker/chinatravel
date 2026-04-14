import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import ImmersivePageHero from '@/components/ImmersivePageHero';
import TailorMadeForm from '@/components/TailorMadeForm';
import TailorMadeQuickPlan from '@/components/TailorMadeQuickPlan';
import TrustBar from '@/components/TrustBar';
import SchemaMarkup from '@/components/SchemaMarkup';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { generateBreadcrumbListSchema, generateWebPageSchema } from '@/lib/schema-seo';
import { tourImage } from '@/lib/site-media';

const PAGE_PATH = '/tailor-made';
const PAGE_TITLE = 'Tailor Made Tours';
const PAGE_DESCRIPTION =
  'Design a flexible private or small-group Asia itinerary with CTS: your dates, pace, and hotels—backed by Auckland support, TAANZ bonding, and direct China operations. Enquire online or call 0800 CTS 888.';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: PAGE_PATH,
    ogImagePath:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
    ogImageAlt: 'Tailor-made China and Asia tours, CTS Tours',
    keywords: [
      'tailor made tours',
      'custom China itinerary',
      'bespoke travel New Zealand',
      'private China tour',
      'Asia custom tour',
      'CTS tailor made',
    ],
    ogType: 'website',
    openGraphTitle: PAGE_TITLE,
    openGraphDescription: PAGE_DESCRIPTION,
  });
}

const interests = [
  { icon: '🏛️', label: 'Culture & History', description: 'Ancient temples, museums, UNESCO sites' },
  { icon: '🍜', label: 'Food & Culinary', description: 'Street food, cooking classes, fine dining' },
  { icon: '🏔️', label: 'Nature & Adventure', description: 'Hiking, national parks, scenic landscapes' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family', description: 'Kid-friendly activities, educational tours' },
  { icon: '💑', label: 'Honeymoon & Romance', description: 'Romantic getaways, luxury stays' },
  { icon: '📸', label: 'Photography', description: 'Iconic viewpoints, hidden photo spots' },
  { icon: '🧘', label: 'Wellness & Spa', description: 'Hot springs, meditation, traditional healing' },
  { icon: '🎭', label: 'Arts & Performance', description: 'Opera, folk art, local performances' },
];

const steps = [
  {
    number: '01',
    title: 'Share Your Vision',
    description: 'Destinations, interests, travel dates, budget, and any mobility, dietary, or family needs.',
  },
  {
    number: '02',
    title: 'Expert Design',
    description: 'Our specialist shapes a bespoke route and pacing—with access and hotels chosen by people who operate China every week.',
  },
  {
    number: '03',
    title: 'Refine Together',
    description: 'Review the draft itinerary, swap days, upgrade hotels, and adjust until it feels right.',
  },
  {
    number: '04',
    title: 'Travel with Confidence',
    description: 'Go with pre-arranged logistics, in-country support, and an NZ agency you can call before you fly.',
  },
];

const whyTailorMade = [
  {
    title: 'Personal service',
    body: 'One dedicated consultant from first enquiry to departure—no anonymous call centre, no guesswork on routing.',
  },
  {
    title: 'Your pace & transport',
    body: 'Private vehicle and driver on the ground where it matters, bullet train or flights where it saves time—stop when you want to.',
  },
  {
    title: 'Local flavours',
    body: 'We weave regional dining and market visits into the plan, and leave room for the meals you discover yourself.',
  },
  {
    title: 'Accommodation choices',
    body: 'From well-located four-star to standout luxury—tell us your comfort level and we shortlist properties that fit.',
  },
  {
    title: 'Unique experiences',
    body: 'Cooking classes, photography windows, family-friendly days, or a deep dive into one region—built around what you care about.',
  },
  {
    title: 'Expert guiding',
    body: 'Local guides who know the story behind the sights—and how to avoid crowds and wasted hours.',
  },
];

const experiencePillars = [
  {
    title: 'Multiple destinations',
    body: 'Link cities by train or flight—China-only or multi-country routes designed as one coherent trip.',
  },
  {
    title: 'Nature & wildlife',
    body: 'National parks, river landscapes, panda reserves, and scenic drives matched to season and fitness.',
  },
  {
    title: 'Festivals & seasons',
    body: 'Cherry blossom, golden autumn, regional events—we align dates with what you want to see.',
  },
  {
    title: 'History & culture',
    body: 'UNESCO sites, ancient capitals, living neighbourhoods, and time to absorb rather than tick boxes.',
  },
];

const caseStudies = [
  {
    title: 'The Wilsons\' Family Adventure',
    duration: '14 Days',
    travellers: 'Family of 4',
    highlights: ['Great Wall camping experience', 'Panda volunteer program in Chengdu', 'Traditional dumpling making class', 'Li River bamboo rafting'],
    quote: 'Baker designed the perfect trip for our family. The kids still talk about feeding the pandas!',
    author: 'Sarah Wilson, Auckland',
  },
  {
    title: 'A Photographer\'s Dream',
    duration: '18 Days',
    travellers: 'Couple',
    highlights: ['Sunrise at Zhangjiajie pillars', 'Honghe Hani rice terraces', 'Old town Lijiang at dawn', 'Yangtze River golden hour cruise'],
    quote: 'Every location was chosen for the best light. Baker understood exactly what we were looking for.',
    author: 'James & Mia Chen, Wellington',
  },
  {
    title: 'Silk Road Expedition',
    duration: '21 Days',
    travellers: 'Group of 6 friends',
    highlights: ['Dunhuang Mogao Caves private viewing', 'Camel trek in Gobi Desert', 'Kashgar Sunday Market', 'Turpan grape valley homestay'],
    quote: 'An unforgettable journey through China\'s western frontier. Truly once in a lifetime.',
    author: 'David Thompson, Christchurch',
  },
];

export default function TailorMadePage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tailor Made', url: PAGE_PATH },
  ];

  const schemas = [
    generateWebPageSchema(PAGE_TITLE, PAGE_DESCRIPTION, PAGE_PATH),
    generateBreadcrumbListSchema(breadcrumbs),
  ];

  return (
    <div className="min-h-screen bg-white">
      <SchemaMarkup data={schemas} />

      <nav aria-label="Breadcrumb" className="bg-white border-b border-warm-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, idx) => (
              <li key={crumb.url} className="flex items-center gap-2">
                {idx > 0 && <span className="text-gray-400" aria-hidden>/</span>}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">{crumb.name}</span>
                ) : (
                  <Link href={crumb.url} className="hover:text-primary transition-colors">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <ImmersivePageHero
        eyebrow="Tailor-made holidays"
        chineseAccent="定制旅程"
        title="Tailor Made Journeys"
        subtitle="Your tour, your way"
        description="No two travellers are alike. If you want a flexible itinerary with none of the stress of organising it yourself, we combine your ideas with our China and Asia expertise—so you get the trip you imagined, not a generic package."
        imageSrc={tourImage('guilin-river-valley.jpg')}
        imageAlt="Li River karst landscape — tailor-made China and Asia tours, CTS Tours"
        tall
        priority
      >
        <div className="mx-auto max-w-3xl md:max-w-none">
          <TailorMadeQuickPlan />
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <a
              href="#enquiry-form"
              className="inline-block bg-secondary text-accent font-semibold px-8 py-4 rounded-lg hover:bg-secondary/90 transition-colors text-lg w-full sm:w-auto text-center"
            >
              Enquire now
            </a>
            <a
              href="tel:0800287888"
              className="inline-block border-2 border-white/80 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors text-lg w-full sm:w-auto text-center"
            >
              Call 0800 CTS 888
            </a>
          </div>
        </div>
      </ImmersivePageHero>

      <TrustBar />

      {/* Intro */}
      <section className="py-14 md:py-16 border-b border-warm-100 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Designing a tailor-made trip is a blend of your priorities and our routing know-how. You tell us what a
            great holiday looks like—pace, hotels, must-sees, and budget—and we translate it into a day-by-day plan you
            can review before you commit.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Prefer to talk it through first? Call{' '}
            <a href="tel:0800287888" className="text-primary font-semibold hover:underline">
              0800 CTS 888
            </a>{' '}
            (0800 287 888) or use the enquiry form below—our team will respond promptly, usually within one business day.
          </p>
        </div>
      </section>

      {/* Why tailor-made */}
      <section className="py-16 md:py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">Why tailor-made?</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Built around you</h2>
            <p className="text-gray-600 mt-4">
              Family trip, honeymoon, photography, food, or a mix—your itinerary reflects how you travel, not a template.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyTailorMade.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-soft border border-warm-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">Simple process</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, idx) => (
              <div key={step.number} className="relative text-center">
                {idx < steps.length - 1 && (
                  <div
                    className="hidden md:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-gradient-to-r from-warm-300 to-warm-200"
                    aria-hidden
                  />
                )}
                <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-warm-50 border border-warm-200 flex items-center justify-center shadow-sm">
                  <span className="text-xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
          <ul className="mt-12 max-w-2xl mx-auto space-y-2 text-left text-gray-700">
            <li className="flex gap-2">
              <span className="text-secondary font-bold mt-0.5">✓</span>
              <span>Complete flexibility on dates, duration, and routing</span>
            </li>
            <li className="flex gap-2">
              <span className="text-secondary font-bold mt-0.5">✓</span>
              <span>Hotel grade and style matched to your budget</span>
            </li>
            <li className="flex gap-2">
              <span className="text-secondary font-bold mt-0.5">✓</span>
              <span>Dedicated specialist to refine the plan with you</span>
            </li>
          </ul>
        </div>
      </section>

      {/* What can you experience */}
      <section className="py-16 md:py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">What can you experience?</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Shape the trip to your interests</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {experiencePillars.map((p) => (
              <div key={p.title} className="bg-white rounded-xl p-6 border border-warm-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">Your Interests</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">What Inspires You?</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From cultural immersion to culinary adventures, we design itineraries around what excites you most.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {interests.map((interest, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-xl p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all cursor-default group">
                <div className="text-4xl mb-3">{interest.icon}</div>
                <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{interest.label}</h3>
                <p className="text-sm text-gray-500">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">Success Stories</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Journeys We Have Crafted</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
                  <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                  <div className="flex gap-4 text-sm text-white/80">
                    <span>{study.duration}</span>
                    <span>{study.travellers}</span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-6">
                    {study.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <svg className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <blockquote className="border-l-4 border-secondary pl-4 italic text-gray-600 text-sm mb-3">
                    &ldquo;{study.quote}&rdquo;
                  </blockquote>
                  <p className="text-xs text-gray-500">&mdash; {study.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why CTS */}
      <section className="py-16 md:py-20 bg-white border-t border-warm-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-primary font-semibold uppercase tracking-wider mb-2">Why CTS</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Why tailor-made with CTS?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="rounded-xl bg-light p-8 border border-warm-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Asia specialists, not a generic desk</h3>
              <p className="text-gray-600 leading-relaxed">
                We focus on China and regional Asia, with consultants in Auckland and direct operational ties through
                China Travel Service—so routing, hotels, and timing recommendations come from experience, not a
                brochure list.
              </p>
            </div>
            <div className="rounded-xl bg-light p-8 border border-warm-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Book with confidence</h3>
              <p className="text-gray-600 leading-relaxed">
                CTS Tours is a TAANZ member and IATA-accredited agency. Your tailor-made holiday is arranged through a
                bonded New Zealand travel company—clear advice on payments, documentation, and support if plans change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="py-20 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold uppercase tracking-wider mb-2">Get started</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Tailor-made travel enquiry</h2>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                Tell us about your dream trip. Fields marked * are required. Our team will reply as soon as possible—
                typically within one business day.
              </p>
            </div>
            <Suspense
              fallback={
                <div
                  className="bg-white border border-gray-200 rounded-xl p-8 shadow-lg min-h-[24rem] animate-pulse"
                  aria-hidden
                />
              }
            >
              <TailorMadeForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Expert CTA */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Prefer to talk?</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Speak with our specialist Baker Gu or the Auckland team—no obligation, just expert advice on routing and
            timing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:0800287888"
              className="inline-block bg-secondary text-accent font-semibold px-8 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Call 0800 CTS 888
            </a>
            <Link href="/contact" className="inline-block bg-white text-accent font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Contact Us
            </Link>
            <Link href="/experts/baker-gu" className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">
              Meet Baker Gu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
