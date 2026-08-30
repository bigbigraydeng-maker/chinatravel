/**
 * 首页评价墙（`src/app/page-redesign.tsx`）的数据 —— **只放真实存在的
 * Google 评价**。
 *
 * ## 数据来源
 *
 * 每一条都能在 CTS 的 Google 商家页上逐字找到
 * （`GOOGLE_RATING.profileUrl`，2026-08-30 人工核实，商家页共 12 条评价）。
 * Google 只给四样东西：**评价人姓名 / 星级 / 正文 / 日期**，本文件也就只存
 * 这四样，外加两个从真实数据机械推导出来的字段。
 *
 * ## 改这个文件前必读
 *
 * - `text` **逐字照抄**，不许润色、不许改写、不许截断成"更好听"的版本；
 * - 评价人的**城市 / 标题 / 参加的团 / 点赞数** —— Google 一概不提供，
 *   **一律不许编**，所以这个 interface 里根本没有这些字段；
 * - `tour` 只有正文自己提到才填，且**照抄正文里的说法**
 *   （所以会出现小写的 "tale of two cities"，这是客人自己的写法，不要"修正"）；
 * - `avatarInitials` 从真实姓名机械推导（"Cherie Fairley" → "CF"），属转换不属编造；
 * - 版面需要几条而真实评价不够时，**减少展示数量**，不许补第 9 条。
 *
 * 聚合评分（几分 / 几条）统一读 `src/lib/data/google-rating.ts`，
 * 本文件不写死任何数字。
 *
 * ## 为什么要专门写这一段：原来的注释是假的
 *
 * 这个文件此前的注释写着「Entries are copied verbatim from the real reviews
 * in src/components/Testimonials.tsx … No fabricated content」。而当时
 * Testimonials.tsx 里的 33 条评价**本身就是编造的**（假头像 i.pravatar.cc、
 * 编造的点赞数、编造的人名，以及 CTS 行程里根本不存在的
 * "Great Wall at Mutianyu at sunrise"）。也就是说那句"逐字照抄真实评价、
 * 无编造内容"是在替一次从来没有做过的核实背书。
 *
 * 这类注释比假内容本身更麻烦：假内容还有人会去查，而一句"已核实"会让
 * 下一个人直接跳过核实。所以本次清理把注释和数据一起换掉。
 */

export interface HomeTestimonial {
  id: number;
  /** 评价人姓名 —— 照抄 Google */
  name: string;
  /** 星级 —— 照抄 Google */
  rating: number;
  /** 正文 —— 逐字照抄 Google，一个字都不许改 */
  text: string;
  /** 评价发表日期（ISO）—— 注意不是出行日期 */
  date: string;
  /** 姓名首字母，机械推导 */
  avatarInitials: string;
  /** 正文自己提到的行程，照抄正文说法；没提就留空 */
  tour?: string;
}

/**
 * 首页展示 6 条 —— 是从 12 条商家评价里现有的
 * 8 条**有正文**的评价中挑的。挑哪几条是编辑选择，不构成对客人的
 * 任何声称；内容与其余评价一样逐字照抄。
 */
export const homeTestimonials: HomeTestimonial[] = [
  {
    id: 1,
    name: "Maryam Absh",
    rating: 5,
    text: "The china journey was well‑organized, I actually enjoyed all the moments without worrying about anything. Highly recommend the tour of tale of two cities china",
    date: "2026-07-06",
    avatarInitials: "MA",
    tour: "tale of two cities",
  },
  {
    id: 2,
    name: "Cherie Fairley",
    rating: 5,
    text: "We went on a recent trip to Dali and Lijiang from 19th to 30th May 2026. Well, what amazing places they are. Plus the nearby city of Shangrila. We both had an amazing time walking and exploring with only our phone app to translate, since little or no English was spoken or written. Contrary to what the Lonely Planet guidebook said! Everything worked out well which is why we want to thank Baker at CTS personally for an awesome trip, the trip of a lifetime. If any other tours, guided or unguided come up please let us know. This is Mikes second time holidaying with CTS and we will certainly highly recommend your company to friends. Mike Brooker & Cherie Fairley",
    date: "2026-06-21",
    avatarInitials: "CF",
    tour: "Dali and Lijiang",
  },
  {
    id: 3,
    name: "Murray Middendorf",
    rating: 5,
    text: "Just came back from a tour of Xinjiang and a stopover in Xian. We had a fantastic time, the culture and scenery in Xinjiang is stunning and the tour was led by an experienced guide with excellent English. Highly recommended.",
    date: "2026-06-16",
    avatarInitials: "MM",
    tour: "Xinjiang",
  },
  {
    id: 4,
    name: "Colin Wright",
    rating: 5,
    text: "We did the Tale of 2 Cities in November 2025. We were kept really busy with informative guides and just so much to see. Amazed all dietry requirements of group met. A group tour that exceeded all expectation. We will do another for real.",
    date: "2026-06-14",
    avatarInitials: "CW",
    tour: "Tale of 2 Cities",
  },
  {
    id: 5,
    name: "Tessa A",
    rating: 5,
    text: "We had our China holiday planned by CTS tours. Communication was great and the tour itself was amazing. Everything was so well run and the tour guides in each city were great. The accommodation they chose and the preplanned meals organized were stand outs. Would definitely use again to organise future trips",
    date: "2026-06-11",
    avatarInitials: "TA",
  },
  {
    id: 6,
    name: "Catherine Horide",
    rating: 5,
    text: "Had a great time on China - Discovery Tour. Tour guides national and local were amazing. Really enjoyed Billy's sense of humour. Loved the genuinely friendly nature of the Chinese people. Shanghai night boat cruise and climbing the Great wall were standouts. Going to the night shows on offer is most worthwhile. Accommodation and food were of a very high standard. Glad I went as it was exceptional value for money and the experience was amazing. Much achieved in a short time. Highly recommended.",
    date: "2019-10-24",
    avatarInitials: "CH",
    tour: "China - Discovery Tour",
  },
];
