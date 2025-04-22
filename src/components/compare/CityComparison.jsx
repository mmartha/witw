'use client';

import { Grid, Paper, Text, Title, Group, Stack, Badge } from '@mantine/core';
import classes from './CityComparison.module.css';

function DataPoint({ label, value, unit }) {
  return (
    <Group gap="xs">
      <Text size="sm" c="dimmed">{label}:</Text>
      <Text fw={500}>
        {value}
        {unit && <Text component="span" size="sm" c="dimmed" ml={4}>{unit}</Text>}
      </Text>
    </Group>
  );
}

function ComparisonSection({ title, city1Data, city2Data, dataPoints }) {
  return (
    <Paper shadow="sm" p="md" radius="md" withBorder className={classes.section}>
      <Title order={3} mb="md">{title}</Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack>
            <Text fw={600} size="lg">{city1Data.name}</Text>
            {dataPoints.map((point, index) => (
              <DataPoint
                key={index}
                label={point.label}
                value={point.getValue(city1Data)}
                unit={point.unit}
              />
            ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack>
            <Text fw={600} size="lg">{city2Data.name}</Text>
            {dataPoints.map((point, index) => (
              <DataPoint
                key={index}
                label={point.label}
                value={point.getValue(city2Data)}
                unit={point.unit}
              />
            ))}
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

export default function CityComparison({ city1Data, city2Data }) {
  const sections = [
    {
      title: "Current Weather",
      dataPoints: [
        {
          label: "Temperature",
          getValue: (city) => city.currentWeather.temperature,
          unit: "°C"
        },
        {
          label: "Condition",
          getValue: (city) => city.currentWeather.condition
        },
        {
          label: "Humidity",
          getValue: (city) => city.currentWeather.humidity,
          unit: "%"
        }
      ]
    },
    {
      title: "Climate",
      dataPoints: [
        {
          label: "Average High",
          getValue: (city) => city.climate.averageHigh,
          unit: "°C"
        },
        {
          label: "Average Low",
          getValue: (city) => city.climate.averageLow,
          unit: "°C"
        },
        {
          label: "Annual Rainfall",
          getValue: (city) => city.climate.rainfall,
          unit: "mm"
        }
      ]
    },
    {
      title: "City Characteristics",
      dataPoints: [
        {
          label: "Population",
          getValue: (city) => city.characteristics.population.toLocaleString()
        },
        {
          label: "Timezone",
          getValue: (city) => city.characteristics.timezone
        },
        {
          label: "Elevation",
          getValue: (city) => city.characteristics.elevation,
          unit: "m"
        }
      ]
    }
  ];

  return (
    <Stack gap="xl">
      {sections.map((section, index) => (
        <ComparisonSection
          key={index}
          title={section.title}
          city1Data={city1Data}
          city2Data={city2Data}
          dataPoints={section.dataPoints}
        />
      ))}
    </Stack>
  );
} 