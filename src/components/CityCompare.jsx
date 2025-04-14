"use client";

import { useState } from 'react';

const CityCompare = ({ cities }) => {
    const [city1, setCity1] = useState(null);
    const [city2, setCity2] = useState(null);
    const [selectedCity1, setSelectedCity1] = useState('');
    const [selectedCity2, setSelectedCity2] = useState('');
    const [error, setError] = useState(null);

    const handleCitySelect = async (filename, setCity, setSelected) => {
        try {
            setSelected(filename);
            const res = await fetch(`/data/cities/${filename}.json`)
            if (!res.ok) throw new Error('City not found')
            const data = await res.json()
            setCity(data)
        } catch (err) {
            setError('Failed to load city data')
        }
    }

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Compare Cities</h1>

            <div className="grid grid-cols-2 gap-4 mb-8 text-black">
                <div>
                    <div className="relative">
                        <select
                            className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white shadow-sm hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 cursor-pointer"
                            onChange={(e) => handleCitySelect(e.target.value, setCity1, setSelectedCity1)}
                            value={selectedCity1}
                        >
                            <option value="" disabled className="text-gray-400">Select first city</option>
                            {cities.map(({ filename, name }) => (
                                <option key={filename} value={filename} className="p-2">
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <div className="relative">
                        <select
                            className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white shadow-sm hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200 cursor-pointer"
                            onChange={(e) => handleCitySelect(e.target.value, setCity2, setSelectedCity2)}
                            value={selectedCity2}
                        >
                            <option value="" disabled className="text-gray-400">Select second city</option>
                            {cities.map(({ filename, name }) => (
                                <option key={filename} value={filename} className="p-2">
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {city1 && (
                    <div className="border p-4 rounded">
                        <h2 className="text-xl font-bold mb-2">{city1.city}</h2>
                        <p className="mb-4">{city1.description}</p>
                        <h3 className="font-bold mb-2">Monthly Temperatures (°C)</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(city1.temperature).map(([month, temp]) => (
                                <div key={month} className="border p-2 rounded">
                                    <div className="font-bold">{month}</div>
                                    <div>Avg: {temp.mean}°</div>
                                    <div>High: {temp.high}°</div>
                                    <div>Low: {temp.low}°</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {city2 && (
                    <div className="border p-4 rounded">
                        <h2 className="text-xl font-bold mb-2">{city2.city}</h2>
                        <p className="mb-4">{city2.description}</p>
                        <h3 className="font-bold mb-2">Monthly Temperatures (°C)</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {Object.entries(city2.temperature).map(([month, temp]) => (
                                <div key={month} className="border p-2 rounded">
                                    <div className="font-bold">{month}</div>
                                    <div>Avg: {temp.mean}°</div>
                                    <div>High: {temp.high}°</div>
                                    <div>Low: {temp.low}°</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CityCompare; 