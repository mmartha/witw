import { Container, Title, Text, SimpleGrid, Card, Group, Badge, rem } from '@mantine/core';
import { IconMapPin, IconTemperature, IconWind } from '@tabler/icons-react';
import { getCityData, getCityFiles } from '@/lib/cities';
import Link from 'next/link';

function CityCard({ city, description, region, keywords, slug }) {

  return (
    <Link href={`/cities/${slug}`} style={{ textDecoration: 'none' }}>
      <Card 
        shadow="sm" 
        padding="lg" 
        radius="md" 
        withBorder
        className="city-card"
        style={{
          transition: 'transform 0.2s, box-shadow 0.2s',
          ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }
        }}
      >
        <Group justify="space-between" mb="md">
          <div>
            <Title order={3} size="h4">{city}</Title>
            <Group gap="xs">
              <IconMapPin size={16} />
              <Text size="sm" c="dimmed" style={{ textTransform: 'capitalize' }}>{region}</Text>
            </Group>
          </div>
        </Group>

        <Text size="sm" lineClamp={2} mb="md">
          {description}
        </Text>

        <Group mt="md" gap="xs">
          {keywords?.slice(0, 3).map(tag => (
            <Badge key={tag} variant="light">{tag}</Badge>
          ))}
        </Group>
      </Card>
    </Link>
  );
}

export default function CitiesPage() {
  const cities = getCityFiles().map(citySlug => ({
    ...getCityData(citySlug),
    slug: citySlug
  }));
  const continents = {};
  
  cities.forEach(city => {
    if (!city) return;
    const continent = city.continent || 'Other';
    if (!continents[continent]) continents[continent] = [];
    continents[continent].push(city);
  });

  return (
    <>
      <div className="hero" style={{ 
        position: 'relative',
        padding: '8rem 0 6rem',
        background: 'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-6) 100%)',
        color: 'white',
        overflow: 'hidden'
      }}>
        <div className="decorative-emoji" style={{
          position: 'absolute',
          right: '10%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: rem(120),
          opacity: 0.2,
          filter: 'blur(2px)',
          pointerEvents: 'none'
        }}>
          🌍
        </div>
        
        <Container size="lg">
          <Title order={1} size="h1">Explore Cities Worldwide</Title>
          <Text size="xl" mt="md" maw={600}>
            Discover real-time weather conditions and climate insights for cities around the globe.
          </Text>
        </Container>

        <div className="wave-divider" style={{
          position: 'absolute',
          bottom: -1,
          left: 0,
          width: '100%',
          height: '4rem',
          background: 'var(--mantine-color-body)',
          clipPath: 'polygon(100% 0, 0 100%, 100% 100%)'
        }} />
      </div>

      <Container size="lg" py="xl">
        {Object.entries(continents).map(([continent, cities]) => (
          <div key={continent} className="continent-section" style={{ marginBottom: '3rem' }}>
            <Title order={2} mb="lg">{continent}</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
              {cities.map(city => (
                <CityCard key={city.name} {...city} />
              ))}
            </SimpleGrid>
          </div>
        ))}
      </Container>
    </>
  );
}
