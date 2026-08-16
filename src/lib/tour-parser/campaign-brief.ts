/**
 * 投放前提:时间、人数、预算 —— 全部用代码算,不问模型。
 *
 * 「距出发还有几周」「预算能买到多少 lead」「要多高的成交率才够成团」都是算术,
 * 交给模型只会得到一个看起来合理的数字。模型负责的是拿这些数字去做渠道和内容判断。
 */

import { parseDepartureDate } from './utm';
import type { ParsedTour } from './schema';

/** 审核人填的投放前提 */
export interface CampaignBrief {
  /** 目标成团人数 */
  targetPax?: number | null;
  /** 广告总预算,NZD */
  budgetNzd?: number | null;
  /** 历史单个 lead 成本基准,NZD。留空则视为未知 */
  benchmarkCplNzd?: number | null;
  /** 历史 lead → 成交转化率,0-1。留空则视为未知 */
  benchmarkCloseRate?: number | null;
}

export interface CampaignMath {
  todayIso: string;
  firstDepartureIso: string | null;
  /** 距首个团期还有几周;团期无法解析时为 null */
  weeksToDeparture: number | null;
  weeklyBudgetNzd: number | null;
  /** 按基准 CPL 推算,这笔预算大约能买到多少 lead */
  projectedLeads: number | null;
  /** 要成团,lead → 成交需要达到的转化率(百分比) */
  requiredCloseRatePct: number | null;
  /** 按历史转化率推算,这笔预算大概能成交多少人 */
  projectedPax: number | null;
  /** 中文,给审核人看的风险提示 */
  warnings: string[];
  /** 中文,说明哪些前提没填,方案里对应部分只能靠估 */
  unknowns: string[];
}

const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

/** 旅游行业 lead→成交超过这个值通常不现实,用来判断预算是不是明显不够 */
const IMPLAUSIBLE_CLOSE_RATE_PCT = 25;

/**
 * 少于这么多周,内容排期必须压缩,不能按常规节奏铺。
 * 取 20 周(约 4.5 个月):SEO 从发布到进入排名通常要 3 个月以上,
 * 窗口比这短,自然流量基本赶不上这一期团。
 */
const TIGHT_RUNWAY_WEEKS = 20;

export function computeCampaignMath(
  tour: ParsedTour,
  brief: CampaignBrief,
  today: Date
): CampaignMath {
  const warnings: string[] = [];
  const unknowns: string[] = [];

  const firstDeparture = tour.departures[0]?.date
    ? parseDepartureDate(tour.departures[0].date)
    : null;

  let weeksToDeparture: number | null = null;
  if (firstDeparture) {
    weeksToDeparture = Math.floor((firstDeparture.getTime() - today.getTime()) / MS_PER_WEEK);
    if (weeksToDeparture < 0) {
      warnings.push(`首个团期 ${tour.departures[0].date} 已经过去了,排期无从谈起 —— 先确认团期。`);
    } else if (weeksToDeparture < TIGHT_RUNWAY_WEEKS) {
      warnings.push(
        `距首个团期只剩约 ${weeksToDeparture} 周,不到 ${TIGHT_RUNWAY_WEEKS} 周的常规节奏。内容排期必须压缩,SEO 见效慢,预算要往付费倾斜。`
      );
    }
  } else {
    unknowns.push('团期');
  }

  const budget = brief.budgetNzd ?? null;
  const cpl = brief.benchmarkCplNzd ?? null;
  const target = brief.targetPax ?? null;
  const closeRate = brief.benchmarkCloseRate ?? null;

  if (budget === null) unknowns.push('广告预算');
  if (cpl === null) unknowns.push('历史 CPL 基准');
  if (target === null) unknowns.push('目标成团人数');
  if (closeRate === null) unknowns.push('历史 lead 成交率');

  const weeklyBudgetNzd =
    budget !== null && weeksToDeparture !== null && weeksToDeparture > 0
      ? Math.round(budget / weeksToDeparture)
      : null;

  const projectedLeads = budget !== null && cpl !== null && cpl > 0 ? Math.floor(budget / cpl) : null;

  const requiredCloseRatePct =
    projectedLeads !== null && projectedLeads > 0 && target !== null
      ? Math.round((target / projectedLeads) * 1000) / 10
      : null;

  const projectedPax =
    projectedLeads !== null && closeRate !== null ? Math.round(projectedLeads * closeRate) : null;

  if (requiredCloseRatePct !== null && requiredCloseRatePct > IMPLAUSIBLE_CLOSE_RATE_PCT) {
    warnings.push(
      `按这笔预算和 CPL,大约只能买到 ${projectedLeads} 个 lead;要成团 ${target} 人,lead 成交率得达到 ${requiredCloseRatePct}%,旅游行业很难做到。要么加预算,要么下调人数目标。`
    );
  }

  if (projectedPax !== null && target !== null && projectedPax < target) {
    warnings.push(
      `按历史成交率推算这笔预算约成交 ${projectedPax} 人,低于目标 ${target} 人,缺口 ${target - projectedPax} 人。`
    );
  }

  return {
    todayIso: today.toISOString().slice(0, 10),
    firstDepartureIso: firstDeparture ? firstDeparture.toISOString().slice(0, 10) : null,
    weeksToDeparture,
    weeklyBudgetNzd,
    projectedLeads,
    requiredCloseRatePct,
    projectedPax,
    warnings,
    unknowns,
  };
}
