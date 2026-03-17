// Test server-side rendering process
const fs = require('fs');
const path = require('path');

// Read the page.tsx file
const pagePath = path.join(__dirname, 'src', 'app', 'tours', '[destination]', 'page.tsx');
const pageContent = fs.readFileSync(pagePath, 'utf8');

// Read the tours.ts file
const toursPath = path.join(__dirname, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursPath, 'utf8');

// Extract the getDestinationBySlug and getToursByDestination functions
const getDestinationBySlugMatch = toursContent.match(/export const getDestinationBySlug = \(slug: string\): Destination \| undefined => \{(.*?)\};\n/s);
const getToursByDestinationMatch = toursContent.match(/export const getToursByDestination = \(destination: string\): Tour\[\] => \{(.*?)\};\n/s);

// Extract the destinations and tours arrays
const destinationsMatch = toursContent.match(/export const destinations: Destination\[\] = \[(.*?)\];/s);
const toursMatch = toursContent.match(/export const tours: Tour\[\] = \[(.*?)\];/s);

if (getDestinationBySlugMatch && getToursByDestinationMatch && destinationsMatch && toursMatch) {
  const getDestinationBySlugFunction = getDestinationBySlugMatch[1];
  const getToursByDestinationFunction = getToursByDestinationMatch[1];
  const destinationsArray = destinationsMatch[1];
  const toursArray = toursMatch[1];
  
  // Create a test script that simulates the server-side rendering process
  const testScript = `
    // Mock the destinations and tours arrays
    const destinations = [${destinationsArray}];
    const tours = [${toursArray}];
    
    // Mock the functions
    const getDestinationBySlug = (slug) => {
      ${getDestinationBySlugFunction}
    };
    
    const getToursByDestination = (destination) => {
      ${getToursByDestinationFunction}
    };
    
    // Mock the notFound function
    const notFound = () => {
      throw new Error('Not found');
    };
    
    // Test the server-side rendering process
    console.log('Testing server-side rendering for /tours/japan:');
    try {
      const destination = getDestinationBySlug('japan');
      if (!destination) {
        notFound();
      }
      const allTours = getToursByDestination('japan');
      console.log('✓ Japan destination found:', destination.name);
      console.log('✓ Japan tours found:', allTours.length);
    } catch (error) {
      console.log('✗ Error:', error.message);
    }
    
    console.log('\nTesting server-side rendering for /tours/vietnam:');
    try {
      const destination = getDestinationBySlug('vietnam');
      if (!destination) {
        notFound();
      }
      const allTours = getToursByDestination('vietnam');
      console.log('✓ Vietnam destination found:', destination.name);
      console.log('✓ Vietnam tours found:', allTours.length);
    } catch (error) {
      console.log('✗ Error:', error.message);
    }
    
    console.log('\nTesting server-side rendering for /tours/china:');
    try {
      const destination = getDestinationBySlug('china');
      if (!destination) {
        notFound();
      }
      const allTours = getToursByDestination('china');
      console.log('✓ China destination found:', destination.name);
      console.log('✓ China tours found:', allTours.length);
    } catch (error) {
      console.log('✗ Error:', error.message);
    }
  `;
  
  // Write and run the test
  const testPath = path.join(__dirname, 'test-ssr.js');
  fs.writeFileSync(testPath, testScript);
  
  console.log('Running server-side rendering test...');
  require(testPath);
  
  // Clean up
  fs.unlinkSync(testPath);
} else {
  console.log('Could not extract necessary functions or arrays');
}
