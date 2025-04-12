// src/app/page.jsx
'use client'
import { useState, useEffect } from 'react'

export default function ClimateCompare() {
  const [cities, setCities] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [cityData, setCityData] = useState(null)

  useEffect(() => {
    // Fetch available cities
    fetch('/api/cities')
      .then(res => res.json())
      .then(data => setCities(data))
      .catch(err => console.error('Error fetching cities:', err))
  }, [])

  useEffect(() => {
    if (selectedCity) {
      // Fetch city data
      fetch(`/public/data/cities/${selectedCity}.json`)
        .then(res => res.json())
        .then(data => setCityData(data))
        .catch(err => console.error('Error fetching city data:', err))
    }
  }, [selectedCity])

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Weather Hello World 🌍</h1>

      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">Select a city</option>
        {cities.map(city => (
          <option key={city} value={city}>
            {city.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </option>
        ))}
      </select>

      {cityData && (
        <div>
          <h2 className="text-xl font-bold mb-2">{cityData.city}</h2>
          {cityData.alt_names && (
            <p className="text-sm text-gray-600 mb-2">
              Also known as: {cityData.alt_names.join(', ')}
            </p>
          )}
          {cityData.description && (
            <p className="mb-4 text-gray-600">{cityData.description}</p>
          )}
          {cityData.keywords && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-1">Keywords:</h3>
              <div className="flex flex-wrap gap-2">
                {cityData.keywords.map(keyword => (
                  <span key={keyword} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <h3 className="text-lg font-semibold mb-2">Temperature Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {Object.entries(cityData.temperature).map(([month, data]) => (
              <div key={month} className="border p-4 rounded">
                <h4 className="font-semibold">{month}</h4>
                <p>Mean: {data.mean}°C</p>
                <p>High: {data.high}°C</p>
                <p>Low: {data.low}°C</p>
              </div>
            ))}
          </div>

          {cityData.times_to_visit && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Best Times to Visit</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(cityData.times_to_visit).map(([season, info]) => (
                  <div key={season} className="border p-4 rounded">
                    <h4 className="font-semibold capitalize mb-2">{season}</h4>
                    <p className="text-sm text-gray-600 mb-2">{info.description}</p>
                    <p className="text-sm mb-2">
                      <span className="font-medium">Temperature:</span> {info.temperature_range}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-medium">Precipitation:</span> {info.precipitation}
                    </p>
                    <p className="text-sm mb-2">
                      <span className="font-medium">Crowds:</span> {info.crowds}
                    </p>
                    <div className="mt-2">
                      <h5 className="text-sm font-medium mb-1">Notable Events:</h5>
                      <ul className="text-sm list-disc list-inside">
                        {info.events.map(event => (
                          <li key={event}>{event}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
