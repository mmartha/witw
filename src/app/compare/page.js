'use client';

import { Container, Title, Text, SimpleGrid, Card, Group, Stack } from '@mantine/core';
import { themedComparisons } from '@/data/comparisons';
import Link from 'next/link';
import TopNav from '@/components/shared/TopNav';
import Footer from '@/components/shared/Footer';
import ParallaxHero from '@/components/shared/ParallaxHero';
import classes from './page.module.css';

export default function ComparePage() {
  return (
    <>
      <TopNav />
      <main>
        <ParallaxHero
          title="Compare Climate Stories"
          description="Discover how weather shapes different cities in unique and surprising ways."
          emoji="🔄"
          height="40vh"
        />

        <Container size="lg" style={{ marginBottom: '4rem' }}>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" mt="xl">
            {Object.entries(themedComparisons).map(([key, theme]) => (
              <Card 
                key={key} 
                withBorder 
                padding="lg" 
                radius="md"
                className={classes.card}
              >
                <Stack gap="md">
                  <Group gap="xs">
                    <Text size="xl">{theme.icon}</Text>
                    <Title order={3} size="h4">{theme.title}</Title>
                  </Group>
                  
                  <Text size="sm" c="dimmed" mb="md">
                    {theme.description}
                  </Text>

                  <Stack gap="xs">
                    {theme.comparisons.map((comparison, index) => (
                      <Card
                        key={index}
                        component={Link}
                        href={comparison.path}
                        padding="sm"
                        radius="sm"
                        className={classes.comparisonCard}
                      >
                        <Group justify="space-between" wrap="nowrap">
                          <Text size="sm" fw={500}>
                            {comparison.title}
                          </Text>
                          <Text size="xs" c="dimmed" style={{ maxWidth: '60%' }} truncate>
                            {comparison.description}
                          </Text>
                        </Group>
                      </Card>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>

          <Stack align="center" mt="4rem" mb="2rem">
            <Title order={2} ta="center" mb="sm">
              Why Compare Cities?
            </Title>
            <Text c="dimmed" size="lg" maw={600} ta="center">
              Comparing cities helps us understand how climate shapes culture, architecture, 
              and daily life. From religious practices to business hours, from fashion trends 
              to festival timing — weather influences everything.
            </Text>
          </Stack>
        </Container>
      </main>
      <Footer />
    </>
  );
} 