"use client";

import React from 'react';
import Column from './Column';

export default function DataSet({ city1, city2, data1, data2 }) {
    console.log(city1)
    console.log(city2)
    const globalMin = Math.min(...data1.map(data => data.low), ...data2.map(data => data.low));
    const globalMax = Math.max(...data1.map(data => data.high), ...data2.map(data => data.high));
    return (
        <div className="flex gap-4 w-full justify-around">
            {data1.map((data, i) => (
                <div key={`${city1-city2}-${i}`} className="flex flex-col gap-2 w-full h-full">
                    <Column 
                        key={`${city1}-${city2}-${i}`}
                        min1={data.low} 
                        max1={data.high} 
                        min2={data2[i].low} 
                        max2={data2[i].high} 
                        globalMin={globalMin} 
                        globalMax={globalMax}
                    />
                </div>
            ))}
        </div>
    )
}