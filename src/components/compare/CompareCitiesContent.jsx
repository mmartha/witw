'use client';

import { useState } from 'react';
import { Container, Title } from '@mantine/core';
import AnnualTempComparison from './AnnualTempComparison';
import AnnualSunComparison from './AnnualSunComparison';
export default function ClimateCompareClient({ data1, data2, city1Color = '#9810fa', city2Color = '#00a63e' }) {
  const [clickedCities, setClickedCities] = useState(new Set());
  const [hoveredCity, setHoveredCity] = useState(null);
    
  return (
    <>
      <Container size="lg" py="xl" px="xl" style={{ minWidth: '50%', maxWidth: 500, display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexFlow: 'row wrap' }}>
        <Title
          order={1}
          mb="sm"
          c={city1Color}
          onMouseEnter={() => !clickedCities.has(data1.city) && setHoveredCity(data1.city)}
          onMouseLeave={() => !clickedCities.has(data1.city) && setHoveredCity(null)}
          onClick={() => setClickedCities(prev => {
            const next = new Set([...prev]);
            if (next.has(data1.city)) {
              next.delete(data1.city);
            } else {
              next.add(data1.city);
            }
            return next;
          })}
          style={{
            cursor: 'pointer',
            opacity: clickedCities.has(data1.city) || hoveredCity === data1.city || (!clickedCities.size && hoveredCity === null) ? 1 : 0.5,
            filter: clickedCities.has(data1.city) || hoveredCity === data1.city || (!clickedCities.size && hoveredCity === null) ? 'none' : 'grayscale(0.8)'
          }}
        >
          {data1.city}
        </Title>
        <Title order={1} mb="sm">&nbsp;vs.&nbsp;</Title>
        <Title
          order={1}
          mb="sm"
          c={city2Color}
          onMouseEnter={() => !clickedCities.has(data2.city) && setHoveredCity(data2.city)}
          onMouseLeave={() => !clickedCities.has(data2.city) && setHoveredCity(null)}
          onClick={() => setClickedCities(prev => {
            const next = new Set([...prev]);
            if (next.has(data2.city)) {
              next.delete(data2.city);
            } else {
              next.add(data2.city);
            }
            return next;
          })}
          style={{
            cursor: 'pointer',
            opacity: clickedCities.has(data2.city) || hoveredCity === data2.city || (!clickedCities.size && hoveredCity === null) ? 1 : 0.5,
            filter: clickedCities.has(data2.city) || hoveredCity === data2.city || (!clickedCities.size && hoveredCity === null) ? 'none' : 'grayscale(0.8)'
          }}
        >
          {data2.city}
        </Title>
      </Container>
      <AnnualTempComparison
          data1={data1}
          data2={data2}
          clickedCities={clickedCities}
          hoveredCity={hoveredCity}
          city1Color={city1Color}
          city2Color={city2Color}
          setHoveredCity={(cityName) => setHoveredCity(cityName)}
        />
        <AnnualSunComparison
          data1={data1}
          data2={data2}
          clickedCities={clickedCities}
          hoveredCity={hoveredCity}
          city1Color={city1Color}
          city2Color={city2Color}
        />
    </>

  );
} 