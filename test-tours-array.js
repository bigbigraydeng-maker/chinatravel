// Test tours array structure
const fs = require('fs');
const path = require('path');

// Read the tours.ts file
const toursPath = path.join(__dirname, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursPath, 'utf8');

// Extract the tours array
const toursMatch = toursContent.match(/export const tours: Tour\[\] = \[(.*?)\];/s);

if (toursMatch) {
  const toursArray = toursMatch[1];
  
  // Count the number of tour objects
  const tourCount = (toursArray.match(/\{/g) || []).length;
  console.log(`Total tours in array: ${tourCount}`);
  
  // Check Japan tours
  const japanTours = toursArray.match(/destination: 'japan'/g) || [];
  console.log(`Japan tours in array: ${japanTours.length}`);
  
  // Check Vietnam tours
  const vietnamTours = toursArray.match(/destination: 'vietnam'/g) || [];
  console.log(`Vietnam tours in array: ${vietnamTours.length}`);
  
  // Check China tours
  const chinaTours = toursArray.match(/destination: 'china'/g) || [];
  console.log(`China tours in array: ${chinaTours.length}`);
  
  // Check if the array is properly closed
  const closingBracketCount = (toursArray.match(/\}/g) || []).length;
  console.log(`Closing brackets: ${closingBracketCount}`);
  
  if (tourCount === closingBracketCount) {
    console.log('✓ Tours array is properly structured');
  } else {
    console.log('✗ Tours array has mismatched brackets');
  }
  
} else {
  console.log('Could not find tours array in the file');
}
