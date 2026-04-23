import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { verifyAdminApi, adminUnauthorized } from '@/lib/auth/admin';
import { decodeImageId, encodeImageId } from '@/lib/admin/image-ids';
import type { ImageBucket } from '@/lib/admin/buckets';

type Ctx = { params: { id: string } };

export async function POST(request: Request, { params }: Ctx) {
  if (!verifyAdminApi()) return adminUnauthorized();

  const ref = decodeImageId(params.id);
  if (!ref) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  let body: { newPath?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const newPath = body.newPath?.trim();
  if (!newPath) return NextResponse.json({ error: 'newPath required' }, { status: 400 });

  if (newPath === ref.path) {
    return NextResponse.json({ ok: true, id: params.id });
  }

  if (newPath.includes('..') || newPath.startsWith('/')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SUPABASE_URL' }, { status: 500 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.storage
      .from(ref.bucket as ImageBucket)
      .move(ref.path, newPath);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    const { loadImageMetadata, saveImageMetadata } = await import('@/lib/admin/image-metadata');
    const meta = await loadImageMetadata(supabase);
    const oldKey = `${ref.bucket}/${ref.path}`;
    const newKey = `${ref.bucket}/${newPath}`;
    if (meta[oldKey]) {
      const { [oldKey]: moved, ...rest } = meta;
      await saveImageMetadata(supabase, { ...rest, [newKey]: moved });
    }

    const newPublicUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${ref.bucket}/${newPath
      .split('/')
      .map(encodeURIComponent)
      .join('/')}`;
    const newId = encodeImageId({ bucket: ref.bucket as ImageBucket, path: newPath });

    return NextResponse.json({ ok: true, id: newId, publicUrl: newPublicUrl });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Move failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
