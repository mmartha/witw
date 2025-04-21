'use client';

import { Container, Title, Text, Button, Group, Stack, SimpleGrid, Card } from '@mantine/core';
import { IconMapPin, IconChartLine, IconWorld } from '@tabler/icons-react';
import Link from 'next/link';
import TopNav from '@/components/shared/TopNav';
import Footer from '@/components/shared/Footer';
import classes from './page.module.css';

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <div style={{
          background: 'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-5) 100%)',
          color: 'white',
          padding: '8rem 0 8rem',
          marginBottom: '4rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative emoji */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '10%',
            transform: 'translateY(-50%)',
            fontSize: '15rem',
            opacity: '0.2',
            filter: 'blur(1px)',
            lineHeight: 1,
          }}>
            🌤️
          </div>

          <Container size="lg" style={{ position: 'relative' }}>
            <Stack gap="xl" style={{ maxWidth: 600 }}>
              <div>
                <Title order={1} style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                  Explore Weather Worldwide
                </Title>
                <Text size="xl" style={{ opacity: 0.9 }}>
                  Discover climate patterns and weather data from cities around the globe.
                </Text>
              </div>
              <Group>
                <Button 
                  component={Link}
                  href="/cities"
                  size="lg"
                  variant="white"
                  color="blue"
                >
                  Explore Cities
                </Button>
                <Button 
                  component={Link}
                  href="/about"
                  size="lg"
                  variant="default"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  Learn More
                </Button>
              </Group>
            </Stack>
          </Container>

          {/* Wave divider */}
          <svg
            style={{
              position: 'absolute',
              bottom: -1,
              left: 0,
              width: '100%',
              height: '4rem',
              fill: 'white',
              display: 'block',
            }}
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 C360,100 720,0 1440,50 L1440,100 L0,100 Z"
            />
          </svg>
        </div>

        <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mb="xl">
            {[
              {
                icon: <IconMapPin size={32} />,
                title: 'Global Coverage',
                description: 'Access weather data from major cities across all continents.'
              },
              {
                icon: <IconChartLine size={32} />,
                title: 'Detailed Analysis',
                description: 'View historical trends, seasonal patterns, and climate insights.'
              },
              {
                icon: <IconWorld size={32} />,
                title: 'Compare Regions',
                description: 'Understand climate differences between cities and regions.'
              }
            ].map((feature, index) => (
              <Card
                key={index}
                withBorder
                padding="xl"
                radius="md"
                className={classes.card}
              >
                <div className={classes.icon}>
                  {feature.icon}
                </div>
                <Text size="lg" fw={600} mb="xs">{feature.title}</Text>
                <Text size="sm" c="dimmed">
                  {feature.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </main>
      <Footer />
    </>
  );
}