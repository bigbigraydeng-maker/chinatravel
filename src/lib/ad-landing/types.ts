/**
 * Ad landing pages (/campaigns/{pathKey}): one shared skeleton (data, enquiry form, sticky bar, events, noindex) and,
 * per tour, a config that decides the hero composition, which blocks appear, in what order, and the words and pictures.
 *
 * Rules every config must keep (checked by tests):
 * - Prices, dates, durations, counts, inclusions, hotels and FAQ answers are never typed into a config: they are read
 *   from the tour data (a test fails on any digit in a config sentence).
 * - Every sentence a config writes carries a `source`: a phrase that must occur in the tour data (highlights, itinerary,
 *   FAQ). A config cannot add a claim the tour data does not make.
 * - No group-size quota wording, no "small group", no whole-trip high-speed-rail claim; transport is only ever
 *   "High-speed train and coach", and only next to the route map.
 * - A picture is described by what is visible in it (see public/images/tours/IMAGE-PROVENANCE.md), never by its file name.
 */

/** Hero compositions. Each one is a different layout, not a recolour. A new tour family adds its own id and component. */
export type HeroVariantId = 'water-town';

/** Decorative colour only: the main buttons always stay the brand red. */
export type AccentId = 'teal' | 'emerald' | 'slate';

/** A sentence a config writes, plus the phrase in the tour data that backs it. */
export interface CopyItem {
  text: string;
  source: string;
}

export interface AdImage {
  src: string;
  /** What is visible in the picture. Never a place name that the picture itself does not prove. */
  alt: string;
  width: number;
  height: number;
}

export interface CityStop {
  /** City or town as it is named in the itinerary (used to look up its hotel nights). */
  city: string;
  highlights: CopyItem[];
}

export interface FeatureCard {
  title: string;
  body: CopyItem[];
  /** A card without a picture shows an icon tile instead. */
  image?: AdImage;
  icon?: 'leaf' | 'coffee' | 'landmark' | 'ship' | 'mountain' | 'camera';
}

export type BlockSpec =
  | { type: 'cityLoop'; title: string; stops: CityStop[] }
  | { type: 'featureCards'; title: string; cards: FeatureCard[] }
  | { type: 'routeMap'; title: string; caption: string }
  | { type: 'latestContent'; title: string }
  | { type: 'priceDepartures'; title: string }
  /** The site's own credentials strip (TourTrustSignals), reused as it is. */
  | { type: 'trust' }
  | { type: 'inclusions'; title: string }
  /** `pick`: case-insensitive patterns, in display order; each selects the first FAQ whose question matches. */
  | { type: 'faq'; title: string; pick: string[] };

export interface AdLandingConfig {
  /** URL segment: /campaigns/{pathKey}. */
  pathKey: string;
  tour: { tier: 'discovery' | 'signature'; slug: string };
  accent: AccentId;
  hero: {
    variant: HeroVariantId;
    /** Tier name only; the page adds the duration and "from Auckland" from the tour data. */
    eyebrow: string;
    headline: string;
    subhead: CopyItem[];
    /** Defaults to the tour's own hero picture. */
    imageSrc?: string;
    imageAlt: string;
    /** Shown on the picture. Only what is verified about the picture. */
    imageCaption?: string;
  };
  /** Blocks after the hero, in this order. */
  blocks: BlockSpec[];
}
