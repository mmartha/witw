import cityList from '@/lib/cityList';
import { citiesByContinent, getCountryFlag } from '@/lib/utils';
import { UnstyledButton, Collapse, Stack, Title, Text, Group, ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { useState } from 'react';

export default function PageDirectory({ onToggle, onClose }) {
    const [openContinents, setOpenContinents] = useState([]);

    const toggleContinent = (continent) => {
        setOpenContinents((prev) => 
            prev.includes(continent)
                ? prev.filter(c => c !== continent)
                : [...prev, continent]
        );
    };

    return (
        <Stack gap={0} h="100%">
            <Group justify="space-between" p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                <Title order={4}>Cities</Title>
                <ActionIcon 
                    variant="subtle" 
                    onClick={onToggle}
                    aria-label="Toggle navigation"
                >
                    <IconChevronLeft size={20} />
                </ActionIcon>
            </Group>

            <nav style={{ padding: '1rem', overflow: 'auto' }}>
                {Object.entries(citiesByContinent(cityList)).map(([continent, cities]) => (
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
    );
}