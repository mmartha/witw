import { Container, Title, Text, Stack, Paper } from '@mantine/core';
import cityList from '@/lib/cityList';
import { notFound } from 'next/navigation';
import { getCountryFlag } from '@/lib/utils';

export function generateStaticParams() {
  return cityList.map((city) => ({
    city: city.filename,
  }));
}

export function generateMetadata({ params }) {
  const city = cityList.find((c) => c.filename === params.city);
  
  if (!city) {
    return {
      title: 'City Not Found',
    };
  }

  return {
    title: `${city.name} Weather & Climate | Weather in the World`,
    description: `Explore the climate and weather patterns in ${city.name}. Get detailed information about temperature, rainfall, and seasonal changes.`,
  };
}

export default function CityPage({ params }) {
  const city = cityList.find((c) => c.filename === params.city);

  if (!city) {
    notFound();
  }

  return (
    <Container size="lg">
      <Stack gap="md">
        <Title order={1}>{getCountryFlag(city.flag)} {city.name}</Title>
        <Paper shadow="sm" p="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Climate Overview</Title>
            <Text>Average Temperature: 24°C</Text>
            <Text>Annual Rainfall: 450mm</Text>
            <Text>Sunny Days per Year: 300</Text>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
