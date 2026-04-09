import * as fs from 'fs';
import * as path from 'path';

// Valid, working Unsplash URLs
const validUnsplashUrls: Record<string, string> = {
  'beijing': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80', // Great Wall
  'xian': 'https://images.unsplash.com/photo-1548013146-72976f124e61?w=1200&q=80', // Terracotta
  'shanghai': 'https://images.unsplash.com/photo-1545661531-b34c7f27be38?w=1200&q=80', // Shanghai skyline
  'chengdu': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80', // Panda
  'guilin': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80', // Mountains
  'zhangjiajie': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Zhangjiajie mountains
  'yunnan': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Mountains
  'lijiang': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Ancient town
  'dali': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Erhai Lake
  'kunming': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Spring City
  'shangri-la': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Mountains
  'great-wall': 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80', // Great Wall
  'forbidden-city': 'https://images.unsplash.com/photo-1551986782-d244ca0f6d7f?w=1200&q=80', // Asian architecture
  'terracotta-warriors': 'https://images.unsplash.com/photo-1548013146-72976f124e61?w=1200&q=80', // Terracotta
  'yangshuo': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Yangshuo
  'li-river': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Li River
  'hangzhou': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Hangzhou
  'suzhou': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Gardens
  'chongqing': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // City
  'leshan-buddha': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Buddha
  'tianmen-mountain': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Mountain
};

const guidesPath = path.join(process.cwd(), 'src/lib/data/guides.ts');
let content = fs.readFileSync(guidesPath, 'utf-8');

let updatedCount = 0;

// Replace all current Unsplash URLs with valid ones
Object.entries(validUnsplashUrls).forEach(([guideName, validUrl]) => {
  // Find and replace any heroImage line with a new valid Unsplash URL
  // Pattern: heroImage: 'https://images.unsplash.com/...' for this guide

  // First, find the slug for this guide
  const slugMap: Record<string, string> = {
    'beijing': 'beijing-travel-guide',
    'xian': 'xian-travel-guide',
    'shanghai': 'shanghai-travel-guide',
    'chengdu': 'chengdu-travel-guide',
    'guilin': 'guilin-travel-guide',
    'zhangjiajie': 'zhangjiajie-travel-guide',
    'yunnan': 'yunnan-travel-guide',
    'lijiang': 'lijiang-travel-guide',
    'dali': 'dali-travel-guide',
    'kunming': 'kunming-travel-guide',
    'shangri-la': 'shangri-la-travel-guide',
    'great-wall': 'great-wall-travel-guide',
    'forbidden-city': 'forbidden-city-travel-guide',
    'terracotta-warriors': 'terracotta-warriors-travel-guide',
    'yangshuo': 'yangshuo-travel-guide',
    'li-river': 'li-river-cruise-guide',
    'hangzhou': 'hangzhou-travel-guide',
    'suzhou': 'suzhou-travel-guide',
    'chongqing': 'chongqing-travel-guide',
    'leshan-buddha': 'leshan-buddha-travel-guide',
    'tianmen-mountain': 'tianmen-mountain-travel-guide',
  };

  const slug = slugMap[guideName];
  if (!slug) return;

  const searchSlug = `slug: '${slug}'`;
  const slugIndex = content.indexOf(searchSlug);

  if (slugIndex !== -1) {
    // Find the heroImage line after this slug (within 2000 chars)
    const afterSlug = content.substring(slugIndex, slugIndex + 2000);
    const heroMatch = afterSlug.match(/heroImage:\s*'([^']*)',/);

    if (heroMatch) {
      const oldUrl = heroMatch[1];
      const fullOldLine = `heroImage: '${oldUrl}',`;
      const newLine = `heroImage: '${validUrl}',`;

      // Replace only the first occurrence after this slug
      const absoluteHeroIndex = content.indexOf(fullOldLine, slugIndex);
      if (absoluteHeroIndex !== -1 && (absoluteHeroIndex - slugIndex) < 2000) {
        const before = content.substring(0, absoluteHeroIndex);
        const after = content.substring(absoluteHeroIndex + fullOldLine.length);
        content = before + newLine + after;
        updatedCount++;
        console.log(`✅ ${slug}`);
      }
    }
  }
});

fs.writeFileSync(guidesPath, content, 'utf-8');
console.log(`\n✅ Total guides updated: ${updatedCount}`);
