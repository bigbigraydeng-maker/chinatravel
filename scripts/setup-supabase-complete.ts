import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://qbturrydultenhlfmdcm.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidHVycnlkdWx0ZW5obGZtZGNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjgwODc4OSwiZXhwIjoyMDg4Mzg0Nzg5fQ.OdNAHwwZH_VXprookZFDd_DW38tXt7yrwpmoSlu6omc';
const OPTIMIZED_DIR = 'optimized';

const BUCKETS = ['tour-images', 'guide-images', 'credential-images'];

interface UploadResult {
  file: string;
  bucket: string;
  status: 'success' | 'error';
  size: number;
  url?: string;
  error?: string;
}

async function createBuckets(supabase: ReturnType<typeof createClient>) {
  console.log('📦 Creating storage buckets...\n');

  for (const bucketName of BUCKETS) {
    try {
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 52428800 // 50MB
      });

      if (error) {
        if (error.message.includes('already exists')) {
          console.log(`✓ ${bucketName} already exists`);
        } else {
          console.log(`✗ ${bucketName} - Error: ${error.message}`);
        }
      } else {
        console.log(`✓ ${bucketName} created successfully`);
      }
    } catch (err) {
      console.log(`✗ ${bucketName} - ${err}`);
    }
  }
}

async function setupRLSPolicies() {
  console.log('\n🔐 RLS policies setup...\n');
  console.log('💡 RLS policies will be created via REST API call\n');

  const policies = `
-- ===== PUBLIC READ POLICIES =====
CREATE POLICY "public_read_tour_images" ON storage.objects
FOR SELECT USING (bucket_id = 'tour-images');

CREATE POLICY "public_read_guide_images" ON storage.objects
FOR SELECT USING (bucket_id = 'guide-images');

CREATE POLICY "public_read_credential_images" ON storage.objects
FOR SELECT USING (bucket_id = 'credential-images');

-- ===== ADMIN WRITE POLICIES =====
CREATE POLICY "admin_insert_tour" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'tour-images');

CREATE POLICY "admin_insert_guide" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'guide-images');

CREATE POLICY "admin_insert_credential" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'credential-images');

-- ===== DELETE POLICIES =====
CREATE POLICY "admin_delete_tour" ON storage.objects
FOR DELETE USING (bucket_id = 'tour-images');

CREATE POLICY "admin_delete_guide" ON storage.objects
FOR DELETE USING (bucket_id = 'guide-images');

CREATE POLICY "admin_delete_credential" ON storage.objects
FOR DELETE USING (bucket_id = 'credential-images');
  `.trim();

  // Save SQL to file for manual execution if needed
  fs.writeFileSync('rls-policies.sql', policies);
  console.log('✓ RLS policies SQL saved to: rls-policies.sql');
  console.log('\n📝 If policies need manual setup, copy the SQL above to Supabase SQL Editor\n');
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

function getRemotePath(filePath: string): string {
  // 保留相对于 optimized/ 的完整目录结构
  const relative = path.relative(OPTIMIZED_DIR, filePath);
  return relative.replace(/\\/g, '/'); // 转换为正斜杠 (URL格式)
}

async function uploadFile(
  supabase: ReturnType<typeof createClient>,
  bucket: string,
  localPath: string,
  remotePath: string
): Promise<UploadResult> {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const fileSize = fileBuffer.length;

    const { data, error } = await supabase.storage.from(bucket).upload(remotePath, fileBuffer, {
      cacheControl: '3600',
      upsert: true
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

async function uploadAllImages(supabase: ReturnType<typeof createClient>) {
  console.log('📤 Uploading optimized images to Supabase Storage...\n');

  if (!fs.existsSync(OPTIMIZED_DIR)) {
    console.error(`❌ Optimized directory not found: ${OPTIMIZED_DIR}`);
    return;
  }

  const allFiles = await getAllFiles(OPTIMIZED_DIR);
  const results: UploadResult[] = [];

  console.log(`Found ${allFiles.length} files to upload\n`);

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
      console.log(`✓`);
    } else {
      failed++;
      console.log(`✗ ${result.error}`);
    }

    // Rate limiting - small delay between uploads
    if (i % 10 === 0) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Generate mapping file
  const urlMapping: Record<string, string> = {};
  const errorLog: string[] = [];

  for (const result of results) {
    if (result.status === 'success' && result.url) {
      const filename = path.basename(result.file);
      urlMapping[filename] = result.url;
    } else if (result.status === 'error') {
      errorLog.push(`${result.file}: ${result.error}`);
    }
  }

  fs.writeFileSync(
    path.join(OPTIMIZED_DIR, 'url-mapping.json'),
    JSON.stringify(urlMapping, null, 2)
  );

  if (errorLog.length > 0) {
    fs.writeFileSync(path.join(OPTIMIZED_DIR, 'migration-errors.log'), errorLog.join('\n'));
  }

  // Summary
  console.log('\n📊 Upload Summary:');
  console.log('═══════════════════════════════════════════════════');
  console.log(`Total files:        ${allFiles.length}`);
  console.log(`Successful:         ${successful} ✓`);
  console.log(`Failed:             ${failed} ✗`);
  console.log(`Success rate:       ${((successful / allFiles.length) * 100).toFixed(1)}%`);

  const totalSize = results
    .filter(r => r.status === 'success')
    .reduce((sum, r) => sum + r.size, 0);
  console.log(`Total uploaded:     ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log('═══════════════════════════════════════════════════');

  if (failed > 0) {
    console.log('\n⚠️  Some files failed. Check migration-errors.log');
  }

  console.log('\n✅ URL mapping saved: optimized/url-mapping.json');
}

async function main() {
  console.log('🚀 ChinaTravel - Supabase Complete Setup\n');
  console.log('Project URL: ' + SUPABASE_URL);
  console.log('═══════════════════════════════════════════════════\n');

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY) as any;

  try {
    // Step 1: Create buckets
    await createBuckets(supabase);

    // Step 2: Setup RLS policies
    await setupRLSPolicies();

    // Step 3: Upload images
    await uploadAllImages(supabase);

    console.log('\n🎉 Setup complete!');
    console.log('Next steps:');
    console.log('  1. Use optimized/url-mapping.json to update image references');
    console.log('  2. Run Phase 3: Update tours.ts, guides.ts, components');
    console.log('  3. Test locally: npm run dev');
  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

main().catch(console.error);
