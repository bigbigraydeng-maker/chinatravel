/**
 * Data store for the /play FB-engagement quiz funnel.
 *
 * Each quiz here drives a 3-phase funnel:
 *   1. Meta-boosted post (6-panel image collage + provocative question)
 *   2. Click → /play/[slug] reveal page
 *   3. Per-panel story + CTS tour link → /tours/... or /campaigns/...
 *
 * Add new quizzes by appending to PLAY_QUIZZES. The reveal page renders any
 * `format: 'spot-the-odd-one-out'` quiz off the same template — new "type"
 * formats (Match / Guess-the-price / etc.) get their own renderer when added.
 *
 * Image hosting: each panel's `image` is a public URL (Supabase tour-images
 * bucket is the canonical CTS image library — same bucket the rest of the
 * site uses). PM swaps in ChatGPT-generated panels by editing this file
 * (no rebuild needed beyond a normal deploy).
 */

export type PlayQuizFormat = 'spot-the-odd-one-out'

export interface PlayQuizPanel {
  /** Label shown on the social card (A-F). Determines reveal order. */
  label: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  /** Public image URL — Supabase tour-images CDN or any /public path. */
  image: string
  /** Short alt text. */
  altText: string
  /** Surface name shown when the answer is revealed (e.g. "Suzhou, China"). */
  location: string
  /** True for the deliberate "wrong" panel in spot-the-odd-one-out. */
  isCorrectAnswer: boolean
  /** 1-3 sentence background story unlocked on reveal. */
  story: string
  /** Optional CTS tour CTA tied to this location. */
  tourLink?: { label: string; href: string }
  /** Used on the odd-one panel to soft-pitch alternatives ("not in our lineup yet"). */
  crossSellNote?: string
}

export interface PlayQuiz {
  slug: string
  format: PlayQuizFormat
  /** Pre-reveal hero copy (also drives the FB ad creative + OG metadata). */
  hero: {
    question: string
    subtitle: string
    /** Open-graph card image (use the same collage shipped to FB). */
    ogImage: string
  }
  panels: PlayQuizPanel[]
  /** Reveal-time copy. `correctLabel` should match a panel.label. */
  answer: {
    correctLabel: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
    headline: string
    detail: string
  }
  /** `<head>` metadata. */
  meta: { title: string; description: string }
}

// ─── Image paths ──────────────────────────────────────────────────────────────
//
// PM is generating these via ChatGPT image. The expected upload location is
// `chinatravel/public/images/play/spot-the-odd-china/{A,B,C,D,E,F}.jpg`.
//
// Until those land, the panels point at existing Supabase tour-images so the
// page renders + tests pass. Swap to the new local paths in one edit per
// panel when PM finishes generating.

const IMG_TOUR_LIB = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images'

const PLACEHOLDER_IMAGES = {
  A_jiangnan:        `${IMG_TOUR_LIB}/tours/wuzhen-canal/wuzhen-canal.jpg`,
  // Placeholder for Korea panel — PM will swap to ChatGPT-generated hanok.
  // We deliberately reuse a China image here so PRE-launch QA doesn't show a
  // misleading "Korean" panel that's actually Chinese. PM swap → real Korea.
  B_korea:           `${IMG_TOUR_LIB}/tours/shanghai-night-red/shanghai-night-red.jpg`,
  C_beijing:         `${IMG_TOUR_LIB}/forbidden-city-aerial.jpg`,
  D_guilin:          `${IMG_TOUR_LIB}/tours/silk-road-wall/silk-road-wall.jpg`,
  E_lijiang:         `${IMG_TOUR_LIB}/tours/xian-terracotta/xian-terracotta.jpg`,
  F_zhangjiajie:     `${IMG_TOUR_LIB}/tours/forbidden-city-gold-lion/forbidden-city-gold-lion.jpg`,
} as const

// ─── Quiz catalogue ───────────────────────────────────────────────────────────

export const PLAY_QUIZZES: PlayQuiz[] = [
  {
    slug: 'spot-the-odd-china',
    format: 'spot-the-odd-one-out',
    hero: {
      question: 'Can you tell which one is NOT in China?',
      subtitle:
        '6 photos side-by-side — 5 are from China, 1 sneaked in from another country. Scroll down to see the answer + which CTS tour each real-China spot is in.',
      ogImage:
        'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/forbidden-city-aerial.jpg',
    },
    panels: [
      {
        label: 'A',
        image: PLACEHOLDER_IMAGES.A_jiangnan,
        altText: 'Jiangnan water town canal with red lanterns and arched stone bridge',
        location: 'Wuzhen Water Town, Jiangsu — China',
        isCorrectAnswer: false,
        story:
          'A 1,300-year-old water town on the Grand Canal in Jiangsu. Whitewashed walls, dark tile roofs and arched stone bridges have barely changed since the Ming dynasty. Evening lantern light on the canal is one of the signature scenes of any Jiangnan trip.',
        tourLink: {
          label: 'Shanghai & Surroundings · 10 days',
          href: '/campaigns/october-2026/shanghai-surroundings',
        },
      },
      {
        label: 'B',
        image: PLACEHOLDER_IMAGES.B_korea,
        altText: 'Korean hanok village street with cherry blossoms and distant tower',
        location: 'Bukchon Hanok Village, Seoul — South Korea',
        isCorrectAnswer: true,
        story:
          'Bukchon is a 600-year-old neighbourhood of preserved Korean hanok houses, tucked between two royal palaces in central Seoul. Spring cherry blossom and the distant Namsan Tower silhouette give it away — those upturned tile roofs are Korean, not Chinese.',
        crossSellNote:
          'Not in our China lineup — but if Korea is on your wishlist alongside China, talk to us about a tailored multi-country itinerary.',
      },
      {
        label: 'C',
        image: PLACEHOLDER_IMAGES.C_beijing,
        altText: 'Forbidden City Meridian Gate seen from Tiananmen Square approach',
        location: 'The Forbidden City, Beijing — China',
        isCorrectAnswer: false,
        story:
          '600 years old, 9,999 rooms, and the centre of imperial China for almost 500 years. The Meridian Gate (Wumen) is where emperors received victorious generals. Both our Best of China and Tale of Two Cities tours spend a full guided day here.',
        tourLink: {
          label: 'Best of China · 15 days from NZD $3,880',
          href: '/campaigns/best-of-china',
        },
      },
      {
        label: 'D',
        image: PLACEHOLDER_IMAGES.D_guilin,
        altText: 'Karst mountains and fisherman on bamboo raft on the Li River',
        location: "Li River, Guangxi — China",
        isCorrectAnswer: false,
        story:
          'The 83-km stretch of the Li River between Guilin and Yangshuo is on the back of the Chinese 20-yuan note. Limestone karst peaks rise straight out of the water; fishermen still pole bamboo rafts at dawn. Talk to us about adding a 2-day Guilin extension to any Discovery tour.',
        tourLink: {
          label: 'Browse Discovery tours',
          href: '/tours/china/discovery',
        },
      },
      {
        label: 'E',
        image: PLACEHOLDER_IMAGES.E_lijiang,
        altText: 'Lijiang Old Town cobblestone lane with Naxi rooftops and lanterns',
        location: 'Lijiang Old Town, Yunnan — China',
        isCorrectAnswer: false,
        story:
          'A 900-year-old Naxi minority town at 2,400m altitude, just below the snow-capped Jade Dragon Mountain. The carved wooden balconies, cobblestone lanes and waterway grid are a UNESCO World Heritage site — and a complete change of pace from imperial Beijing.',
        tourLink: {
          label: 'Yunnan Explorer · 12 days',
          href: '/tours/china/discovery/yunnan-explorer',
        },
      },
      {
        label: 'F',
        image: PLACEHOLDER_IMAGES.F_zhangjiajie,
        altText: 'Mountain temple pavilion above a sea of clouds in Zhangjiajie',
        location: 'Zhangjiajie / Wulingyuan, Hunan — China',
        isCorrectAnswer: false,
        story:
          'The stone pillar forests of Zhangjiajie were the visual inspiration for the Hallelujah Mountains in James Cameron\'s Avatar. The sea of clouds (云海) that gathers between the peaks at dawn is one of the most photographed landscapes in China.',
        tourLink: {
          label: 'Zhangjiajie Stopover',
          href: '/tours/china/stopover/zhangjiajie',
        },
      },
    ],
    answer: {
      correctLabel: 'B',
      headline: 'B is the odd one out — that\'s Seoul, South Korea.',
      detail:
        'Five of the six photos are unmistakably Chinese landscapes you can visit on a CTS tour. Panel B is Bukchon Hanok Village in Seoul (give it away: cherry blossom + Namsan Tower silhouette + Korean tile-roof curves). All the others are real China spots — scroll any panel for the story plus the tour that takes you there.',
    },
    meta: {
      title: 'Which one is NOT in China? Spot-the-odd China quiz | CTS Tours',
      description:
        'Five of six photos are real China spots — one is a clever Korea decoy. See the answer + the CTS tour that visits each real China location.',
    },
  },
]

export function getPlayQuizBySlug(slug: string): PlayQuiz | null {
  return PLAY_QUIZZES.find(q => q.slug === slug) ?? null
}

export function getAllPlayQuizSlugs(): string[] {
  return PLAY_QUIZZES.map(q => q.slug)
}
