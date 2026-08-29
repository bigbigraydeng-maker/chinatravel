// City tour hub template component
// Used by all city hub pages (beijing-tours, shanghai-tours, etc.)
// Combines hero, city info, tour grid, and FAQs into a reusable template

import React from 'react';
import { Tour } from '@/lib/data/tours';
import HubHero from './HubHero';
import TourGrid from './TourGrid';
import GuideLinksSection, { GuideLinkCard } from './GuideLinksSection';
import SectionTitle from '@/components/SectionTitle';
import FAQSection from '@/components/FAQSection';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import { Icon } from '@/components/ui/Icon';
import { EYEBROW, H2_SECTION, H3_CARD, PANEL } from '@/lib/ui/typography';

interface CityHubProps {
  // Metadata
  cityName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;

  // Content
  introText: string;
  highlights: string[];
  bestTimeToVisit: string;

  // Tours
  tours: Tour[];

  // FAQs
  faqs: Array<{ question: string; answer: string }>;

  // Optional guide links shown after the tours section
  guideLinks?: GuideLinkCard[];

  // Meta description (for SEO)
  metaDescription?: string;
}

const CityTourHub: React.FC<CityHubProps> = ({
  cityName,
  heroTitle,
  heroSubtitle,
  heroImage,
  introText,
  highlights,
  bestTimeToVisit,
  tours,
  faqs,
  guideLinks,
  metaDescription
}) => {
  return (
    <div>
      {/* Hero */}
      <HubHero
        title={heroTitle}
        subtitle={heroSubtitle}
        backgroundImage={heroImage}
      />

      <TrustBar />

      {/* Main content */}
      <div className="bg-white">
        <div className="container mx-auto px-4 section-space">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-14">
              {/* Quick Answer — AI Overview / Featured Snippet target */}
              <aside
                aria-label="Quick answer"
                className="border-l-4 border-primary bg-warm-50/60 rounded-r-2xl p-5 md:p-6"
              >
                <p className={`${EYEBROW} text-primary mb-2`}>
                  Quick answer
                </p>
                <p className="text-foreground leading-relaxed">
                  {introText.split(/\.\s+/)[0]}. CTS Tours offers {cityName} packages from New Zealand with return flights from Auckland, NZD pricing, and English-speaking guides. TAANZ-bonded and Auckland-based since 2000, backed by China Travel Service (founded 1928). NZ passport holders can visit China visa-free for up to 30 days (confirmed until 31 December 2026).
                </p>
              </aside>

              {/* Introduction */}
              <section>
                <h2 className={H2_SECTION}>
                  About <span data-slot="italic">{cityName}</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {introText}
                </p>
              </section>

              {/* Highlights */}
              <section>
                <h2 className={H2_SECTION}>Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {highlights.map((highlight, idx) => (
                    <div key={idx} className={`${PANEL} flex gap-4 p-4`}>
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Icon name="check" className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Best time to visit */}
              <section>
                <h2 className={H2_SECTION}>
                  Best Time to <span data-slot="italic">Visit</span>
                </h2>
                <div className={`${PANEL} p-8`}>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {bestTimeToVisit}
                  </p>
                </div>
              </section>

              {/* Tours section */}
              <section id="tours-section" className="scroll-mt-24">
                <SectionTitle
                  title={`${cityName} Tours`}
                  subtitle={`Discover our ${cityName} experiences`}
                />
                <TourGrid tours={tours} columns={2} />
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quick info card */}
                <div className={`${PANEL} p-6`}>
                  <h3 className={`${EYEBROW} mb-4`}>Quick Facts</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-muted-foreground">Destination</dt>
                      <dd className={`${H3_CARD} capitalize`}>{cityName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Tours Available</dt>
                      <dd className={H3_CARD}>{tours.length}</dd>
                    </div>
                    {tours.length > 0 && (
                      <>
                        <div>
                          <dt className="text-sm text-muted-foreground">Starting From</dt>
                          <dd className="text-base font-semibold leading-snug text-primary">
                            {tours[tours.length - 1].price}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm text-muted-foreground">Best Season</dt>
                          <dd className={H3_CARD}>Spring &amp; Autumn</dd>
                        </div>
                      </>
                    )}
                  </dl>
                </div>

                {/* CTA Button */}
                <a
                  href="#tours-section"
                  className="block w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-full transition-colors text-center"
                >
                  View Tours
                </a>

                {/* Info box */}
                <div className={`${PANEL} bg-subtle p-4`}>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Planning tip:</span> Book 3+ months in advance for the best availability and pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide links */}
      {guideLinks && guideLinks.length > 0 && (
        <GuideLinksSection
          title={`${cityName} Travel Guides`}
          links={guideLinks}
        />
      )}

      {/* FAQs */}
      {faqs.length > 0 && <FAQSection faqs={faqs} />}

      {/* CTA Section */}
      <CTASection
        title={`Ready to Explore ${cityName}?`}
        description={`Let our China specialists craft a tailor-made ${cityName} itinerary just for you.`}
        primaryButtonText="Plan My Trip"
        primaryButtonLink="/tailor-made"
        secondaryButtonText="Browse All Tours"
        secondaryButtonLink="/tours/china"
      />
    </div>
  );
};

export default CityTourHub;
