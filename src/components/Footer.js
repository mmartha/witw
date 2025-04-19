'use client';

import { Text, Container, Group, Anchor } from '@mantine/core';
import { IconBrandX, IconBrandInstagram } from '@tabler/icons-react';

export default function Footer() {
  return (
    <Container size="lg">
      <Group position="apart" align="center">
        <Text size="sm" color="dimmed">
          © {new Date().getFullYear()} Weather in the World
        </Text>
        <Group spacing="xs">
            {/* TODO: Add links to the GitHub repo (and make public?) */}

          {/* TODO: Create social accounts and add links to X and Instagram */}
          <Anchor
            href="https://x.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            c="dimmed"
          >
            <IconBrandX size={16} />
          </Anchor>
          <Anchor
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            c="dimmed"
          >
            <IconBrandInstagram size={16} />
          </Anchor>
        </Group>
      </Group>
    </Container>
  );
}
