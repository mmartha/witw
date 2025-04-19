'use client';
import { AppShell, Group, Text, Title, Stack, Burger, Container, rem, Drawer, CloseButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Home() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: { base: 60, sm: 60 } }}
      padding={0}
    >
      <AppShell.Header style={{ zIndex: 1001 }}>
        <Container size="lg" h="100%">
          <Group h="100%" px="md" justify="space-between">
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Stack gap={0}>
                <Title 
                  order={1}
                  size="h2"
                  style={(theme) => ({
                    fontWeight: 700,
                    letterSpacing: '-0.5px',
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                  })}
                >
                  Weather in the World
                </Title>
                <Text 
                  size="sm" 
                  c="dimmed"
                  style={{
                    letterSpacing: '0.2px',
                  }}
                >
                  Compare climate, plan with confidence
                </Text>
              </Stack>
            </Link>

            <Group gap={rem(32)} visibleFrom="sm">
              <Link href="/cities" style={{ textDecoration: 'none' }}>
                <Text 
                  size="sm"
                  style={(theme) => ({
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
                    fontWeight: 500,
                    transition: 'color 150ms ease',
                    '&:hover': {
                      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                    },
                  })}
                >
                  Cities
                </Text>
              </Link>
              <Link href="/about" style={{ textDecoration: 'none' }}>
                <Text 
                  size="sm"
                  style={(theme) => ({
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
                    fontWeight: 500,
                    transition: 'color 150ms ease',
                    '&:hover': {
                      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                    },
                  })}
                >
                  About
                </Text>
              </Link>
            </Group>

            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              aria-label="Toggle navigation"
            />
          </Group>
        </Container>
      </AppShell.Header>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        hiddenFrom="sm"
        withCloseButton={false}
        zIndex={1000}
      >
        <Container size="lg">
          <Group justify="flex-end" mb="xl">
            <CloseButton 
              onClick={close} 
              size="xl"
              aria-label="Close navigation"
            />
          </Group>
          <Stack gap="xl">
            <Link href="/cities" style={{ textDecoration: 'none' }} onClick={close}>
              <Text 
                size="xl"
                style={(theme) => ({
                  color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                  },
                })}
              >
                Cities
              </Text>
            </Link>
            <Link href="/about" style={{ textDecoration: 'none' }} onClick={close}>
              <Text 
                size="xl"
                style={(theme) => ({
                  color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                  },
                })}
              >
                About
              </Text>
            </Link>
          </Stack>
        </Container>
      </Drawer>

      <AppShell.Main>
        <Container size="lg" py="xl">
          {/* Your main content will go here */}
        </Container>
      </AppShell.Main>

      <AppShell.Footer 
        p="md"
        style={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
          borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
          }`,
        })}
      >
        <Container size="lg">
          <Footer />
        </Container>
      </AppShell.Footer>
    </AppShell>
  );
}