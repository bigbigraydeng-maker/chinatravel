import { NextRequest, NextResponse } from 'next/server';
import { deleteItinerary, getItinerary, saveItinerary, setStatus } from '@/lib/tailor-made/store';
import type { TailorMadeItinerary, TailorMadeStatus } from '@/lib/tailor-made/types';

/**
 * /api/admin/tailor-made/[id]
 * GET    读取单份行程
 * PUT    保存（可同时改状态）
 * DELETE 删除
 */

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const record = await getItinerary(id);
    if (!record) return NextResponse.json({ error: '行程单不存在' }, { status: 404 });
    return NextResponse.json({ item: record });
  } catch (error) {
    return NextResponse.json({ error: message(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    const body = (await request.json()) as { payload?: TailorMadeItinerary; status?: TailorMadeStatus };

    if (body.payload) {
      const record = await saveItinerary(id, body.payload, body.status);
      return NextResponse.json({ item: record });
    }

    if (body.status) {
      await setStatus(id, body.status);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: '请求缺少 payload 或 status' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: message(error) }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Ctx) {
  try {
    const { id } = await params;
    await deleteItinerary(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: message(error) }, { status: 500 });
  }
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : '未知错误';
}
