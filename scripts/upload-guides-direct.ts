import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

// Manually load .env.local
const envPath = '.env.local';
const envContent = fs.readFileSync(envPath, 'utf-8');
const envLines = envContent.split('\n');

const env: Record<string, string> = {};
for (const line of envLines) {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    env[key.trim()] = valueParts.join('=').trim();
  }
}

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_ANON_KEY = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

console.log('Supabase URL:', SUPABASE_URL ? '✅' : '❌');
console.log('Supabase Key:', SUPABASE_ANON_KEY ? '✅' : '❌');

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const GUIDES_DIR = path.join(process.cwd(), 'optimized/guides');

async function uploadGuideImages() {
  const guideDirectories = fs.readdirSync(GUIDES_DIR).filter(f => {
    const fullPath = path.join(GUIDES_DIR, f);
    return fs.statSync(fullPath).isDirectory();
  }).sort();

  console.log(`\n📁 Found ${guideDirectories.length} guide directories`);

  let totalUploaded = 0;
  let totalFailed = 0;
  let skipped = 0;

  for (const guideDir of guideDirectories) {
    const guidePath = path.join(GUIDES_DIR, guideDir);
    const heroPath = path.join(guidePath, 'hero');

    if (!fs.existsSync(heroPath)) {
      console.warn(`⚠️  ${guideDir}: No hero folder`);
      skipped++;
      continue;
    }

    // Get all files in hero folder
    const heroFiles = fs.readdirSync(heroPath);
    console.log(`\n📸 ${guideDir} (${heroFiles.length} files)`);

    for (const file of heroFiles) {
      const filePath = path.join(heroPath, file);
      const fileBuffer = fs.readFileSync(filePath);

      const remotePath = `guides/${guideDir}/hero/${file}`;

      try {
        const { error } = await supabase.storage
          .from('guide-images')
          .upload(remotePath, fileBuffer, {
            upsert: true,
            contentType: file.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
          });

        if (error) {
          console.error(`   ❌ ${file}: ${error.message}`);
          totalFailed++;
        } else {
          console.log(`   ✅ ${file}`);
          totalUploaded++;
        }
      } catch (err: any) {
        console.error(`   ❌ ${file}: ${err.message}`);
        totalFailed++;
      }
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`📊 Upload Summary:`);
  console.log(`✅ Successfully uploaded: ${totalUploaded} files`);
  console.log(`❌ Failed: ${totalFailed} files`);
  console.log(`⏭️  Skipped: ${skipped} guides`);
  console.log(`${'='.repeat(50)}`);
}

uploadGuideImages().catch(err => {
  console.error('❌ Upload process failed:', err);
  process.exit(1);
});
