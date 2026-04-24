/**
 * Migration Script: Update tours.ts with correct data from old website (ctstours.co.nz)
 *
 * Usage: node scripts/migrate-tours.cjs
 *
 * This script reads tour data from JSON files in scripts/data/ and generates
 * the updated src/lib/data/tours.ts file with correct prices, itineraries,
 * inclusions, exclusions, and descriptions from the old CTS Tours website.
 */

const fs = require('fs');
const path = require('path');

// Read all tour data files
const dataDir = path.join(__dirname, 'data');
const chinaSignature = JSON.parse(fs.readFileSync(path.join(dataDir, 'china-signature.json'), 'utf-8'));
const chinaDiscovery = JSON.parse(fs.readFileSync(path.join(dataDir, 'china-discovery.json'), 'utf-8'));
const chinaStopover = JSON.parse(fs.readFileSync(path.join(dataDir, 'china-stopover.json'), 'utf-8'));
const japan = JSON.parse(fs.readFileSync(path.join(dataDir, 'japan.json'), 'utf-8'));
const vietnam = JSON.parse(fs.readFileSync(path.join(dataDir, 'vietnam.json'), 'utf-8'));

const allTours = [
  ...chinaSignature,
  ...chinaDiscovery,
  ...chinaStopover,
  ...japan,
  ...vietnam
];

console.log(`Loaded ${allTours.length} tours total:`);
console.log(`  China Signature: ${chinaSignature.length}`);
console.log(`  China Discovery: ${chinaDiscovery.length}`);
console.log(`  China Stopover: ${chinaStopover.length}`);
console.log(`  Japan: ${japan.length}`);
console.log(`  Vietnam: ${vietnam.length}`);

// Read the current tours.ts to extract the header (interfaces + destinations)
const toursFile = path.join(__dirname, '..', 'src', 'lib', 'data', 'tours.ts');
const currentContent = fs.readFileSync(toursFile, 'utf-8');

// Extract everything before the tours array
const markerIdx = currentContent.indexOf('// Sample Tours Data');
if (markerIdx === -1) {
  console.error('Could not find tours array marker in tours.ts');
  process.exit(1);
}
const header = currentContent.substring(0, markerIdx);

// Extract utility functions after the tours array
const footerIdx = currentContent.indexOf('// Utility Functions');
if (footerIdx === -1) {
  console.error('Could not find utility functions marker in tours.ts');
  process.exit(1);
}
const footer = currentContent.substring(footerIdx);

// Generate meta title from tour data
function generateMetaTitle(tour) {
  const tierLabel = tour.tier.charAt(0).toUpperCase() + tour.tier.slice(1);
  return `${tour.name} | ${tour.duration} | CTS Tours`;
}

// Generate meta description from tour data
function generateMetaDescription(tour) {
  return `${tour.shortDescription.substring(0, 140)}${tour.shortDescription.length > 140 ? '...' : ''} Book with CTS Tours.`;
}

// Escape single quotes for TypeScript strings
function esc(s) {
  return s.replace(/'/g, "\\'");
}

// Generate TypeScript for a single tour
function generateTour(tour) {
  const lines = [];
  lines.push('  {');
  lines.push(`    id: '${tour.id}',`);
  lines.push(`    slug: '${tour.slug}',`);
  lines.push(`    destination: '${tour.destination}',`);
  lines.push(`    tier: '${tour.tier}',`);
  lines.push(`    name: '${esc(tour.name)}',`);
  lines.push(`    title: '${esc(tour.title)}',`);
  lines.push(`    shortDescription: '${esc(tour.shortDescription)}',`);
  lines.push(`    duration: '${tour.duration}',`);
  lines.push(`    price: '${esc(tour.price)}',`);
  lines.push(`    heroImage: '${tour.heroImage}',`);

  // Gallery
  lines.push('    gallery: [');
  tour.gallery.forEach((img, i) => {
    lines.push(`      '${img}'${i < tour.gallery.length - 1 ? ',' : ''}`);
  });
  lines.push('    ],');

  // Highlights
  lines.push('    highlights: [');
  tour.highlights.forEach((h, i) => {
    lines.push(`      '${esc(h)}'${i < tour.highlights.length - 1 ? ',' : ''}`);
  });
  lines.push('    ],');

  // Itinerary
  lines.push('    itinerary: [');
  tour.itinerary.forEach((day, i) => {
    const meals = day.meals.map(m => `'${m}'`).join(', ');
    let dayLine = `      { day: ${day.day}, title: '${esc(day.title)}', description: '${esc(day.description)}', meals: [${meals}]`;
    if (day.accommodation) {
      dayLine += `, accommodation: '${esc(day.accommodation)}'`;
    }
    dayLine += ` }${i < tour.itinerary.length - 1 ? ',' : ''}`;
    lines.push(dayLine);
  });
  lines.push('    ],');

  // Inclusions
  lines.push('    inclusions: [');
  tour.inclusions.forEach((inc, i) => {
    lines.push(`      '${esc(inc)}'${i < tour.inclusions.length - 1 ? ',' : ''}`);
  });
  lines.push('    ],');

  // Exclusions
  lines.push('    exclusions: [');
  tour.exclusions.forEach((exc, i) => {
    lines.push(`      '${esc(exc)}'${i < tour.exclusions.length - 1 ? ',' : ''}`);
  });
  lines.push('    ],');

  // Meta
  const metaTitle = tour.metaTitle || generateMetaTitle(tour);
  const metaDesc = tour.metaDescription || generateMetaDescription(tour);
  lines.push(`    metaTitle: '${esc(metaTitle)}',`);
  lines.push(`    metaDescription: '${esc(metaDesc)}',`);
  lines.push(`    isActive: true,`);
  lines.push(`    createdAt: '2024-01-01',`);
  lines.push(`    updatedAt: '2025-01-01'`);
  lines.push('  }');

  return lines.join('\n');
}

// Generate the tours array
const tourSections = [];

// Group tours by category for readability
const groups = [
  { label: 'China Signature Tours', tours: chinaSignature },
  { label: 'China Discovery Tours', tours: chinaDiscovery },
  { label: 'China Stopover Tours', tours: chinaStopover },
  { label: 'Japan Tours', tours: japan },
  { label: 'Vietnam Tours', tours: vietnam },
];

groups.forEach(group => {
  tourSections.push(`  // ${group.label}`);
  group.tours.forEach((tour, i) => {
    tourSections.push(generateTour(tour));
    // Add comma between tours (not after last)
    if (i < group.tours.length - 1) {
      // Replace last line's closing brace with comma
      const lastIdx = tourSections.length - 1;
      tourSections[lastIdx] = tourSections[lastIdx].replace(/\}$/, '},');
    }
  });
  // Add comma after each group's last tour (except for the very last group)
  const isLastGroup = group === groups[groups.length - 1];
  if (!isLastGroup) {
    const lastIdx = tourSections.length - 1;
    tourSections[lastIdx] = tourSections[lastIdx].replace(/\}$/, '},');
  }
});

// Assemble the complete file
const output = [
  header,
  '// Tours Data — migrated from ctstours.co.nz',
  'export const tours: Tour[] = [',
  tourSections.join('\n'),
  '];',
  '',
  footer
].join('\n');

// Write the output
fs.writeFileSync(toursFile, output, 'utf-8');
console.log(`\nSuccessfully wrote ${allTours.length} tours to ${toursFile}`);
console.log('Migration complete!');
