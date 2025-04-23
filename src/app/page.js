'use client';

import { Container, Title, Text, Button, Group, Stack, SimpleGrid, Card } from '@mantine/core';
import { IconMapPin, IconChartLine, IconWorld } from '@tabler/icons-react';
import Link from 'next/link';
import TopNav from '@/components/shared/TopNav';
import Footer from '@/components/shared/Footer';
import classes from './page.module.css';
import ParallaxHero from '@/components/shared/ParallaxHero';

export default function Home() {
  const thematicComparisons = [
    {
      emoji: '🕌',
      title: 'Holy Cities',
      description: 'Explore the climate of sacred destinations.',
      comparisons: [
        { cities: ['mecca', 'varanasi'], label: 'Mecca & Varanasi' },
        { cities: ['jerusalem', 'varanasi'], label: 'Jerusalem & Varanasi' }
      ]
    },
    {
      emoji: '🏢',
      title: 'Business Hubs',
      description: 'Compare major financial centers.',
      comparisons: [
        { cities: ['dubai', 'london'], label: 'Dubai & London' },
        { cities: ['dubai', 'new-york'], label: 'Dubai & New York' }
      ]
    },
    {
      emoji: '👗',
      title: 'Fashion Capitals',
      description: 'Weather in style capitals of the world.',
      comparisons: [
        { cities: ['paris', 'milan'], label: 'Paris & Milan' },
        { cities: ['london', 'new-york'], label: 'London & New York' }
      ]
    },
    {
      emoji: '🌴',
      title: 'Digital Nomad Hotspots',
      description: 'Remote work-friendly cities compared.',
      comparisons: [
        { cities: ['lisbon', 'bali'], label: 'Lisbon & Bali' },
        { cities: ['bangkok', 'bali'], label: 'Bangkok & Bali' }
      ]
    },
    {
      emoji: '🌍',
      title: 'Same Latitude',
      description: 'Cities at similar latitudes with different climates.',
      comparisons: [
        { cities: ['lisbon', 'tokyo'], label: 'Lisbon & Tokyo' },
        { cities: ['dubai', 'miami'], label: 'Dubai & Miami' }
      ]
    }
  ];

  return (
    <>
      <TopNav />
      <main>
        <ParallaxHero
          title="Every City Has a Climate Story"
          description="Discover how weather connects the world. Compare seasons, rituals, and rhythms across continents."
          emoji="🌤️"
          height="60vh"
        >
          <Group mt="xl">
            <Button component={Link} href="/cities" size="lg" variant="white" color="blue">
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
        </ParallaxHero>

        {/* 🔍 Key Features */}
        <Container size="lg" style={{ position: 'relative', zIndex: 1, marginTop: '4rem' }}>
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mb="xl">
            {[
              {
                icon: <IconMapPin size={32} />,
                title: 'Meaningful Destinations',
                description: 'Go beyond weather — explore cities through their climate personalities.',
              },
              {
                icon: <IconChartLine size={32} />,
                title: 'Insightful Patterns',
                description: 'See how temperature and rainfall reveal deeper cultural rhythms.',
              },
              {
                icon: <IconWorld size={32} />,
                title: 'Surprising Connections',
                description: 'Compare unexpected cities and uncover shared seasonal DNA.',
              },
            ].map((feature, index) => (
              <Card key={index} withBorder padding="xl" radius="md" className={classes.card}>
                <div className={classes.icon}>{feature.icon}</div>
                <Text size="lg" fw={600} mb="xs">
                  {feature.title}
                </Text>
                <Text size="sm" c="dimmed">
                  {feature.description}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>

        {/* 🌎 Thematic Comparisons */}
        <Container size="lg" style={{ marginBottom: '4rem' }}>
          <Title order={2} size="h2" mb="lg" mt="4rem">
            Climate by Lifestyle & Culture
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
            {thematicComparisons.map((comparison, index) => (
              <Card key={index} shadow="sm" padding="lg" radius="md" withBorder>
                <Card.Section>
                  <div className={classes.thematicCardContent}>
                    <Text size="xl" style={{ fontSize: '3rem' }}>{comparison.emoji}</Text>
                    <Title order={3}>{comparison.title}</Title>
                    <Text size="sm" c="dimmed">{comparison.description}</Text>
                    <Group mt="md">
                      {comparison.comparisons.map((comp, idx) => (
                        <Button
                          key={idx}
                          component={Link}
                          href={`/compare/${comp.cities[0]}/${comp.cities[1]}`}
                          variant="light"
                          color="blue"
                          mt="md"
                          radius="md"
                        >
                          {comp.label}
                        </Button>
                      ))}
                    </Group>
                  </div>
                </Card.Section>
              </Card>
            ))}
          </SimpleGrid>
        </Container>

        {/* ✨ Why it Matters */}
        <Container size="sm" style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <Title order={2} mb="sm">
            Why Weather in the World?
          </Title>
          <Text size="md" c="dimmed">
            Climate isn't just science — it's storytelling. By comparing cities around the globe,
            we understand how weather shapes travel, rituals, and connection.
            <br />
            <br />
            Whether you're planning a trip, teaching a class, or just curious — this project helps
            you see the world a little more clearly.
          </Text>
      </Container>
      </main>
      <Footer />
    </>
  );
}
