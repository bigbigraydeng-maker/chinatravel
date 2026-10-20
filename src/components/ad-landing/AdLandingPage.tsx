import type { ComponentType } from 'react';
import TourEnquiry from '@/components/tours/TourEnquiry';
import TourTrustSignals from '@/components/tours/TourTrustSignals';
import TourViewContent from '@/components/tours/TourViewContent';
import type { Tour } from '@/lib/data/tours';
import { AD_CONTENT_FEED, getLatestApprovedItem } from '@/lib/ad-landing/content-feed';
import { buildHeroFacts, selectFaqs } from '@/lib/ad-landing/facts';
import type { AdLandingConfig, BlockSpec, HeroVariantId } from '@/lib/ad-landing/types';
import AdFooter from './AdFooter';
import AdHeader from './AdHeader';
import CityLoop from './CityLoop';
import FactStrip from './FactStrip';
import FaqAccordion from './FaqAccordion';
import FeatureCards from './FeatureCards';
import InclusionsBlock from './InclusionsBlock';
import LatestContent from './LatestContent';
import PriceDepartures from './PriceDepartures';
import RouteMapBlock from './RouteMapBlock';
import WaterTownHero, { type HeroProps } from './WaterTownHero';
import { AdEnquiryPanel, AdEnquiryProvider, OpenEnquiryButton, StickyCtaBar } from './enquiry-launcher';

const HEROES: Record<HeroVariantId, ComponentType<HeroProps>> = {
  'water-town': WaterTownHero,
};

/**
 * An ad landing page: one hero, the four facts, the blocks the tour's config lists (in that order), a closing prompt,
 * and ONE enquiry form (a bottom sheet on phones, a sticky card beside the content on desktop). Nothing on it is typed
 * in per page except the config's sourced sentences: prices, dates, inclusions and FAQ answers come from the tour data.
 *
 * `today` exists for tests; leave it out and the page uses today's date in Auckland.
 */
export default function AdLandingPage({
  config,
  tour,
  today,
}: {
  config: AdLandingConfig;
  tour: Tour;
  today?: string;
}) {
  const facts = buildHeroFacts(tour, today);
  const latest = getLatestApprovedItem(AD_CONTENT_FEED, tour.slug, new Date());
  const accent = config.accent;
  const Hero = HEROES[config.hero.variant];

  function renderBlock(block: BlockSpec) {
    switch (block.type) {
      case 'cityLoop':
        return <CityLoop key={block.type} title={block.title} stops={block.stops} accent={accent} />;
      case 'featureCards':
        return <FeatureCards key={block.type} title={block.title} cards={block.cards} accent={accent} />;
      case 'routeMap':
        return (
          <RouteMapBlock
            key={block.type}
            title={block.title}
            caption={block.caption}
            slug={tour.slug}
            tourName={tour.name}
            accent={accent}
          />
        );
      case 'latestContent':
        return <LatestContent key={block.type} title={block.title} item={latest} accent={accent} />;
      case 'priceDepartures':
        return <PriceDepartures key={block.type} tour={tour} title={block.title} accent={accent} today={today} />;
      case 'trust':
        return (
          <div key={block.type} className="overflow-hidden rounded-2xl border border-warm-200">
            <TourTrustSignals />
          </div>
        );
      case 'inclusions':
        return (
          <InclusionsBlock
            key={block.type}
            title={block.title}
            included={tour.inclusions}
            excluded={tour.exclusions}
            accent={accent}
          />
        );
      case 'faq':
        return (
          <FaqAccordion
            key={block.type}
            title={block.title}
            items={selectFaqs(tour.faqs, block.pick)}
            accent={accent}
          />
        );
    }
  }

  return (
    <AdEnquiryProvider tourSlug={tour.slug}>
      {/* The Meta "viewed tour X" signal every tour-specific page sends (retargeting audiences are built from it). */}
      <TourViewContent tour={tour} />
      <AdHeader />
      <main className="bg-warm-50">
        <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:gap-10 lg:px-4 lg:pt-6">
          <div className="min-w-0">
            <Hero
              config={config}
              tour={tour}
              imageSrc={config.hero.imageSrc ?? tour.heroImage}
              fromPrice={facts.fromPrice}
            />
            <div className="space-y-14 px-4 pb-16 pt-8 lg:px-0 lg:pt-10">
              <FactStrip tour={tour} facts={facts} />
              {config.blocks.map(renderBlock)}
              <section aria-labelledby="closing-heading" className="rounded-2xl bg-gray-900 px-6 py-8 text-white sm:px-10 sm:py-10">
                <h2 id="closing-heading" className="font-serif text-2xl sm:text-3xl">
                  Questions about this journey?
                </h2>
                <p className="mt-2 max-w-xl text-base leading-relaxed text-white/85">
                  Send us an enquiry and we will get back to you within 24 hours.
                </p>
                <OpenEnquiryButton
                  location="closing"
                  className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-primary/90"
                >
                  Send Enquiry
                </OpenEnquiryButton>
              </section>
            </div>
          </div>
          <aside className="lg:sticky lg:top-6">
            <AdEnquiryPanel>
              <TourEnquiry
                tourName={tour.name}
                tourSlug={tour.slug}
                destination={tour.destination}
                tier={tour.tier}
                source={`Ad landing page: ${tour.name}`}
              />
            </AdEnquiryPanel>
          </aside>
        </div>
      </main>
      <AdFooter />
      <StickyCtaBar priceLine={facts.fromPrice ? `From ${facts.fromPrice} per person` : tour.name} />
    </AdEnquiryProvider>
  );
}
