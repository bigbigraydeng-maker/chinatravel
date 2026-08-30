'use client';

import { useState, useMemo } from 'react';
import { GOOGLE_RATING } from '@/lib/data/google-rating';

/**
 * 站内旅客评价 —— **只放真实存在的 Google 评价**。
 *
 * ## 改这个文件前必读
 *
 * 每一条都必须能在 CTS 的 Google 商家页上逐字找到（`GOOGLE_RATING.profileUrl`）。
 * Google 只给四样东西：**评价人姓名 / 星级 / 正文 / 日期**。正文必须逐字照抄，
 * 不许润色、不许改写、不许截断成"更好听"的版本，更不许为了排版好看补内容。
 *
 * 其余字段一律可选，**拿不到就留空**，页面会把对应的整块隐藏：
 * - `location`：Google 不提供评价人所在城市 —— 永远留空，除非客人另外自己告知。
 * - `title`：Google 评价没有标题 —— 永远留空。
 * - `tour`：只有正文自己提到才填，且**照抄正文里的说法**（如 "Tale of 2 Cities"）。
 * - `consultantMentioned`：只有正文明确点名同事才填。
 * - `avatarInitials`：从真实姓名机械推导（"Cherie Fairley" → "CF"），属转换不属编造。
 * - `colorIndex`：纯样式。
 *
 * 聚合评分（几分 / 几条）统一读 `src/lib/data/google-rating.ts`，
 * **不许在本文件另写数字**。
 *
 * 历史教训：本文件曾长期挂着 33 条**编造**的评价（假头像、假点赞数、行程里
 * 根本不存在的"日出登长城"），在新西兰属《公平交易法》层面的问题。
 */

// Pre-defined avatar color pairs (full strings for Tailwind JIT)
const AVATAR_COLORS = [
  'from-blue-500 to-cyan-400',
  'from-emerald-600 to-teal-400',
  'from-violet-500 to-purple-400',
  'from-rose-500 to-pink-400',
  'from-amber-500 to-orange-400',
  'from-red-600 to-rose-400',
  'from-indigo-600 to-blue-400',
  'from-green-600 to-emerald-400',
  'from-pink-600 to-rose-400',
  'from-cyan-600 to-sky-400',
];

interface Testimonial {
  id: number;
  /** 评价人姓名 —— 照抄 Google */
  name: string;
  /** 星级 —— 照抄 Google */
  rating: number;
  /** 正文 —— 逐字照抄 Google，一个字都不许改 */
  text: string;
  /** 评价发表日期（ISO，如 '2026-07-06'）—— 注意不是出行日期 */
  date: string;
  /** 姓名首字母，机械推导 */
  avatarInitials: string;
  /** 纯样式：AVATAR_COLORS 下标 */
  colorIndex: number;
  /** 评价人所在城市 —— Google 不提供，通常留空 */
  location?: string;
  /** 评价标题 —— Google 评价没有标题，通常留空 */
  title?: string;
  /** 正文自己提到的行程，照抄正文说法；没提就留空 */
  tour?: string;
  /** 正文明确点名的顾问；没提就留空 */
  consultantMentioned?: 'Baker' | 'Lisa';
  /** 分组标签 —— 只有确有事实依据时才填，否则留空 */
  spotlightTag?: string;
}

// ── Featured reviews (shown first, in the large + mini card layout) ───────────
// 挑哪几条是编辑选择，不是对客人的任何声称；内容与其它评价一样逐字照抄。

const spotlightTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Cherie Fairley',
    rating: 5,
    text: "We went on a recent trip to Dali and Lijiang from 19th to 30th May 2026. Well, what amazing places they are. Plus the nearby city of Shangrila. We both had an amazing time walking and exploring with only our phone app to translate, since little or no English was spoken or written. Contrary to what the Lonely Planet guidebook said! Everything worked out well which is why we want to thank Baker at CTS personally for an awesome trip, the trip of a lifetime. If any other tours, guided or unguided come up please let us know. This is Mikes second time holidaying with CTS and we will certainly highly recommend your company to friends. Mike Brooker & Cherie Fairley",
    date: '2026-06-21',
    avatarInitials: 'CF',
    colorIndex: 0,
    tour: 'Dali and Lijiang',
    consultantMentioned: 'Baker',
  },
  {
    id: 2,
    name: 'Maryam Absh',
    rating: 5,
    text: "The china journey was well‑organized, I actually enjoyed all the moments without worrying about anything. Highly recommend the tour of tale of two cities china",
    date: '2026-07-06',
    avatarInitials: 'MA',
    colorIndex: 1,
    tour: 'tale of two cities',
  },
  {
    id: 3,
    name: 'Murray Middendorf',
    rating: 5,
    text: "Just came back from a tour of Xinjiang and a stopover in Xian. We had a fantastic time, the culture and scenery in Xinjiang is stunning and the tour was led by an experienced guide with excellent English. Highly recommended.",
    date: '2026-06-16',
    avatarInitials: 'MM',
    colorIndex: 2,
    tour: 'Xinjiang',
  },
];

// ── The rest of the written Google reviews ────────────────────────────────────

const generalTestimonials: Testimonial[] = [
  {
    id: 4,
    name: 'Colin Wright',
    rating: 5,
    text: "We did the Tale of 2 Cities in November 2025. We were kept really busy with informative guides and just so much to see. Amazed all dietry requirements of group met. A group tour that exceeded all expectation. We will do another for real.",
    date: '2026-06-14',
    avatarInitials: 'CW',
    colorIndex: 3,
    tour: 'Tale of 2 Cities',
  },
  {
    id: 5,
    name: 'Tessa A',
    rating: 5,
    text: "We had our China holiday planned by CTS tours. Communication was great and the tour itself was amazing. Everything was so well run and the tour guides in each city were great. The accommodation they chose and the preplanned meals organized were stand outs. Would definitely use again to organise future trips",
    date: '2026-06-11',
    avatarInitials: 'TA',
    colorIndex: 4,
  },
  {
    id: 6,
    name: 'Torsten Rahbek',
    rating: 5,
    text: "Based on what Baker (CTS Tours), have previously organize for me and my mates, i decided to us him again for my Business trip to Shanghai and Zhengzhou, January 2026. As previously the trip was well organized, with no problems. thanks",
    date: '2026-06-11',
    avatarInitials: 'TR',
    colorIndex: 5,
    consultantMentioned: 'Baker',
  },
  {
    id: 7,
    name: 'Pam Browne',
    rating: 5,
    text: "Love a bargain, these are people. No quality compromised!",
    date: '2020-02-06',
    avatarInitials: 'PB',
    colorIndex: 6,
  },
  {
    id: 8,
    name: 'Catherine Horide',
    rating: 5,
    text: "Had a great time on China - Discovery Tour. Tour guides national and local were amazing. Really enjoyed Billy's sense of humour. Loved the genuinely friendly nature of the Chinese people. Shanghai night boat cruise and climbing the Great wall were standouts. Going to the night shows on offer is most worthwhile. Accommodation and food were of a very high standard. Glad I went as it was exceptional value for money and the experience was amazing. Much achieved in a short time. Highly recommended.",
    date: '2019-10-24',
    avatarInitials: 'CH',
    colorIndex: 7,
    tour: 'China - Discovery Tour',
  },
];

// Featured reviews lead; the rest follow
const allTestimonials: Testimonial[] = [...spotlightTestimonials, ...generalTestimonials];
const SPOTLIGHT_IDS = new Set(spotlightTestimonials.map(t => t.id));

// ── Module-level UI helpers (stable identity — no re-creation on each render) ──

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2026-07-06' → '6 Jul 2026'. 纯字符串运算，不走 Date()，避免时区/水合差异。 */
function formatReviewDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  const monthName = MONTHS[Number(month) - 1];
  if (!year || !monthName || !day) return iso;
  return `${Number(day)} ${monthName} ${year}`;
}

/** 来源标注：每条评价都要看得出是 Google 上的公开评价，并且点得过去核对。 */
function GoogleSourceTag({ label = 'Review from Google', className = '' }: { label?: string; className?: string }) {
  return (
    <a
      href={GOOGLE_RATING.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors ${className}`}
    >
      <span className="w-4 h-4 rounded-sm bg-[#4285F4] text-white text-[10px] font-bold leading-none flex items-center justify-center">
        G
      </span>
      {label}
    </a>
  );
}

/** 星级向下取整显示 —— 4.4 分画 4 颗，绝不许四舍五入把评分画高。 */
function StarRating({ rating }: { rating: number }) {
  const filled = Math.floor(rating);
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < filled ? 'text-red-500' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/** 姓名首字母头像 —— 不用第三方随机人像（那等于给真实客人配了张假脸）。 */
function Avatar({ t, size = 'md' }: { t: Testimonial; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'w-9 h-9 text-xs' : 'w-12 h-12 text-sm';
  const gradient = AVATAR_COLORS[t.colorIndex] ?? AVATAR_COLORS[0];
  return (
    <div
      aria-hidden="true"
      className={`${dim} rounded-full flex items-center justify-center flex-shrink-0 shadow-md ring-2 ring-white bg-gradient-to-br ${gradient} text-white font-bold tracking-wide`}
    >
      {t.avatarInitials}
    </div>
  );
}

/** 评价下方的事实行 —— 每一项都只在有真实内容时才出现。 */
function ReviewMeta({ t, compact = false }: { t: Testimonial; compact?: boolean }) {
  return (
    <div className={`${compact ? 'mt-3 space-y-0.5' : 'mt-4 space-y-1'} text-xs text-gray-500`}>
      <p>
        <span className="font-semibold text-gray-700">Reviewed on Google:</span>{' '}{formatReviewDate(t.date)}
      </p>
      {t.consultantMentioned && (
        <p>
          <span className="font-semibold text-gray-700">Consultant mentioned:</span>{' '}{t.consultantMentioned}
        </p>
      )}
      {t.tour && (
        <p>
          <span className="font-semibold text-gray-700">Trip mentioned in this review:</span>{' '}
          <span className="text-gray-600">{t.tour}</span>
        </p>
      )}
    </div>
  );
}

interface ReviewCardProps {
  t: Testimonial;
  showDivider: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function ReviewCard({ t, showDivider, isExpanded, onToggleExpand }: ReviewCardProps) {
  const TEXT_LIMIT = 220;
  const needsTruncate = t.text.length > TEXT_LIMIT;
  const displayText = isExpanded || !needsTruncate ? t.text : t.text.slice(0, TEXT_LIMIT) + '…';

  return (
    <div>
      {showDivider && <hr className="border-gray-100 mx-6" />}
      <div className={`px-6 py-7 ${t.spotlightTag ? 'bg-amber-50/30' : ''}`}>
        {/* Row 1: Avatar + Name (+ location only if we actually have one) */}
        <div className="flex items-start gap-4">
          <Avatar t={t} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-gray-900 leading-tight">{t.name}</p>
                {t.location && <p className="text-sm text-gray-500">{t.location}</p>}
              </div>
              <GoogleSourceTag className="flex-shrink-0" />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <StarRating rating={t.rating} />
              <span className="text-xs text-gray-400">·</span>
              <span className="text-xs text-gray-400">{formatReviewDate(t.date)}</span>
            </div>
          </div>
        </div>

        {t.title && <h3 className="font-bold text-gray-900 mt-4 text-base leading-snug">{t.title}</h3>}

        <p className="text-gray-600 mt-4 text-sm leading-relaxed">
          {displayText}
          {needsTruncate && (
            <button onClick={onToggleExpand} className="ml-1 text-primary hover:underline font-medium text-sm">
              {isExpanded ? 'show less' : 'read more'}
            </button>
          )}
        </p>

        <ReviewMeta t={t} />
      </div>
    </div>
  );
}

// ── Featured card variants ────────────────────────────────────────────────────

interface SpotlightCardBaseProps {
  t: Testimonial;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const ACCENT_BG: Record<string, string> = {
  amber: 'from-amber-50/60 to-white',
  blue:  'from-blue-50/60 to-white',
  red:   'from-red-50/60 to-white',
};

/** Large featured card — first review in the featured group */
function FeaturedSpotlightCard({ t, isExpanded, onToggleExpand, accentBg = 'amber' }: SpotlightCardBaseProps & { accentBg?: string }) {
  const TEXT_LIMIT = 280;
  const needsTruncate = t.text.length > TEXT_LIMIT;
  const displayText = isExpanded || !needsTruncate ? t.text : t.text.slice(0, TEXT_LIMIT) + '…';
  return (
    <div className={`px-6 pt-6 pb-5 bg-gradient-to-br ${ACCENT_BG[accentBg] ?? ACCENT_BG.amber}`}>
      <div className="flex items-start gap-4">
        <Avatar t={t} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-bold text-gray-900 leading-tight text-base">{t.name}</p>
              {t.location && <p className="text-sm text-gray-500">{t.location}</p>}
            </div>
            <GoogleSourceTag className="flex-shrink-0" />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <StarRating rating={t.rating} />
            <span className="text-xs text-gray-400">·</span>
            <span className="text-xs text-gray-400">{formatReviewDate(t.date)}</span>
          </div>
        </div>
      </div>
      {t.title && <h3 className="font-bold text-gray-900 mt-4 text-lg leading-snug">{t.title}</h3>}
      <p className="text-gray-600 mt-4 text-sm leading-relaxed">
        {displayText}
        {needsTruncate && (
          <button onClick={onToggleExpand} className="ml-1 text-primary hover:underline font-medium text-sm">
            {isExpanded ? 'show less' : 'read more'}
          </button>
        )}
      </p>
      <ReviewMeta t={t} compact />
    </div>
  );
}

/** Compact card — remaining reviews in the featured group, shown in a 2-col grid */
function MiniSpotlightCard({ t }: { t: Testimonial }) {
  return (
    <div className="px-5 py-5 h-full flex flex-col">
      <div className="flex items-center gap-2.5 mb-3">
        <Avatar t={t} size="sm" />
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-900 truncate">{t.name}</p>
          <p className="text-xs text-gray-500">
            {t.location ? `${t.location} · ` : ''}{formatReviewDate(t.date)}
          </p>
        </div>
      </div>
      <StarRating rating={t.rating} />
      {t.title && <p className="font-semibold text-sm text-gray-800 mt-2 leading-snug">{t.title}</p>}
      <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-4 flex-1">{t.text}</p>
      <div className="flex items-center gap-2 mt-3">
        <GoogleSourceTag />
        {t.tour && <span className="text-xs text-gray-400 truncate">· {t.tour}</span>}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface TestimonialsProps {
  variant?: 'full' | 'compact' | 'sidebar';
  tourFilter?: string;
  maxItems?: number;
  hideSpotlight?: boolean;
}

const INITIAL_VISIBLE = 3;
const LOAD_MORE_COUNT = 4;
const TOTAL_REVIEWS = allTestimonials.length;

export default function Testimonials({ variant = 'full', tourFilter, maxItems, hideSpotlight = false }: TestimonialsProps) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const displayTestimonials = useMemo(() => {
    let filtered = tourFilter
      ? allTestimonials.filter(t => t.tour?.toLowerCase().includes(tourFilter.toLowerCase()) ?? false)
      : allTestimonials;
    if (filtered.length < 3) filtered = allTestimonials;
    if (maxItems) filtered = filtered.slice(0, maxItems);
    return filtered;
  }, [tourFilter, maxItems]);

  const renderCard = (t: Testimonial, idx: number) => (
    <ReviewCard
      key={t.id}
      t={t}
      showDivider={idx > 0}
      isExpanded={!!expanded[t.id]}
      onToggleExpand={() => setExpanded(prev => ({ ...prev, [t.id]: !expanded[t.id] }))}
    />
  );

  const renderFeaturedCard = (t: Testimonial, accentBg: string) => (
    <FeaturedSpotlightCard
      key={t.id}
      t={t}
      accentBg={accentBg}
      isExpanded={!!expanded[t.id]}
      onToggleExpand={() => setExpanded(prev => ({ ...prev, [t.id]: !expanded[t.id] }))}
    />
  );

  // Sidebar variant for tour pages
  if (variant === 'sidebar') {
    const items = displayTestimonials.slice(0, 3);
    return (
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Traveller Reviews
        </h3>
        {items.map((item) => (
          <div key={item.id} className="bg-warm-50 rounded-xl p-5 border border-warm-100">
            <div className="flex items-center gap-2 mb-2">
              <Avatar t={item} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.location ? `${item.location} · ` : ''}{formatReviewDate(item.date)}
                </p>
              </div>
            </div>
            <StarRating rating={item.rating} />
            {item.title && <p className="text-xs font-semibold text-gray-800 mt-2">{item.title}</p>}
            <p className="text-sm text-gray-600 mt-2 italic leading-relaxed line-clamp-3">&ldquo;{item.text}&rdquo;</p>
            <GoogleSourceTag className="mt-3" />
          </div>
        ))}
      </div>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    const item = displayTestimonials[0];
    return (
      <div className="bg-warm-50 rounded-xl p-6 border border-warm-100">
        <div className="flex items-center gap-3 mb-3">
          <Avatar t={item} />
          <div className="min-w-0">
            <p className="font-semibold text-sm">{item.name}</p>
            <p className="text-xs text-gray-500">
              {item.location ? `${item.location} · ` : ''}{formatReviewDate(item.date)}
            </p>
          </div>
          <div className="ml-auto">
            <StarRating rating={item.rating} />
          </div>
        </div>
        {item.title && <p className="text-sm font-semibold text-gray-800 mb-1">{item.title}</p>}
        <p className="text-sm text-gray-700 italic leading-relaxed">&ldquo;{item.text}&rdquo;</p>
        <div className="flex items-center gap-2 mt-2">
          <GoogleSourceTag />
          {item.tour && <span className="text-xs text-gray-400 truncate">· {item.tour}</span>}
        </div>
      </div>
    );
  }

  // Full variant — list style
  const spotlightItems = displayTestimonials.filter(t => SPOTLIGHT_IDS.has(t.id));
  const generalItems = displayTestimonials.filter(t => !SPOTLIGHT_IDS.has(t.id));
  const [featured, ...miniCards] = spotlightItems;
  const visibleGeneralItems = generalItems.slice(0, visibleCount);
  const hasMore = visibleCount < generalItems.length;

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-amber-50/40 via-white to-sky-50/20 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-amber-200/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-rose-200/15 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-50 rounded-full px-5 py-2 mb-4 border border-amber-200/50">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-primary font-bold uppercase tracking-wider text-sm">What Our Travellers Say</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-accent">Traveller Stories</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-secondary to-primary mx-auto mt-4 rounded-full" />
          <p className="text-gray-500 mt-4 text-sm">
            {TOTAL_REVIEWS} of the {GOOGLE_RATING.count} reviews on our{' '}
            <a
              href={GOOGLE_RATING.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              Google Business Profile
            </a>
            {' '}— published word for word.
          </p>
        </div>

        {/* ── Featured reviews ── */}
        {!hideSpotlight && featured && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">FEATURED</span>
            <span className="text-sm font-semibold text-gray-700">What travellers wrote about us on Google</span>
          </div>

          <div className="rounded-2xl border-2 border-amber-400 overflow-hidden shadow-sm">
            {/* Group header */}
            <div className="px-5 py-3 flex items-center gap-3 bg-white border-b border-gray-100">
              <GoogleSourceTag label="Google reviews" />
              <span className="text-xs text-gray-400">{spotlightItems.length} reviews</span>
            </div>
            <div className="bg-white">
              {/* Featured (large) card */}
              {renderFeaturedCard(featured, 'amber')}
              {/* Mini (compact) cards in a 2-col grid */}
              {miniCards.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px border-t border-gray-100 bg-gray-100">
                  {miniCards.map(t => (
                    <div key={t.id} className="bg-white">
                      <MiniSpotlightCard t={t} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        )}

        {/* ── Remaining reviews ── */}
        {generalItems.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-semibold text-gray-600">More reviews</p>
          </div>
          {visibleGeneralItems.map((t, idx) => renderCard(t, idx))}

          {/* Load more */}
          {hasMore && (
            <div className="px-6 pb-7 pt-2 border-t border-gray-100">
              <button
                onClick={() => setVisibleCount(prev => Math.min(prev + LOAD_MORE_COUNT, generalItems.length))}
                className="w-full py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all"
              >
                Show more reviews ({generalItems.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
        )}

        {/* Summary stats — 数字来自 src/lib/data/google-rating.ts，不在此处另写 */}
        <div className="mt-8 grid grid-cols-2 gap-4 text-center">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-accent">{GOOGLE_RATING.value}</p>
            <div className="flex justify-center mt-1"><StarRating rating={GOOGLE_RATING.value} /></div>
            <p className="text-xs text-gray-500 mt-1">Average rating on Google</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-2xl font-bold text-accent">{GOOGLE_RATING.count}</p>
            <p className="text-xs text-gray-500 mt-3">Google reviews</p>
          </div>
        </div>
      </div>
    </section>
  );
}
