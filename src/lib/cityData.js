import fs from 'fs';
import path from 'path';

export async function getCityData(filename) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'cities', `${filename}.json`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const rawData = await fs.promises.readFile(filePath, 'utf8');
    const data = JSON.parse(rawData);

    return {
      ...data,
      // Add structured data for SEO
      structuredData: {
        "@context": "https://schema.org",
        "@type": "City",
        "name": data.name,
        "containedInPlace": {
          "@type": "Country",
          "name": data.country
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": data.coordinates?.lat,
          "longitude": data.coordinates?.lng
        },
        ...(data.climate && {
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "Climate Type",
              "value": data.climate.type
            },
            {
              "@type": "PropertyValue",
              "name": "Average Annual Temperature",
              "value": data.climate.averageAnnualTemp
            }
          ]
        })
      }
    };
  } catch (error) {
    console.error(`Error loading data for city ${filename}:`, error);
    return null;
  }
} 