import { NextRequest, NextResponse } from 'next/server';
import { createItinerary, listItineraries } from '@/lib/tailor-made/store';
import type { TailorMadeItinerary } from '@/lib/tailor-made/types';

/**
 * /api/admin/tailor-made
 * GET  列表
 * POST 新建（可传 source 以复制已有行程为蓝本）
 *
 * 认证由 middleware 统一处理（ADMIN_SECRET_KEY）。
 */

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const includeArchived = request.nextUrl.searchParams.get('archived') === '1';
    return NextResponse.json({ items: await listItineraries(includeArchived) });
  } catch (error) {
    return NextResponse.json({ error: message(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as { source?: TailorMadeItinerary };
    const record = await createItinerary(body.source);
    return NextResponse.json({ item: record }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: message(error) }, { status: 500 });
  }
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : '未知错误';
}
