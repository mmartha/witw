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
              { 
                emoji: '🕊️', 
                title: 'Holy Cities', 
                description: 'Sacred places where climate shapes spiritual rhythms and traditions.',
                comparisons: [
                  { text: 'Rome & Jerusalem', href: '/compare/rome/jerusalem' },
                  { text: 'Varanasi & Mecca', href: '/compare/varanasi/mecca' }
                ]
              },
              { 
                emoji: '💼', 
                title: 'Business Hubs', 
                description: 'Compare global finance capitals and their dynamic urban climates.',
                comparisons: [
                  { text: 'Dubai & London', href: '/compare/dubai/london' },
                  { text: 'Hong Kong & New York', href: '/compare/hong-kong/new-york' }
                ]
              },
              { 
                emoji: '🧵', 
                title: 'Fashion Capitals', 
                description: 'How seasons influence style in iconic fashion destinations.',
                comparisons: [
                  { text: 'Paris & London', href: '/compare/paris/london' },
                  { text: 'Tokyo & Milan', href: '/compare/tokyo/milan' }
                ]
              },
              { 
                emoji: '🌍', 
                title: 'Digital Nomad Life', 
                description: 'Popular remote work destinations with enviable weather patterns.',
                comparisons: [
                  { text: 'Lisbon & Barcelona', href: '/compare/lisbon/barcelona' },
                  { text: 'Bangkok & Kuala Lumpur', href: '/compare/bangkok/kuala-lumpur' }
                ]
              },
              { 
                emoji: '🧠', 
                title: 'Tech Cities', 
                description: 'Innovation hubs and their distinctive climate patterns.',
                comparisons: [
                  { text: 'San Francisco & Bangalore', href: '/compare/san-francisco/bangalore' },
                  { text: 'Tokyo & London', href: '/compare/tokyo/london' }
                ]
              },
              { 
                emoji: '🌊', 
                title: 'Coastal Living', 
                description: 'How the sea shapes weather in waterfront metropolises.',
                comparisons: [
                  { text: 'Sydney & Barcelona', href: '/compare/sydney/barcelona' },
                  { text: 'Hong Kong & Istanbul', href: '/compare/hong-kong/istanbul' }
                ]
              },
              { 
                emoji: '🧭', 
                title: 'Same Latitude', 
                description: 'Cities that align on the globe — but not in climate.',
                comparisons: [
                  { text: 'Tokyo & San Francisco', href: '/compare/tokyo/san-francisco' },
                  { text: 'Lisbon & New York', href: '/compare/lisbon/new-york' }
                ]
              },
              { 
                emoji: '🌅', 
                title: 'Cultural Capitals', 
                description: 'Weather patterns in cities rich with heritage and tradition.',
                comparisons: [
                  { text: 'Kyoto & Istanbul', href: '/compare/kyoto/istanbul' },
                  { text: 'Rome & Tbilisi', href: '/compare/rome/tbilisi' }
                ]
              },
            ].map((theme, index) => (
              <Card
                key={index}
                withBorder
                radius="md"
                padding="lg"
                className={classes.card}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'start'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{theme.emoji}</div>
                <Text size="lg" fw={600} mb="xs">
                  {theme.title}
                </Text>
                <Text size="sm" c="dimmed" mb="md">
                  {theme.description}
                </Text>
                <Group gap="xs">
                  {theme.comparisons.map((comparison, i) => (
                    <Button
                      key={i}
                      component={Link}
                      href={comparison.href}
                      size="sm"
                      variant="light"
                      style={{ marginTop: 'auto' }}
                    >
                      {comparison.text}
                    </Button>
                  ))}
                </Group>
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
