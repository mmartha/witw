// components/WithShell.tsx
'use client';
import { AppShell, Group, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import Footer from '@/components/shared/Footer';
import PageDirectory from '@/components/shared/PageDirectory';
import TopNav from '@/components/shared/TopNav';
import { IconChevronRight } from '@tabler/icons-react';
import clsx from 'clsx';
import classes from './WithShell.module.css';

export default function WithShell({ children, sideNavStartOpen = false }) {
  const [mobileOpened, setMobileOpened] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(!sideNavStartOpen);
  const isMobile = useMediaQuery('(max-width: 48em)');
  const pathname = usePathname();
  const isDetailPage = pathname.startsWith('/cities/') && pathname !== '/cities';
  const isComparePage = pathname.startsWith('/compare/') && pathname !== '/compare';
  const showSideNav = !isMobile && (isDetailPage || isComparePage);

  const handleNavToggle = () => {
    setDesktopCollapsed(prev => !prev);
  };

  return (
    <AppShell
      header={{ height: 60 }}
      padding={0}
      navbar={showSideNav ? {
        width: desktopCollapsed ? 80 : 300,
        breakpoint: 'sm',
        collapsed: { desktop: desktopCollapsed }
      } : undefined}
      classNames={{
        navbar: classes.navbar
      }}
    >
      <AppShell.Header>
        <TopNav 
          opened={mobileOpened}
          onToggle={() => setMobileOpened(!mobileOpened)}
        />
      </AppShell.Header>

      {showSideNav && (
        <AppShell.Navbar>
          <PageDirectory 
            onToggle={handleNavToggle}
            isCollapsed={desktopCollapsed}
          />
        </AppShell.Navbar>
      )}

      <AppShell.Main>
        {children}
        <Footer />
      </AppShell.Main>

      {/* Expand tab - only show on desktop when nav is collapsed */}
      {showSideNav && (
        <Group 
          className={clsx(classes.expandTab, desktopCollapsed && classes.expandTabVisible)}
          onClick={() => setDesktopCollapsed(false)}
          role="button"
          aria-label="Show cities navigation"
        >
          <Text>🌐</Text>
          <IconChevronRight size={16} className={classes.expandIcon} />
        </Group>
      )}
    </AppShell>
  );
}