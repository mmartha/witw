const fs = require('fs');
const path = require('path');

// Configuration
const CITIES_DIR = path.join(process.cwd(), 'src/data/cities');
const INDEX_FILE = path.join(CITIES_DIR, 'index.json');

// Helper to read and parse a JSON file
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

// Main function to generate the index
function generateIndex() {
  // Get all .json files except index.json
  const cityFiles = fs.readdirSync(CITIES_DIR)
    .filter(file => file.endsWith('.json') && file !== 'index.json');

  // Initialize continents object
  const continents = {};

  // Process each city file
  cityFiles.forEach(file => {
    const cityData = readJsonFile(path.join(CITIES_DIR, file));
    if (!cityData) return;

    const continent = cityData.continent || 'Other';
    const filename = file.replace('.json', '');

    // Create continent array if it doesn't exist
    if (!continents[continent]) {
      continents[continent] = [];
    }

    // Add city metadata to the appropriate continent
    continents[continent].push({
      name: cityData.city,
      filename,
      continent,
      coordinates: cityData.coordinates || null,
      description: cityData.description || null,
      keywords: cityData.keywords?.slice(0, 3) || []
    });
  });

  // Sort cities within each continent
  Object.values(continents).forEach(cities => {
    cities.sort((a, b) => a.name.localeCompare(b.name));
  });

  // Create the final index structure
  const index = {
    cities: continents
  };

  // Write the index file
  fs.writeFileSync(
    INDEX_FILE,
    JSON.stringify(index, null, 4),
    'utf8'
  );

  console.log('Generated index.json with the following continents:');
  Object.keys(continents).forEach(continent => {
    console.log(`- ${continent}: ${continents[continent].length} cities`);
  });
}

// Run the generator
generateIndex(); 