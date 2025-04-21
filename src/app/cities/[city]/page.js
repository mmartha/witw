import { Container, Title, Text, Group, Paper, Stack, Badge } from '@mantine/core';
import { IconWind, IconTemperature, IconDroplet, IconSunHigh, IconMapPin } from '@tabler/icons-react';
import cityList from '@/lib/cityList';
import classes from './page.module.css';

// Generate static pages for all cities at build time
export function generateStaticParams() {
  return cityList.map((city) => ({
    city: city.filename.toLowerCase(),
  }));
}

// Generate metadata for each city page
export function generateMetadata({ params }) {
  const cityData = cityList.find(
    (c) => c.filename.toLowerCase() === decodeURIComponent(params.city).toLowerCase()
  );

  if (!cityData) {
    return {
      title: 'City Not Found | Weather in the World',
      description: 'The requested city could not be found.',
    };
  }

  return {
    title: `${cityData.name} Weather | Weather in the World`,
    description: `Current weather conditions and forecast for ${cityData.name}. Get real-time updates on temperature, wind speed, and more.`,
    openGraph: {
      title: `${cityData.name} Weather | Weather in the World`,
      description: `Current weather conditions and forecast for ${cityData.name}. Get real-time updates on temperature, wind speed, and more.`,
      type: 'website',
    },
  };
}

// This is now a Server Component
export default function CityPage({ params }) {
  const cityData = cityList.find(
    (c) => c.filename.toLowerCase() === decodeURIComponent(params.city).toLowerCase()
  );

  // This would typically come from your weather API
  // For now, using static data for demonstration
  const weatherData = {
    temperature: 23,
    windSpeed: 12,
    humidity: 65,
    condition: 'Sunny',
  };

  if (!cityData) {
    return (
      <Container size="lg" py="xl">
        <Title order={1}>City not found</Title>
        <Text>Sorry, we couldn't find the city you're looking for.</Text>
      </Container>
    );
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.hero}>
        <Container size="lg">
          <div className={classes.heroContent}>
            <Group align="center" gap="xs">
              <IconMapPin size={32} style={{ color: 'var(--mantine-color-white)' }} />
              <Title className={classes.title} order={1}>
                {cityData.name}
              </Title>
            </Group>
            <Text className={classes.subtitle}>
              {cityData.continent}
            </Text>
          </div>
        </Container>
        <div className={classes.overlay} />
      </div>

      <Container size="lg" py="xl">
        <div className={classes.content}>
          <Paper shadow="md" radius="lg" p="xl" className={classes.weatherCard}>
            <Stack gap="xl">
              <Group justify="space-between" align="flex-start">
                <div>
                  <Text size="xl" fw={500} className={classes.weatherTitle}>
                    Current Weather
                  </Text>
                  <Badge size="lg" variant="light" color="blue" mt="xs">
                    {weatherData.condition}
                  </Badge>
                </div>
                <IconSunHigh size={48} style={{ color: 'var(--mantine-color-yellow-5)' }} />
              </Group>

              <Group grow gap="lg">
                <Paper withBorder p="md" radius="md">
                  <Group gap="xs">
                    <IconTemperature size={24} style={{ color: 'var(--mantine-color-red-5)' }} />
                    <div>
                      <Text size="xs" c="dimmed">Temperature</Text>
                      <Text fw={500} size="lg">{weatherData.temperature}°C</Text>
                    </div>
                  </Group>
                </Paper>

                <Paper withBorder p="md" radius="md">
                  <Group gap="xs">
                    <IconWind size={24} style={{ color: 'var(--mantine-color-blue-5)' }} />
                    <div>
                      <Text size="xs" c="dimmed">Wind Speed</Text>
                      <Text fw={500} size="lg">{weatherData.windSpeed} km/h</Text>
                    </div>
                  </Group>
                </Paper>

                <Paper withBorder p="md" radius="md">
                  <Group gap="xs">
                    <IconDroplet size={24} style={{ color: 'var(--mantine-color-cyan-5)' }} />
                    <div>
                      <Text size="xs" c="dimmed">Humidity</Text>
                      <Text fw={500} size="lg">{weatherData.humidity}%</Text>
                    </div>
                  </Group>
                </Paper>
              </Group>

              <Stack gap="md">
                <Text fw={500}>Forecast</Text>
                <Text size="sm" c="dimmed">
                  Detailed forecast information will be available soon. Stay tuned for updates
                  about temperature trends, precipitation chances, and wind conditions.
                </Text>
              </Stack>
            </Stack>
          </Paper>
        </div>
      </Container>
    </div>
  );
}
