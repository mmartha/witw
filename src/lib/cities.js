import citiesData from '@/data/cities/index.json';

// Function to get all city files
export function getCityFiles() {
  // Extract all city filenames from the nested structure
  return Object.values(citiesData.cities)
    .flatMap(continentCities => 
      continentCities.map(city => city.filename)
    );
}

// Function to get data for a specific city
export function getCityData(citySlug) {
  if (!citySlug) return null;
  try {
    const cityData = require(`@/data/cities/${citySlug}.json`);
    // Find the city metadata from the index
    const cityMetadata = Object.values(citiesData.cities)
      .flatMap(continentCities => continentCities)
      .find(city => city.filename === citySlug);
    
    // Merge the metadata with the full city data
    return {
      ...cityData,
      ...cityMetadata
    };
  } catch (error) {
    console.error(`Error loading city data for ${citySlug}:`, error);
    return null;
  }
}

// Function to get metadata for a city page
export function getCityMetadata(city) {
  if (!city) return null;
  
  return {
    title: `${city.name} Weather & Climate | Weather in the World`,
    description: city.description || 
      `Explore climate patterns and weather conditions in ${city.name}. Get detailed information about temperature trends, precipitation, and seasonal changes.`,
  };
}

// Helper function to determine climate type (simplified version)
export function getClimateType(cityData) {
  if (!cityData.weather) return null;
  
  // Calculate average temperature and precipitation
  const monthlyData = Object.values(cityData.weather).map(weather => ({
    avgTemp: weather.temperature ? 
      (weather.temperature.high + weather.temperature.low) / 2 : null,
    precipitation: weather.precipitation?.mm || 0
  })).filter(data => data.avgTemp !== null);

  if (monthlyData.length === 0) return null;

  const avgTemp = monthlyData.reduce((sum, data) => sum + data.avgTemp, 0) / monthlyData.length;
  const totalPrecip = monthlyData.reduce((sum, data) => sum + data.precipitation, 0);
  
  if (avgTemp > 25 && totalPrecip > 1500) return 'tropical';
  if (avgTemp > 18 && totalPrecip < 500) return 'arid';
  if (avgTemp > 20 && totalPrecip > 2000) return 'rainforest';
  return 'temperate';
} 