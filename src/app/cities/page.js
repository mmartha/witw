'use client';

import { Title, Text, Card, Group, Badge, Container, Stack } from '@mantine/core';
import { IconWind, IconMapPin } from '@tabler/icons-react';
import WithShell from '@/components/shared/WithShell.jsx';
import cityList from '@/lib/cityList';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import classes from './page.module.css';

function CityCard({ name, continent }) {
  const router = useRouter();
  // Placeholder data - will be replaced with real API data
  const temp = Math.floor(Math.random() * 30) + 10;
  const windSpeed = Math.floor(Math.random() * 20) + 5;

  const handleClick = () => {
    router.push(`/cities/${encodeURIComponent(name.toLowerCase())}`);
  };

  return (
    <Card 
      className={classes.card} 
      withBorder 
      padding="lg" 
      radius="md"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <Card.Section className={classes.cardHeader} p="md">
        <Group justify="space-between">
          <Group>
            <IconMapPin size={20} style={{ color: 'var(--mantine-color-blue-6)' }} />
            <Text fw={600} size="lg">{name}</Text>
          </Group>
          <Badge variant="light" color="blue">Live</Badge>
        </Group>
      </Card.Section>

      <Card.Section className={classes.cardContent} p="md">
        <Stack gap="xs">
          <Text className={classes.temperature}>{temp}°C</Text>
          <Group gap="xs" className={classes.meta}>
            <IconWind size={16} />
            <Text>{windSpeed} km/h</Text>
          </Group>
        </Stack>
      </Card.Section>
    </Card>
  );
}

export default function CitiesPage() {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const updateParallax = () => {
      if (!heroRef.current || !contentRef.current) return;
      
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate parallax effects
      if (scrolled <= viewportHeight) {
        const progress = scrolled / viewportHeight;
        const scale = 1 + progress * 0.1;
        const opacity = Math.max(0, 1 - progress * 1.5); // Faster fade out
        
        heroRef.current.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0) scale(${scale})`;
        contentRef.current.style.opacity = opacity;
        contentRef.current.style.transform = `translate3d(0, ${-scrolled * 0.2}px, 0)`;
      }
    };

    // Set up intersection observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classes.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all animatable elements
    containerRef.current?.querySelectorAll('.animate-in').forEach((el) => {
      observer.observe(el);
    });

    // Add scroll listener for parallax
    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax(); // Initial call

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateParallax);
    };
  }, []);

  // Group cities by continent
  const citiesByContinent = cityList.reduce((acc, city) => {
    if (!acc[city.continent]) {
      acc[city.continent] = [];
    }
    acc[city.continent].push(city);
    return acc;
  }, {});

  return (
    <WithShell sideNavStartOpen={false}>
      <div ref={containerRef} className={classes.pageWrapper}>
        <div className={classes.heroWrapper}>
          <div ref={heroRef} className={classes.hero}>
            <div className={classes.heroBackground} />
            <Container size="lg">
              <div ref={contentRef} className={classes.heroContent}>
                <Title className={classes.heroTitle} order={1}>
                  Explore Cities Worldwide 🌍
                </Title>
                <Text className={classes.heroText}>
                  Discover real-time weather conditions in major cities across all continents
                </Text>
              </div>
            </Container>
            <div className={classes.waveWrapper}>
              <div className={classes.wave} />
            </div>
          </div>
        </div>

        <Container size="lg" className={classes.content}>
          {Object.entries(citiesByContinent).map(([continent, cities], index) => (
            <div 
              key={continent}
              className={`${classes.continentSection} animate-in`}
              style={{ '--delay': `${index * 100}ms` }}
            >
              <Title order={2} className={classes.continentTitle}>
                {continent}
              </Title>
              <div className={classes.grid}>
                {cities.map((city, cityIndex) => (
                  <div
                    key={city.name}
                    className={`${classes.cardWrapper} animate-in`}
                    style={{ '--delay': `${(index * cities.length + cityIndex) * 50}ms` }}
                  >
                    <CityCard name={city.name} continent={continent} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </div>
    </WithShell>
  );
}
