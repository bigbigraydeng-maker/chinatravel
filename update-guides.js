const fs = require('fs');

// 加载完整的URL映射
const completeMapping = JSON.parse(fs.readFileSync('optimized/url-mapping-complete.json', 'utf-8'));

// 创建简化映射：从旧路径到新URL
const oldToNew = {};
for (const [newPath, newUrl] of Object.entries(completeMapping)) {
  // 匹配 guides/beijing/hero/hero.jpg -> /images/guides/beijing/hero.jpg
  if (newPath.includes('guides/')) {
    const parts = newPath.split('/');
    if (parts.length >= 4) {
      const city = parts[1];
      const type = parts[2]; // hero, etc
      const filename = parts[parts.length - 1];
      const oldPath = `/images/guides/${city}/${filename}`;
      oldToNew[oldPath] = newUrl;
    }
  }
}

console.log('Created mappings:');
const examples = Object.entries(oldToNew).slice(0, 5);
for (const [old, _new] of examples) {
  console.log(`  ${old}`);
}
console.log(`  ... and ${Object.keys(oldToNew).length - 5} more\n`);

// 更新guides.ts
let content = fs.readFileSync('src/lib/data/guides.ts', 'utf-8');
let count = 0;

for (const [oldPath, newUrl] of Object.entries(oldToNew)) {
  const pattern1 = `'${oldPath}'`;
  const pattern2 = `"${oldPath}"`;
  const newPattern = `'${newUrl}'`;

  if (content.includes(pattern1)) {
    content = content.replaceAll(pattern1, newPattern);
    count++;
  }
  if (content.includes(pattern2)) {
    content = content.replaceAll(pattern2, newPattern);
    count++;
  }
}

fs.writeFileSync('src/lib/data/guides.ts', content, 'utf-8');
console.log(`Updated guides.ts with ${count} replacements`);
