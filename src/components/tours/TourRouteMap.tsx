interface TourRouteMapProps {
  slug: string;
  tourName: string;
}

interface TourMapAssets {
  /** Wide landscape version, shown on tablet/desktop. */
  desktop: string;
  /** Portrait stacked version, shown on phones. */
  mobile: string;
}

// Tours that have a branded route map in /public/tour-maps.
// Add a slug -> assets entry here as each tour's map is produced.
const MAP_SLUGS = [
  'golden-china',
  'beijing-xian',
  'shanghai-surroundings',
  'essentials',
  'silk-road',
  'grand-tour',
  'china-icons-collection',
  'china-icons-collection-christchurch',
  'yunnan-explorer',
  'zhangjiajie',
] as const;

const TOUR_MAPS: Record<string, TourMapAssets> = Object.fromEntries(
  MAP_SLUGS.map((slug) => [
    slug,
    { desktop: `/tour-maps/${slug}.svg`, mobile: `/tour-maps/${slug}-mobile.svg` },
  ]),
);

export default function TourRouteMap({ slug, tourName }: TourRouteMapProps) {
  const assets = TOUR_MAPS[slug];
  if (!assets) return null;

  const alt = `${tourName} route map — cities, transport and nights`;

  return (
    <figure className="mb-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assets.desktop}
        alt={alt}
        className="hidden w-full h-auto rounded-lg border border-gray-200 shadow-sm md:block"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={assets.mobile}
        alt={alt}
        className="block w-full h-auto rounded-lg border border-gray-200 shadow-sm md:hidden"
      />
    </figure>
  );
}
