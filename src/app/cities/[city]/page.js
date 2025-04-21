import { headers } from 'next/headers';
import CityContent from '@/components/cities/CityContent';

// Generate static pages for all cities at build time
const baseUrl = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'; // fallback for local dev

export async function generateStaticParams() {
  const response = await fetch(`${baseUrl}/data/cities/index.json`);
  const data = await response.json();
  
  return Object.values(data.cities)
    .flat()
    .map((city) => ({
      city: city.filename,
    }));
}

// Fetch city data
async function getCityData(cityName) {
  const headersList = headers();
  const domain = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
  const [indexResponse, cityResponse] = await Promise.all([
    fetch(`${protocol}://${domain}/data/cities/index.json`),
    fetch(`${protocol}://${domain}/data/cities/${cityName}.json`)
  ]);

  const [indexData, cityData] = await Promise.all([
    indexResponse.json(),
    cityResponse.json()
  ]);

  const cityInfo = Object.values(indexData.cities)
    .flat()
    .find(c => c.filename === cityName);

  return {
    ...cityData,
    cityInfo
  };
}

// Generate metadata for each city page
export async function generateMetadata({ params }) {
  const data = await getCityData(params.city);
  const cityName = data.cityInfo?.name || params.city;

  return {
    title: `${cityName} Weather & Climate | Weather in the World`,
    description: data.climate?.summary || 
      `Explore climate patterns and weather conditions in ${cityName}. Get detailed information about temperature trends, precipitation, and seasonal changes.`,
  };
}

export default async function CityPage({ params }) {
  const data = await getCityData(params.city);
  return <CityContent data={data} />;
}
