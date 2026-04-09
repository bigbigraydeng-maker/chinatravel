const fs = require('fs');
const path = require('path');

const OPTIMIZED_DIR = 'optimized';
const SUPABASE_URL = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public';

function getBucket(dirPath) {
  if (dirPath.includes('guides') || dirPath.includes('guide-images')) return 'guide-images';
  if (dirPath.includes('credentials') || dirPath.includes('credential-images')) return 'credential-images';
  return 'tour-images';
}

function walkDir(dir, baseDir = '') {
  const mapping = {};
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    const relPath = path.join(baseDir, file.name);

    if (file.isDirectory()) {
      Object.assign(mapping, walkDir(fullPath, relPath));
    } else if (/\.(webp|jpg|jpeg)$/i.test(file.name)) {
      const bucket = getBucket(relPath);
      const urlPath = relPath.replace(/\\/g, '/');
      const url = `${SUPABASE_URL}/${bucket}/${urlPath}`;
      mapping[urlPath] = url;
    }
  }

  return mapping;
}

console.log('Generating correct URL mapping...\n');
const mapping = walkDir(OPTIMIZED_DIR);

// 按城市组织的映射示例（用于调试）
const guidesMapping = {};
for (const [p, url] of Object.entries(mapping)) {
  if (p.includes('guides/')) {
    const city = p.split('/')[1];
    if (!guidesMapping[city]) guidesMapping[city] = [];
    guidesMapping[city].push(p);
  }
}

console.log('Guides cities found:');
for (const [city, files] of Object.entries(guidesMapping)) {
  console.log(`  ${city}: ${files.length} files`);
}

// 保存完整映射
fs.writeFileSync('optimized/url-mapping-complete.json', JSON.stringify(mapping, null, 2));
console.log(`\nSaved: ${Object.keys(mapping).length} URLs to url-mapping-complete.json`);
