import { getCityData, getCityFiles } from '@/lib/cities';
import { notFound } from 'next/navigation';
import ComparisonWrapper from '@/components/shared/ComparisonWrapper';

// Generate static params for all city combinations
export async function generateStaticParams() {
  const cityFiles = getCityFiles();
  const params = [];
  
  // Generate all possible combinations
  cityFiles.forEach((city1) => {
    cityFiles.forEach((city2) => {
      if (city1 !== city2) {
        params.push({ city1, city2 });
      }
    });
  });
  
  return params;
}

// Generate metadata for the comparison page
export async function generateMetadata({ params }) {
  const { city1, city2 } = params;
  const city1Data = getCityData(city1);
  const city2Data = getCityData(city2);
  
  if (!city1Data || !city2Data) {
    return { title: 'Cities Not Found' };
  }

  return {
    title: `Compare ${city1Data.city} vs ${city2Data.city} - Weather in the World`,
    description: `Compare weather conditions, climate data, and city characteristics between ${city1Data.city} and ${city2Data.city}.`,
  };
}

export default function CityComparePage({ params }) {
  const { city1, city2 } = params;
  
  const [city1Data, city2Data] = [
    getCityData(city1),
    getCityData(city2)
  ];

  if (!city1Data || !city2Data) {
    notFound();
  }

  return (
    <ComparisonWrapper 
      data1={city1Data} 
      data2={city2Data}
    />
  );
} 