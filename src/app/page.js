'use client';

import { Container, Title, Text, Button, Group, Stack, SimpleGrid, Card } from '@mantine/core';
import { IconMapPin, IconChartLine, IconWorld } from '@tabler/icons-react';
import Link from 'next/link';
import TopNav from '@/components/shared/TopNav';
import Footer from '@/components/shared/Footer';
import classes from './page.module.css';
import ParallaxHero from '@/components/shared/ParallaxHero';

export default function Home() {
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
            {[
              { emoji: '🕊️', title: 'Holy Cities', description: 'Jerusalem, Rome, Varanasi — explore sacred climates across belief systems.' },
              { emoji: '💼', title: 'Business Hubs', description: 'Compare global finance capitals like NYC, London, and Dubai.' },
              { emoji: '🧵', title: 'Fashion Capitals', description: 'How Paris, Milan, and Tokyo bring seasonal flair to the runway.' },
              { emoji: '🌍', title: 'Digital Nomad Life', description: 'Lisbon, Bali, Medellín — where good Wi-Fi meets great weather.' },
              { emoji: '🧠', title: 'Tech Cities', description: 'Silicon Valley to Bangalore — climates of innovation.' },
              { emoji: '🏝️', title: 'Island Life', description: 'Tropical rhythms from Honolulu to Zanzibar.' },
              { emoji: '🧭', title: 'Same Latitude', description: 'Cities that align on the globe — but not in climate.' },
              { emoji: '🌅', title: 'Retirement Vibes', description: 'Affordable, warm-weather escapes from Chiang Mai to the Algarve.' },
            ].map((theme, index) => (
              <Card
                key={index}
                withBorder
                radius="md"
                padding="lg"
                className={classes.card}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{theme.emoji}</div>
                <Text size="lg" fw={600} mb="xs">
                  {theme.title}
                </Text>
                <Text size="sm" c="dimmed">
                  {theme.description}
                </Text>
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
