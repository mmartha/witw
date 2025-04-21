'use client';

import { Container, Title, Text } from '@mantine/core';
import { useEffect, useRef } from 'react';

export default function CitiesHero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const updateParallax = () => {
      if (!heroRef.current || !contentRef.current) return;
      
      const scrolled = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      if (scrolled <= viewportHeight) {
        const progress = scrolled / viewportHeight;
        const scale = 1 + progress * 0.1;
        const opacity = Math.max(0, 1 - progress * 1.5);
        
        heroRef.current.style.transform = `scale(${scale})`;
        contentRef.current.style.opacity = opacity;
        contentRef.current.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
      }
    };

    window.addEventListener('scroll', updateParallax, { passive: true });
    updateParallax();

    return () => window.removeEventListener('scroll', updateParallax);
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          background: 'var(--mantine-color-blue-6)',
          padding: '8rem 0 6rem',
          color: 'white',
        }}
      >
        <Container size="lg">
          <div ref={contentRef} style={{ position: 'relative', zIndex: 1 }}>
            <Title order={1} size="3.5rem" fw={900}>
              Explore Cities Worldwide 🌍
            </Title>
            <Text size="xl" mt="xl" maw={600}>
              Discover real-time weather conditions and local insights for cities around the globe. 
              Plan your travels with confidence using our comprehensive city guides.
            </Text>
          </div>
        </Container>

        <div className="hero-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="var(--mantine-color-body)"
            />
          </svg>
        </div>
      </div>

      <style jsx global>{`
        .hero-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          line-height: 0;
          transform: rotate(180deg);
        }
        
        .hero-wave svg {
          position: relative;
          display: block;
          width: calc(100% + 1.3px);
          height: 70px;
        }
      `}</style>
    </div>
  );
} 