'use client';

import { MantineProvider } from '@mantine/core';

export default function MantineClientProvider({ children }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
}
