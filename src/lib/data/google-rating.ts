/**
 * CTS Tours 的**真实** Google 商家评分 —— 全站唯一数据源。
 *
 * ## 为什么要有这个文件
 *
 * 在此之前，站内四处硬编码着 `4.9 分 / 200 条`：页脚显示「Google 4.9」，
 * 三个 schema 文件把它写进 JSON-LD 的 aggregateRating。这些数字**从来不是
 * 真的** —— 页脚那块原本就带着注释 "placeholder — replace with verified
 * scores when available"，只是一直没人替换。
 *
 * 实际去查 CTS 的 Google 商家页（2026-08-30 经 DataForSEO 拉取，
 * 地图 CID 15893702765970614450）：**4.4 分，12 条评价**。
 *
 * 这不只是数字不好看的问题：
 * - aggregateRating 是专门给搜索引擎读的，Google 拿它在搜索结果里显示星级。
 *   填报不实的聚合评分违反 Google 结构化数据规范，被判定后会取消整站的
 *   富媒体结果展示。
 * - 对外宣称某个第三方平台给了自己 4.9 分而实际 4.4，在新西兰属于误导性
 *   陈述（《公平交易法》），不是文案尺度问题。
 *
 * ## 维护方式
 *
 * 目前是人工核实后写死。数字会随新评价变化，**改的时候必须重新去查真实值，
 * 不许估、不许沿用旧值**，并同步更新下面的 VERIFIED_ON。
 *
 * ME 侧已有抓取管道（`src/lib/dataforseo/business-data.ts` 的
 * getGbpReviewsByIdentity），后续可以做成定时同步，届时本文件改为读取
 * 同步结果即可，引用它的地方不用动。
 */

/** Google 商家页真实聚合评分 */
export const GOOGLE_RATING = {
  /** 平均分 */
  value: 4.4,
  /** 评价总数 */
  count: 12,
  /** 上次人工核实日期 —— 改数字必须同时改这里 */
  verifiedOn: '2026-08-30',
  /** 评价来源页，供页面链接过去让人自己核对 */
  profileUrl: 'https://www.google.com/maps?cid=15893702765970614450',
} as const

/** 给 JSON-LD 用的字符串形式（schema.org 要求字符串） */
export const GOOGLE_RATING_SCHEMA = {
  ratingValue: String(GOOGLE_RATING.value),
  reviewCount: String(GOOGLE_RATING.count),
  bestRating: '5',
} as const
