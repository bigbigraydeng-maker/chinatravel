import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { verifyAdminApi, adminUnauthorized } from '@/lib/auth/admin';
import { IMAGE_BUCKETS, categoryToBucket, bucketToCategory, type ImageBucket } from '@/lib/admin/buckets';
import { listAllImageFiles } from '@/lib/admin/storage-list';
import { loadImageMetadata } from '@/lib/admin/image-metadata';
import { encodeImageId } from '@/lib/admin/image-ids';

const MAX_BYTES = 50 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function isAdminPath(path: string): boolean {
  return path.startsWith('.admin/') || path.includes('/.admin/');
}

export async function GET(request: Request) {
  if (!verifyAdminApi()) {
    return adminUnauthorized();
  }

  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(url.searchParams.get('pageSize') || '20', 10) || 20));
  const search = (url.searchParams.get('search') || '').trim().toLowerCase();
  const bucketFilter = url.searchParams.get('bucket') as ImageBucket | null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SUPABASE_URL' }, { status: 500 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const buckets = bucketFilter && IMAGE_BUCKETS.includes(bucketFilter) ? [bucketFilter] : [...IMAGE_BUCKETS];

    const [objects, meta] = await Promise.all([
      listAllImageFiles(supabase, buckets, supabaseUrl),
      loadImageMetadata(supabase),
    ]);

    const filtered = objects
      .filter((o) => !isAdminPath(o.path))
      .filter((o) => {
        if (!search) return true;
        const hay = `${o.path} ${o.bucket}`.toLowerCase();
        return hay.includes(search);
      })
      .sort((a, b) => {
        const ta = a.updatedAt || '';
        const tb = b.updatedAt || '';
        return tb.localeCompare(ta);
      });

    const total = filtered.length;
    const totalBytes = filtered.reduce((sum, o) => sum + o.size, 0);
    const start = (page - 1) * pageSize;
    const slice = filtered.slice(start, start + pageSize);

    const images = slice.map((o) => {
      const key = `${o.bucket}/${o.path}`;
      const m = meta[key];
      return {
        id: encodeImageId({ bucket: o.bucket, path: o.path }),
        bucket: o.bucket,
        category: bucketToCategory(o.bucket),
        path: o.path,
        name: o.name,
        size: o.size,
        updatedAt: o.updatedAt,
        publicUrl: o.publicUrl,
        alt: m?.alt ?? '',
        tags: m?.tags ?? [],
        description: m?.description ?? '',
      };
    });

    return NextResponse.json({
      images,
      total,
      totalBytes,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize) || 1,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'List failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function sanitizeFilename(name: string): string {
  const base = name.replace(/[/\\]/g, '').replace(/\.\./g, '');
  return base.slice(0, 200) || 'upload.bin';
}

function validateSubPath(subPath: string): { valid: boolean; error?: string } {
  if (!subPath) return { valid: true };

  // Check for .admin prefix (metadata directory)
  if (subPath.startsWith('.admin/') || subPath.startsWith('.admin')) {
    return { valid: false, error: 'Cannot upload to .admin directories' };
  }

  // Check for .. path traversal attempts
  if (subPath.includes('..') || subPath.includes('/..')) {
    return { valid: false, error: 'Invalid path: relative segments not allowed' };
  }

  // Check that path segments are valid (no hidden files except .admin which we block above)
  const segments = subPath.split('/');
  for (const seg of segments) {
    if (!seg) continue; // empty segment from double slashes is OK (we clean it)
    if (seg.startsWith('.') && seg !== '.admin') {
      // Allow other dots for file extensions but not hidden directory markers
      if (seg.startsWith('.') && !seg.includes('.')) {
        return { valid: false, error: 'Hidden directories not allowed' };
      }
    }
  }

  return { valid: true };
}

export async function POST(request: Request) {
  if (!verifyAdminApi()) {
    return adminUnauthorized();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SUPABASE_URL' }, { status: 500 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart form data' }, { status: 400 });
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File exceeds 50MB limit' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: 'Only JPG, PNG, and WebP images are allowed' },
      { status: 400 }
    );
  }

  const category = String(form.get('category') || 'tour');
  const bucket = categoryToBucket(category);
  const subPath = String(form.get('path') || '').trim().replace(/^\/+/, '');

  // Validate path to prevent directory traversal
  const pathValidation = validateSubPath(subPath);
  if (!pathValidation.valid) {
    return NextResponse.json({ error: pathValidation.error }, { status: 400 });
  }

  const alt = String(form.get('alt') || '').trim();
  const tagsRaw = String(form.get('tags') || '').trim();
  const description = String(form.get('description') || '').trim();
  const tags = tagsRaw
    ? tagsRaw
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const name = sanitizeFilename(file.name);
  const objectPath = subPath ? `${subPath.replace(/\/$/, '')}/${name}` : `uploads/${Date.now()}-${name}`;

  try {
    const supabase = getSupabaseAdmin();
    const buf = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await supabase.storage.from(bucket).upload(objectPath, buf, {
      contentType: file.type,
      upsert: false,
    });
    if (upErr) {
      return NextResponse.json({ error: upErr.message }, { status: 400 });
    }

    const { patchImageMetadata } = await import('@/lib/admin/image-metadata');
    if (alt || tags.length || description) {
      await patchImageMetadata(supabase, bucket, objectPath, { alt, tags, description });
    }

    const publicUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${bucket}/${objectPath
      .split('/')
      .map(encodeURIComponent)
      .join('/')}`;

    return NextResponse.json({
      url: publicUrl,
      filename: name,
      path: objectPath,
      bucket,
      size: file.size,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
