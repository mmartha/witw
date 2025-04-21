'use client';

import { Container, Title, Text, Group, Paper, Stack, Badge, Grid } from '@mantine/core';
import { IconWind, IconTemperature, IconDroplet, IconSunHigh, IconMapPin, IconChartBar } from '@tabler/icons-react';

export default function CityContent({ data }) {
  if (!data.cityInfo) {
    return (
      <Container size="lg" py="xl">
        <Title order={1}>City not found</Title>
        <Text>Sorry, we couldn't find the city you're looking for.</Text>
      </Container>
    );
  }

  return (
    <div>
      <div style={{ 
        position: 'relative',
        background: 'var(--mantine-color-blue-6)',
        padding: '6rem 0 4rem',
        color: 'white',
        marginBottom: '2rem'
      }}>
        <Container size="lg">
          <Group align="center" gap="xs">
            <IconMapPin size={32} style={{ color: 'var(--mantine-color-white)' }} />
            <Title order={1}>
              {data.cityInfo.name}
            </Title>
          </Group>
          <Text size="lg" mt="md">
            {data.cityInfo.continent}
          </Text>
          {data.cityInfo.coordinates && (
            <Text size="sm" mt="xs">
              {data.cityInfo.coordinates.lat}°N, {data.cityInfo.coordinates.lng}°E
            </Text>
          )}
        </Container>
      </div>

      <Container size="lg" py="xl">
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            {/* Climate Overview */}
            <Paper shadow="md" radius="lg" p="xl" withBorder mb="lg">
              <Stack gap="xl">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="xl" fw={500}>
                      Climate Overview
                    </Text>
                    {data.climate?.type && (
                      <Badge size="lg" variant="light" color="blue" mt="xs">
                        {data.climate.type}
                      </Badge>
                    )}
                  </div>
                  <IconChartBar size={48} style={{ color: 'var(--mantine-color-blue-5)' }} />
                </Group>

                {data.climate?.summary && (
                  <Text>{data.climate.summary}</Text>
                )}

                {data.climate?.seasons && (
                  <Stack gap="md">
                    <Text fw={500}>Seasonal Patterns</Text>
                    {Object.entries(data.climate.seasons).map(([season, info]) => (
                      <Paper key={season} withBorder p="md" radius="md">
                        <Group gap="xs">
                          <IconTemperature size={24} style={{ color: 'var(--mantine-color-blue-5)' }} />
                          <div>
                            <Text fw={500} size="lg" transform="capitalize">{season}</Text>
                            <Text size="sm">{info}</Text>
                          </div>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Paper>

            {/* Climate Statistics */}
            <Paper shadow="md" radius="lg" p="xl" withBorder>
              <Stack gap="xl">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="xl" fw={500}>
                      Climate Statistics
                    </Text>
                  </div>
                  <IconSunHigh size={48} style={{ color: 'var(--mantine-color-yellow-5)' }} />
                </Group>

                <Group grow gap="lg">
                  {data.climate?.statistics?.averageTemperature && (
                    <Paper withBorder p="md" radius="md">
                      <Group gap="xs">
                        <IconTemperature size={24} style={{ color: 'var(--mantine-color-red-5)' }} />
                        <div>
                          <Text size="xs" c="dimmed">Average Temperature</Text>
                          <Text fw={500} size="lg">{data.climate.statistics.averageTemperature}</Text>
                        </div>
                      </Group>
                    </Paper>
                  )}

                  {data.climate?.statistics?.averageWindSpeed && (
                    <Paper withBorder p="md" radius="md">
                      <Group gap="xs">
                        <IconWind size={24} style={{ color: 'var(--mantine-color-blue-5)' }} />
                        <div>
                          <Text size="xs" c="dimmed">Average Wind Speed</Text>
                          <Text fw={500} size="lg">{data.climate.statistics.averageWindSpeed}</Text>
                        </div>
                      </Group>
                    </Paper>
                  )}

                  {data.climate?.statistics?.averageHumidity && (
                    <Paper withBorder p="md" radius="md">
                      <Group gap="xs">
                        <IconDroplet size={24} style={{ color: 'var(--mantine-color-cyan-5)' }} />
                        <div>
                          <Text size="xs" c="dimmed">Average Humidity</Text>
                          <Text fw={500} size="lg">{data.climate.statistics.averageHumidity}</Text>
                        </div>
                      </Group>
                    </Paper>
                  )}
                </Group>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            {/* Additional Climate Statistics */}
            {data.climate?.statistics && (
              <Paper shadow="md" radius="lg" p="xl" withBorder>
                <Stack gap="xl">
                  <Text size="xl" fw={500}>
                    Additional Statistics
                  </Text>
                  {Object.entries(data.climate.statistics)
                    .filter(([key]) => !['averageTemperature', 'averageWindSpeed', 'averageHumidity'].includes(key))
                    .map(([key, value]) => (
                      <Paper key={key} withBorder p="md" radius="md">
                        <Text size="sm" c="dimmed" transform="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Text>
                        <Text fw={500}>{value}</Text>
                      </Paper>
                    ))}
                </Stack>
              </Paper>
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
} 