// Test getDestinationBySlug function
const fs = require('fs');
const path = require('path');

// Read the tours.ts file
const toursPath = path.join(__dirname, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursPath, 'utf8');

// Extract the destinations array and getDestinationBySlug function
const destinationsMatch = toursContent.match(/export const destinations: Destination\[\] = \[(.*?)\];/s);
const getDestinationBySlugMatch = toursContent.match(/export const getDestinationBySlug = \(slug: string\): Destination \| undefined => \{(.*?)\};\n/s);

if (destinationsMatch && getDestinationBySlugMatch) {
  const destinationsArray = destinationsMatch[1];
  const getDestinationBySlugFunction = getDestinationBySlugMatch[1];
  
  // Create a simplified version of the function
  const testFunction = `
    const destinations = [${destinationsArray}];
    const getDestinationBySlug = (slug) => {
      ${getDestinationBySlugFunction}
    };
    
    console.log('Testing getDestinationBySlug function:');
    console.log('China:', getDestinationBySlug('china'));
    console.log('Japan:', getDestinationBySlug('japan'));
    console.log('Vietnam:', getDestinationBySlug('vietnam'));
    console.log('Invalid:', getDestinationBySlug('invalid'));
  `;
  
  // Write and run the test
  const testPath = path.join(__dirname, 'test-function.js');
  fs.writeFileSync(testPath, testFunction);
  
  console.log('Running test...');
  require(testPath);
  
  // Clean up
  fs.unlinkSync(testPath);
} else {
  console.log('Could not find destinations array or getDestinationBySlug function');
}
