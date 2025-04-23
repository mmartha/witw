'use client';

import { Container, Title, Text, Stack, Paper, Anchor } from '@mantine/core';
import classes from './page.module.css';
import WithShell from '@/components/shared/WithShell';

export default function About() {
  return (
    <WithShell>
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <div>
            <Title order={1} mb="md">About Weather in the World</Title>
            <Text size="lg" c="dimmed">
              A lightweight tool for comparing seasonal weather patterns across cities around the globe.
            </Text>
          </div>

          <Paper withBorder p="xl" radius="md" className={classes.card}>
            <Stack gap="md">
              <Title order={2}>🌍 Why This Exists</Title>
              <Text>
                Created for travelers, remote workers, and curious minds who enjoy spotting patterns between places.
                This tool focuses on long-term monthly climate data to help people understand how different cities feel throughout the year.
              </Text>
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius="md" className={classes.card}>
            <Stack gap="md">
              <Title order={2}>🧭 What You Can Do Here</Title>
              <Text>
                Compare average temperatures and rainfall between two cities, month by month.
                Whether you're planning a trip or exploring how the world works, this tool offers a fast, visual way to understand climate differences.
              </Text>
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius="md" className={classes.card}>
            <Stack gap="md">
              <Title order={2}>📊 Data & Sources</Title>
              <Text>
                Based on publicly available climate records. While it doesn’t yet include real-time forecasts or climate change data,
                future updates may expand the dataset. For now, it’s all about clarity and comparison.
              </Text>
            </Stack>
          </Paper>

          <Paper withBorder p="xl" radius="md" className={classes.card}>
            <Stack gap="md">
              <Title order={2}>🧑‍💻 About the Creator</Title>
              <Text>
                Weather in the World is an independent project by a software engineer and global traveler with a lifelong interest in cities, weather patterns, and accessible data design.
              </Text>
              <Text>
                Learn more at{' '}
                <Anchor href="https://mangrove.blue" target="_blank" rel="noopener noreferrer">Mangrove</Anchor>, or follow along on{' '}
                <Anchor href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer">Twitter</Anchor>,{' '}
                <Anchor href="https://www.tiktok.com/@your-handle" target="_blank" rel="noopener noreferrer">TikTok</Anchor>,{' '}
                <Anchor href="https://youtube.com/@your-handle" target="_blank" rel="noopener noreferrer">YouTube</Anchor>, and{' '}
                <Anchor href="https://fiverr.com/your-handle" target="_blank" rel="noopener noreferrer">Fiverr</Anchor>.
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </WithShell>
  );
}
