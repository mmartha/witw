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

// Calculate keyword frequencies across all cities
function calculateKeywordFrequencies(cityFiles) {
  const frequencies = new Map();
  
  cityFiles.forEach(file => {
    const cityData = readJsonFile(path.join(CITIES_DIR, file));
    if (!cityData?.keywords) return;
    
    cityData.keywords.forEach(keyword => {
      frequencies.set(keyword, (frequencies.get(keyword) || 0) + 1);
    });
  });
  
  return frequencies;
}

// Select distinctive keywords for a city
function selectDistinctiveKeywords(cityData, frequencies) {
  if (!cityData?.keywords) return [];
  
  // Sort keywords by a scoring function that favors keywords appearing 2-3 times
  const sortedKeywords = cityData.keywords
    .map(keyword => {
      const frequency = frequencies.get(keyword) || 0;
      // Score calculation:
      // - Highest score for keywords appearing 2-3 times
      // - Lower score for unique keywords (1 appearance)
      // - Lowest score for very common keywords (4+ appearances)
      const score = frequency === 0 ? -1 :  // Invalid keywords
                    keyword.includes('climate') ? 0 : // Climate keywords are redundant
                   frequency === 1 ? 1 :    // Unique keywords
                   frequency <= 3 ? 10 :    // Sweet spot (2-3 appearances)
                   10 / frequency;          // Decreasing score for common keywords
      return { keyword, frequency, score };
    })
    .sort((a, b) => b.score - a.score || a.frequency - b.frequency);

  // Take the top 3 keywords
  return sortedKeywords.slice(0, 3).map(k => k.keyword);
}

// Main function to generate the index
function generateIndex() {
  // Get all .json files except index.json
  const cityFiles = fs.readdirSync(CITIES_DIR)
    .filter(file => file.endsWith('.json') && file !== 'index.json');

  // Calculate keyword frequencies first
  const keywordFrequencies = calculateKeywordFrequencies(cityFiles);
  
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
      region: cityData.region || null,
      keywords: selectDistinctiveKeywords(cityData, keywordFrequencies)
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

  // Log statistics about keyword frequencies
  console.log('Generated index.json with the following continents:');
  Object.keys(continents).forEach(continent => {
    console.log(`- ${continent}: ${continents[continent].length} cities`);
  });
  
  // Group keywords by frequency for analysis
  const frequencyGroups = new Map();
  for (const [keyword, freq] of keywordFrequencies.entries()) {
    if (!frequencyGroups.has(freq)) {
      frequencyGroups.set(freq, []);
    }
    frequencyGroups.get(freq).push(keyword);
  }
  
  console.log('\nKeyword frequency analysis:');
  console.log('Keywords appearing 2-3 times (ideal candidates):');
  [2, 3].forEach(freq => {
    const keywords = frequencyGroups.get(freq) || [];
    if (keywords.length > 0) {
      console.log(`  ${freq} times: ${keywords.join(', ')}`);
    }
  });
}

// Run the generator
generateIndex(); 