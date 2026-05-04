#!/usr/bin/env node

const { google } = require('googleapis');

const SITE_URL = 'https://www.ctstours.co.nz';

async function getServiceAccountAuth() {
  const serviceAccountKey = process.env.GSC_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    throw new Error('❌ GSC_SERVICE_ACCOUNT_KEY 未设置');
  }

  let credentials;
  try {
    credentials = typeof serviceAccountKey === 'string'
      ? JSON.parse(serviceAccountKey)
      : serviceAccountKey;
  } catch (e) {
    throw new Error('❌ GSC_SERVICE_ACCOUNT_KEY 格式无效: ' + e.message);
  }

  return google.auth.getClient({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/webmasters',
      'https://www.googleapis.com/auth/indexing'
    ]
  });
}

function getUnindexedUrlsLocal() {
  const redirectPatterns = [
    '/tour/two-cities',
    '/tour/golden-china',
    '/tour/china-panorama',
    '/tour/yunnan-delights',
    '/information',
    '/special-interests',
    '/type',
    '/testimonial',
    '/vietnam',
    '/media-release',
  ];

  const urls = [];
  redirectPatterns.forEach(pattern => {
    urls.push(`${SITE_URL}${pattern}`);
    urls.push(`${SITE_URL}${pattern}/`);
  });

  return urls;
}

async function submitUrls(auth, urls) {
  const indexing = google.indexing({ version: 'v3', auth });

  console.log(`\n🚀 提交 ${urls.length} 个URL到Google Indexing API...\n`);

  let successCount = 0;
  let failureCount = 0;
  const failures = [];

  for (const url of urls) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED'
        }
      });
      successCount++;
    } catch (error) {
      failureCount++;
      const errorDetail = {
        url,
        message: error.message,
        code: error.code,
        status: error.status,
        details: error.errors ? error.errors[0] : null
      };
      failures.push(errorDetail);

      if (failureCount === 1) {
        console.error('\n❌ 第一个错误详情:', JSON.stringify(errorDetail, null, 2));
      }
    }

    process.stdout.write(
      `\r✅ ${successCount}/${urls.length} | ❌ 失败: ${failureCount}`
    );

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log('\n\n═════════════════════════════════════');
  console.log(`✅ 成功提交: ${successCount}`);
  console.log(`❌ 失败: ${failureCount}`);
  console.log('═════════════════════════════════════\n');

  if (failures.length > 0) {
    console.log('\n❌ 失败URL列表:');
    failures.slice(0, 5).forEach(f => {
      console.log(`  • ${f.url}`);
      console.log(`    错误: ${f.message}`);
      if (f.status) console.log(`    状态码: ${f.status}`);
      if (f.details) console.log(`    详情: ${JSON.stringify(f.details)}`);
    });
    if (failures.length > 5) {
      console.log(`  ... 还有 ${failures.length - 5} 个失败`);
    }
  }

  process.exit(failureCount > 0 ? 1 : 0);
}

async function main() {
  try {
    console.log('🔐 Google Search Console 批量提交工具');
    console.log(`📍 网站: ${SITE_URL}\n`);

    const auth = await getServiceAccountAuth();
    console.log('✅ 服务账号认证成功\n');

    const urls = getUnindexedUrlsLocal();
    console.log(`📝 待提交URL列表 (共 ${urls.length} 个):`);
    urls.forEach(url => console.log(`   ${url}`));

    await submitUrls(auth, urls);
  } catch (error) {
    console.error('\n❌ 错误:', error.message);
    process.exit(1);
  }
}

main();
