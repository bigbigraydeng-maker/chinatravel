import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdLandingPage from '@/components/ad-landing/AdLandingPage';
import { AD_LANDING_CONFIGS, getAdLandingConfig } from '@/lib/ad-landing/configs';
import { getPublishedTourBySlug } from '@/lib/data/published-tour-catalog';

// A departure that has left drops off the price block by itself; refresh hourly so it does not wait for a deploy.
export const revalidate = 15;
// Only the path keys in the configs exist. Anything else under /campaigns/ that no folder owns is a 404.
export const dynamicParams = false;

interface PageProps {
  params: { tour: string };
}

export function generateStaticParams() {
  return AD_LANDING_CONFIGS.map((config) => ({ tour: config.pathKey }));
}

/** The config and its tour, or null when there is no page: unknown path key, tour missing, not active, or sold out. */
async function load(pathKey: string) {
  const config = getAdLandingConfig(pathKey);
  if (!config) return null;
  const tour = await getPublishedTourBySlug('china', config.tour.tier, config.tour.slug);
  if (!tour || !tour.isActive || tour.soldOut) return null;
  return { config, tour };
}

/**
 * An ad landing page is for paid traffic only: no search engine should list it, and nothing links to it. There is
 * deliberately no canonical link to the tour page. "Do not index me" together with "I am a copy of that page" is a
 * contradictory pair of signals, and if a search engine ever applied the first to the second, the tour page itself
 * would be the loser. Not being linked and not being in the sitemap already keeps this page out of the way.
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const found = await load(params.tour);
  const robots = { index: false, follow: false };
  if (!found) return { title: 'Not found', robots };
  return {
    title: `${found.tour.name} | CTS Tours`,
    description: found.tour.metaDescription,
    robots,
  };
}

export default async function AdLandingRoute({ params }: PageProps) {
  const found = await load(params.tour);
  if (!found) notFound();
  return <AdLandingPage config={found.config} tour={found.tour} />;
}
