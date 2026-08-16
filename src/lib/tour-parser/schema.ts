/**
 * Tour 解析原型 —— 结构化输出 schema
 *
 * 这个 schema 直接约束 Claude 的返回值,字段命名对齐 `Tour` / `DayItinerary`
 * (src/lib/data/tours.ts),这样审核通过后可以几乎原样落进产品数据。
 *
 * 设计原则:**文档里没有的字段返回 null,不许猜**。
 * 原型阶段的价值在于知道「哪些解析对了、哪些要人工补」,
 * 一个编出来的价格比一个 null 危险得多。
 */

/** 可空字符串 —— 结构化输出不支持 type 数组,用 anyOf 表达 */
const nullableString = { anyOf: [{ type: 'string' }, { type: 'null' }] } as const;

export const TOUR_EXTRACTION_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'name',
    'title',
    'shortDescription',
    'duration',
    'price',
    'singleSupplement',
    'departures',
    'tourCities',
    'highlights',
    'sellingPoints',
    'itinerary',
    'inclusions',
    'exclusions',
    'suggestedTier',
    'tierReasoning',
    'suggestedSlug',
    'metaTitle',
    'metaDescription',
    'clientClaimsToVerify',
    'blogAngles',
    'missingFields',
    'confidenceNotes',
  ],
  properties: {
    name: {
      type: 'string',
      description:
        'Product name in CTS house format: "China Discovery — Best of China". Use the destination and tier you inferred.',
    },
    title: { type: 'string', description: 'Full display title for the tour page hero.' },
    shortDescription: {
      type: 'string',
      description: 'One or two sentences describing the tour, for cards and listings.',
    },
    duration: {
      type: 'string',
      description: 'Duration exactly as CTS formats it, e.g. "15 Days". Count the itinerary days if not stated.',
    },
    price: {
      ...nullableString,
      description:
        'Lead-in twin-share price in CTS format, e.g. "From NZD $3,880 per person". null if the document states no price.',
    },
    singleSupplement: {
      ...nullableString,
      description: 'Single room supplement, e.g. "NZD $800". null if not stated.',
    },
    departures: {
      type: 'array',
      description:
        'Scheduled departures. Empty array if the document lists none. Do not invent dates.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['date', 'price'],
        properties: {
          date: {
            type: 'string',
            description: 'Departure date in CTS format: "3 November 2026". Always include the year.',
          },
          price: {
            ...nullableString,
            description:
              'Price specific to this departure, e.g. "NZD $3,880". null when all departures share the lead-in price.',
          },
        },
      },
    },
    tourCities: {
      type: 'array',
      description:
        'Cities in travel order as lowercase slugs, e.g. ["beijing", "xian", "shanghai"]. Used for the route map.',
      items: { type: 'string' },
    },
    highlights: {
      type: 'array',
      description: '4-6 highlights, each a short phrase. Drawn from the document, not invented.',
      items: { type: 'string' },
    },
    sellingPoints: {
      type: 'array',
      description:
        "Selling points for NZ travellers. When SOURCE B (the client's own selling points) is supplied, it is the primary input here: keep their angle and their voice, tightening the English only where it is unclear or ungrammatical. Do not replace their positioning with your own. When there is no SOURCE B, write these from the itinerary, and every claim must be supported by it.",
      items: { type: 'string' },
    },
    itinerary: {
      type: 'array',
      description: 'Day-by-day itinerary, one entry per day, in order.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['day', 'title', 'description', 'meals', 'accommodation'],
        properties: {
          day: { type: 'integer', description: 'Day number, starting at 1.' },
          title: {
            type: 'string',
            description: 'Day title, usually the route, e.g. "Beijing — Xi\'an".',
          },
          description: { type: 'string', description: 'What happens that day, in prose.' },
          meals: {
            type: 'array',
            description: 'Meals included: any of "Breakfast", "Lunch", "Dinner". Empty array if none.',
            items: { type: 'string', enum: ['Breakfast', 'Lunch', 'Dinner'] },
          },
          accommodation: {
            ...nullableString,
            description: 'Hotel or hotel class for that night. null if not stated.',
          },
        },
      },
    },
    inclusions: { type: 'array', description: "What's included in the price.", items: { type: 'string' } },
    exclusions: { type: 'array', description: "What's not included.", items: { type: 'string' } },
    suggestedTier: {
      type: 'string',
      enum: ['signature', 'discovery', 'stopover'],
      description:
        'CTS tier. Duration is the most reliable signal — weigh it first, then price. stopover: 2-5 days, no scheduled departures. discovery: 10-15 days, NZD $2,999-3,899. signature: 16-27 days, NZD $7,999-10,899, max 16 passengers. Hotel star rating is a weak signal on its own: several discovery tours use 4-star and some use 5-star for individual nights, so never upgrade a 10-15 day tour to signature on hotel class alone. The words "Discovery" or "Signature" in the document title are NOT reliable — an existing CTS signature product is titled "Silk Road Discovery". If duration and price disagree, follow duration and say so in confidenceNotes.',
    },
    tierReasoning: {
      type: 'string',
      description:
        'Written in Simplified Chinese (简体中文) for the CTS reviewer. One or two sentences on why that tier, leading with duration and price. Anything you quote from the source stays in the original English inside 「」. If you were not confident, say what made it ambiguous.',
    },
    suggestedSlug: {
      type: 'string',
      description: 'URL slug, lowercase kebab-case, e.g. "beijing-xian". No destination or tier prefix.',
    },
    metaTitle: { type: 'string', description: 'SEO title, under 60 characters, ending in "| CTS Tours".' },
    metaDescription: { type: 'string', description: 'SEO meta description, 140-160 characters.' },
    clientClaimsToVerify: {
      type: 'array',
      description:
        "Claims in SOURCE B that the itinerary does not support, or contradicts — e.g. the client writes \"all 5-star hotels\" but the itinerary lists 4-star, or promises an attraction no day includes. CTS must not publish an unverifiable claim, so surface each one here rather than quietly dropping it or quietly repeating it. Empty array when there is no SOURCE B, or when every claim checks out.",
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['claim', 'issue'],
        properties: {
          claim: {
            type: 'string',
            description:
              "The client's claim, quoted VERBATIM in its original language — do not translate, paraphrase, or tidy it. The reviewer needs to find this exact string in the client's material.",
          },
          issue: {
            type: 'string',
            description:
              'Written in Simplified Chinese (简体中文) — this is for the CTS reviewer. Explain what the itinerary says instead, or that it is silent on the point. When you cite the itinerary, keep the cited words in the original English inside 「」.',
          },
        },
      },
    },
    blogAngles: {
      type: 'array',
      description:
        'Three to five blog angles this tour could support for NZ readers, for the CTS content team. Each should be a topic a Kiwi traveller would actually search for, not a restatement of the product name. Draw on both sources.',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'angle'],
        properties: {
          title: { type: 'string', description: 'Working headline.' },
          angle: { type: 'string', description: 'One sentence on what the post covers and who it is for.' },
        },
      },
    },
    missingFields: {
      type: 'array',
      description:
        "Fields you returned as null or empty because the source did not contain them — the reviewer's to-do list. Use the exact JSON field names from this schema (price, departures, singleSupplement …). Do not translate these; the interface renders its own Chinese labels.",
      items: { type: 'string' },
    },
    confidenceNotes: {
      type: 'array',
      description:
        'Anything you were unsure about — ambiguous pricing, unclear dates, contradictions in the source. Written in Simplified Chinese (简体中文) for the CTS reviewer, but any words you quote from the source stay in the original English, inside 「」. Empty array if the source was unambiguous.',
      items: { type: 'string' },
    },
  },
} as const;

export interface ParsedDeparture {
  date: string;
  price: string | null;
}

export interface ParsedDay {
  day: number;
  title: string;
  description: string;
  meals: string[];
  accommodation: string | null;
}

export interface ClientClaim {
  claim: string;
  issue: string;
}

export interface BlogAngle {
  title: string;
  angle: string;
}

/** Claude 返回值 —— 与 TOUR_EXTRACTION_SCHEMA 一一对应 */
export interface ParsedTour {
  name: string;
  title: string;
  shortDescription: string;
  duration: string;
  price: string | null;
  singleSupplement: string | null;
  departures: ParsedDeparture[];
  tourCities: string[];
  highlights: string[];
  sellingPoints: string[];
  itinerary: ParsedDay[];
  inclusions: string[];
  exclusions: string[];
  suggestedTier: 'signature' | 'discovery' | 'stopover';
  tierReasoning: string;
  suggestedSlug: string;
  metaTitle: string;
  metaDescription: string;
  clientClaimsToVerify: ClientClaim[];
  blogAngles: BlogAngle[];
  missingFields: string[];
  confidenceNotes: string[];
}
