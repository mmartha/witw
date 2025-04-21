'use client';

import { useEffect, useState } from 'react';
import { Container, Title, Text, rem } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

export default function ParallaxHero({ 
  title, 
  description, 
  emoji = '🌤️',
  height = '30vh',
  children,
  backgroundGradient = 'linear-gradient(135deg, var(--mantine-color-blue-6) 0%, var(--mantine-color-cyan-6) 100%)'
}) {
  const [scrollY, setScrollY] = useState(0);
  const { height: viewportHeight } = useViewportSize();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax effects
  const parallaxOffset = scrollY * 0.5; // More subtle movement
  const opacity = Math.max(0, 1 - (scrollY / (viewportHeight * 0.5)));

  return (
    <div style={{ 
      position: 'relative',
      minHeight: height,
      background: backgroundGradient,
      color: 'white',
      overflow: 'hidden'
    }}>
      {/* Parallax Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transform: `translateY(${parallaxOffset}px)`,
        opacity: opacity,
        transition: 'transform 0.1s ease-out'
      }}>
        {/* Emoji */}
        <div style={{
          position: 'absolute',
          right: '10%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: rem(150),
          opacity: 0.2,
          filter: 'blur(2px)',
          pointerEvents: 'none'
        }}>
          {emoji}
        </div>
      </div>

      {/* Content */}
      <Container 
        size="lg" 
        style={{ 
          position: 'relative',
          zIndex: 1,
          padding: '10rem 0 6rem',
          transform: `translateY(${parallaxOffset * 0.2}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div style={{ maxWidth: 800 }}>
          <Title 
            order={1} 
            style={{ 
              fontSize: rem(56),
              marginBottom: rem(24),
              transform: `translateY(${parallaxOffset * 0.3}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {title}
          </Title>
          <Text 
            size="xl" 
            style={{ 
              opacity: 0.9,
              transform: `translateY(${parallaxOffset * 0.1}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {description}
          </Text>
          {children}
        </div>
      </Container>

      {/* Wave Divider */}
      <div style={{
        position: 'absolute',
        bottom: -1,
        left: 0,
        width: '100%',
        height: '4rem',
        background: 'var(--mantine-color-body)',
        clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
        zIndex: 2
      }} />
    </div>
  );
} 