'use client';

import { Group, Title, Burger, Text, UnstyledButton, Box, Container, Portal } from '@mantine/core';
import { useMediaQuery, useWindowScroll } from '@mantine/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import classes from './TopNav.module.css';

export default function TopNav() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const pathname = usePathname();
    const [scroll] = useWindowScroll();
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isHome = pathname === '/';
    
    useEffect(() => {
        // Smooth cubic easing for natural feel
        const rawProgress = Math.min(scroll.y / 100, 1);
        const easedProgress = rawProgress < 0.5
            ? 4 * rawProgress * rawProgress * rawProgress
            : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
        setScrollProgress(easedProgress);
    }, [scroll.y]);

    const MobileNavLink = ({ href, children }) => {
        const isActive = pathname === href;
        return (
            <Link 
                href={href}
                className={classes.mobileNavLink}
                data-active={isActive}
                onClick={() => setMobileMenuOpen(false)}
            >
                {children}
            </Link>
        );
    };

    const DesktopNavLink = ({ href, children }) => {
        const isActive = pathname === href;
        return (
            <UnstyledButton
                component={Link}
                href={href}
                className={classes.navLink}
                data-active={isActive}
                data-home={isHome}
            >
                <Text fw={500}>{children}</Text>
            </UnstyledButton>
        );
    };

    return (
        <Box component="header">
            <Box 
                className={classes.header}
                data-home={isHome}
                style={{
                    '--scroll-progress': scrollProgress,
                }}
            >
                <Container size="lg">
                    <Group justify="space-between" p={isMobile ? 'sm' : 'md'}>
                        <Link 
                            href="/" 
                            className={classes.logo}
                            data-home={isHome}
                        >
                            <Group gap="xs">
                                <Text size="xl" style={{ lineHeight: 1 }}>🌤️</Text>
                                <Title 
                                    order={4}
                                    className={classes.title}
                                    data-home={isHome}
                                >
                                    Weather in the World
                                </Title>
                            </Group>
                        </Link>

                        <Group gap={isMobile ? 'xs' : 'md'}>
                            {!isMobile ? (
                                <>
                                    <DesktopNavLink href="/cities">Cities</DesktopNavLink>
                                    <DesktopNavLink href="/about">About</DesktopNavLink>
                                </>
                            ) : (
                                <Burger 
                                    opened={mobileMenuOpen}
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    aria-label="Toggle navigation"
                                    size="sm"
                                    className={classes.burger}
                                    data-home={isHome}
                                />
                            )}
                        </Group>
                    </Group>
                </Container>
            </Box>

            {/* Mobile Menu - rendered in a portal */}
            {isMobile && mobileMenuOpen && (
                <Portal>
                    <Box className={classes.mobileMenu}>
                        <Container size="lg">
                            <MobileNavLink href="/cities">Cities</MobileNavLink>
                            <MobileNavLink href="/about">About</MobileNavLink>
                        </Container>
                    </Box>
                </Portal>
            )}
        </Box>
    );
} 