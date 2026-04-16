import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTourBySlug } from '@/lib/data/tours';
import { buildCtsPageMetadata } from '@/lib/seo-metadata';
import { getSiteUrl } from '@/lib/site';
import {
  buildOctober2026CampaignAdUrl,
  buildSpotlightPosterAdUrl,
} from '@/lib/campaigns/october-2026-discovery';

export async function generateMetadata(): Promise<Metadata> {
  return buildCtsPageMetadata({
    title: 'Spotlight Poster | October 2026 China Tours',
    description:
      "Newspaper-style Spotlight poster for CTS Tours' October 2026 departures, featuring Shanghai & Surroundings and A Tale of Two Cities.",
    path: '/spotlight/october-2026',
    /** Print / QR-only: not linked from site nav; keep out of organic results. */
    robots: { index: false, follow: true },
    ogImagePath:
      'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/great-wall-mist.jpg',
    ogImageAlt: 'Great Wall at sunrise for CTS October 2026 spotlight',
    keywords: [
      'China spotlight tours',
      'October 2026 China departures',
      'Shanghai and Surroundings',
      'Beijing and Xian tour',
      'CTS Tours',
    ],
    ogType: 'website',
  });
}

type SpotlightPosterPageProps = {
  searchParams?: {
    focus?: string;
  };
};

export default function October2026SpotlightPosterPage({ searchParams }: SpotlightPosterPageProps) {
  const shanghaiTour = getTourBySlug('china', 'discovery', 'shanghai-surroundings');
  const twoCitiesTour = getTourBySlug('china', 'discovery', 'beijing-xian');

  if (!shanghaiTour || !twoCitiesTour) {
    return null;
  }

  const siteUrl = getSiteUrl();
  const newspaperQrHubUrl = buildSpotlightPosterAdUrl(siteUrl, {
    source: 'nz_newspaper',
    medium: 'print',
    campaign: 'oct2026_spotlight',
    content: 'spotlight_poster_dual',
  });
  const shanghaiUtmUrl = buildOctober2026CampaignAdUrl(siteUrl, 'shanghai-surroundings', {
    source: 'nz_newspaper',
    medium: 'print',
    campaign: 'oct2026_spotlight',
    content: 'shanghai_surroundings',
  });
  const twoCitiesUtmUrl = buildOctober2026CampaignAdUrl(siteUrl, 'tale-of-two-cities', {
    source: 'nz_newspaper',
    medium: 'print',
    campaign: 'oct2026_spotlight',
    content: 'tale_of_two_cities',
  });
  const posterHeroImage =
    'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/silk-road-wall.jpg';
  const posterShanghaiImage =
    'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/shanghai-night-blue.jpg';
  const posterBeijingXianImage =
    'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-lion.jpg';
  const focus = searchParams?.focus;
  const highlightShanghai = focus === 'shanghai-surroundings';
  const highlightTwoCities = focus === 'tale-of-two-cities';

  return (
    <main className="bg-[#f3f0eb]">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl overflow-hidden border border-[#d6d2cb] bg-white shadow-2xl">
          <section className="relative">
            <div className="relative aspect-[640/420] bg-[#e6e6e6]">
              <Image
                src={posterHeroImage}
                alt="Great Wall sunrise"
                fill
                priority
                sizes="100vw"
                className="object-cover object-[28%_center] saturate-[1.05] contrast-[1.03] md:object-[32%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/88 via-white/35 to-transparent md:from-white/90 md:via-white/28" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>

            <div className="absolute left-3 top-3 md:left-8 md:top-7">
              <div className="w-[210px] bg-white/92 p-3 shadow-md ring-1 ring-black/[0.06] backdrop-blur-[2px] md:w-[228px] md:p-4">
                <p className="font-serif text-[62px] font-bold leading-[0.84] tracking-[-0.018em] text-black [text-shadow:0_1px_0_rgba(255,255,255,0.85)]">
                  China is
                  <br />
                  Calling
                </p>
                <p className="mt-1.5 font-serif text-[19px] font-bold leading-[1.0] tracking-[-0.012em] text-black [text-shadow:0_1px_0_rgba(255,255,255,0.85)] md:text-[47px]">
                  And There&apos;s
                  <br />
                  Never Been a
                  <br />
                  Better Time to Go
                </p>
                <p className="mt-1.5 text-[10px] leading-[1.2] text-gray-800 md:text-[11px]">
                  Explore China&apos;s most iconic destinations this October - from the elegance of Shanghai and
                  its surrounding water towns, to the history of Beijing and the wonders of Xi&apos;an. Designed
                  for first-time travellers, these small-group journeys make it easy to experience the very
                  best of China.
                </p>
              </div>
            </div>

            <div className="absolute right-2 top-2 md:right-6 md:top-5">
              <div className="flex h-[132px] w-[132px] flex-col items-center justify-center rounded-full border-[3px] border-white bg-[#163b73] px-3.5 py-3 text-center text-[9px] font-semibold leading-snug text-white shadow-lg md:h-[156px] md:w-[156px] md:border-[4px] md:px-4 md:py-3.5 md:text-[10.5px] md:leading-tight">
                <span className="text-balance">
                  All-inclusive, with international flights, accommodation, guided touring, meals and more taken care
                  of.
                </span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-[#d3203b] px-4 py-2.5 text-center text-[18px] font-bold leading-[1.1] text-white md:text-[40px]">
              Visa-free travel. Small group touring. Incredible value.
            </div>
          </section>

          <section id="products" className="grid gap-6 bg-[#ece9e4] p-4 md:grid-cols-2 md:gap-6 md:p-6 scroll-mt-24">
            <article
              className={`overflow-hidden bg-white shadow-sm transition ${
                highlightShanghai ? 'ring-4 ring-[#d3203b]/40 shadow-xl' : ''
              }`}
            >
              <div className="relative h-56 md:h-64">
                <Image
                  src={posterShanghaiImage}
                  alt="Shanghai skyline at dusk"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-4 md:p-5">
                <h2 className="font-serif text-[46px] font-bold leading-[0.95] text-[#c72235]">
                  Shanghai &amp; Surroundings
                </h2>
                <p className="mt-2 text-[32px] leading-tight font-semibold text-black">
                  10 Days | Depart 14 October 2026
                </p>
                <p className="mt-2 text-[18px] leading-relaxed text-black">
                  • Suzhou gardens • Wuxi lakeside sights • Xinshi water town • Hangzhou&apos;s West Lake
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-700">
                  Discover the elegance of China&apos;s Yangtze Delta, where ancient water towns, classical
                  gardens and modern city life blend into one easy, small-group journey.
                </p>
                <div className="mt-4 inline-block bg-[#d3203b] px-4 py-2 text-white">
                  <p className="text-sm font-semibold uppercase tracking-wide">All-inclusive from</p>
                  <p className="text-4xl font-bold">$2,999pp</p>
                </div>
                <div className="mt-5">
                  <Link
                    href={shanghaiUtmUrl}
                    className="inline-flex rounded-full border-2 border-[#d3203b] px-5 py-2 text-sm font-bold text-[#d3203b] transition hover:bg-[#d3203b] hover:text-white"
                  >
                    View Shanghai tour
                  </Link>
                </div>
              </div>
            </article>

            <article
              className={`overflow-hidden bg-white shadow-sm transition ${
                highlightTwoCities ? 'ring-4 ring-[#d3203b]/40 shadow-xl' : ''
              }`}
            >
              <div className="relative h-56 md:h-64">
                <Image
                  src={posterBeijingXianImage}
                  alt="Golden lion statue at the Forbidden City"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
              <div className="p-4 md:p-5">
                <h2 className="font-serif text-[44px] font-bold leading-[0.95] text-[#c72235]">
                  A Tale of Two Cities — Beijing &amp; Xi&apos;an
                </h2>
                <p className="mt-2 text-[32px] leading-tight font-semibold text-black">
                  10 Days | Depart 15 October 2026
                </p>
                <p className="mt-2 text-[18px] leading-relaxed text-black">
                  • Forbidden City • Great Wall • Hutong experience • Terracotta Warriors
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-gray-700">
                  Tick off China&apos;s ultimate bucket-list icons in one unforgettable trip, with high-speed
                  rail between Beijing and Xi&apos;an plus expert local guidance from start to finish.
                </p>
                <div className="mt-4 inline-block bg-[#d3203b] px-4 py-2 text-white">
                  <p className="text-sm font-semibold uppercase tracking-wide">All-inclusive from</p>
                  <p className="text-4xl font-bold">$3,480pp</p>
                </div>
                <div className="mt-5">
                  <Link
                    href={twoCitiesUtmUrl}
                    className="inline-flex rounded-full border-2 border-[#d3203b] px-5 py-2 text-sm font-bold text-[#d3203b] transition hover:bg-[#d3203b] hover:text-white"
                  >
                    View Beijing & Xi&apos;an tour
                  </Link>
                </div>
              </div>
            </article>
          </section>

          <footer className="bg-[#1f3563] px-4 py-4 text-center text-sm font-semibold text-white md:text-base">
            NEW ZEALAND&apos;S CHINA SPECIALISTS · ON-THE-GROUND SUPPORT · TRUSTED SINCE 1928
          </footer>
        </div>

        <section className="mx-auto mt-8 max-w-6xl rounded-2xl border border-warm-200 bg-white p-5 md:p-6">
          <h3 className="font-serif text-2xl font-bold text-accent">UTM tracking links</h3>
          <p className="mt-2 text-sm text-gray-600">
            Use the first link for a <strong className="font-semibold text-gray-800">single newspaper QR code</strong>{' '}
            (both products on one page). Use the product links below only if you run separate QR codes or want
            split tracking by tour.
          </p>
          <div className="mt-4 rounded-lg border border-primary/20 bg-warm-50 p-4 text-sm">
            <p className="font-semibold text-gray-900">Newspaper — one QR (unified entry)</p>
            <a href={newspaperQrHubUrl} className="mt-2 block break-all text-primary underline underline-offset-2">
              {newspaperQrHubUrl}
            </a>
          </div>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="font-semibold text-gray-900">Shanghai &amp; Surroundings:</p>
              <a href={shanghaiUtmUrl} className="break-all text-primary underline underline-offset-2">
                {shanghaiUtmUrl}
              </a>
            </div>
            <div>
              <p className="font-semibold text-gray-900">A Tale of Two Cities — Beijing &amp; Xi&apos;an:</p>
              <a href={twoCitiesUtmUrl} className="break-all text-primary underline underline-offset-2">
                {twoCitiesUtmUrl}
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
