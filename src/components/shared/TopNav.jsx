'use client';

import { Group, Title, Burger, Text, UnstyledButton, Box, Container } from '@mantine/core';
import { useMediaQuery, useWindowScroll } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TopNav({ opened, onToggle }) {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const pathname = usePathname();
    const [scroll] = useWindowScroll();
    const [scrolled, setScrolled] = useState(false);
    const isHome = pathname === '/';
    const showWhiteText = isHome && !scrolled;

    useEffect(() => {
        setScrolled(scroll.y > 20);
    }, [scroll.y]);

    const NavLink = ({ href, children }) => {
        const isActive = pathname === href;
        return (
            <UnstyledButton
                component={Link}
                href={href}
                style={{
                    textDecoration: 'none',
                    color: showWhiteText ? 'white' : 'inherit',
                    position: 'relative',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--mantine-radius-sm)',
                    transition: 'all 150ms ease',
                    backgroundColor: isActive ? 'var(--mantine-color-blue-light)' : 'transparent',
                    '&:hover': {
                        backgroundColor: isActive ? 'var(--mantine-color-blue-light)' : 'var(--mantine-color-gray-0)',
                    },
                }}
            >
                <Text 
                    fw={500}
                    c={isActive ? 'blue' : 'inherit'}
                    style={{
                        color: showWhiteText ? 'white' : undefined
                    }}
                >
                    {children}
                </Text>
            </UnstyledButton>
        );
    };

    return (
        <Box 
            style={{ 
                borderBottom: `1px solid ${scrolled ? 'var(--mantine-color-gray-2)' : 'transparent'}`,
                backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backdropFilter: scrolled ? 'blur(10px) saturate(180%)' : 'none',
                transition: 'all 200ms ease',
                boxShadow: scrolled ? '0 1px 2px rgba(0, 0, 0, 0.05)' : 'none',
            }}
        >
            <Container size="lg">
                <Group 
                    justify="space-between" 
                    p={isMobile ? 'sm' : 'md'}
                >
                    <Link 
                        href="/" 
                        style={{ 
                            textDecoration: 'none', 
                            color: 'inherit',
                        }}
                    >
                        <Group gap="xs">
                            <Text size="xl" style={{ lineHeight: 1 }}>🌤️</Text>
                            <Title 
                                order={4}
                                style={{ 
                                    letterSpacing: '-0.5px',
                                    fontWeight: 700,
                                    color: showWhiteText ? 'white' : undefined,
                                    ...(!showWhiteText ? {
                                        background: 'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-5) 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    } : {}),
                                    transition: 'all 200ms ease',
                                }}
                            >
                                Weather in the World
                            </Title>
                        </Group>
                    </Link>

                    <Group gap={isMobile ? 'xs' : 'md'}>
                        <NavLink href="/cities">Cities</NavLink>
                        <NavLink href="/about">About</NavLink>
                        {isMobile && (
                            <Burger 
                                opened={opened} 
                                onClick={onToggle}
                                aria-label="Toggle navigation"
                                size="sm"
                                color={showWhiteText ? 'white' : undefined}
                            />
                        )}
                    </Group>
                </Group>
            </Container>
        </Box>
    );
} 