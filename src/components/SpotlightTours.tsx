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
      className="py-20 md:py-28 bg-gradient-to-b from-white via-amber-50/20 to-white relative overflow-hidden scroll-mt-24"
    >
      <div className="absolute top-10 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" aria-hidden />
      <div
        className="absolute bottom-0 right-10 w-56 h-56 bg-secondary/10 rounded-full blur-3xl animate-float-slow"
        aria-hidden
      />
      <div className="container mx-auto px-4 relative z-10">
        <SectionTitle subtitle="This season" title="Spotlight" center />
        <p className="text-center text-gray-600 max-w-2xl mx-auto -mt-8 mb-12 text-base md:text-lg leading-relaxed">
          Our current focus for advertising and in-depth content — the two Discovery routes we are backing hardest right now.
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
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
