import { NextRequest, NextResponse } from 'next/server';
import { renderItineraryHtml } from '@/lib/tailor-made/render';
import type { TailorMadeItinerary } from '@/lib/tailor-made/types';

/**
 * POST /api/admin/tailor-made/preview
 * 传入行程数据，返回渲染好的行程单 HTML（A4 版面）。
 *
 * 编辑器用它做实时预览，也用它出 PDF —— 预览和成品是同一份 HTML，
 * 所以顾问在屏幕上看到什么，客户拿到的就是什么。
 *
 * 走 POST 而不是 GET，是因为未保存的草稿也要能预览。
 */

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { payload?: TailorMadeItinerary };
    if (!body.payload) {
      return NextResponse.json({ error: '请求缺少 payload' }, { status: 400 });
    }

    const html = await renderItineraryHtml(body.payload);
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : '预览生成失败';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
