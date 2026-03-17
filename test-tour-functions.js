// Test tour utility functions
const fs = require('fs');
const path = require('path');

// Read the tours.ts file
const toursPath = path.join(__dirname, 'src', 'lib', 'data', 'tours.ts');
const toursContent = fs.readFileSync(toursPath, 'utf8');

// Extract the tours array
const toursMatch = toursContent.match(/export const tours: Tour\[\] = \[(.*?)\];/s);

if (toursMatch) {
  // Create a simplified version of the tours array
  const toursArray = toursMatch[1];
  
  // Parse the tours array (simplified)
  const tours = [];
  let currentTour = {};
  let inTour = false;
  let propertyName = '';
  let propertyValue = '';
  let inString = false;
  let stringDelimiter = '';
  
  for (let i = 0; i < toursArray.length; i++) {
    const char = toursArray[i];
    
    if (char === '{') {
      inTour = true;
      currentTour = {};
    } else if (char === '}') {
      inTour = false;
      if (propertyName && propertyValue) {
        currentTour[propertyName] = propertyValue;
      }
      tours.push(currentTour);
      currentTour = {};
      propertyName = '';
      propertyValue = '';
    } else if (inTour) {
      if (char === ':' && !inString) {
        propertyName = propertyValue.trim();
        propertyValue = '';
      } else if (char === ',' && !inString) {
        if (propertyName && propertyValue) {
          // Clean up the property value
          let cleanedValue = propertyValue.trim();
          if (cleanedValue.startsWith('\'') && cleanedValue.endsWith('\'')) {
            cleanedValue = cleanedValue.substring(1, cleanedValue.length - 1);
          } else if (cleanedValue === 'true') {
            cleanedValue = true;
          } else if (cleanedValue === 'false') {
            cleanedValue = false;
          }
          currentTour[propertyName] = cleanedValue;
        }
        propertyName = '';
        propertyValue = '';
      } else if (char === '\'' || char === '"') {
        if (inString && char === stringDelimiter) {
          inString = false;
        } else if (!inString) {
          inString = true;
          stringDelimiter = char;
        }
        propertyValue += char;
      } else {
        propertyValue += char;
      }
    }
  }
  
  // Test getToursByDestination
  function getToursByDestination(destination) {
    return tours.filter(tour => tour.destination === destination && tour.isActive === true);
  }
  
  // Test getToursByDestinationAndTier
  function getToursByDestinationAndTier(destination, tier) {
    return tours.filter(tour => tour.destination === destination && tour.tier === tier && tour.isActive === true);
  }
  
  // Test Japan tours
  console.log('=== Testing Japan Tours ===');
  const japanTours = getToursByDestination('japan');
  console.log(`Japan tours found: ${japanTours.length}`);
  japanTours.forEach(tour => {
    console.log(`  - ${tour.name} (${tour.tier})`);
  });
  
  // Test Vietnam tours
  console.log('\n=== Testing Vietnam Tours ===');
  const vietnamTours = getToursByDestination('vietnam');
  console.log(`Vietnam tours found: ${vietnamTours.length}`);
  vietnamTours.forEach(tour => {
    console.log(`  - ${tour.name} (${tour.tier})`);
  });
  
  // Test Japan Signature tours
  console.log('\n=== Testing Japan Signature Tours ===');
  const japanSignatureTours = getToursByDestinationAndTier('japan', 'signature');
  console.log(`Japan Signature tours found: ${japanSignatureTours.length}`);
  japanSignatureTours.forEach(tour => {
    console.log(`  - ${tour.name}`);
  });
  
  // Test Japan Discovery tours
  console.log('\n=== Testing Japan Discovery Tours ===');
  const japanDiscoveryTours = getToursByDestinationAndTier('japan', 'discovery');
  console.log(`Japan Discovery tours found: ${japanDiscoveryTours.length}`);
  japanDiscoveryTours.forEach(tour => {
    console.log(`  - ${tour.name}`);
  });
  
  // Test Vietnam Discovery tours
  console.log('\n=== Testing Vietnam Discovery Tours ===');
  const vietnamDiscoveryTours = getToursByDestinationAndTier('vietnam', 'discovery');
  console.log(`Vietnam Discovery tours found: ${vietnamDiscoveryTours.length}`);
  vietnamDiscoveryTours.forEach(tour => {
    console.log(`  - ${tour.name}`);
  });
  
} else {
  console.log('Could not find tours array in the file');
}
