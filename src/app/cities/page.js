import { Container, Title, Text, SimpleGrid, Card, Group, Badge, ThemeIcon } from '@mantine/core';
import { IconMapPin, IconCompass } from '@tabler/icons-react';
import Link from 'next/link';
import styles from './page.module.css';

async function getCityIndex() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/data/cities/index.json`, {
    // Add cache options for better performance
    next: {
      revalidate: 3600 // Revalidate every hour
    }
  });
  const data = await res.json();
  return data.cities;
}

export default async function CitiesPage() {
  const cities = await getCityIndex();

  return (
    <>
      {/* Hero Section with Wave Divider */}
      <section className="relative bg-gradient-to-br from-blue-50 via-blue-50 to-cyan-50">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.05) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <Container size="lg" className="relative z-10">
          <div className="py-24 text-center">
            <Group justify="center" mb="xl">
              <ThemeIcon size={56} radius="xl" variant="light" color="blue">
                <IconCompass size={30} />
              </ThemeIcon>
            </Group>
            <Title className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 inline-block text-transparent bg-clip-text">
              Explore Cities Worldwide
            </Title>
            <Text size="xl" c="dimmed" className="max-w-2xl mx-auto">
              Discover real-time weather conditions in cities across the globe. From bustling metropolises to serene coastal towns,
              explore detailed weather insights for each unique location.
            </Text>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px]"
            style={{
              transform: 'rotate(180deg)',
            }}
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Cities Grid Section */}
      <Container size="lg" className="py-16">
        {Object.entries(cities).map(([continent, cityList]) => (
          <div key={continent} className="mb-20 last:mb-0">
            <Group mb="xl" align="center">
              <div className="flex-1">
                <Title order={2} className="text-3xl font-bold">
                  {continent}
                </Title>
                <Text c="dimmed" size="lg" mt={4}>
                  {cityList.length} cities to explore
                </Text>
              </div>
              <Badge size="lg" radius="md" variant="dot" className="px-4 py-3">
                {continent.toUpperCase()}
              </Badge>
            </Group>
            
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
              {cityList.map((city) => (
                <Link 
                  href={`/cities/${city.filename}`} 
                  key={city.filename}
                  className={`${styles.link} ${styles.cityLink}`}
                >
                  <Card 
                    shadow="sm" 
                    padding="lg" 
                    radius="md" 
                    withBorder
                    style={{
                      height: '100%',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      cursor: 'pointer'
                    }}
                    styles={{
                      root: {
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }
                      }
                    }}
                  >
                    <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                      <Group justify="space-between" align="center" wrap="nowrap">
                        <Title order={3} className={styles.cityTitle}>{city.name}</Title>
                        <ThemeIcon variant="light" size="lg" radius="md" color="blue">
                          <IconMapPin size={18} />
                        </ThemeIcon>
                      </Group>
                    </div>

                    <Group mt="md" mb="xs">
                      <Text size="sm" c="dimmed" ff="monospace">
                        {city.coordinates.lat.toFixed(2)}°N, {city.coordinates.lng.toFixed(2)}°E
                      </Text>
                    </Group>
                    
                    <Badge 
                      variant="light" 
                      color="blue" 
                      size="sm" 
                      radius="sm"
                      mt="md"
                    >
                      View Details →
                    </Badge>
                  </Card>
                </Link>
              ))}
            </SimpleGrid>
          </div>
        ))}
      </Container>
    </>
  );
}
