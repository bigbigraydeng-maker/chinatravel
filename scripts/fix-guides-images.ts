import * as fs from 'fs';
import * as path from 'path';

const guidesPath = path.join(process.cwd(), 'src/lib/data/guides.ts');
let content = fs.readFileSync(guidesPath, 'utf-8');

// Map of guide slugs to Supabase guide folder names
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

// Split by guide objects
let updatedCount = 0;
Object.entries(guideMapping).forEach(([slug, guideName]) => {
  const searchSlug = `slug: '${slug}'`;
  if (content.includes(searchSlug)) {
    const supabaseUrl = `${SUPABASE_BASE}/${guideName}/hero/hero.jpg`;

    // Find the section for this guide
    const slugIndex = content.indexOf(searchSlug);
    if (slugIndex !== -1) {
      // Look for the next heroImage after this slug
      const afterSlug = content.substring(slugIndex);
      const heroImageMatch = afterSlug.match(/heroImage:\s*'([^']*)',/);

      if (heroImageMatch) {
        const oldUrl = heroImageMatch[1];
        const nextHeroImageIndex = content.indexOf(`heroImage: '${oldUrl}',`, slugIndex);
        if (nextHeroImageIndex !== -1) {
          // Make sure this is the right one (closest to the slug)
          const distanceFromSlug = nextHeroImageIndex - slugIndex;
          if (distanceFromSlug < 2000) { // Within 2000 chars, should be safe
            const oldLine = `heroImage: '${oldUrl}',`;
            const newLine = `heroImage: '${supabaseUrl}',`;
            content = content.replace(oldLine, newLine);
            updatedCount++;
          }
        }
      }
    }
  }
});

fs.writeFileSync(guidesPath, content, 'utf-8');
console.log(`✅ Successfully updated ${updatedCount} guide heroImage URLs to Supabase Storage`);
