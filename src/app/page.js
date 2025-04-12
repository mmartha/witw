// src/app/page.jsx — SERVER component (default)
import CityCompare from '../components/CityCompare';
import cityList from "@/lib/cityList";

export const metadata = {
  title: 'Weather in the World - Compare City Climates',
  description: 'Compare climate data for cities around the world. View temperature, rainfall, and weather patterns for any two cities.',
  keywords: 'weather comparison, city climate, temperature comparison, rainfall data, weather patterns',
};

export default function Home() {
  const cities = ['rome', 'istanbul', 'tokyo', 'paris'];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-6xl font-bold">Weather in the World</h1>
        <h2 className="text-2xl font-bold">Compare any two cities: climate, rainfall, temperature, and more.</h2>
        <CityCompare cities={cityList} />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <h3><small>Copyright 2025</small></h3>
      </footer>
    </div>
  );
}
