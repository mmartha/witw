"use client";

import { useState } from 'react';
import TempCompare from './TempCompare';

const CityCompare = ({ cities }) => {
    const [city1, setCity1] = useState("");
    const [city2, setCity2] = useState("");
    const [cityData1, setCityData1] = useState(null);
    const [cityData2, setCityData2] = useState(null);
    const [error, setError] = useState(null);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [city1Months, setCity1Months] = useState(Array.from(months));
    const [city2Months, setCity2Months] = useState(Array.from(months));

    const handleCitySelect = async (filename, setCity, setData) => {
        try {
            setCity(filename)
            const res = await fetch(`/data/cities/${filename}.json`)
            if (!res.ok) throw new Error('City not found')
            const data = await res.json()
            setData(data)
        } catch (err) {
            setError('Failed to load city data')
        }
    }

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex flex-row flex-wrap justify-evenly">
                <select
                    className="inline m-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer"
                    onChange={e => handleCitySelect(e.target.value, setCity1, setCityData1)}
                    value={city1}
                >
                    <option value="" disabled className="text-gray-400">Select first city</option>
                    {cities.map(({ filename: city, name: displayName }) => (
                        <option key={city} value={city} className="p-2">
                            {displayName}
                        </option>
                    ))}
                </select>
                <select
                    className="inline m-3 p-3 border-2 border-gray-200 rounded-lg cursor-pointer"
                    onChange={e => handleCitySelect(e.target.value, setCity2, setCityData2)}
                    value={city2}
                >
                    <option value="" disabled className="text-gray-400">Select second city</option>
                    {cities.map(({ filename: city, name: displayName }) => (
                        <option key={city} value={city} className="p-2">
                            {displayName}
                        </option>
                    ))}
                </select>
            </div>
            <div className=" w-full m-3 p-8 border-2 border-stone-200 rounded-lg flex justify-around items-center">
                {cityData1 && cityData2 && (
                    <TempCompare 
                        data1={city1Months.map(month => cityData1['temperature'][month])} 
                        data2={city2Months.map(month => cityData2['temperature'][month])}
                        city1={city1}
                        city2={city2}
                    />
                )}
            </div>
        </div>
    );
};

export default CityCompare; 