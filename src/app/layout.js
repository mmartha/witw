import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';

export const metadata = {
  title: {
    default: 'Weather in the World',
    template: '%s | Weather in the World'
  },
  description: 'Explore climate data from cities around the globe',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌤️</text></svg>',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <div style={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <main style={{ flex: '1 0 auto' }}>
              {children}
            </main>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
