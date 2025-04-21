'use client';

import { UnstyledButton, Collapse, Stack, Title, Text, Group, ActionIcon } from '@mantine/core';
import Link from 'next/link';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import classes from './PageDirectory.module.css';
import clsx from 'clsx';

export default function PageDirectory({ onToggle, isCollapsed }) {
    const [openContinents, setOpenContinents] = useState([]);
    const [cities, setCities] = useState({});
    const pathname = usePathname();

    useEffect(() => {
        // Fetch the index file that contains all cities
        fetch('/data/cities/index.json')
            .then(res => res.json())
            .then(data => setCities(data.cities))
            .catch(err => console.error('Error loading cities:', err));
    }, []);

    const toggleContinent = (continent) => {
        if (isCollapsed) return;
        setOpenContinents((prev) => 
            prev.includes(continent)
                ? prev.filter(c => c !== continent)
                : [...prev, continent]
        );
    };

    return (
        <Stack gap={0} h="100%">
            <Group justify="space-between" p="md" className={classes.header}>
                <Title 
                    order={4} 
                    className={clsx(classes.title, isCollapsed && classes.titleCollapsed)}
                >
                    Cities
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
                {Object.entries(cities).map(([continent, cityList]) => (
                    <div key={continent}>
                        <UnstyledButton
                            onClick={() => toggleContinent(continent)}
                            className={clsx(
                                classes.continentButton,
                                isCollapsed && classes.continentButtonCollapsed
                            )}
                        >
                            <IconChevronRight
                                className={clsx(
                                    classes.chevron,
                                    openContinents.includes(continent) && classes.chevronRotated
                                )}
                                size={16}
                            />
                            <Title order={6} style={{ margin: 0 }}>{continent}</Title>
                            <Text size="sm" c="dimmed">({cityList.length})</Text>
                        </UnstyledButton>

                        <Collapse in={openContinents.includes(continent) && !isCollapsed}>
                            <Stack gap="xs" pl="md">
                                {cityList.map((city) => (
                                    <Link
                                        key={city.filename}
                                        href={`/cities/${city.filename}`}
                                        className={clsx(
                                            classes.cityLink,
                                            pathname === `/cities/${city.filename}` && classes.cityLinkActive
                                        )}
                                    >
                                        {city.name}
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