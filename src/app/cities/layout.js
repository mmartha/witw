'use client';
import { AppShell, Group, Title, Stack, Collapse, UnstyledButton, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import cityList from '@/lib/cityList';
import Link from 'next/link';
import { getCountryFlag } from '@/lib/utils';
import { useState } from 'react';

export default function CitiesLayout({ children }) {
  const [openContinents, setOpenContinents] = useState(['Europe']);

  const citiesByContinent = cityList.reduce((acc, city) => {
    if (!acc[city.continent]) {
      acc[city.continent] = [];
    }
    acc[city.continent].push(city);
    return acc;
  }, {});

  const toggleContinent = (continent) => {
    setOpenContinents((current) =>
      current.includes(continent)
        ? current.filter((c) => c !== continent)
        : [...current, continent]
    );
  };

  return (
    <AppShell
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <Group>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Text size="sm">← Back to Home</Text>
            </Link>
          </Group>

          <nav style={{ marginTop: '1rem' }}>
            {Object.entries(citiesByContinent).map(([continent, cities]) => (
              <div key={continent}>
                <UnstyledButton
                  onClick={() => toggleContinent(continent)}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <IconChevronRight
                    style={{
                      transform: openContinents.includes(continent) ? 'rotate(90deg)' : 'none',
                      transition: 'transform 0.2s'
                    }}
                    size={16}
                  />
                  <Title order={6} style={{ margin: 0 }}>{continent}</Title>
                  <Text size="sm" c="dimmed">({cities.length})</Text>
                </UnstyledButton>

                <Collapse in={openContinents.includes(continent)}>
                  <Stack gap="xs" pl="md">
                    {cities.map((city) => (
                      <Link
                        key={city.filename}
                        href={`/cities/${city.filename}`}
                        style={{
                          display: 'block',
                          padding: '0.5rem',
                          textDecoration: 'none',
                          color: 'inherit'
                        }}
                      >
                        {getCountryFlag(city.flag)} {city.name}
                      </Link>
                    ))}
                  </Stack>
                </Collapse>
              </div>
            ))}
          </nav>
        </Stack>
      </AppShell.Navbar>
      
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
} 