import SectionTitle from '@/components/SectionTitle';
import TourTierCard from '@/components/TourTierCard';
import { getTourBySlug } from '@/lib/data/tours';
import {
  HOME_SPOTLIGHT_TOURS,
  getSpotlightCampaignHref,
  getSpotlightDepartureLabel,
} from '@/lib/data/home-spotlight';

/**
 * Season spotlight — pairs with primary paid + editorial pushes (see `home-spotlight.ts`).
 */
export default function SpotlightTours() {
  return (
    <section
      id="spotlight"
      className="py-20 md:py-28 bg-gradient-to-b from-amber-50/40 via-orange-50/25 to-white relative overflow-hidden scroll-mt-24"
    >
      <div className="absolute top-10 left-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl" aria-hidden />
      <div
        className="absolute bottom-0 right-10 w-56 h-56 bg-orange-200/20 rounded-full blur-3xl animate-float-slow"
        aria-hidden
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,48rem)] h-64 bg-gradient-to-r from-primary/[0.04] via-orange-300/[0.07] to-primary/[0.04] rounded-full blur-3xl pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-gradient-to-r from-white via-amber-50/80 to-white px-4 py-2 text-sm font-semibold text-primary shadow-md shadow-primary/5">
            <svg className="h-4 w-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2c0 4-2 6-2 10 0 2.5 1.5 4.5 3.5 5.5-.5-2 .5-4 2-5.5 1 1.5 1 3.5 0 5 3-1.5 5-5 5-9.5 0-4-2-6-2-10-1.5 2.5-3 4-4.5 5.5z" />
            </svg>
            <span>Trending now</span>
            <span className="text-primary/40" aria-hidden>
              ·
            </span>
            <span className="text-accent">Staff top picks</span>
          </div>
        </div>
        <SectionTitle subtitle="This season" title="Spotlight" center />
        <p className="text-center text-gray-600 max-w-2xl mx-auto -mt-8 mb-12 text-base md:text-lg leading-relaxed">
          High demand right now — our strongest recommendations for October, backed by our ad spend and the routes we&apos;re promoting first.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {HOME_SPOTLIGHT_TOURS.map((ref) => {
            const t = getTourBySlug(ref.destination, ref.tier, ref.slug);
            if (!t) return null;
            return (
              <TourTierCard
                key={ref.slug}
                title={t.name}
                description={t.shortDescription}
                duration={t.duration}
                price={t.price}
                image_url={t.heroImage}
                slug={t.slug}
                tier="discovery"
                departure={getSpotlightDepartureLabel(ref.campaignSlug)}
                route={ref.route}
                href={getSpotlightCampaignHref(ref.campaignSlug)}
                spotlightFeatured
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
