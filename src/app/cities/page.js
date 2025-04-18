import CityList from "@/components/CityList";

export const metadata = {
    title: 'Weather in The World',
    description: 'Compare climate data for cities around the world. View temperature, rainfall, and weather patterns for any two cities.',
    keywords: 'weather comparison, city climate, temperature comparison, rainfall data, weather patterns, travel, nomad, digital nomad, remote work, retirement, expat',
};

export default function CityListPage() {

    return (
        <div className="flex-1 w-full p-8">
            <h1 className="text-4xl font-bold mb-4">All Cities</h1>
            <CityList />
        </div>
    )
}