// Test destinations array structure
const fs = require('fs');
const path = require('path');

// Read the tours.ts file
const toursPath = path.join(__dirname, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursPath, 'utf8');

// Extract the destinations array
const destinationsMatch = toursContent.match(/export const destinations: Destination\[\] = \[(.*?)\];/s);

if (destinationsMatch) {
  const destinationsArray = destinationsMatch[1];
  
  // Count the number of destination objects
  const destinationCount = (destinationsArray.match(/\{/g) || []).length;
  console.log(`Total destinations in array: ${destinationCount}`);
  
  // Check if Japan is in the array
  const japanMatch = destinationsArray.match(/slug: 'japan'/);
  console.log(`Japan in destinations array: ${!!japanMatch}`);
  
  // Check if Vietnam is in the array
  const vietnamMatch = destinationsArray.match(/slug: 'vietnam'/);
  console.log(`Vietnam in destinations array: ${!!vietnamMatch}`);
  
  // Check if China is in the array
  const chinaMatch = destinationsArray.match(/slug: 'china'/);
  console.log(`China in destinations array: ${!!chinaMatch}`);
  
} else {
  console.log('Could not find destinations array in the file');
}
