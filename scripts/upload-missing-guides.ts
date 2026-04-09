import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
  });

  console.log(`Found ${guideDirectories.length} guide directories to upload`);

  let totalUploaded = 0;
  let totalFailed = 0;

  for (const guideDir of guideDirectories) {
    const guidePath = path.join(GUIDES_DIR, guideDir);
    const heroPath = path.join(guidePath, 'hero');

    if (!fs.existsSync(heroPath)) {
      console.warn(`⚠️  No hero folder in ${guideDir}`);
      continue;
    }

    // Get all files in hero folder
    const heroFiles = fs.readdirSync(heroPath);

    for (const file of heroFiles) {
      const filePath = path.join(heroPath, file);
      const fileBuffer = fs.readFileSync(filePath);

      // Upload to Supabase: guide-images/guides/{guideName}/hero/{filename}
      const remotePath = `guides/${guideDir}/hero/${file}`;

      try {
        const { error } = await supabase.storage
          .from('guide-images')
          .upload(remotePath, fileBuffer, {
            upsert: true,
            contentType: file.endsWith('.webp') ? 'image/webp' : 'image/jpeg'
          });

        if (error) {
          console.error(`❌ Failed to upload ${remotePath}:`, error.message);
          totalFailed++;
        } else {
          console.log(`✅ Uploaded ${remotePath}`);
          totalUploaded++;
        }
      } catch (err) {
        console.error(`❌ Error uploading ${remotePath}:`, err);
        totalFailed++;
      }
    }
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`✅ Successfully uploaded: ${totalUploaded} files`);
  console.log(`❌ Failed: ${totalFailed} files`);
}

uploadGuideImages().catch(err => {
  console.error('❌ Upload process failed:', err);
  process.exit(1);
});
