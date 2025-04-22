'use server';

import { notFound } from 'next/navigation';
import { Container, Title, Text, Group, Badge, Card, Stack } from '@mantine/core';
import { getCityData, getCityFiles } from '@/lib/cities';
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

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function compareMonthlyData(city1Data, city2Data, month) {
  return {
    city1: {
      description: city1Data.times_to_visit[month]?.description || '',
      events: city1Data.times_to_visit[month]?.events || [],
      crowds: city1Data.times_to_visit[month]?.crowds || 'No data',
      activities: city1Data.times_to_visit[month]?.activities || [],
      local_tips: city1Data.times_to_visit[month]?.local_tips || []
    },
    city2: {
      description: city2Data.times_to_visit[month]?.description || '',
      events: city2Data.times_to_visit[month]?.events || [],
      crowds: city2Data.times_to_visit[month]?.crowds || 'No data',
      activities: city2Data.times_to_visit[month]?.activities || [],
      local_tips: city2Data.times_to_visit[month]?.local_tips || []
    }
  };
}

function CityKeywords({ keywords }) {
  return (
    <Group gap="xs" wrap="wrap">
      {keywords.map((keyword, index) => (
        <Badge key={index} variant="light" size="lg">
          {keyword}
        </Badge>
      ))}
    </Group>
  );
}

function MonthlyComparison({ month, data }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
      <Title order={3} mb="md">{month}</Title>
      <Group grow align="flex-start">
        <Stack>
          <Text fw={500} size="sm" c="dimmed">{data.city1.description}</Text>
          <Text fw={500}>Events:</Text>
          <ul className={styles.list}>
            {data.city1.events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
          <Text fw={500}>Activities:</Text>
          <ul className={styles.list}>
            {data.city1.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
          <Text fw={500}>Local Tips:</Text>
          <ul className={styles.list}>
            {data.city1.local_tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <Text fw={500}>Crowds: {data.city1.crowds}</Text>
        </Stack>
        <Stack>
          <Text fw={500} size="sm" c="dimmed">{data.city2.description}</Text>
          <Text fw={500}>Events:</Text>
          <ul className={styles.list}>
            {data.city2.events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
          <Text fw={500}>Activities:</Text>
          <ul className={styles.list}>
            {data.city2.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
          <Text fw={500}>Local Tips:</Text>
          <ul className={styles.list}>
            {data.city2.local_tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <Text fw={500}>Crowds: {data.city2.crowds}</Text>
        </Stack>
      </Group>
    </Card>
  );
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

  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">
        Compare: {city1Data.city} vs {city2Data.city}
      </Title>
      
      <Group grow mb="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">{city1Data.city}</Title>
          <Text mb="md">{city1Data.description}</Text>
          <CityKeywords keywords={city1Data.keywords} />
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={2} mb="md">{city2Data.city}</Title>
          <Text mb="md">{city2Data.description}</Text>
          <CityKeywords keywords={city2Data.keywords} />
        </Card>
      </Group>

      {months.map(month => {
        const monthlyData = compareMonthlyData(city1Data, city2Data, month);
        return (
          <MonthlyComparison
            key={month}
            month={month}
            data={monthlyData}
          />
        );
      })}
    </Container>
  );
} 