import { Container, Group, Text, Stack, Anchor, Divider } from '@mantine/core';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      marginTop: 'auto',
      paddingTop: '2rem',
      paddingBottom: '2rem',
      backgroundColor: 'var(--mantine-color-gray-0)'
    }}>
      <Container size="lg">
        <Stack gap="md">
          <Group justify="space-between" wrap="wrap">
            <Stack gap="xs">
              <Text size="sm" fw={500}>Weather in the World</Text>
              <Text size="xs" c="dimmed">Explore climate data from cities around the globe</Text>
            </Stack>
            
            <Group gap="xl" wrap="wrap">
              <Stack gap="xs">
                <Text size="sm" fw={500}>Explore</Text>
                <Group gap="xs">
                  <Anchor component={Link} href="/cities" size="sm">Cities</Anchor>
                  <Anchor component={Link} href="/regions" size="sm">Regions</Anchor>
                  <Anchor component={Link} href="/compare" size="sm">Compare</Anchor>
                </Group>
              </Stack>
              
              <Stack gap="xs">
                <Text size="sm" fw={500}>Community</Text>
                <Group gap="xs">
                  <Anchor component={Link} href="/about" size="sm">About</Anchor>
                  <Anchor component={Link} href="/contribute" size="sm">Contribute</Anchor>
                </Group>
              </Stack>
            </Group>
          </Group>

          <Divider />
          
          <Group justify="space-between" wrap="wrap">
            <Text size="xs" c="dimmed">
              © {currentYear} Weather in the World. All rights reserved.
            </Text>
            <Group gap="xs" wrap="wrap">
              <Anchor component={Link} href="/privacy" size="xs">Privacy</Anchor>
              <Text size="xs" c="dimmed">•</Text>
              <Anchor component={Link} href="/terms" size="xs">Terms</Anchor>
              <Text size="xs" c="dimmed">•</Text>
              <Anchor component={Link} href="/contact" size="xs">Contact</Anchor>
            </Group>
          </Group>
        </Stack>
      </Container>
    </footer>
  );
} 