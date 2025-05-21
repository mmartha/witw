import { getCityData, getCityFiles } from '@/lib/cities';
import { notFound } from 'next/navigation';
import ComparisonWrapper from '@/components/wrappers/ComparisonWrapper';
import Head from 'next/head';


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

  const pageUrl = `https://www.planet-groov.net/compare/${city1}/${city2}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `Monthly Climate Comparison: ${city1Data.city} vs ${city2Data.city}`,
    "description": `Average temperature and rainfall comparison between ${city1Data.city} and ${city2Data.city}.`,
    "url": pageUrl,
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "Average Temperature",
        "unitText": "°C"
      },
      {
        "@type": "PropertyValue",
        "name": "Rainfall",
        "unitText": "mm"
      }
    ]
  };


  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <ComparisonWrapper 
        data1={city1Data} 
        data2={city2Data}
      />
    </>
  );
} 