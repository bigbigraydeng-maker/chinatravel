import * as fs from 'fs';
import * as path from 'path';

// Unsplash URLs for each guide
const guidesMap: Record<string, { slug: string; url: string }> = {
  'beijing': { slug: 'beijing-travel-guide', url: 'https://images.unsplash.com/photo-1508684175866-29ac7090006f?w=1200&q=80' },
  'xian': { slug: 'xian-travel-guide', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
  'shanghai': { slug: 'shanghai-travel-guide', url: 'https://images.unsplash.com/photo-1513457656999-4c8bde1f38c8?w=1200&q=80' },
  'chengdu': { slug: 'chengdu-travel-guide', url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200&q=80' },
  'guilin': { slug: 'guilin-travel-guide', url: 'https://images.unsplash.com/photo-1512453322675-f6ad937e5de1?w=1200&q=80' },
  'zhangjiajie': { slug: 'zhangjiajie-travel-guide', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
  'yunnan': { slug: 'yunnan-travel-guide', url: 'https://images.unsplash.com/photo-1508704185779-3ac97b3565b2?w=1200&q=80' },
  'lijiang': { slug: 'lijiang-travel-guide', url: 'https://images.unsplash.com/photo-1478217338696-3378e3d696ef?w=1200&q=80' },
  'dali': { slug: 'dali-travel-guide', url: 'https://images.unsplash.com/photo-1520960481112-cf5ebbd871b1?w=1200&q=80' },
  'kunming': { slug: 'kunming-travel-guide', url: 'https://images.unsplash.com/photo-1598209175429-a6b38748472b?w=1200&q=80' },
  'shangri-la': { slug: 'shangri-la-travel-guide', url: 'https://images.unsplash.com/photo-1508704185779-3ac97b3565b2?w=1200&q=80' },
  'great-wall': { slug: 'great-wall-travel-guide', url: 'https://images.unsplash.com/photo-1508684175866-29ac7090006f?w=1200&q=80' },
  'forbidden-city': { slug: 'forbidden-city-travel-guide', url: 'https://images.unsplash.com/photo-1462332420958-a05d1e7413413?w=1200&q=80' },
  'terracotta-warriors': { slug: 'terracotta-warriors-travel-guide', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80' },
  'yangshuo': { slug: 'yangshuo-travel-guide', url: 'https://images.unsplash.com/photo-1478217338696-3378e3d696ef?w=1200&q=80' },
  'li-river': { slug: 'li-river-cruise-guide', url: 'https://images.unsplash.com/photo-1520960481112-cf5ebbd871b1?w=1200&q=80' },
  'hangzhou': { slug: 'hangzhou-travel-guide', url: 'https://images.unsplash.com/photo-1598209175429-a6b38748472b?w=1200&q=80' },
  'suzhou': { slug: 'suzhou-travel-guide', url: 'https://images.unsplash.com/photo-1512453322675-f6ad937e5de1?w=1200&q=80' },
  'chongqing': { slug: 'chongqing-travel-guide', url: 'https://images.unsplash.com/photo-1513457656999-4c8bde1f38c8?w=1200&q=80' },
  'leshan-buddha': { slug: 'leshan-buddha-travel-guide', url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200&q=80' },
  'tianmen-mountain': { slug: 'tianmen-mountain-travel-guide', url: 'https://images.unsplash.com/photo-1508684175866-29ac7090006f?w=1200&q=80' },
};

const guidesPath = path.join(process.cwd(), 'src/lib/data/guides.ts');
let content = fs.readFileSync(guidesPath, 'utf-8');

let updatedCount = 0;

// Replace all guide-images Supabase URLs with Unsplash URLs
Object.entries(guidesMap).forEach(([guideName, { slug, url }]) => {
  // Find and replace the specific pattern: heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/guide-images/guides/{guideName}/hero/hero.jpg',
  const supabasePattern = `heroImage: 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/guide-images/guides/${guideName}/hero/hero.jpg',`;

  if (content.includes(supabasePattern)) {
    const newLine = `heroImage: '${url}',`;
    content = content.replace(supabasePattern, newLine);
    updatedCount++;
    console.log(`✅ Updated ${slug}`);
  } else {
    console.log(`⏭️  Skipped ${slug} (not found or already updated)`);
  }
});

fs.writeFileSync(guidesPath, content, 'utf-8');
console.log(`\n✅ Total updated: ${updatedCount} guides`);
