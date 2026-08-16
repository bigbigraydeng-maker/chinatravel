import { NextResponse } from 'next/server';
import { verifyAdminApi, adminUnauthorized } from '@/lib/auth/admin';
import { readSourceBundle, UnsupportedDocumentError, MAX_UPLOAD_BYTES } from '@/lib/tour-parser/read-document';
import { TourExtractionError } from '@/lib/tour-parser/extract';
import { refineTour, type RefineTurn } from '@/lib/tour-parser/refine';
import type { ParsedTour } from '@/lib/tour-parser/schema';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300;

/**
 * POST /api/admin/tour-parser/refine
 *
 * 对话式修订。刻意保持无状态 —— 原文由前端每轮重传,
 * 原型阶段不引入会话存储。文档块有 prompt cache,重传的 token 成本很低。
 */
export async function POST(request: Request) {
  if (!verifyAdminApi()) {
    return adminUnauthorized();
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: '请求格式不对,需要 multipart/form-data。' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: '没有收到原始文档。' }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: '文件超过大小上限。' }, { status: 400 });
  }

  let tour: ParsedTour;
  let history: RefineTurn[];
  try {
    tour = JSON.parse(String(form.get('tour'))) as ParsedTour;
    history = JSON.parse(String(form.get('history'))) as RefineTurn[];
  } catch {
    return NextResponse.json({ error: '当前草稿或对话历史格式不对。' }, { status: 400 });
  }
  if (!Array.isArray(history) || history.length === 0) {
    return NextResponse.json({ error: '对话历史是空的。' }, { status: 400 });
  }

  const startedAt = Date.now();

  const sellingPointsFile = form.get('sellingPointsFile');

  try {
    const bundle = await readSourceBundle({
      itineraryFile: file,
      sellingPointsFile: sellingPointsFile instanceof File ? sellingPointsFile : null,
      sellingPointsText: form.get('sellingPointsText')?.toString() ?? null,
    });
    const { reply, tour: revised, usage } = await refineTour(bundle.blocks, tour, history);

    return NextResponse.json({ reply, tour: revised, usage, elapsedMs: Date.now() - startedAt });
  } catch (e) {
    if (e instanceof UnsupportedDocumentError || e instanceof TourExtractionError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    console.error('[tour-parser/refine] failed:', e);
    const message = e instanceof Error ? e.message : '修订失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
