import * as fs from 'fs';
import * as path from 'path';

const toursPath = path.join(process.cwd(), 'src/lib/data/tours.ts');
let content = fs.readFileSync(toursPath, 'utf-8');

// For each destination, update the heroImage
// China: Use silk-road-wall.jpg from tour-images
const replacements: Record<string, string> = {
  'China': 'https://qbturrydultenhlfmdcm.supabase.co/storage/v1/object/public/tour-images/silk-road-wall.jpg',
  'Japan': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80', // Keep unsplash for now - no Japan tours
  'Vietnam': 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1920&q=80', // Keep unsplash for now - no Vietnam tours
};

let updatedCount = 0;

Object.entries(replacements).forEach(([destName, newUrl]) => {
  // Find destination by name
  const nameSearchStr = `name: '${destName}',`;
  if (content.includes(nameSearchStr)) {
    // Find heroImage after this destination name
    const nameIndex = content.indexOf(nameSearchStr);
    if (nameIndex !== -1) {
      const afterName = content.substring(nameIndex);
      // Look for heroImage: '...' pattern within next 1000 chars
      const heroImageMatch = afterName.match(/heroImage:\s*'([^']*)',/);

      if (heroImageMatch) {
        const oldUrl = heroImageMatch[1];

        // Only replace if it's an Unsplash URL or different from newUrl
        if (oldUrl.includes('unsplash') || oldUrl !== newUrl) {
          const oldLine = `heroImage: '${oldUrl}',`;
          const newLine = `heroImage: '${newUrl}',`;

          // Make sure we replace the right one (closest to destination name)
          const heroIndex = content.indexOf(oldLine, nameIndex);
          if (heroIndex !== -1 && (heroIndex - nameIndex) < 2000) {
            // Get the first occurrence only
            const beforeHero = content.substring(0, heroIndex);
            const afterHero = content.substring(heroIndex);
            const restOfFile = afterHero.replace(oldLine, newLine);
            content = beforeHero + restOfFile;
            updatedCount++;
          }
        }
      }
    }
  }
});

fs.writeFileSync(toursPath, content, 'utf-8');
console.log(`✅ Successfully updated ${updatedCount} destination heroImage URLs`);
