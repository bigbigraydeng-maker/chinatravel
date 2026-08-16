/**
 * 推广方案 schema —— 对齐 docs/october-2026-discovery-seo-ads-plan.md 的结构。
 *
 * 只覆盖需要判断的部分。产品事实速查表、活动命名、UTM 链接由 utm.ts 用代码生成,
 * 不放进这里 —— 那些有硬规范,让模型编等于把报表口径交给运气。
 */

export const PROMOTION_PLAN_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: [
    'positioning',
    'keywordClusters',
    'onSiteSeoActions',
    'channelPlan',
    'contentCalendar',
    'googleAds',
    'metaAds',
    'complianceNotes',
    'kpis',
  ],
  properties: {
    positioning: {
      type: 'object',
      additionalProperties: false,
      required: ['oneLineDifferentiator', 'targetAudience', 'competingAlternative'],
      properties: {
        oneLineDifferentiator: {
          type: 'string',
          description:
            'English, under 15 words — the one thing this tour has that the others do not. This is the line every ad and post has to earn.',
        },
        targetAudience: {
          type: 'string',
          description:
            '中文。谁最可能买这个团 —— 年龄、出行阶段、动机、预算敏感度。写具体,不要写「热爱旅游的新西兰人」这种等于没写的话。',
        },
        competingAlternative: {
          type: 'string',
          description:
            '中文。客人在决定买这个团之前,最可能在拿它和什么比 —— 别家的同类团、自由行、或者干脆去别的国家。以及我们凭什么赢。',
        },
      },
    },
    keywordClusters: {
      type: 'object',
      additionalProperties: false,
      required: ['core', 'longTail', 'local', 'clarifying'],
      properties: {
        core: {
          type: 'array',
          description: 'English head terms a NZ traveller would search. 4-6 items.',
          items: { type: 'string' },
        },
        longTail: {
          type: 'array',
          description: 'English long-tail phrases, closer to booking intent. 4-8 items.',
          items: { type: 'string' },
        },
        local: {
          type: 'array',
          description: 'English local and brand-defence terms — "China tours Auckland", "CTS China tour". 2-4 items.',
          items: { type: 'string' },
        },
        clarifying: {
          type: 'array',
          description:
            'Searches showing confusion this product can clear up — the October plan used "tale of two cities China which cities". Each becomes an FAQ on the tour page.',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['query', 'faqAnswer'],
            properties: {
              query: { type: 'string', description: 'English search query.' },
              faqAnswer: {
                type: 'string',
                description: 'English FAQ answer, two or three sentences, factual per the itinerary.',
              },
            },
          },
        },
      },
    },
    onSiteSeoActions: {
      type: 'array',
      description: '站内 SEO 动作清单,3-6 条,按优先级排。',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['action', 'where', 'why'],
        properties: {
          action: { type: 'string', description: '中文。具体做什么。' },
          where: { type: 'string', description: '页面路径或组件名。' },
          why: { type: 'string', description: '中文。为什么这条值得做。' },
        },
      },
    },
    channelPlan: {
      type: 'array',
      description:
        '预算怎么分。CTS 面向中老年客群的主力是 Google 搜索、YouTube、Facebook Reels —— 按这个现实分配,不要把预算摊到用不上的渠道。每个渠道给出占比、承担的角色、创意重点。占比加起来应为 100。',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['channel', 'budgetSharePct', 'role', 'creativeFocus'],
        properties: {
          channel: {
            type: 'string',
            enum: ['google-search', 'youtube', 'facebook-reels', 'facebook-feed', 'email', 'seo-organic'],
          },
          budgetSharePct: { type: 'integer', description: '预算占比,整数百分比。SEO 走自然流量时填 0。' },
          role: { type: 'string', description: '中文。这个渠道在漏斗里承担什么 —— 拉新、种草、还是收口。' },
          creativeFocus: {
            type: 'string',
            description: '中文。针对 55+ 客群,这个渠道的创意该往哪个方向做。',
          },
        },
      },
    },
    contentCalendar: {
      type: 'array',
      description:
        '内容排期,10-14 条,从今天排到出发前。这是「内容怎么搭建」的答案,要足够密才有用。按 channelPlan 的渠道权重分配条目数 —— 主力渠道多排,边缘渠道少排或不排。',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['date', 'timing', 'channel', 'format', 'title', 'angle'],
        properties: {
          date: {
            type: 'string',
            description:
              'Absolute date this goes live, YYYY-MM-DD. Must fall between today and the first departure — both are given to you. Do not use relative weeks here.',
          },
          timing: { type: 'string', description: '中文,如「距出发 9 周」,与 date 对应。' },
          channel: {
            type: 'string',
            enum: ['blog', 'google-ads', 'youtube', 'facebook-reels', 'facebook-feed', 'email', 'landing-page'],
          },
          format: { type: 'string', description: '中文,如「长文 1500 字」「竖屏 30 秒口播」。' },
          title: { type: 'string', description: 'English — this is published copy.' },
          angle: { type: 'string', description: '中文。这条内容承担什么作用、推动客人走到哪一步。' },
        },
      },
    },
    googleAds: {
      type: 'object',
      additionalProperties: false,
      required: ['adGroups', 'rsaHeadlines', 'rsaDescriptions'],
      properties: {
        adGroups: {
          type: 'array',
          description: '2-4 个广告组,按搜索意图拆,不要按渠道拆。',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['name', 'intent', 'matchType'],
            properties: {
              name: { type: 'string', description: 'English ad group name, e.g. Terracotta_Xian.' },
              intent: { type: 'string', description: '中文。这组捕捉的是什么意图。' },
              matchType: { type: 'string', description: '如「短语 + 完全匹配」。' },
            },
          },
        },
        rsaHeadlines: {
          type: 'array',
          description:
            'English RSA headlines, each 30 characters or fewer, 8-10 of them. Every factual claim must hold against the itinerary — price, duration, departure date, what is included.',
          items: { type: 'string' },
        },
        rsaDescriptions: {
          type: 'array',
          description:
            'English RSA descriptions, each 90 characters or fewer, 3-4 of them. Same factual discipline.',
          items: { type: 'string' },
        },
      },
    },
    metaAds: {
      type: 'object',
      additionalProperties: false,
      required: ['objective', 'audience', 'retargeting', 'creativeDirections'],
      properties: {
        objective: { type: 'string', description: '中文,投放目标及理由。' },
        audience: { type: 'string', description: '中文。冷启动受众:地域、年龄、兴趣叠加。' },
        retargeting: { type: 'string', description: '中文。再营销人群怎么切。' },
        creativeDirections: {
          type: 'array',
          description: '2-4 个创意方向。',
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['format', 'hook', 'outline'],
            properties: {
              format: { type: 'string', description: '中文,如「竖屏 20 秒顾问口播」。' },
              hook: { type: 'string', description: 'English — the first line on screen or spoken.' },
              outline: { type: 'string', description: '中文。镜头或分镜走向。' },
            },
          },
        },
      },
    },
    complianceNotes: {
      type: 'array',
      description:
        '中文。投放前必须处理的事实与合规问题 —— 行程没写却被广告暗示的东西、签证口径、价格是否含机票、库存与团期风险。宁可多列一条,广告超写对旅游经营者是实打实的风险。',
      items: { type: 'string' },
    },
    kpis: {
      type: 'array',
      description: '3-5 个周报口径的衡量指标。',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['metric', 'target', 'source'],
        properties: {
          metric: { type: 'string', description: '中文指标名。' },
          target: { type: 'string', description: '目标值或方向;没有基线就说明依据。' },
          source: { type: 'string', description: '从哪里看,如 GA4、Search Console、Ads 后台。' },
        },
      },
    },
  },
} as const;

export interface PromotionPlan {
  positioning: {
    oneLineDifferentiator: string;
    targetAudience: string;
    competingAlternative: string;
  };
  keywordClusters: {
    core: string[];
    longTail: string[];
    local: string[];
    clarifying: Array<{ query: string; faqAnswer: string }>;
  };
  onSiteSeoActions: Array<{ action: string; where: string; why: string }>;
  channelPlan: Array<{
    channel: 'google-search' | 'youtube' | 'facebook-reels' | 'facebook-feed' | 'email' | 'seo-organic';
    budgetSharePct: number;
    role: string;
    creativeFocus: string;
  }>;
  contentCalendar: Array<{
    date: string;
    timing: string;
    channel: 'blog' | 'google-ads' | 'youtube' | 'facebook-reels' | 'facebook-feed' | 'email' | 'landing-page';
    format: string;
    title: string;
    angle: string;
  }>;
  googleAds: {
    adGroups: Array<{ name: string; intent: string; matchType: string }>;
    rsaHeadlines: string[];
    rsaDescriptions: string[];
  };
  metaAds: {
    objective: string;
    audience: string;
    retargeting: string;
    creativeDirections: Array<{ format: string; hook: string; outline: string }>;
  };
  complianceNotes: string[];
  kpis: Array<{ metric: string; target: string; source: string }>;
}
