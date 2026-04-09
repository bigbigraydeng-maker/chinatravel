const fs = require('fs');
const path = require('path');

// 加载URL映射
const mapping = JSON.parse(fs.readFileSync('optimized/url-mapping.json', 'utf-8'));

const files = [
  'src/lib/data/tours.ts',
  'src/lib/data/guides.ts',
  'src/lib/data/cities.ts',
];

let totalCount = 0;

for (const filepath of files) {
  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  ${filepath} not found`);
    continue;
  }

  let content = fs.readFileSync(filepath, 'utf-8');
  const original = content;
  let count = 0;

  // 对每个映射进行替换
  for (const [filename, newUrl] of Object.entries(mapping)) {
    // 跳过响应式变体
    if (['-640w', '-1024w', '-1920w', '-300w', '-400w', '-500w', '-600w', '-1000w'].some(x => filename.includes(x))) {
      continue;
    }

    // 替换所有可能的旧路径格式
    const patterns = [
      `'/images/${filename}'`,
      `"/images/${filename}"`,
      `'/images/tours/${filename}'`,
      `"/images/tours/${filename}"`,
      `'/images/guides/${filename}'`,
      `"/images/guides/${filename}"`,
      `'/images/credentials/${filename}'`,
      `"/images/credentials/${filename}"`,
    ];

    for (const pattern of patterns) {
      const newPattern = `'${newUrl}'`;
      if (content.includes(pattern)) {
        content = content.replaceAll(pattern, newPattern);
        count++;
      }
    }
  }

  if (content !== original) {
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`OK ${filepath} - ${count} replacements`);
    totalCount += count;
  } else {
    console.log(`SKIP ${filepath} - no changes`);
  }
}

console.log(`\nTotal: ${totalCount} replacements`);
