import { Metadata } from 'next';
import TourGrid from '@/components/seo/TourGrid';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import RelatedGuides from '@/components/seo/RelatedGuides';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Icon } from '@/components/ui/Icon';
import { getPublishedChinaTours } from '@/lib/data/published-tour-catalog';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { generateCollectionPageSchema, generateBreadcrumbListSchema } from '@/lib/schema-seo';
import { chinaToursMeta } from '@/lib/data/seo-pages';
import HeroWithLeadForm from '@/components/seo/HeroWithLeadForm';
import UtmAwareBanner from './_components/UtmAwareBanner';
import FlagshipTourGrid from './_components/FlagshipTourGrid';
import CustomerTripPhotos from './_components/CustomerTripPhotos';
import ReviewsHighlights from './_components/ReviewsHighlights';

const HERO_POSTER =
  'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg';

const HERO_VIDEO: string | undefined = '/videos/china-tours-hero.mp4';

export async function generateMetadata(): Promise<Metadata> {
  const tours = await getPublishedChinaTours();
  const description = `Compare ${tours.length} currently published CTS China tours from New Zealand. Current names, routes, prices and departures are shown from the latest ME publication.`;
  return buildCtsPageMetadata({
    title: 'All China Tours: Compare Routes, Prices & Dates | CTS Tours',
    description,
    path: '/china-tours',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
    ogImageAlt: 'China Tours, CTS Tours',
    keywords: [
      'China tour packages',
      'China holiday packages',
      'China travel packages',
      'China tours from New Zealand',
      'China tours',
      'Signature tours',
      'Discovery tours',
      'Stopover tours',
      'CTS Tours',
    ],
    ogType: 'website',
    openGraphTitle: 'All China Tours: Compare Routes, Prices & Dates | CTS Tours',
    openGraphDescription: description,
  });
}

interface PageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

/**
 * FB Leadform ThankYou traffic (utm_medium=ab_test_leadform_thankyou) has
 * already submitted contact info on Meta and is landing here as a *hot lead*.
 * These visitors don't need the full hub — they need focused reassurance +
 * strong social proof. Everything else (long intro,
 * all-tours grid, tier callouts, related guides, FAQs) is noise for them
 * and hurts the trust-building moment. Toggle drives the simplified layout.
 */
function isFbLeadformThankyou(searchParams: PageProps['searchParams']): boolean {
  const utmMedium = searchParams?.utm_medium;
  const value = Array.isArray(utmMedium) ? utmMedium[0] : utmMedium;
  return value === 'ab_test_leadform_thankyou';
}

export const revalidate = 15;

export default async function ChinaToursPage({ searchParams }: PageProps) {
  const tours = await getPublishedChinaTours();
  const thankyou = isFbLeadformThankyou(searchParams);
  const pageDescription = `Compare ${tours.length} currently published CTS China tours from New Zealand. Current names, routes, prices and departures are shown from the latest ME publication.`;
  const pageIntro = chinaToursMeta.introText
    .replace(/Browse more than fifty curated itineraries below/, `Browse ${tours.length} currently published China tours below`);
  const currentFaqs = chinaToursMeta.faqs.map((faq) => {
    if (faq.question.startsWith('What are the best China tours')) {
      return { ...faq, answer: `The current published China tours are listed below with their latest route, duration, price and departure information. Availability is controlled by the latest ME publication.` };
    }
    if (faq.question.startsWith('How much does a China tour package')) {
      const prices = tours.map((tour) => tour.price).filter(Boolean);
      return { ...faq, answer: prices.length
        ? `Current published lead-in prices are shown on each tour card and detail page: ${prices.join('; ')}. Departure-specific prices appear beside their matching departure when provided.`
        : 'Current tour prices appear on each published tour page. Availability and pricing are controlled by the latest ME publication.' };
    }
    if (faq.question.startsWith('Which is the best China tour package')) {
      return { ...faq, answer: 'Compare the active routes, durations, inclusions and current departures listed below, then choose the itinerary that matches your travel plans.' };
    }
    if (faq.question.startsWith('What China tour packages does CTS offer?')) {
      return { ...faq, answer: 'The current China collections and available products are listed below. Product details and availability come from the latest ME publication.' };
    }
    if (faq.question.startsWith('What is included in a CTS China travel package?')) {
      return { ...faq, answer: 'Inclusions and exclusions vary by tour. Check the inclusions and exclusions shown on each current published tour page.' };
    }
    return faq;
  });

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: 'China Tours', url: '/china-tours' }
  ];

  const schemas = [
    generateCollectionPageSchema(
      'All China Tours: Compare Routes, Prices & Dates | CTS Tours',
      pageDescription,
      '/china-tours',
      tours
    ),
    generateBreadcrumbListSchema(breadcrumbs)
    // Note: FAQPage schema is auto-emitted by <FAQSection /> below.
  ];

  const relatedGuides = [
    {
      title: 'Best Time to Visit China',
      slug: 'best-time-to-visit-china',
      description: 'Month-by-month guide to planning your perfect China trip'
    },
    {
      title: 'China Entry Guide for NZ Citizens (Visa-Free)',
      slug: 'china-visa-guide-for-new-zealanders',
      description: 'Visa-free entry for NZ passports: documents, stay limits, and exceptions'
    },
    {
      title: 'Small-Group China Tours from NZ',
      slug: 'small-group-china-tours',
      description: 'Intimate small groups, expert guides, NZD pricing — 2026-27 departures open'
    },
    {
      title: 'China Travel Specialists Backed by CTS',
      slug: 'china-travel-specialists-nz',
      description: 'Why Kiwis book with CTS: direct China operations, Auckland-based team, 1,200+ travellers'
    },
    {
      title: 'First trip: Beijing or Shanghai?',
      slug: 'blog/first-trip-china-beijing-or-shanghai',
      description: 'How to choose a gateway when you are new to China'
    },
    {
      title: 'Best China Tours, Compared',
      slug: 'best-china-tours',
      description: 'Side-by-side comparison of our flagship tours — price, days, cities and who each one suits'
    },
    {
      title: 'China Tours for Seniors',
      slug: 'china-tours-for-seniors',
      description: 'Mobility notes, pacing and insurance guidance for older travellers'
    }
  ];

  return (
    <>
      <SchemaMarkup data={schemas} />

      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                {idx > 0 && <span className="text-gray-400">/</span>}
                <a href={crumb.url} className="hover:text-primary transition-colors">
                  {crumb.name}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* UTM-aware welcome banner (only renders when arriving from meta/google ads) */}
      <UtmAwareBanner bestOfChinaTour={tours.find((tour) => tour.slug === 'essentials')} />

      {/* Hero — winner video background (poster fallback) + inline lead form.
          FB Leadform ThankYou traffic gets a reassurance headline instead of
          the generic hub H1: they've already handed over contact info, so the
          hero's job flips from "capture the lead" to "confirm they're in
          good hands + preview what happens next". Defaults preserved otherwise. */}
      <HeroWithLeadForm
        title={thankyou ? 'Thanks — a China specialist will be in touch' : chinaToursMeta.h1}
        subtitle={
          thankyou
            ? 'One of our Auckland-based specialists will call or email you within 1 NZ business day.'
            : chinaToursMeta.heroSubtitle
        }
        posterImage={HERO_POSTER}
        videoSrc={HERO_VIDEO}
      />

      {/* TrustBar — hidden on mobile for thankyou traffic (redundant with the
          hero's "specialist will be in touch" promise + Reviews below). */}
      <div className={thankyou ? 'hidden md:block' : undefined}>
        <TrustBar />
      </div>

      {/* Social proof stack: traveller photos → 5-star reviews.

          Mobile thankyou traffic: hide the 6-tile photo grid entirely (scroll
          fatigue) and cap Reviews to 1. Desktop thankyou keeps the full stack. */}
      <div className={thankyou ? 'hidden md:block' : undefined}>
        <CustomerTripPhotos />
      </div>
      <ReviewsHighlights mobileLimit={thankyou ? 1 : undefined} />

      {/* Flagship itineraries — full roster by default; FB Leadform ThankYou
          traffic drops to 2 (Hick's Law — fewer choices convert hot leads
          faster). The heading + intro also flip to "these are the most
          popular" framing for post-lead reassurance. Renders nothing while the
          roster in FlagshipTourGrid.tsx is empty. */}
      <FlagshipTourGrid
        tours={tours}
        limit={thankyou ? 2 : undefined}
        mobileLimit={thankyou ? 1 : undefined}
        heading={thankyou ? 'Our most-requested China itineraries' : undefined}
        intro={
          thankyou
            ? 'While you wait for our specialist to reach out, take a look at the routes New Zealand travellers most often start with. Your call will be tailored around whichever feels closest.'
            : undefined
        }
      />

      {/* Main Content — hub-only. FB Leadform ThankYou traffic skips the
          long intro / all-tours grid / tier callouts / related guides / FAQ
          because their attention should stay on the social proof they've
          already scrolled. */}
      {!thankyou && (
        <>
      {/* Main Content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Quick Answer (LLM-friendly TL;DR for AI Overview citation) */}
              <aside
                aria-label="Quick answer"
                className="border-l-4 border-primary bg-warm-50/60 rounded-r-lg p-5 md:p-6"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-primary mb-2">
                  Quick answer
                </p>
                <p className="text-gray-800 leading-relaxed">
                  CTS Tours currently lists {tours.length} active China tours from New Zealand. Names,
                  routes, durations, prices, inclusions and available departures on this page are read
                  from the latest ME publication. Check each tour record for its current details.
                </p>
              </aside>

              {/* Introduction */}
              <section>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                  Explore Our Collections
                </h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                  {pageIntro.split(/\n\n+/).map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
                </div>
              </section>

              {/* Tours Grid */}
              <section id="tours-section">
                <SectionTitle
                  title="All China Tours"
                  subtitle="Browse our complete collection"
                />
                <TourGrid tours={tours} columns={2} />
              </section>

              {/* Signature Tours Highlight */}
              {tours.filter(t => t.tier === 'signature').length > 0 && (
                <section className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-8">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="star" filled className="w-6 h-6 text-amber-400" />
                    <span>CTS Signature Collection</span>
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our premium collection features boutique 4-5 star accommodations, small group sizes, and locally-led experiences designed by our China specialists. Perfect for travellers seeking depth and immersion.
                  </p>
                  <a
                    href="/tours/china/signature"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                  >
                    View All Signature Tours →
                  </a>
                </section>
              )}

              {/* Discovery Tours Highlight */}
              {tours.filter(t => t.tier === 'discovery').length > 0 && (
                <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-8">
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Icon name="heart" filled className="w-6 h-6 text-emerald-500" />
                    <span>CTS Discovery Collection</span>
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Reliable, well-organized China experiences at excellent value. Our Discovery collection features 3-4 star hotels, must-see itineraries, and expert guides—ideal for first-time visitors and those seeking great value.
                  </p>
                  <a
                    href="/tours/china/discovery"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                  >
                    View All Discovery Tours →
                  </a>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick Info Card */}
                <div className="bg-warm-50 rounded-2xl p-6 border border-warm-100">
                  <h3 className="font-serif font-bold text-lg mb-4">Quick Facts</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-600">Total Tours</dt>
                      <dd className="font-medium">{tours.length}+</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Destinations</dt>
                      <dd className="font-medium">7 regions</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Collections</dt>
                      <dd className="font-medium">Signature, Discovery, Stopover</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Backed by</dt>
                      <dd className="font-medium">China Travel Service</dd>
                    </div>
                  </dl>
                </div>

                {/* CTA Button */}
                <a
                  href="/tailor-made"
                  className="block w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl transition-colors text-center"
                >
                  Tailor My Trip
                </a>

                {/* Tip Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 flex items-start gap-2">
                    <Icon name="sparkles" className="w-4 h-4 text-blue-900 mt-0.5 flex-shrink-0" />
                    <span><span className="font-bold">Tip:</span> Filter by destination to explore Beijing, Shanghai, Xi&apos;an, and more.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Guides */}
      <RelatedGuides
        guides={relatedGuides}
        title="Plan Your China Journey"
        subtitle="Get expert guidance on timing and NZ passport entry to China"
      />

      {/* FAQs */}
      <FAQSection faqs={currentFaqs} />
        </>
      )}

      {/* Final CTA */}
      <CTASection
        title="Ready for China?"
        description="Our specialists are ready to create your perfect China itinerary. Let's start planning!"
        primaryButtonText="Plan My China Trip"
        primaryButtonLink="/tailor-made"
        secondaryButtonText="Contact Our Team"
        secondaryButtonLink="/contact"
      />

    </>
  );
}
