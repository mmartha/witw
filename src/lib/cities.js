import fs from 'fs';
import path from 'path';

// Get the absolute path to the cities directory using import.meta.url
const citiesDirectory = path.join(path.dirname(path.dirname(new URL(import.meta.url).pathname)), 'data/cities');

// Function to get all city files
export function getCityFiles() {
  try {
    return fs.readdirSync(citiesDirectory)
      .filter(file => file.endsWith('.json') && file !== 'index.json')
      .map(file => file.replace('.json', ''));
  } catch (error) {
    console.error('Error reading city files:', error);
    return [];
  }
}

// Function to get data for a specific city
export function getCityData(cityName) {
  if (!cityName) return null;
  
  const filePath = path.join(citiesDirectory, `${cityName}.json`);
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading city data for ${cityName}:`, error);
    return null;
  }
}

// Function to get all cities data
export function getAllCitiesData() {
  const cityFiles = getCityFiles();
  return cityFiles.reduce((acc, cityName) => {
    const cityData = getCityData(cityName);
    if (cityData) {
      acc[cityName] = cityData;
    }
    return acc;
  }, {});
}

// Export the cities data
export const CITIES = getAllCitiesData();

/**
 * Get data for a specific city by its filename
 */
export function getCityBySlug(slug) {
  return CITIES[slug];
}

/**
 * Get all available city slugs
 */
export function getAllCitySlugs() {
  return Object.keys(CITIES);
}

/**
 * Get basic info for a city (for listings/cards)
 */
export function getCityInfo(slug) {
  const city = CITIES[slug];
  if (!city) return null;
  
  return {
    name: city.city,
    filename: slug,
    coordinates: city.coordinates,
    description: city.description,
    keywords: city.keywords?.slice(0, 3), // First 3 keywords for preview
    continent: city.continent
  };
}

/**
 * Get all cities grouped by continent
 */
export function getCitiesByContinent() {
  // Get info for all cities
  const cities = getAllCitySlugs().map(getCityInfo).filter(Boolean);
  
  // Group cities by continent
  return cities.reduce((acc, city) => {
    const continent = city.continent;
    if (!continent) return acc;
    
    if (!acc[continent]) {
      acc[continent] = [];
    }
    acc[continent].push(city);
    return acc;
  }, {});
}

/**
 * Get metadata for a city page
 */
export function getCityMetadata(slug) {
  const city = getCityBySlug(slug);
  if (!city) return null;
  
  return {
    title: `${city.city} Weather & Climate | Weather in the World`,
    description: city.description || 
      `Explore climate patterns and weather conditions in ${city.city}. Get detailed information about temperature trends, precipitation, and seasonal changes.`,
  };
} 