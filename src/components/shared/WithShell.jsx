// components/WithShell.tsx
'use client';
import { AppShell } from '@mantine/core';
import { useState } from 'react';
import Footer from '@/components/shared/Footer';
import PageDirectory from '@/components/shared/PageDirectory';
import TopNav from '@/components/shared/TopNav';

export default function WithShell({ children }) {
  const [mobileOpened, setMobileOpened] = useState(false);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: false }
      }}
    >
      <AppShell.Header>
        <TopNav 
          opened={mobileOpened}
          onToggle={() => setMobileOpened(!mobileOpened)}
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <PageDirectory />
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}