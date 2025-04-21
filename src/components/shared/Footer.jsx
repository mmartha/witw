'use client';
import { Container, Group, Text, Stack } from '@mantine/core';
import Link from 'next/link';
import classes from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <Container size="lg">
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start">
            <div>
              <Text size="lg" fw={500}>Weather in the World</Text>
              <Text size="sm" c="dimmed">Explore climate data from cities around the globe</Text>
            </div>

            <Group gap="xl">
              <Stack gap="xs">
                <Text fw={500}>Explore</Text>
                <Stack gap="xs">
                  <Link href="/cities" className={classes.link}>Cities</Link>
                  <Link href="/regions" className={classes.link}>Regions</Link>
                  <Link href="/compare" className={classes.link}>Compare</Link>
                </Stack>
              </Stack>

              <Stack gap="xs">
                <Text fw={500}>Community</Text>
                <Stack gap="xs">
                  <Link href="/about" className={classes.link}>About</Link>
                  <Link href="/contribute" className={classes.link}>Contribute</Link>
                </Stack>
              </Stack>
            </Group>
          </Group>

          <Group justify="space-between" className={classes.bottom}>
            <Text size="sm" c="dimmed">© 2025 Weather in the World. All rights reserved.</Text>
            <Group gap="xs" wrap="nowrap">
              <Link href="/privacy" className={classes.bottomLink}>Privacy</Link>
              <Text size="sm" c="dimmed">·</Text>
              <Link href="/terms" className={classes.bottomLink}>Terms</Link>
              <Text size="sm" c="dimmed">·</Text>
              <Link href="/contact" className={classes.bottomLink}>Contact</Link>
            </Group>
          </Group>
        </Stack>
      </Container>
    </footer>
  );
} 