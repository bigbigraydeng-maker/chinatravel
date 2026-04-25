#!/usr/bin/env node

/**
 * T061 自动化脚本：LoveArt 图片上传到 Supabase + Airtable
 *
 * 用法：
 *   1. 把生成好的 15 张 JPG 放在 ./images/ 文件夹
 *   2. 配置下面的环境变量
 *   3. 运行：node T061-自动化脚本-图片上传到Airtable.js
 *
 * 脚本会自动：
 *   ✅ 上传图片到 Supabase
 *   ✅ 获取 public URL
 *   ✅ 填充到 Airtable Image_URL 字段
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

// ==================== 配置环境变量 ====================

const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'YOUR_SUPABASE_KEY';
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN || 'YOUR_AIRTABLE_TOKEN';
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'YOUR_BASE_ID';
const AIRTABLE_TABLE_NAME = 'Organic Content'; // 你的表格名称

const BUCKET_NAME = 'social-media-content';
const FOLDER_PATH = 'april-2026';
const IMAGES_DIR = './images'; // 本地图片文件夹

// ==================== 初始化客户端 ====================

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ==================== 主函数 ====================

async function uploadAndSync() {
  console.log('🚀 开始上传图片到 Supabase + 同步到 Airtable...\n');

  try {
    // 1. 读取本地图片文件夹
    const imageFiles = fs.readdirSync(IMAGES_DIR)
      .filter(file => /\.(jpg|jpeg|png)$/i.test(file))
      .sort();

    if (imageFiles.length === 0) {
      console.error('❌ 错误：./images/ 文件夹中没有找到图片');
      return;
    }

    console.log(`📸 找到 ${imageFiles.length} 张图片\n`);

    // 2. 获取 Airtable 中的所有记录（用于匹配）
    const airtableRecords = await fetchAirtableRecords();
    console.log(`📋 Airtable 中有 ${airtableRecords.length} 条记录\n`);

    // 3. 逐张上传图片
    let successCount = 0;
    let failCount = 0;

    for (const imageFile of imageFiles) {
      try {
        const result = await uploadImageAndUpdate(imageFile, airtableRecords);
        if (result) {
          successCount++;
          console.log(`✅ ${imageFile}\n`);
        } else {
          failCount++;
          console.log(`⚠️  ${imageFile} - 未找到匹配的 Airtable 记录\n`);
        }
      } catch (error) {
        failCount++;
        console.error(`❌ ${imageFile} - 错误：${error.message}\n`);
      }
    }

    // 4. 总结
    console.log('\n' + '='.repeat(50));
    console.log(`✨ 完成！成功: ${successCount}，失败: ${failCount}`);
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ 脚本执行出错：', error.message);
  }
}

// ==================== 子函数：获取 Airtable 记录 ====================

async function fetchAirtableRecords() {
  const response = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
    {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Airtable API 错误：${response.statusText}`);
  }

  const data = await response.json();
  return data.records || [];
}

// ==================== 子函数：上传图片 + 更新 Airtable ====================

async function uploadImageAndUpdate(imageFile, airtableRecords) {
  const imagePath = path.join(IMAGES_DIR, imageFile);
  const fileBuffer = fs.readFileSync(imagePath);

  // 上传到 Supabase
  const supabasePath = `${FOLDER_PATH}/${imageFile}`;

  const { data, error } = await supabase
    .storage
    .from(BUCKET_NAME)
    .upload(supabasePath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true, // 覆盖已存在的文件
    });

  if (error) {
    throw new Error(`Supabase 上传失败：${error.message}`);
  }

  // 获取 public URL
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${supabasePath}`;

  console.log(`  📤 上传到 Supabase: ${imageFile}`);
  console.log(`  🔗 URL: ${publicUrl}`);

  // 匹配 Airtable 记录
  const matchedRecord = matchImageToAirtable(imageFile, airtableRecords);

  if (!matchedRecord) {
    console.log(`  ⚠️  未找到匹配的 Airtable 记录（根据文件名）`);
    return false;
  }

  // 更新 Airtable
  const recordId = matchedRecord.id;
  const updateResponse = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          'Image_URL': publicUrl,
          'Image_Version': 'final',
        },
      }),
    }
  );

  if (!updateResponse.ok) {
    throw new Error(`Airtable 更新失败：${updateResponse.statusText}`);
  }

  console.log(`  ✏️  更新 Airtable 记录：${matchedRecord.fields.Headline_EN || '无标题'}`);

  return true;
}

// ==================== 子函数：匹配图片到 Airtable 记录 ====================

function matchImageToAirtable(imageFile, airtableRecords) {
  /**
   * 匹配规则：
   * 图片名称：apr21__shanghai_reel.jpg
   * 匹配字段：Date (2026-04-21) + Headline_EN 或 Caption_EN 包含关键词
   */

  const fileNameWithoutExt = imageFile.replace(/\.(jpg|jpeg|png)$/i, '');
  const [dateStr, ...descParts] = fileNameWithoutExt.split('__');

  // 解析日期（apr21 → 2026-04-21）
  const month = dateStr.substring(0, 3); // apr
  const day = dateStr.substring(3, 5); // 21
  const monthMap = {
    jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
    jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
  };
  const monthNum = monthMap[month.toLowerCase()];
  const targetDate = `2026-${monthNum}-${day}`;

  // 查找匹配的记录
  const matched = airtableRecords.find(record => {
    const recordDate = record.fields.Date;
    return recordDate === targetDate;
  });

  return matched || null;
}

// ==================== 执行 ====================

uploadAndSync().catch(error => {
  console.error('脚本错误：', error);
  process.exit(1);
});
