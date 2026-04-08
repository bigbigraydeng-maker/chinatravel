const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://qbturrydultenhlfmdcm.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFidHVycnlkdWx0ZW5obGZtZGNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjgwODc4OSwiZXhwIjoyMDg4Mzg0Nzg5fQ.OdNAHwwZH_VXprookZFDd_DW38tXt7yrwpmoSlu6omc';
const OPTIMIZED_DIR = 'optimized';

function getBucketFromPath(filePath) {
  if (filePath.includes('credentials') || filePath.includes('credential-images')) {
    return 'credential-images';
  }
  if (filePath.includes('guides') || filePath.includes('guide-images')) {
    return 'guide-images';
  }
  return 'tour-images';
}

function getRemotePath(filePath) {
  const relative = path.relative(OPTIMIZED_DIR, filePath);
  return relative.replace(/\\/g, '/');
}

async function uploadFile(supabase, bucket, localPath, remotePath) {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const fileSize = fileBuffer.length;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(remotePath, fileBuffer, {
        contentType: 'application/octet-stream',
        upsert: true
      });

    if (error) {
      return { file: localPath, bucket, status: 'error', size: fileSize, error: error.message };
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${remotePath}`;
    return { file: localPath, bucket, status: 'success', size: fileSize, url };
  } catch (error) {
    return { file: localPath, bucket, status: 'error', size: 0, error: error.message };
  }
}

async function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await getAllFiles(filePath, fileList);
    } else if (/\.(webp|jpg|jpeg|png)$/i.test(file)) {
      fileList.push(filePath);
    }
  }

  return fileList;
}

async function main() {
  console.log('🚀 开始上传优化后的图片到 Supabase Storage\n');

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const allFiles = await getAllFiles(OPTIMIZED_DIR);
  const results = [];

  console.log(`找到 ${allFiles.length} 个文件\n`);

  let successful = 0;
  let failed = 0;

  for (let i = 0; i < allFiles.length; i++) {
    const filePath = allFiles[i];
    const bucket = getBucketFromPath(filePath);
    const remotePath = getRemotePath(filePath);

    process.stdout.write(`[${i + 1}/${allFiles.length}] 上传到 ${bucket}... `);

    const result = await uploadFile(supabase, bucket, filePath, remotePath);
    results.push(result);

    if (result.status === 'success') {
      successful++;
      console.log(`✓`);
    } else {
      failed++;
      console.log(`✗ ${result.error}`);
    }

    // 限流
    if (i % 20 === 0) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // 生成 URL 映射
  const urlMapping = {};
  for (const result of results) {
    if (result.status === 'success' && result.url) {
      const filename = path.basename(result.file);
      urlMapping[filename] = result.url;
    }
  }

  fs.writeFileSync(
    path.join(OPTIMIZED_DIR, 'url-mapping.json'),
    JSON.stringify(urlMapping, null, 2)
  );

  console.log('\n📊 上传统计:');
  console.log('═══════════════════════════════════════════════════');
  console.log(`总文件:        ${allFiles.length}`);
  console.log(`成功:          ${successful} ✓`);
  console.log(`失败:          ${failed} ✗`);
  console.log(`成功率:        ${((successful / allFiles.length) * 100).toFixed(1)}%`);

  const totalSize = results
    .filter(r => r.status === 'success')
    .reduce((sum, r) => sum + r.size, 0);
  console.log(`总上传大小:    ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log('═══════════════════════════════════════════════════');

  if (failed === 0) {
    console.log('\n✅ 所有文件上传成功！');
  } else {
    console.log('\n⚠️ 部分文件上传失败');
  }
}

main().catch(console.error);
