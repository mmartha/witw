'use client';

import { Container, Title, Text, SimpleGrid, Card, Group } from '@mantine/core';
import WithShell from '@/components/shared/WithShell';
import cityList from '@/lib/cityList';
import { citiesByContinent } from '@/lib/utils';
import { IconMapPin } from '@tabler/icons-react';
import Link from 'next/link';

export default function Cities() {
    const cities = citiesByContinent(cityList);

    return (
        <WithShell>
            <Container size="lg" py="xl">
                <Title order={1} mb="xl">Cities</Title>

                {Object.entries(cities).map(([continent, continentCities]) => (
                    <div key={continent} style={{ marginBottom: '2rem' }}>
                        <Title order={2} mb="md">{continent}</Title>
                        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                            {continentCities.map((city) => (
                                <Card
                                    key={city.filename}
                                    component={Link}
                                    href={`/cities/${city.filename}`}
                                    withBorder
                                    padding="lg"
                                    radius="md"
                                    style={{ 
                                        textDecoration: 'none',
                                        color: 'inherit',
                                        transition: 'transform 150ms ease, box-shadow 150ms ease',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: 'var(--mantine-shadow-md)',
                                        }
                                    }}
                                >
                                    <Group gap="xs" mb="xs">
                                        <IconMapPin size={18} style={{ color: 'var(--mantine-color-blue-6)' }} />
                                        <Text fw={500}>{city.name}</Text>
                                    </Group>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </div>
                ))}
            </Container>
        </WithShell>
    );
}
