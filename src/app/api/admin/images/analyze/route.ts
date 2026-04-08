import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import path from 'path';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { verifyAdminApi, adminUnauthorized } from '@/lib/auth/admin';
import { IMAGE_BUCKETS } from '@/lib/admin/buckets';
import { listAllImageFiles } from '@/lib/admin/storage-list';
import { loadImageMetadata } from '@/lib/admin/image-metadata';
import { analyzeImages } from '@/lib/admin/analyze-images';

export async function GET() {
  if (!verifyAdminApi()) {
    return adminUnauthorized();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return NextResponse.json({ error: 'Missing NEXT_PUBLIC_SUPABASE_URL' }, { status: 500 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const [objects, meta] = await Promise.all([
      listAllImageFiles(supabase, IMAGE_BUCKETS, supabaseUrl),
      loadImageMetadata(supabase),
    ]);

    const visible = objects.filter(
      (o) => !o.path.startsWith('.admin/') && !o.path.includes('/.admin/')
    );

    const projectRoot = process.cwd();
    const result = analyzeImages(projectRoot, visible, meta);

    return NextResponse.json({
      unused: result.unused.slice(0, 500),
      unusedTotal: result.unused.length,
      large: result.large.slice(0, 200),
      largeTotal: result.large.length,
      missingAlt: result.missingAlt.slice(0, 500),
      missingAltTotal: result.missingAlt.length,
      recommendations: result.recommendations,
      referencedCount: result.referencedCount,
      storageCount: result.storageCount,
      mappingPath: path.join('optimized', 'url-mapping-complete.json'),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Analyze failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
