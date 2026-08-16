import { NextResponse } from 'next/server';
import { verifyAdminApi, adminUnauthorized } from '@/lib/auth/admin';
import { TourExtractionError } from '@/lib/tour-parser/extract';
import { generatePromotionPlan } from '@/lib/tour-parser/promote';
import { buildCampaignNaming, buildProductFacts } from '@/lib/tour-parser/utm';
import { computeCampaignMath, type CampaignBrief } from '@/lib/tour-parser/campaign-brief';
import type { ParsedTour } from '@/lib/tour-parser/schema';

/** 表单里可能传空字符串,统一收敛成 null */
function num(value: unknown): number | null {
  const n = typeof value === 'number' ? value : parseFloat(String(value ?? ''));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300;

/**
 * POST /api/admin/tour-parser/promote
 *
 * 已审核的草稿 → 推广方案。不需要原始文档:事实到这一步已经定了。
 * 活动命名、UTM、产品事实速查表由代码生成,只有需要判断的部分走模型。
 */
export async function POST(request: Request) {
  if (!verifyAdminApi()) {
    return adminUnauthorized();
  }

  let body: { tour?: ParsedTour; initiative?: string; brief?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: '请求体不是合法 JSON。' }, { status: 400 });
  }

  const tour = body.tour;
  if (!tour || typeof tour !== 'object' || !tour.suggestedSlug) {
    return NextResponse.json({ error: '缺少 tour 草稿。' }, { status: 400 });
  }

  const startedAt = Date.now();

  try {
    const naming = buildCampaignNaming(tour, body.initiative);
    const facts = buildProductFacts(tour);

    const rawBrief = body.brief ?? {};
    const closeRate = num(rawBrief.benchmarkCloseRatePct);
    const brief: CampaignBrief = {
      targetPax: num(rawBrief.targetPax),
      budgetNzd: num(rawBrief.budgetNzd),
      benchmarkCplNzd: num(rawBrief.benchmarkCplNzd),
      benchmarkCloseRate: closeRate === null ? null : closeRate / 100,
    };
    // 「今天」在服务端取,不信任前端传来的日期
    const math = computeCampaignMath(tour, brief, new Date());

    const { plan, incompleteSections, usage } = await generatePromotionPlan(
      tour,
      naming.campaign,
      naming.productUrl,
      brief,
      math
    );

    return NextResponse.json({
      naming,
      facts,
      math,
      plan,
      incompleteSections,
      usage,
      elapsedMs: Date.now() - startedAt,
    });
  } catch (e) {
    if (e instanceof TourExtractionError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    console.error('[tour-parser/promote] failed:', e);
    const message = e instanceof Error ? e.message : '方案生成失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
