// components/WithShell.tsx
'use client';
import { AppShell, Group, Text } from '@mantine/core';
import { useState } from 'react';
import Footer from '@/components/shared/Footer';
import PageDirectory from '@/components/shared/PageDirectory';
import TopNav from '@/components/shared/TopNav';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import classes from './WithShell.module.css';

export default function WithShell({ children, sideNavStartOpen = true }) {
  const [mobileOpened, setMobileOpened] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(!sideNavStartOpen);

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: desktopCollapsed ? 80 : 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: desktopCollapsed }
        }}
        padding={0}
      >
        <AppShell.Header>
          <TopNav 
            opened={mobileOpened}
            onToggle={() => setMobileOpened(!mobileOpened)}
          />
        </AppShell.Header>

        <AppShell.Navbar>
          <PageDirectory 
            onToggle={() => setDesktopCollapsed(!desktopCollapsed)}
            isCollapsed={desktopCollapsed}
          />
        </AppShell.Navbar>

        <AppShell.Main>
          {children}
          <Footer />
        </AppShell.Main>
      </AppShell>

      {/* Expand tab outside of AppShell */}
      <Group 
        className={clsx(classes.expandTab, desktopCollapsed && classes.expandTabVisible)}
        onClick={() => setDesktopCollapsed(false)}
        role="button"
        aria-label="Show cities navigation"
      >
        <Text>🌐</Text>
        <IconChevronRight size={16} className={classes.expandIcon} />
      </Group>
    </>
  );
}