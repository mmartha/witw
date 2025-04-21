'use client';

import { Container, Title, Text, Group, Paper, Stack, Badge, Grid, SimpleGrid, Accordion, Timeline } from '@mantine/core';
import { IconWind, IconTemperature, IconDroplet, IconSunHigh, IconMapPin, IconChartBar, 
  IconCalendarEvent, IconUsers, IconStar, IconInfoCircle, IconSun, IconMoon, IconUvIndex } from '@tabler/icons-react';

export default function CityContent({ data }) {
  if (!data) {
    return (
      <Container size="lg" py="xl">
        <Title order={1}>City not found</Title>
        <Text>Sorry, we couldn't find the city you're looking for.</Text>
      </Container>
    );
  }

  // Helper function to get season for a given month
  const getSeasonForMonth = (month) => {
    const seasons = {
      winter: [12, 1, 2],
      spring: [3, 4, 5],
      summer: [6, 7, 8],
      autumn: [9, 10, 11]
    };
    
    for (const [season, months] of Object.entries(seasons)) {
      if (months.includes(month)) return season;
    }
    return 'unknown';
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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
              {data.city}
            </Title>
          </Group>
          {data.alt_names && (
            <Text size="lg" mt="md">
              Also known as: {data.alt_names.join(', ')}
            </Text>
          )}
          {data.coordinates && (
            <Text size="sm" mt="xs">
              {data.coordinates.lat}°N, {data.coordinates.lon}°E
            </Text>
          )}
        </Container>
      </div>

      <Container size="lg" py="xl">
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 8 }}>
            {/* City Overview */}
            <Paper shadow="md" radius="lg" p="xl" withBorder mb="lg">
              <Stack gap="xl">
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text size="xl" fw={500}>
                      Overview
                    </Text>
                    {data.keywords && (
                      <Group gap="xs" mt="xs">
                        {data.keywords.slice(0, 3).map(keyword => (
                          <Badge key={keyword} variant="light" color="blue">
                            {keyword}
                          </Badge>
                        ))}
                      </Group>
                    )}
                  </div>
                  <IconChartBar size={48} style={{ color: 'var(--mantine-color-blue-5)' }} />
                </Group>

                {data.description && (
                  <Text>{data.description}</Text>
                )}
              </Stack>
            </Paper>

            {/* Monthly Climate Data */}
            <Paper shadow="md" radius="lg" p="xl" withBorder mb="lg">
              <Stack gap="xl">
                <Text size="xl" fw={500}>Monthly Guide</Text>
                <Accordion variant="separated">
                  {months.map((month) => {
                    const monthData = {
                      visit: data.times_to_visit?.[month],
                      temp: data.temperature?.[month],
                      precip: data.precipitation?.[month],
                      sun: data.sunshine?.[month]
                    };
                    const season = getSeasonForMonth(months.indexOf(month) + 1);
                    
                    return (
                      <Accordion.Item key={month} value={month}>
                        <Accordion.Control>
                          <Group justify="space-between">
                            <Text fw={500}>{month}</Text>
                            <Badge color={
                              season === 'summer' ? 'yellow' :
                              season === 'winter' ? 'blue' :
                              season === 'spring' ? 'green' :
                              'orange'
                            }>{season}</Badge>
                          </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Stack gap="md">
                            {monthData.visit?.description && (
                              <Text size="sm">{monthData.visit.description}</Text>
                            )}

                            <SimpleGrid cols={{ base: 1, sm: 2 }}>
                              {/* Temperature Card */}
                              <Paper withBorder p="md" radius="md">
                                <Stack gap="xs">
                                  <Text size="sm" c="dimmed">Temperature</Text>
                                  <Group>
                                    <IconTemperature size={20} style={{ color: 'var(--mantine-color-red-5)' }} />
                                    <Text>High: {monthData.temp?.high}°C</Text>
                                  </Group>
                                  <Group>
                                    <IconTemperature size={20} style={{ color: 'var(--mantine-color-blue-5)' }} />
                                    <Text>Low: {monthData.temp?.low}°C</Text>
                                  </Group>
                                  <Text size="xs" c="dimmed">
                                    Record: {monthData.temp?.record_low}°C to {monthData.temp?.record_high}°C
                                  </Text>
                                </Stack>
                              </Paper>

                              {/* Precipitation Card */}
                              <Paper withBorder p="md" radius="md">
                                <Stack gap="xs">
                                  <Text size="sm" c="dimmed">Precipitation</Text>
                                  <Group>
                                    <IconDroplet size={20} style={{ color: 'var(--mantine-color-blue-5)' }} />
                                    <Text>{monthData.precip?.mm}mm</Text>
                                  </Group>
                                  <Text size="sm">
                                    {monthData.precip?.days} rainy days
                                  </Text>
                                  {monthData.precip?.snow_days > 0 && (
                                    <Text size="sm" c="dimmed">
                                      Possible snow: {monthData.precip.snow_days} days
                                    </Text>
                                  )}
                                </Stack>
                              </Paper>
                            </SimpleGrid>

                            {/* Sunshine Info */}
                            {monthData.sun && (
                              <Paper withBorder p="md" radius="md">
                                <Stack gap="xs">
                                  <Group>
                                    <IconSun size={20} style={{ color: 'var(--mantine-color-yellow-5)' }} />
                                    <Text fw={500}>Sunshine</Text>
                                  </Group>
                                  <SimpleGrid cols={2}>
                                    <Group gap="xs">
                                      <IconSun size={16} />
                                      <Text size="sm">{monthData.sun.daily_hours}h daily</Text>
                                    </Group>
                                    <Group gap="xs">
                                      <IconMoon size={16} />
                                      <Text size="sm">{monthData.sun.daylight_hours}h daylight</Text>
                                    </Group>
                                    <Group gap="xs">
                                      <IconUvIndex size={16} />
                                      <Text size="sm">UV Index: {monthData.sun.uv_index}</Text>
                                    </Group>
                                    <Text size="sm">{monthData.sun.percentage}% sunny</Text>
                                  </SimpleGrid>
                                </Stack>
                              </Paper>
                            )}

                            {/* Events and Activities */}
                            {monthData.visit?.events && monthData.visit.events.length > 0 && (
                              <div>
                                <Group gap="xs" mb="xs">
                                  <IconCalendarEvent size={20} style={{ color: 'var(--mantine-color-grape-5)' }} />
                                  <Text fw={500}>Events</Text>
                                </Group>
                                <Timeline active={-1} bulletSize={24} lineWidth={2}>
                                  {monthData.visit.events.map((event, index) => (
                                    <Timeline.Item key={index} bullet={<IconStar size={12} />} title={event} />
                                  ))}
                                </Timeline>
                              </div>
                            )}

                            {monthData.visit?.activities && (
                              <div>
                                <Group gap="xs" mb="xs">
                                  <IconUsers size={20} style={{ color: 'var(--mantine-color-indigo-5)' }} />
                                  <Text fw={500}>Activities</Text>
                                </Group>
                                <Stack gap="xs">
                                  {monthData.visit.activities.map((activity, index) => (
                                    <Text key={index} size="sm">• {activity}</Text>
                                  ))}
                                </Stack>
                              </div>
                            )}

                            {monthData.visit?.local_tips && (
                              <Paper withBorder p="md" radius="md" bg="var(--mantine-color-blue-0)">
                                <Text fw={500} mb="xs">Local Tips</Text>
                                <Stack gap="xs">
                                  {monthData.visit.local_tips.map((tip, index) => (
                                    <Text key={index} size="sm">• {tip}</Text>
                                  ))}
                                </Stack>
                              </Paper>
                            )}

                            <Group gap="md">
                              {monthData.sun && (
                                <Badge 
                                  leftSection={<IconSunHigh size={14} />}
                                  variant="light"
                                >
                                  {monthData.sun.monthly_hours}h monthly sunshine
                                </Badge>
                              )}
                              {monthData.visit?.crowds && (
                                <Badge 
                                  leftSection={<IconUsers size={14} />}
                                  variant="light"
                                  color={
                                    monthData.visit.crowds === 'High' ? 'red' :
                                    monthData.visit.crowds === 'Medium' ? 'yellow' :
                                    'green'
                                  }
                                >
                                  {monthData.visit.crowds} crowds
                                </Badge>
                              )}
                            </Group>
                          </Stack>
                        </Accordion.Panel>
                      </Accordion.Item>
                    );
                  })}
                </Accordion>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            {/* Keywords */}
            {data.keywords && (
              <Paper shadow="md" radius="lg" p="xl" withBorder mb="lg">
                <Stack gap="md">
                  <Text size="xl" fw={500}>Highlights</Text>
                  <Group gap="xs">
                    {data.keywords.map(keyword => (
                      <Badge key={keyword} variant="light">
                        {keyword}
                      </Badge>
                    ))}
                  </Group>
                </Stack>
              </Paper>
            )}

            {/* Best Times */}
            <Paper shadow="md" radius="lg" p="xl" withBorder>
              <Stack gap="md">
                <Group gap="xs">
                  <IconInfoCircle size={24} style={{ color: 'var(--mantine-color-green-5)' }} />
                  <Text size="xl" fw={500}>Best Times to Visit</Text>
                </Group>
                <Stack gap="xs">
                  {months.filter(month => 
                    data.times_to_visit?.[month]?.crowds === 'Low'
                  ).map(month => (
                    <Badge key={month} variant="dot" color="green">
                      {month}
                    </Badge>
                  ))}
                </Stack>
                <Text size="sm" c="dimmed">
                  Based on crowd levels and weather conditions
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
} 