import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const OPTIMIZED_DIR = 'optimized';

interface MigrationResult {
  file: string;
  bucket: string;
  status: 'success' | 'error';
  size: number;
  error?: string;
  url?: string;
}

function getBucketFromPath(filePath: string): string {
  if (filePath.includes('credentials') || filePath.includes('credential-images')) {
    return 'credential-images';
  }
  if (filePath.includes('guides') || filePath.includes('guide-images')) {
    return 'guide-images';
  }
  return 'tour-images';
}

function getRemotePath(localPath: string): string {
  // Remove directory prefixes, keep just the filename
  const filename = path.basename(localPath);
  return filename;
}

async function uploadFile(
  supabase: ReturnType<typeof createClient<any, any>>,
  bucket: string,
  localPath: string,
  remotePath: string
): Promise<MigrationResult> {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const fileSize = fileBuffer.length;

    const { data, error } = await supabase.storage.from(bucket).upload(remotePath, fileBuffer, {
      cacheControl: '3600',
      upsert: true // Overwrite if exists
    });

    if (error) {
      return {
        file: localPath,
        bucket,
        status: 'error',
        size: fileSize,
        error: error.message
      };
    }

    // Construct public URL
    const url = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${remotePath}`;

    return {
      file: localPath,
      bucket,
      status: 'success',
      size: fileSize,
      url
    };
  } catch (error) {
    return {
      file: localPath,
      bucket,
      status: 'error',
      size: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function getAllFiles(dir: string, fileList: string[] = []): Promise<string[]> {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules') {
        await getAllFiles(filePath, fileList);
      }
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

async function main() {
  // Validate environment variables
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Missing environment variables:');
    console.error('   Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY');
    console.error('\n   Set them with:');
    console.error('   export NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"');
    console.error('   export NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"');
    process.exit(1);
  }

  // Check if optimized directory exists
  if (!fs.existsSync(OPTIMIZED_DIR)) {
    console.error(`❌ Optimized directory not found: ${OPTIMIZED_DIR}`);
    console.error('   Run "npx ts-node scripts/optimize-images.ts" first');
    process.exit(1);
  }

  console.log('🚀 Starting migration to Supabase Storage...\n');

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const allFiles = await getAllFiles(OPTIMIZED_DIR);
  const results: MigrationResult[] = [];

  // Get manifest for total count
  const manifestPath = path.join(OPTIMIZED_DIR, 'migration-manifest.json');
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
    : null;

  console.log(`📊 Found ${allFiles.length} files to upload`);
  console.log(`Original manifest: ${manifest?.totalImages || 'N/A'} images\n`);

  // Upload files with progress
  let successful = 0;
  let failed = 0;

  for (let i = 0; i < allFiles.length; i++) {
    const filePath = allFiles[i];
    const bucket = getBucketFromPath(filePath);
    const remotePath = getRemotePath(filePath);

    process.stdout.write(`[${i + 1}/${allFiles.length}] Uploading to ${bucket}... `);

    const result = await uploadFile(supabase, bucket, filePath, remotePath);
    results.push(result);

    if (result.status === 'success') {
      successful++;
      console.log(`✓ ${remotePath}`);
    } else {
      failed++;
      console.log(`✗ ${result.error}`);
    }
  }

  // Generate mapping file
  const urlMapping: Record<string, string> = {};
  const errorLog: string[] = [];

  for (const result of results) {
    if (result.status === 'success' && result.url) {
      // Map original path to new URL
      const filename = path.basename(result.file);
      urlMapping[filename] = result.url;
    } else if (result.status === 'error') {
      errorLog.push(`${result.file}: ${result.error}`);
    }
  }

  // Save mapping file
  fs.writeFileSync(
    path.join(OPTIMIZED_DIR, 'url-mapping.json'),
    JSON.stringify(urlMapping, null, 2)
  );

  // Save error log
  if (errorLog.length > 0) {
    fs.writeFileSync(path.join(OPTIMIZED_DIR, 'migration-errors.log'), errorLog.join('\n'));
  }

  // Summary
  console.log('\n📊 Migration Summary:');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Total files:        ${allFiles.length}`);
  console.log(`Successful:         ${successful} ✓`);
  console.log(`Failed:             ${failed} ✗`);
  console.log(`Success rate:       ${((successful / allFiles.length) * 100).toFixed(1)}%`);

  const totalSize = results
    .filter(r => r.status === 'success')
    .reduce((sum, r) => sum + r.size, 0);
  console.log(`Total size:         ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log('═══════════════════════════════════════════════════');

  if (failed > 0) {
    console.log('\n⚠️  Some files failed to upload. Check migration-errors.log for details.');
  }

  console.log('\n📝 URL mapping saved to: optimized/url-mapping.json');
  console.log('📋 Migration manifest: optimized/migration-manifest.json');

  // Generate code update instructions
  console.log('\n✅ Next steps:');
  console.log('   1. Use url-mapping.json to update image references in code');
  console.log('   2. Run Phase 3: Update tours.ts, guides.ts, components');
  console.log('   3. Test image loading on local dev server');
  console.log('   4. Deploy to production');
}

main().catch(console.error);
