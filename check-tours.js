// Check if Japan and Vietnam tours are properly added
const fs = require('fs');
const path = require('path');

// Read the tours.ts file
const toursPath = path.join(__dirname, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursPath, 'utf8');

// Extract the tours array
const toursMatch = toursContent.match(/export const tours: Tour\[\] = \[(.*?)\];/s);

if (toursMatch) {
  const toursArray = toursMatch[1];
  
  // Count Japan tours
  const japanTours = toursArray.match(/destination: 'japan'/g);
  console.log('Japan tours count:', japanTours ? japanTours.length : 0);
  
  // Count Vietnam tours
  const vietnamTours = toursArray.match(/destination: 'vietnam'/g);
  console.log('Vietnam tours count:', vietnamTours ? vietnamTours.length : 0);
  
  // Count China tours
  const chinaTours = toursArray.match(/destination: 'china'/g);
  console.log('China tours count:', chinaTours ? chinaTours.length : 0);
  
} else {
  console.log('Could not find tours array in the file');
}
