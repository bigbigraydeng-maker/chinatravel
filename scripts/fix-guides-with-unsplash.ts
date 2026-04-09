import * as fs from 'fs';
import * as path from 'path';

// Unsplash image mappings for each guide
const guidesUnsplashMap: Record<string, string> = {
  'beijing': 'https://images.unsplash.com/photo-1508684175866-29ac7090006f?w=1200&q=80', // Great Wall sunset
  'xian': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Terracotta Warriors
  'shanghai': 'https://images.unsplash.com/photo-1513457656999-4c8bde1f38c8?w=1200&q=80', // Shanghai skyline
  'chengdu': 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200&q=80', // Panda reserve
  'guilin': 'https://images.unsplash.com/photo-1512453322675-f6ad937e5de1?w=1200&q=80', // Karst mountains
  'zhangjiajie': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Avatar mountains
  'yunnan': 'https://images.unsplash.com/photo-1508704185779-3ac97b3565b2?w=1200&q=80', // Yunnan landscape
  'lijiang': 'https://images.unsplash.com/photo-1478217338696-3378e3d696ef?w=1200&q=80', // Ancient town
  'dali': 'https://images.unsplash.com/photo-1520960481112-cf5ebbd871b1?w=1200&q=80', // Erhai Lake
  'kunming': 'https://images.unsplash.com/photo-1598209175429-a6b38748472b?w=1200&q=80', // Spring City
  'shangri-la': 'https://images.unsplash.com/photo-1508704185779-3ac97b3565b2?w=1200&q=80', // Mountains
  'great-wall': 'https://images.unsplash.com/photo-1508684175866-29ac7090006f?w=1200&q=80', // Great Wall
  'forbidden-city': 'https://images.unsplash.com/photo-1462332420958-a05d1e7413413?w=1200&q=80', // Forbidden City
  'terracotta-warriors': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80', // Warriors
  'yangshuo': 'https://images.unsplash.com/photo-1478217338696-3378e3d696ef?w=1200&q=80', // Yangshuo
  'li-river': 'https://images.unsplash.com/photo-1520960481112-cf5ebbd871b1?w=1200&q=80', // Li River
  'hangzhou': 'https://images.unsplash.com/photo-1598209175429-a6b38748472b?w=1200&q=80', // Hangzhou
  'suzhou': 'https://images.unsplash.com/photo-1512453322675-f6ad937e5de1?w=1200&q=80', // Gardens
  'chongqing': 'https://images.unsplash.com/photo-1513457656999-4c8bde1f38c8?w=1200&q=80', // City
  'leshan-buddha': 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=1200&q=80', // Buddha
  'tianmen-mountain': 'https://images.unsplash.com/photo-1508684175866-29ac7090006f?w=1200&q=80', // Mountain
};

const guidesPath = path.join(process.cwd(), 'src/lib/data/guides.ts');
let content = fs.readFileSync(guidesPath, 'utf-8');

let updatedCount = 0;

// For each guide, update the heroImage to use Unsplash
Object.entries(guidesUnsplashMap).forEach(([guideName, unsplashUrl]) => {
  // Find slug for this guide
  const guideSlugs: Record<string, string> = {
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

  const slug = guideSlugs[guideName];
  if (!slug) return;

  const searchSlug = `slug: '${slug}'`;
  if (!content.includes(searchSlug)) return;

  const slugIndex = content.indexOf(searchSlug);
  const afterSlug = content.substring(slugIndex);

  // Find the next heroImage: 'xxx', pattern
  const heroImageMatch = afterSlug.match(/heroImage:\s*'([^']*)',/);
  if (!heroImageMatch) return;

  const oldUrl = heroImageMatch[1];
  const nextHeroImageIndex = content.indexOf(`heroImage: '${oldUrl}',`, slugIndex);

  if (nextHeroImageIndex !== -1 && (nextHeroImageIndex - slugIndex) < 2000) {
    // Only replace if not already a Supabase URL
    if (!oldUrl.includes('supabase')) {
      const oldLine = `heroImage: '${oldUrl}',`;
      const newLine = `heroImage: '${unsplashUrl}',`;

      const beforeHero = content.substring(0, nextHeroImageIndex);
      const afterHero = content.substring(nextHeroImageIndex);
      const restOfFile = afterHero.replace(oldLine, newLine);
      content = beforeHero + restOfFile;
      updatedCount++;
    }
  }
});

fs.writeFileSync(guidesPath, content, 'utf-8');
console.log(`✅ Updated ${updatedCount} guide heroImage URLs to Unsplash CDN`);
