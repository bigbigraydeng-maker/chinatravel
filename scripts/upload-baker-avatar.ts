import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

async function uploadBakerAvatar() {
  // Load environment variables from .env.local
  const envPath = '.env.local';
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const envVars = Object.fromEntries(
    envContent
      .split('\n')
      .filter(line => line && !line.startsWith('#'))
      .map(line => {
        const [key, ...valueParts] = line.split('=');
        return [key.trim(), valueParts.join('=').trim().replace(/^["']|["']$/g, '')];
      })
  );

  const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Environment variables found:', Object.keys(envVars));
    throw new Error('Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)');
  }

  const client = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Path to the new avatar image
  const imagePath = 'C:\\Users\\Zhong\\Desktop\\微信图片_20260429172032_169_1.png';

  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image file not found: ${imagePath}`);
  }

  try {
    // Read the PNG image
    const imageBuffer = fs.readFileSync(imagePath);

    // Convert PNG to JPG with optimization
    const jpgBuffer = await sharp(imageBuffer)
      .jpeg({ quality: 85, progressive: true })
      .toBuffer();

    // Upload to Supabase Storage
    const fileName = 'baker-gu-portrait.jpg';
    const bucketName = 'tour-images'; // Baker avatar goes to tour-images bucket
    const filePath = fileName;

    console.log(`Uploading ${filePath} to ${bucketName}...`);

    const { data, error } = await client.storage
      .from(bucketName)
      .upload(filePath, jpgBuffer, {
        cacheControl: '3600',
        contentType: 'image/jpeg',
        upsert: true, // Replace if exists
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    console.log('✅ Upload successful!');
    console.log(`File: ${data?.path}`);

    // Verify the upload by getting the public URL
    const { data: publicUrl } = client.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    console.log(`Public URL: ${publicUrl.publicUrl}`);
    console.log('\n✅ Baker avatar updated successfully!');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

uploadBakerAvatar();
