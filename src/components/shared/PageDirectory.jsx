'use client';

import { UnstyledButton, Collapse, Stack, Title, Text, Group, ActionIcon, Badge, Box } from '@mantine/core';
import Link from 'next/link';
import { IconChevronRight, IconChevronLeft, IconMapPin, IconSun } from '@tabler/icons-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import classes from './PageDirectory.module.css';
import clsx from 'clsx';
import { getCityData, getCityFiles } from '@/lib/cities';

// Helper function to determine climate type (simplified version)
function getClimateType(cityData) {
  if (!cityData.weather) return null;
  
  // Calculate average temperature and precipitation
  const monthlyData = Object.values(cityData.weather).map(weather => ({
    avgTemp: weather.temperature ? 
      (weather.temperature.high + weather.temperature.low) / 2 : null,
    precipitation: weather.precipitation?.mm || 0
  })).filter(data => data.avgTemp !== null);

  if (monthlyData.length === 0) return null;

  const avgTemp = monthlyData.reduce((sum, data) => sum + data.avgTemp, 0) / monthlyData.length;
  const totalPrecip = monthlyData.reduce((sum, data) => sum + data.precipitation, 0);
  
  if (avgTemp > 25 && totalPrecip > 1500) return 'tropical';
  if (avgTemp > 18 && totalPrecip < 500) return 'arid';
  if (avgTemp > 20 && totalPrecip > 2000) return 'rainforest';
  return 'temperate';
}

export default function PageDirectory({ onToggle, isCollapsed }) {
    const pathname = usePathname();
    const [openContinents, setOpenContinents] = useState({});

    // Load cities using the same pattern as CitiesPage
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

    const toggleContinent = (continent) => {
        setOpenContinents(prev => ({
            ...prev,
            [continent]: !prev[continent]
        }));
    };

    return (
        <Stack gap={0} h="100%">
            <Group justify="space-between" p="md" className={classes.header}>
                <Title 
                    order={4} 
                    className={clsx(classes.title, isCollapsed && classes.titleCollapsed)}
                >
                    <Group gap="xs">
                        <IconMapPin size={20} />
                        Cities
                    </Group>
                </Title>
                <ActionIcon 
                    variant="subtle" 
                    onClick={onToggle}
                    aria-label="Toggle navigation"
                    className={clsx(classes.toggleButton, isCollapsed && classes.toggleButtonCollapsed)}
                >
                    <IconChevronLeft size={20} />
                </ActionIcon>
            </Group>

            <nav className={clsx(classes.nav, isCollapsed && classes.navCollapsed)}>
                {Object.entries(continents).map(([continent, cities]) => (
                    <div key={continent}>
                        <UnstyledButton
                            onClick={() => toggleContinent(continent)}
                            className={clsx(
                                classes.continentButton,
                                isCollapsed && classes.continentButtonCollapsed
                            )}
                        >
                            <IconChevronRight
                                size={16}
                                className={`${clsx(classes.chevron)} ${openContinents[continent] ? clsx(classes.chevronRotated) : ''}`}
                            />
                            <Title order={6} style={{ margin: 0 }}>{continent}</Title>
                        </UnstyledButton>

                        {openContinents[continent] && (
                            <Box pl="md">
                                {cities.map((city) => (
                                    <Link
                                        key={city.slug}
                                        href={`/cities/${city.slug}`}
                                        className={clsx(
                                            classes.cityLink,
                                            pathname === `/cities/${city.slug}` && classes.cityLinkActive
                                        )}
                                    >
                                        <Group justify="space-between" wrap="nowrap">
                                            <Text truncate>{city.city}</Text>
                                            {!isCollapsed && city.weather && (
                                                <Badge 
                                                    size="xs" 
                                                    variant="light"
                                                    leftSection={<IconSun size={12} />}
                                                >
                                                    {getClimateType(city)}
                                                </Badge>
                                            )}
                                        </Group>
                                    </Link>
                                ))}
                            </Box>
                        )}
                    </div>
                ))}
            </nav>
        </Stack>
    );
}