import { GOOGLE_RATING } from '@/lib/data/google-rating';

/**
 * /china-tours 页上的三条评价 —— **只放真实存在的 Google 评价**。
 *
 * ## 改这个文件前必读
 *
 * 每一条都必须能在 CTS 的 Google 商家页上逐字找到（`GOOGLE_RATING.profileUrl`，
 * 2026-08-30 人工核实）。Google 只给四样东西：**评价人姓名 / 星级 / 正文 /
 * 日期**。正文**逐字照抄**，不许改写、不许润色、不许截断成"更好听"的版本。
 *
 * 评价人的**城市 / 标题 / 参加的团 / 点赞数** Google 都不提供，**一律不许编**，
 * 所以下面的 interface 里根本没有这些字段。`tour` 是唯一例外：只有客人正文
 * 自己写出了团名才填，且照抄他的写法（所以会出现小写的 "tale of two cities"）。
 *
 * 版面需要几条而真实评价不够时，**减少展示数量**，不许补一条假的。
 * 聚合评分（几分 / 几条）统一读 `src/lib/data/google-rating.ts`。
 *
 * ## 这里原来是什么样
 *
 * 原本三条是编造评价的改写版（假人名 Claire & Tom Mackenzie / Simon & Kate
 * Brennan / Robert & Anne Murray，编造的城市、编造的标题、编造的团期），
 * 页头还写着「5.0 from 24 verified NZ reviews」—— 真实是 4.4 分 12 条。
 * 文件顶上原注释直白写着 "Quotes are paraphrased"，却仍然挂在真人姓名下面
 * 对外展示，这在新西兰属《公平交易法》层面的问题，不是文案尺度问题。
 */

interface ReviewHighlight {
  /** 评价人姓名 —— 照抄 Google */
  name: string;
  /** 正文 —— 逐字照抄 Google，一个字都不许改 */
  text: string;
  /** 评价发表日期（ISO）—— 注意不是出行日期 */
  date: string;
  /** 姓名首字母，机械推导 */
  initials: string;
  /** 纯样式 */
  accent: 'amber' | 'blue' | 'red';
  /** 客人正文里自己提到的团名，照抄他的写法；没提就留空 */
  tour?: string;
}

const REVIEWS: ReviewHighlight[] = [
  {
    name: "Maryam Absh",
    text: "The china journey was well‑organized, I actually enjoyed all the moments without worrying about anything. Highly recommend the tour of tale of two cities china",
    date: "2026-07-06",
    initials: "MA",
    accent: "amber",
    tour: "tale of two cities",
  },
  {
    name: "Murray Middendorf",
    text: "Just came back from a tour of Xinjiang and a stopover in Xian. We had a fantastic time, the culture and scenery in Xinjiang is stunning and the tour was led by an experienced guide with excellent English. Highly recommended.",
    date: "2026-06-16",
    initials: "MM",
    accent: "blue",
    tour: "Xinjiang",
  },
  {
    name: "Tessa A",
    text: "We had our China holiday planned by CTS tours. Communication was great and the tour itself was amazing. Everything was so well run and the tour guides in each city were great. The accommodation they chose and the preplanned meals organized were stand outs. Would definitely use again to organise future trips",
    date: "2026-06-11",
    initials: "TA",
    accent: "red",
  },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** '2026-06-16' → 'June 2026'。日期是 Google 给的，其余一概不编。 */
function formatReviewDate(iso: string): string {
  const [year, month] = iso.split('-');
  const name = MONTHS[Number(month) - 1];
  return year && name ? `${name} ${year}` : iso;
}

const ACCENT: Record<ReviewHighlight['accent'], { ring: string; badge: string; gradient: string }> = {
  amber: {
    ring: 'ring-amber-200',
    badge: 'bg-amber-100 text-amber-800 border-amber-200',
    gradient: 'from-amber-50 to-white',
  },
  blue: {
    ring: 'ring-blue-200',
    badge: 'bg-blue-100 text-blue-800 border-blue-200',
    gradient: 'from-blue-50 to-white',
  },
  red: {
    ring: 'ring-red-200',
    badge: 'bg-red-100 text-red-800 border-red-200',
    gradient: 'from-red-50 to-white',
  },
};

/** 单条评价的星级 —— 下面三条在 Google 上确实都是 5 星。 */
function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

interface ReviewsHighlightsProps {
  /**
   * On viewports below md (~768px), cap review count to this many with the
   * rest CSS-hidden. Used by FB Leadform thankyou traffic where mobile
   * scroll fatigue is worst; desktop still shows all three reviews.
   */
  mobileLimit?: number;
}

export default function ReviewsHighlights({ mobileLimit }: ReviewsHighlightsProps = {}) {
  return (
    <section className="bg-warm-50 border-y border-warm-100">
      <div className="container mx-auto px-4 py-14 md:py-16">
        <div className="max-w-3xl mb-8">
          {/*
            页头故意不画五颗满星：商家总评分不是 5.0，画满星等于用图形谎报
            聚合评分。数字统一读 google-rating.ts，不在这里写死。
          */}
          <a
            href={GOOGLE_RATING.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-2 text-xs uppercase tracking-wider text-amber-700 font-semibold underline underline-offset-2 hover:text-amber-900"
          >
            {GOOGLE_RATING.value} from {GOOGLE_RATING.count} Google reviews
          </a>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">
            What Kiwi travellers say
          </h2>
          <p className="text-lg text-gray-700">
            Three reviews from our Google Business profile, quoted word for word.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r, index) => {
            const a = ACCENT[r.accent];
            const hideOnMobile = mobileLimit != null && index >= mobileLimit;
            return (
              <article
                key={r.name}
                className={`bg-gradient-to-br ${a.gradient} rounded-2xl p-5 border border-warm-100 ring-1 ${a.ring} flex flex-col${
                  hideOnMobile ? ' hidden md:flex' : ''
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {r.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {r.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Reviewed on Google · {formatReviewDate(r.date)}
                    </p>
                  </div>
                </div>
                <Stars />
                <blockquote className="mt-3 text-sm text-gray-700 leading-relaxed flex-1">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                {r.tour && (
                  <span
                    className={`mt-4 inline-flex self-start items-center text-[11px] font-semibold px-2.5 py-1 rounded-full border ${a.badge}`}
                  >
                    Tour mentioned: {r.tour}
                  </span>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
