import CityContent from '@/components/cities/CityContent';
import { getCityFiles, getCityData } from '@/lib/cities';

// Generate static paths for all cities at build time
export async function generateStaticParams() {
  return getCityFiles().map(city => ({ city }));
}

// Generate metadata for each city page
export async function generateMetadata({ params }) {
  const cityData = getCityData(params.city);
  if (!cityData) return { title: 'City Not Found' };

  return {
    title: `${cityData.name} Weather - Weather Worldwide`,
    description: `Current weather and climate information for ${cityData.name}. ${cityData.climate?.overview || ''}`
  };
}

export default function CityPage({ params }) {
  const cityData = getCityData(params.city);
  if (!cityData) return <div>City not found</div>;
  
  return <CityContent city={cityData} />;
}
