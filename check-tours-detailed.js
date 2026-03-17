// Check detailed information about Japan and Vietnam tours
const fs = require('fs');
const path = require('path');

// Read the tours.ts file
const toursPath = path.join(__dirname, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursPath, 'utf8');

// Extract the tours array
const toursMatch = toursContent.match(/export const tours: Tour\[\] = \[(.*?)\];/s);

if (toursMatch) {
  const toursArray = toursMatch[1];
  
  // Check Japan tours
  console.log('=== Japan Tours ===');
  const japanTourMatches = toursArray.match(/\{[\s\S]*?destination: 'japan'[\s\S]*?\}/g);
  if (japanTourMatches) {
    japanTourMatches.forEach((tour, index) => {
      console.log(`\nJapan Tour ${index + 1}:`);
      const idMatch = tour.match(/id: '([^']+)'/);
      const slugMatch = tour.match(/slug: '([^']+)'/);
      const tierMatch = tour.match(/tier: '([^']+)'/);
      const nameMatch = tour.match(/name: '([^']+)'/);
      const isActiveMatch = tour.match(/isActive: (true|false)/);
      
      if (idMatch) console.log(`  ID: ${idMatch[1]}`);
      if (slugMatch) console.log(`  Slug: ${slugMatch[1]}`);
      if (tierMatch) console.log(`  Tier: ${tierMatch[1]}`);
      if (nameMatch) console.log(`  Name: ${nameMatch[1]}`);
      if (isActiveMatch) console.log(`  isActive: ${isActiveMatch[1]}`);
    });
  } else {
    console.log('No Japan tours found');
  }
  
  // Check Vietnam tours
  console.log('\n=== Vietnam Tours ===');
  const vietnamTourMatches = toursArray.match(/\{[\s\S]*?destination: 'vietnam'[\s\S]*?\}/g);
  if (vietnamTourMatches) {
    vietnamTourMatches.forEach((tour, index) => {
      console.log(`\nVietnam Tour ${index + 1}:`);
      const idMatch = tour.match(/id: '([^']+)'/);
      const slugMatch = tour.match(/slug: '([^']+)'/);
      const tierMatch = tour.match(/tier: '([^']+)'/);
      const nameMatch = tour.match(/name: '([^']+)'/);
      const isActiveMatch = tour.match(/isActive: (true|false)/);
      
      if (idMatch) console.log(`  ID: ${idMatch[1]}`);
      if (slugMatch) console.log(`  Slug: ${slugMatch[1]}`);
      if (tierMatch) console.log(`  Tier: ${tierMatch[1]}`);
      if (nameMatch) console.log(`  Name: ${nameMatch[1]}`);
      if (isActiveMatch) console.log(`  isActive: ${isActiveMatch[1]}`);
    });
  } else {
    console.log('No Vietnam tours found');
  }
  
} else {
  console.log('Could not find tours array in the file');
}
