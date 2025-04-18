// src/app/page.jsx — SERVER component (default)
import CityCompare from '../components/CityCompare';
import cityList from "@/lib/cityList";

export const metadata = {
  title: 'Weather in the World - Compare City Climates',
  description: 'Compare climate data for cities around the world. View temperature, rainfall, and weather patterns for any two cities.',
  keywords: 'weather comparison, city climate, temperature comparison, rainfall data, weather patterns, travel, nomad, digital nomad, remote work, retirement, expat',
};

export default function Home() {

  return (
    <main className="h-full w-full p-4 md:px-20 md:py-10 lg:px-40 lg:py-20 flex flex-wrap">
      <h2 className="w-full text-center">Let's compare two cities</h2>
      <section className="snap-start w-full h-full h-auto flex flex-col align-stretch">
        <div className="h-full w-full flex-1">
          <CityCompare cities={cityList} />
        </div>
      </section>
    </main>
  );
}
