'use client';

import { Container, Title, Text, Group, Paper, Stack, Badge, Grid, SimpleGrid, Accordion, Timeline } from '@mantine/core';
import { IconWind, IconTemperature, IconDroplet, IconSunHigh, IconMapPin, IconChartBar, 
  IconCalendarEvent, IconUsers, IconStar, IconInfoCircle, IconSun, IconMoon, IconUvIndex } from '@tabler/icons-react';

export default function CityContent({ city }) {
  if (!city) {
    return (
      <Container size="lg" py="xl">
        <Title order={1}>City not found</Title>
        <Text>Sorry, we couldn't find the city you're looking for.</Text>
      </Container>
    );
  }

  // Helper function to determine the climate type and seasons for a location
  const getClimateType = () => {
    if (!city.coordinates || !city.weather) return 'temperate';
    
    const lat = city.coordinates.lat;
    const isNorthernHemisphere = lat > 0;
    
    // Calculate average temperatures and precipitation for each month
    const monthlyData = months.map(month => {
      const weather = city.weather[month];
      if (!weather) return null;
      
      return {
        month,
        avgTemp: weather.temperature ? 
          (weather.temperature.high + weather.temperature.low) / 2 : null,
        precipitation: weather.precipitation?.mm || 0,
        humidity: weather.humidity?.average || 0
      };
    }).filter(Boolean);

    if (monthlyData.length === 0) return 'temperate';

    // Find temperature and precipitation patterns
    const temps = monthlyData.map(d => d.avgTemp).filter(Boolean);
    const precip = monthlyData.map(d => d.precipitation);
    
    const avgTemp = temps.reduce((a, b) => a + b, 0) / temps.length;
    const tempRange = Math.max(...temps) - Math.min(...temps);
    const totalPrecip = precip.reduce((a, b) => a + b, 0);
    const maxPrecip = Math.max(...precip);
    const minPrecip = Math.min(...precip);
    const precipRange = maxPrecip - minPrecip;

    // Determine climate type
    if (avgTemp > 25 && precipRange > 200) {
      return 'tropical';
    } else if (avgTemp > 18 && totalPrecip < 500) {
      return 'arid';
    } else if (tempRange < 10 && totalPrecip > 1500) {
      return 'rainforest';
    } else if (tempRange > 20) {
      return isNorthernHemisphere ? 'temperate-north' : 'temperate-south';
    } else {
      return 'temperate';
    }
  };

  // Helper function to get season for a given month based on climate type
  const getSeasonForMonth = (month) => {
    const climateType = getClimateType();
    const monthIndex = months.indexOf(month);
    const weather = city.weather?.[month];
    
    if (!weather) return { name: 'Unknown', color: 'gray' };

    // Calculate if this is a wet month
    const isWetMonth = weather.precipitation?.mm > 100;
    
    // Helper to get temperature category
    const getTempCategory = () => {
      const avgTemp = (weather.temperature?.high + weather.temperature?.low) / 2;
      if (avgTemp > 28) return 'hot';
      if (avgTemp > 20) return 'warm';
      if (avgTemp > 10) return 'mild';
      return 'cool';
    };

    switch (climateType) {
      case 'tropical':
        return isWetMonth 
          ? { name: 'Wet', color: 'blue' }
          : { name: 'Dry', color: 'yellow' };
        
      case 'arid':
        const tempCategory = getTempCategory();
        return {
          name: tempCategory === 'hot' ? 'Hot' : tempCategory === 'warm' ? 'Warm' : 'Cool',
          color: tempCategory === 'hot' ? 'red' : tempCategory === 'warm' ? 'yellow' : 'blue'
        };
        
      case 'rainforest':
        return isWetMonth
          ? { name: 'Monsoon', color: 'blue' }
          : { name: 'Inter-monsoon', color: 'teal' };
        
      case 'temperate-north':
        if (monthIndex >= 2 && monthIndex <= 4) return { name: 'Spring', color: 'green' };
        if (monthIndex >= 5 && monthIndex <= 7) return { name: 'Summer', color: 'yellow' };
        if (monthIndex >= 8 && monthIndex <= 10) return { name: 'Autumn', color: 'orange' };
        return { name: 'Winter', color: 'blue' };
        
      case 'temperate-south':
        if (monthIndex >= 2 && monthIndex <= 4) return { name: 'Autumn', color: 'orange' };
        if (monthIndex >= 5 && monthIndex <= 7) return { name: 'Winter', color: 'blue' };
        if (monthIndex >= 8 && monthIndex <= 10) return { name: 'Spring', color: 'green' };
        return { name: 'Summer', color: 'yellow' };
        
      default:
        // Fallback to temperature-based season
        const tempLevel = getTempCategory();
        return {
          name: tempLevel === 'hot' ? 'Hot' : tempLevel === 'warm' ? 'Warm' : 
                tempLevel === 'mild' ? 'Mild' : 'Cool',
          color: tempLevel === 'hot' ? 'red' : tempLevel === 'warm' ? 'yellow' : 
                 tempLevel === 'mild' ? 'green' : 'blue'
        };
    }
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
              {city.city}
            </Title>
          </Group>
          {city.coordinates && (
            <Text size="lg" mt="xs">
              {city.coordinates.lat}°N, {city.coordinates.lon}°E
            </Text>
          )}
          {city.alt_names && (
            <Text size="xs" mt="md" fs="italic">
              {city.alt_names.join(', ')}
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
                    {city.keywords && (
                      <Group gap="xs" mt="xs">
                        {city.keywords.slice(0, 3).map(keyword => (
                          <Badge key={keyword} variant="light" color="blue">
                            {keyword}
                          </Badge>
                        ))}
                      </Group>
                    )}
                  </div>
                  <IconChartBar size={48} style={{ color: 'var(--mantine-color-blue-5)' }} />
                </Group>

                {city.description && (
                  <Text>{city.description}</Text>
                )}
              </Stack>
            </Paper>

            {/* Monthly Climate Data */}
            <Paper shadow="md" radius="lg" p="xl" withBorder mb="lg">
              <Stack gap="xl">
                <Group justify="space-between">
                  <Text size="xl" fw={500}>Monthly Guide</Text>
                  <Badge variant="light" color="blue">
                    {getClimateType().split('-')[0].charAt(0).toUpperCase() + getClimateType().split('-')[0].slice(1)} Climate
                  </Badge>
                </Group>
                <Accordion variant="separated">
                  {months.map((month) => {
                    const monthData = {
                      visit: city.times_to_visit?.[month],
                      weather: city.weather?.[month]
                    };
                    const season = getSeasonForMonth(month);
                    
                    return (
                      <Accordion.Item key={month} value={month}>
                        <Accordion.Control>
                          <Group justify="space-between">
                            <Text fw={500}>{month}</Text>
                            <Badge color={season.color}>{season.name}</Badge>
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
                                    <Text>High: {monthData.weather?.temperature?.high}°C</Text>
                                  </Group>
                                  <Group>
                                    <IconTemperature size={20} style={{ color: 'var(--mantine-color-blue-5)' }} />
                                    <Text>Low: {monthData.weather?.temperature?.low}°C</Text>
                                  </Group>
                                  <Text size="xs" c="dimmed">
                                    Record: {monthData.weather?.temperature?.record_low}°C to {monthData.weather?.temperature?.record_high}°C
                                  </Text>
                                </Stack>
                              </Paper>

                              {/* Precipitation Card */}
                              <Paper withBorder p="md" radius="md">
                                <Stack gap="xs">
                                  <Text size="sm" c="dimmed">Precipitation</Text>
                                  <Group>
                                    <IconDroplet size={20} style={{ color: 'var(--mantine-color-blue-5)' }} />
                                    <Text>{monthData.weather?.precipitation?.mm}mm</Text>
                                  </Group>
                                  <Text size="sm">
                                    {monthData.weather?.precipitation?.days} rainy days
                                  </Text>
                                  {monthData.weather?.precipitation?.snow_days > 0 && (
                                    <Text size="sm" c="dimmed">
                                      Possible snow: {monthData.weather.precipitation.snow_days} days
                                    </Text>
                                  )}
                                </Stack>
                              </Paper>
                            </SimpleGrid>

                            {/* Sunshine Info */}
                            {monthData.weather?.sunshine && (
                              <Paper withBorder p="md" radius="md">
                                <Stack gap="xs">
                                  <Group>
                                    <IconSun size={20} style={{ color: 'var(--mantine-color-yellow-5)' }} />
                                    <Text fw={500}>Sunshine</Text>
                                  </Group>
                                  <SimpleGrid cols={2}>
                                    <Group gap="xs">
                                      <IconSun size={16} />
                                      <Text size="sm">{monthData.weather.sunshine.daily_hours}h daily</Text>
                                    </Group>
                                    <Group gap="xs">
                                      <IconMoon size={16} />
                                      <Text size="sm">{monthData.weather.sunshine.daylight_hours}h daylight</Text>
                                    </Group>
                                    <Group gap="xs">
                                      <IconUvIndex size={16} />
                                      <Text size="sm">UV Index: {monthData.weather.sunshine.uv_index}</Text>
                                    </Group>
                                    <Text size="sm">{monthData.weather.sunshine.percentage}% sunny</Text>
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
                                <Timeline active={-1} bulletSize={24}>
                                  {monthData.visit.events.map((event, index) => (
                                    <Timeline.Item key={index} bullet={<IconStar size={12} />}>
                                      <Text size="sm">{event}</Text>
                                    </Timeline.Item>
                                  ))}
                                </Timeline>
                              </div>
                            )}

                            {/* Local Tips */}
                            {monthData.visit?.local_tips && monthData.visit.local_tips.length > 0 && (
                              <div>
                                <Group gap="xs" mb="xs">
                                  <IconInfoCircle size={20} style={{ color: 'var(--mantine-color-teal-5)' }} />
                                  <Text fw={500}>Local Tips</Text>
                                </Group>
                                <Timeline active={-1} bulletSize={24}>
                                  {monthData.visit.local_tips.map((tip, index) => (
                                    <Timeline.Item key={index} bullet={<IconStar size={12} />}>
                                      <Text size="sm">{tip}</Text>
                                    </Timeline.Item>
                                  ))}
                                </Timeline>
                              </div>
                            )}

                            {/* Activities */}
                            {monthData.visit?.activities && monthData.visit.activities.length > 0 && (
                              <div>
                                <Group gap="xs" mb="xs">
                                  <IconUsers size={20} style={{ color: 'var(--mantine-color-indigo-5)' }} />
                                  <Text fw={500}>Activities</Text>
                                </Group>
                                <SimpleGrid cols={{ base: 1, sm: 2 }}>
                                  {monthData.visit.activities.map((activity, index) => (
                                    <Badge key={index} size="lg" variant="light">
                                      {activity}
                                    </Badge>
                                  ))}
                                </SimpleGrid>
                              </div>
                            )}
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
            {city.keywords && (
              <Paper shadow="md" radius="lg" p="xl" withBorder mb="lg">
                <Stack gap="md">
                  <Text size="xl" fw={500}>Highlights</Text>
                  <Group gap="xs">
                    {city.keywords.map(keyword => (
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
                    city.times_to_visit?.[month]?.crowds === 'Low'
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