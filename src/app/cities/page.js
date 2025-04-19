import { Container, Title, Text, SimpleGrid, Card, Group } from '@mantine/core';
import cityList from '@/lib/cityList';
import { getCountryFlag } from '@/lib/utils';
import Link from 'next/link';

export default function CitiesPage() {
  return (
    <Container size="lg" py="xl">
      <Title order={1} mb="xl">Explore Cities</Title>
      
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {cityList.map((city) => (
          <Card 
            key={city.filename} 
            component={Link}
            href={`/cities/${city.filename}`}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Group>
              <Text size="xl">{getCountryFlag(city.flag)}</Text>
              <Text fw={500}>{city.name}</Text>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
}
