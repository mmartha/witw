'use client';

import { Container } from '@mantine/core';
import AnnualTempComparison from './AnnualTempComparison';

export default function ClimateCompareClient({ data1, data2, city1Color, city2Color }) {
  return (
    <Container size="lg" py="xl" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <AnnualTempComparison 
        data1={data1} 
        data2={data2} 
        city1Color={city1Color} 
        city2Color={city2Color} 
      />
    </Container>
  );
} 