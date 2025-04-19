'use client';

import { MantineProvider } from '@mantine/core';

export default function MantineClientProvider({ children }) {
  return (
    <MantineProvider defaultColorScheme="light" withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
}
