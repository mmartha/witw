'use server';

import { notFound } from 'next/navigation';
import { Container, Title, Text } from '@mantine/core';
import { getCityData, getCityFiles } from '@/lib/cities';
import ClimateCompare from '@/components/charts/ClimateCompare';
import WithShell from '@/components/shared/WithShell';
import styles from './page.module.css';

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
  
  console.log(`Pre-generating ${params.length} city comparisons`);
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

export default async function ComparePage({ params }) {
  const { city1, city2 } = params;
  
  const [city1Data, city2Data] = [
    getCityData(city1),
    getCityData(city2)
  ];

  if (!city1Data || !city2Data) {
    notFound();
  }

  const city1Color = 'rgba(255, 0, 0, 0.5)';
  const city2Color = 'rgba(0, 0, 255, 0.5)';

  const content = (
    <Container size="lg" py="xl" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Title order={1} mb="xl" c={city1Color}>
          {city1Data.city}
        </Title>
        <Title order={1} mb="xl">&nbsp;vs.&nbsp;</Title>
        <Title order={1} mb="xl" c={city2Color}>
          {city2Data.city}
        </Title>
      </Container>
      <ClimateCompare data1={city1Data} data2={city2Data} city1Color={city1Color} city2Color={city2Color} />
    </Container>
  );

  return (
    <WithShell sideNavStartOpen={true}>
      {content}
    </WithShell>
  );
} 