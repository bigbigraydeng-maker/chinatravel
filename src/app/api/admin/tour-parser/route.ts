import { NextResponse } from 'next/server';
import { verifyAdminApi, adminUnauthorized } from '@/lib/auth/admin';
import { readSourceBundle, UnsupportedDocumentError, MAX_UPLOAD_BYTES } from '@/lib/tour-parser/read-document';
import { extractTour, TourExtractionError, type TierOverride } from '@/lib/tour-parser/extract';

const TIERS: TierOverride[] = ['signature', 'discovery', 'stopover'];

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
/** Opus 5 读完一份 15 天行程再输出完整结构,慢的时候要两三分钟 */
export const maxDuration = 300;

/**
 * POST /api/admin/tour-parser
 *
 * 原型接口:上传行程文档 → 返回结构化 Tour 草稿。
 * 不落库、不建页面 —— 这一步只回答「解析准不准」。
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
  if (!(file instanceof File)) {
    return NextResponse.json({ error: '没有收到文件。' }, { status: 400 });
  }
  if (file.size === 0) {
    return NextResponse.json({ error: '文件是空的。' }, { status: 400 });
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    const limitMb = Math.round(MAX_UPLOAD_BYTES / 1024 / 1024);
    return NextResponse.json({ error: `文件超过 ${limitMb} MB 上限。` }, { status: 400 });
  }

  const sellingPointsFile = form.get('sellingPointsFile');
  if (sellingPointsFile instanceof File && sellingPointsFile.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json({ error: '卖点材料超过大小上限。' }, { status: 400 });
  }

  const startedAt = Date.now();

  try {
    const bundle = await readSourceBundle({
      itineraryFile: file,
      sellingPointsFile: sellingPointsFile instanceof File ? sellingPointsFile : null,
      sellingPointsText: form.get('sellingPointsText')?.toString() ?? null,
    });
    const rawTier = form.get('tier')?.toString();
    const tierOverride = TIERS.find((t) => t === rawTier);
    const { tour, usage } = await extractTour(bundle.blocks, tierOverride);

    return NextResponse.json({
      filename: file.name,
      sources: bundle.sources,
      elapsedMs: Date.now() - startedAt,
      usage,
      tour,
    });
  } catch (e) {
    if (e instanceof UnsupportedDocumentError || e instanceof TourExtractionError) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    console.error('[tour-parser] extraction failed:', e);
    const message = e instanceof Error ? e.message : '解析失败';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
