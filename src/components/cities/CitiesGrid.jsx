'use client';

import { Container, Title, SimpleGrid, Card, Group, Badge, Text } from '@mantine/core';
import { IconMapPin, IconTemperature, IconWind } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

function CityCard({ city }) {
  const router = useRouter();
  const temp = Math.floor(Math.random() * 30) + 10; // Will be replaced with real API data
  const windSpeed = Math.floor(Math.random() * 20) + 5;

  return (
    <Card 
      shadow="sm"
      padding="lg" 
      radius="md" 
      withBorder
      onClick={() => router.push(`/cities/${city.filename}`)}
      className="city-card"
    >
      <Group justify="space-between" mb="xs">
        <Group>
          <IconMapPin size={20} style={{ color: 'var(--mantine-color-blue-6)' }} />
          <Text fw={600} size="lg">{city.name}</Text>
        </Group>
        <Badge variant="light" color="blue">Live</Badge>
      </Group>

      <Group gap="lg" mt="md">
        <Group gap="xs">
          <IconTemperature size={16} />
          <Text>{temp}°C</Text>
        </Group>
        <Group gap="xs">
          <IconWind size={16} />
          <Text>{windSpeed} km/h</Text>
        </Group>
      </Group>
    </Card>
  );
}

export default function CitiesGrid({ initialData }) {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => {
      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .fade-in-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .city-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .city-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--mantine-shadow-lg);
        }

        .continent-section:nth-child(odd) {
          background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8));
        }
      `}</style>

      {Object.entries(initialData.cities).map(([continent, cities], index) => (
        <div key={continent} className="continent-section" style={{ padding: '4rem 0' }}>
          <Container size="lg">
            <Title order={2} className="fade-in" mb="xl">{continent}</Title>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
              {cities.map((city, cityIndex) => (
                <div
                  key={city.name}
                  className="fade-in"
                  style={{ '--delay': `${(index * cities.length + cityIndex) * 50}ms` }}
                >
                  <CityCard city={city} />
                </div>
              ))}
            </SimpleGrid>
          </Container>
        </div>
      ))}
    </>
  );
} 