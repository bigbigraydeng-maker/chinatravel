import * as fs from 'fs';
import * as path from 'path';

// Extract guide names from guide slugs
const guideMapping: Record<string, string> = {
  'beijing-travel-guide': 'beijing',
  'xian-travel-guide': 'xian',
  'shanghai-travel-guide': 'shanghai',
  'chengdu-travel-guide': 'chengdu',
  'guilin-travel-guide': 'guilin',
  'zhangjiajie-travel-guide': 'zhangjiajie',
  'yunnan-travel-guide': 'yunnan',
  'lijiang-travel-guide': 'lijiang',
  'dali-travel-guide': 'dali',
  'kunming-travel-guide': 'kunming',
  'shangri-la-travel-guide': 'shangri-la',
  'great-wall-travel-guide': 'great-wall',
  'forbidden-city-travel-guide': 'forbidden-city',
  'terracotta-warriors-travel-guide': 'terracotta-warriors',
  'yangshuo-travel-guide': 'yangshuo',
  'li-river-cruise-guide': 'li-river',
  'hangzhou-travel-guide': 'hangzhou',
  'suzhou-travel-guide': 'suzhou',
  'chongqing-travel-guide': 'chongqing',
  'leshan-buddha-travel-guide': 'leshan-buddha',
  'tianmen-mountain-travel-guide': 'tianmen-mountain',
};

const SUPABASE_BASE = 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/guide-images/guides';

// Read guides.ts file
const guidesPath = path.join(process.cwd(), 'src/lib/data/guides.ts');
let content = fs.readFileSync(guidesPath, 'utf-8');

// For each guide, generate the correct Supabase URL
Object.entries(guideMapping).forEach(([slug, guideName]) => {
  const supabaseUrl = `${SUPABASE_BASE}/${guideName}/hero/hero.jpg`;

  // Find and replace the heroImage line for this guide
  // Pattern: slug: '{slug}', followed by several lines until heroImage
  const pattern = new RegExp(
    `(slug:\\s*'${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}',\\s*(?:destinationName:\\s*'[^']*',\\s*)?metaTitle:\\s*'[^']*',\\s*metaDescription:\\s*'[^']*',\\s*keywords:\\s*\\[[^\\]]*\\],\\s*h1:\\s*'[^']*',\\s*heroSubtitle:\\s*'[^']*',\\s*heroImage:\\s*)'[^']*'`,
    's'
  );

  const replacement = `$1'${supabaseUrl}'`;
  content = content.replace(pattern, replacement);
});

// Write back the updated content
fs.writeFileSync(guidesPath, content, 'utf-8');
console.log('✅ Updated all guide heroImage URLs to Supabase Storage');
console.log(`Total guides updated: ${Object.keys(guideMapping).length}`);
