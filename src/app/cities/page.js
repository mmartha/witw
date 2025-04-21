'use client';

import { Title, Text, Card, Group, Badge, Container, Stack } from '@mantine/core';
import { IconWind, IconMapPin } from '@tabler/icons-react';
import WithShell  from '@/components/shared/WithShell.jsx';
import cityList from '@/lib/cityList';
import classes from './page.module.css';

function CityCard({ name, continent }) {
  // Placeholder data - will be replaced with real API data
  const temp = Math.floor(Math.random() * 30) + 10;
  const windSpeed = Math.floor(Math.random() * 20) + 5;

  return (
    <Card className={classes.card} withBorder padding="lg" radius="md">
      <Card.Section className={classes.cardHeader} p="md">
        <Group justify="space-between">
          <Group>
            <IconMapPin size={20} style={{ color: 'var(--mantine-color-blue-6)' }} />
            <Text fw={600} size="lg">{name}</Text>
          </Group>
          <Badge variant="light" color="blue">Live</Badge>
        </Group>
      </Card.Section>

      <Card.Section className={classes.cardContent} p="md">
        <Stack gap="xs">
          <Text className={classes.temperature}>{temp}°C</Text>
          <Group gap="xs" className={classes.meta}>
            <IconWind size={16} />
            <Text>{windSpeed} km/h</Text>
          </Group>
        </Stack>
      </Card.Section>
    </Card>
  );
}

export default function CitiesPage() {
  // Group cities by continent
  const citiesByContinent = cityList.reduce((acc, city) => {
    if (!acc[city.continent]) {
      acc[city.continent] = [];
    }
    acc[city.continent].push(city);
    return acc;
  }, {});

  return (
    <WithShell sideNavStartOpen={false}>
      <div>
        <div className={classes.hero}>
          <Container size="lg">
            <Title className={classes.heroTitle} order={1}>
              Explore Cities Worldwide 🌍
            </Title>
            <Text className={classes.heroText}>
              Discover real-time weather conditions in major cities across all continents
            </Text>
          </Container>
          <div className={classes.waveWrapper}>
            <div className={classes.wave} />
          </div>
        </div>

        <Container size="lg" py="xl">
          {Object.entries(citiesByContinent).map(([continent, cities]) => (
            <div key={continent} className={classes.continentSection}>
              <Title order={2} className={classes.continentTitle}>
                {continent}
              </Title>
              <div className={classes.grid}>
                {cities.map((city) => (
                  <CityCard key={city.name} name={city.name} continent={continent} />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </div>
    </WithShell>
  );
}
