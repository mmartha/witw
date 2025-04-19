"use client";

import cityList from "@/lib/cityList";
import { useEffect, useState } from "react";

export default function CityList() {
    const [cityData, setCityData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                setLoading(true);
                const promises = cityList.map(async (city) => {
                    const response = await fetch(`/data/cities/${city.filename}.json`);
                    const data = await response.json();
                    return data;
                });
                
                const results = await Promise.all(promises);
                setCityData(results);
            } catch (error) {
                console.error('Error fetching city data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCityData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cityData.map((city) => (
                <div key={city.city} className="bg-stone-600 p-4 rounded-md">
                    <h5 className="text-2xl font-bold mb-2">{city.city}</h5>
                    <small className="text-xs text-stone-50 italic">{(city.alt_names || []).join(", ")}</small>
                    <p className="text-sm text-stone-50 my-4">{city.description}</p>
                </div>
            ))}
        </div>
    );
}