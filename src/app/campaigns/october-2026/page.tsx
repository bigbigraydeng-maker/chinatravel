import { Metadata } from 'next';
import Link from 'next/link';
import { getTourBySlug } from '@/lib/data/tours';
import { OCTOBER_2026_DISCOVERY_BY_SLUG, OCTOBER_2026_DISCOVERY_SLUGS } from '@/lib/campaigns/october-2026-discovery';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'October 2026 China Discovery departures | CTS Tours NZ',
    description:
      'Featured October 2026 group departures: Shanghai & Surroundings (14 Oct) and A Tale of Two Cities — Beijing & Xi’an (15 Oct). China Discovery tours from New Zealand.',
    path: '/campaigns/october-2026',
    ogImagePath: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/wuzhen-canal.jpg',
    ogImageAlt: 'Canal water town, China Discovery',
    keywords: ['China tours October 2026', 'CTS Tours', 'New Zealand China group tours'],
  });
}

export default function October2026CampaignIndexPage() {
  return (
    <div className="bg-warm-50 min-h-[60vh]">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <nav className="text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">October 2026 departures</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
          October 2026 — Discovery departures
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-12">
          Campaign landing pages with extra context for two published group departures. All itinerary
          details match our main tour pages; dates and availability are confirmed at booking.
        </p>

        <ul className="grid gap-6 md:grid-cols-2 max-w-4xl">
          {OCTOBER_2026_DISCOVERY_SLUGS.map((slug) => {
            const cfg = OCTOBER_2026_DISCOVERY_BY_SLUG[slug];
            const tour = getTourBySlug('china', 'discovery', cfg.tourSlug);
            if (!tour) return null;
            const dep = cfg.heroDepartureOrder[0];
            return (
              <li key={slug}>
                <Link
                  href={`/campaigns/october-2026/${slug}`}
                  className="block rounded-2xl border border-warm-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-2">
                    Featured departure · {dep} 2026
                  </p>
                  <h2 className="text-xl font-serif font-bold text-gray-900 mb-2">{tour.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">{tour.shortDescription}</p>
                  <p className="text-primary font-semibold">{tour.price}</p>
                  <span className="mt-4 inline-block text-sm text-primary font-medium">View campaign page →</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="mt-12 text-sm text-gray-500">
          <Link href="/tours/china/discovery" className="text-primary hover:underline">
            All China Discovery tours
          </Link>
        </p>
      </div>
    </div>
  );
}
