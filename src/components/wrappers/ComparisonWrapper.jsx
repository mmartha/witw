'use client';

import dynamic from 'next/dynamic';

const ClimateCompareClient = dynamic(
  () => import('@/components/compare/CompareCitiesContent'),
  { ssr: false }
);

export default function ComparisonWrapper({ data1, data2, city1Color, city2Color }) {
  return (
    <ClimateCompareClient 
      data1={data1} 
      data2={data2} 
      city1Color={city1Color} 
      city2Color={city2Color} 
    />
  );
} 