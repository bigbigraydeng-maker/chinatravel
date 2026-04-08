import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { verifyAdminApi, adminUnauthorized } from '@/lib/auth/admin';
import { decodeImageId } from '@/lib/admin/image-ids';
import { loadImageMetadata, patchImageMetadata } from '@/lib/admin/image-metadata';
import { bucketToCategory } from '@/lib/admin/buckets';
import type { ImageBucket } from '@/lib/admin/buckets';

type Ctx = { params: { id: string } };

export async function GET(_request: Request, { params }: Ctx) {
  if (!verifyAdminApi()) {
    return adminUnauthorized();
  }

  const ref = decodeImageId(params.id);
  if (!ref) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SUPABASE_URL' }, { status: 500 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const meta = await loadImageMetadata(supabase);
    const key = `${ref.bucket}/${ref.path}`;
    const m = meta[key];
    const publicUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${ref.bucket}/${ref.path
      .split('/')
      .map(encodeURIComponent)
      .join('/')}`;

    return NextResponse.json({
      id: params.id,
      bucket: ref.bucket,
      category: bucketToCategory(ref.bucket),
      path: ref.path,
      publicUrl,
      alt: m?.alt ?? '',
      tags: m?.tags ?? [],
      description: m?.description ?? '',
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Load failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: Ctx) {
  if (!verifyAdminApi()) {
    return adminUnauthorized();
  }

  const ref = decodeImageId(params.id);
  if (!ref) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  let body: { alt?: string; tags?: string[]; description?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await patchImageMetadata(supabase, ref.bucket, ref.path, {
      alt: body.alt,
      tags: body.tags,
      description: body.description,
    });
    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Update failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  if (!verifyAdminApi()) {
    return adminUnauthorized();
  }

  const ref = decodeImageId(params.id);
  if (!ref) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.storage.from(ref.bucket as ImageBucket).remove([ref.path]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const { loadImageMetadata, saveImageMetadata } = await import('@/lib/admin/image-metadata');
    const meta = await loadImageMetadata(supabase);
    const key = `${ref.bucket}/${ref.path}`;
    // Use immutable pattern: destructure without the deleted key
    const { [key]: _removed, ...remaining } = meta;
    await saveImageMetadata(supabase, remaining);

    return NextResponse.json({ ok: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Delete failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
