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

export type PlayQuizFormat = 'spot-the-odd-one-out' | 'spot-the-lie'

export interface PlayQuizPanel {
  /** Label shown on the social card (A-F). Determines reveal order. */
  label: 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  /** Public image URL — Supabase tour-images CDN or any /public path. */
  image: string
  /** Short alt text. */
  altText: string
  /** Surface name shown when the answer is revealed (e.g. "Suzhou, China"). */
  location: string

  // ─── spot-the-odd-one-out specific ─────────────────────────────────────
  /** True for the deliberate "wrong" panel in spot-the-odd-one-out. */
  isCorrectAnswer?: boolean
  /** 1-3 sentence background story unlocked on reveal (spot-the-odd-one-out). */
  story?: string
  /** Used on the odd-one panel to soft-pitch alternatives ("not in our lineup yet"). */
  crossSellNote?: string

  // ─── spot-the-lie specific ─────────────────────────────────────────────
  /** 15-20 word claim shown ON the collage panel. 5 true, 1 false. */
  shortClaim?: string
  /** ~60-word full claim shown on the LP for the visitor to read carefully. */
  longClaim?: string
  /** True for the one lie panel in spot-the-lie. */
  isLie?: boolean
  /** The actual truth — shown next to the lie panel on reveal. */
  truth?: string
  /** Bonus fact / surprise twist for truth panels, shown on LP reveal expansion. */
  factExpansion?: string

  // ─── shared ────────────────────────────────────────────────────────────
  /** Optional CTS tour CTA tied to this location. */
  tourLink?: { label: string; href: string }
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

  // ─── Spot the Lie #1 — China Icons ──────────────────────────────────────
  // 6 famous China landmarks, each with a claim. 5 truths + 1 lie (Panel D:
  // "Great Wall visible from space" — classic NASA-debunked myth).
  // Image source: ChatGPT (gpt-image) — see public/images/play/spot-the-lie-china-icons-1/
  {
    slug: 'spot-the-lie-china-icons-1',
    format: 'spot-the-lie',
    hero: {
      question: '5 Truths & 1 Lie about China — can you spot the lie?',
      subtitle:
        "Five of these claims about China's most iconic places are true. One is a famous myth that Westerners have believed for decades. Read each, pick the lie, and we'll show you the truth — plus the CTS tour that takes you to every real spot.",
      ogImage: '/images/play/spot-the-lie-china-icons-1/collage.png',
    },
    panels: [
      {
        label: 'A',
        image: '/images/play/spot-the-lie-china-icons-1/panel-A.png',
        altText:
          "Mt. Huangshan's twisted pines and granite peaks rising through a sea of clouds at sunrise",
        location: 'Mt. Huangshan, Anhui — China',
        shortClaim:
          'Twisted pines inspired 1,500 years of Chinese landscape painting.',
        longClaim:
          "Mt. Huangshan's twisted pines and granite peaks inspired over 1,500 years of Chinese landscape painting — including the iconic Welcoming Guest Pine that's been alive for over 1,300 years.",
        isLie: false,
        factExpansion:
          'The Welcoming Guest Pine (迎客松) is so famous it has its own personal guardian — a state-appointed ranger who lives in a hut nearby and files daily health reports on the tree to the Chinese government.',
        tourLink: { label: 'Best of China · 15 days', href: '/campaigns/best-of-china' },
      },
      {
        label: 'B',
        image: '/images/play/spot-the-lie-china-icons-1/panel-B.png',
        altText:
          "Ranks of life-sized terracotta warrior statues standing in their excavation pit in Xi'an",
        location: "Terracotta Army, Xi'an — China",
        shortClaim:
          '8,000+ warriors, every face unique, modeled on real soldiers 2,200 years ago.',
        longClaim:
          "Of the 8,000+ terracotta warriors guarding Emperor Qin Shi Huang's tomb, no two faces are identical — each was modeled on a real soldier from his army 2,200 years ago.",
        isLie: false,
        factExpansion:
          'The warriors were originally painted in vivid red, blue, purple and green. Most of the paint flaked off within minutes of being exposed to air after 2,200 years underground — a problem archaeologists are still trying to solve before excavating the rest of the tomb.',
        tourLink: { label: 'Best of China · 15 days', href: '/campaigns/best-of-china' },
      },
      {
        label: 'C',
        image: '/images/play/spot-the-lie-china-icons-1/panel-C.png',
        altText:
          "Songzanlin Monastery's gold rooftops and Tibetan architecture with snow mountains behind",
        location: 'Shangri-La, Yunnan — China',
        shortClaim:
          'Renamed in 2001 after a fictional paradise in a 1933 British novel.',
        longClaim:
          "Shangri-La in Yunnan was renamed in 2001 — the town officially adopted the name of the fictional paradise from James Hilton's 1933 novel “Lost Horizon” to attract international tourists.",
        isLie: false,
        factExpansion:
          'Before 2001 the town was called Zhongdian (中甸). Three other Chinese counties also competed for the official “Shangri-La” branding — Zhongdian won after a four-year campaign backed by the Yunnan provincial government.',
        tourLink: {
          label: 'Yunnan Explorer · 12 days',
          href: '/tours/china/discovery/yunnan-explorer',
        },
      },
      {
        label: 'D',
        image: '/images/play/spot-the-lie-china-icons-1/panel-D.png',
        altText: 'The Great Wall of China snaking through autumn-coloured forested mountains',
        location: 'Mutianyu Great Wall, Beijing — China',
        shortClaim:
          'The only man-made structure visible from space with the naked eye.',
        longClaim:
          'The Great Wall of China is the only man-made structure visible from space with the naked eye, stretching over 21,000 kilometres across the country.',
        isLie: true,
        truth:
          'The Wall is NOT visible from space with the naked eye. NASA has confirmed this multiple times — the Wall is only 5-9 metres wide, which from the International Space Station (400 km up) is the equivalent of trying to spot a single human hair from 4 km away. Chinese astronaut Yang Liwei was the first to publicly debunk it in 2003 after his 21-hour orbital flight. (The 21,000 km length is real, though — that half of the claim is true.)',
        tourLink: { label: 'Best of China · 15 days', href: '/campaigns/best-of-china' },
      },
      {
        label: 'E',
        image: '/images/play/spot-the-lie-china-icons-1/panel-E.png',
        altText:
          'Vertical sandstone pillars rising through morning mist in Zhangjiajie National Forest Park',
        location: 'Zhangjiajie, Hunan — China',
        shortClaim: 'Inspired the floating Hallelujah Mountains in Avatar (2009).',
        longClaim:
          "Zhangjiajie's sandstone pillars directly inspired the floating Hallelujah Mountains in James Cameron's Avatar (2009) — the producers visited, and one pillar was officially renamed “Avatar Hallelujah Mountain.”",
        isLie: false,
        factExpansion:
          'The 2010 renaming sparked enough nationalist backlash inside China that the local government held a public ceremony to defend the decision. The pillar is still officially named after the Hollywood film.',
        tourLink: { label: 'Zhangjiajie Stopover', href: '/tours/china/stopover/zhangjiajie' },
      },
      {
        label: 'F',
        image: '/images/play/spot-the-lie-china-icons-1/panel-F.png',
        altText:
          'Turquoise alpine lakes surrounded by autumn-coloured forest in Jiuzhaigou Valley',
        location: 'Jiuzhaigou Valley, Sichuan — China',
        shortClaim:
          'Turquoise lakes from calcium carbonate — visibility 40 metres down.',
        longClaim:
          "Jiuzhaigou's brilliant turquoise lakes get their colour from calcium carbonate deposits left by ancient glaciers — the water is so clear you can see up to 40 metres down.",
        isLie: false,
        factExpansion:
          "After the 2017 Sichuan earthquake, several of Jiuzhaigou's signature lakes drained and re-formed overnight. The valley reopened to visitors in 2019 after a massive ecological restoration project.",
        tourLink: { label: 'Browse Discovery Tours', href: '/tours/china/discovery' },
      },
    ],
    answer: {
      correctLabel: 'D',
      headline: "D is the lie — the Great Wall is NOT visible from space.",
      detail:
        "It's one of the most repeated “facts” in Western textbooks — and it's wrong. Both NASA astronauts and Chinese astronauts confirm the Wall is invisible from orbit with the naked eye. The other five claims? All true. Tap any panel below for the full story plus the CTS tour that takes you there.",
    },
    meta: {
      title: '5 Truths & 1 Lie about China — Can you spot the myth? | CTS Tours',
      description:
        "Five facts about China's most iconic places are real. One is a 50-year-old myth Westerners still believe. See if you can spot it — and discover the CTS tours that visit every real spot.",
    },
  },
]

export function getPlayQuizBySlug(slug: string): PlayQuiz | null {
  return PLAY_QUIZZES.find(q => q.slug === slug) ?? null
}

export function getAllPlayQuizSlugs(): string[] {
  return PLAY_QUIZZES.map(q => q.slug)
}
