import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata = {
  title: "Weather in the World - Compare City Climates",
  description: 'Compare climate data for cities around the world. View temperature, rainfall, and weather patterns for any two cities.',
  keywords: 'weather comparison, city climate, temperature comparison, rainfall data, weather patterns, travel, nomad, digital nomad, remote work, retirement, expat',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="light">
          <Header />
          <main>{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
