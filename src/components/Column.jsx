'use client';

import React, { useState, useEffect } from 'react';

export default function Column({ min1, max1, min2, max2, globalMin, globalMax }) {
    const [col_height, setColHeight] = useState(300);
    const [range, setRange] = useState(globalMax - globalMin);
    const [m, setM] = useState(col_height / range);
    const [h0, setH0] = useState(globalMin);
    const [h1, setH1] = useState(Math.min(min1, min2));
    const [h2, setH2] = useState(Math.max(min1, min2));
    const [h3, setH3] = useState(max1);
    const [h4, setH4] = useState(max2);
    const [c2, setC2] = useState(min1 < min2 ? 1 : 2);
    const [c3, setC3] = useState(min1 < min2 ? 1.5 : 1);
    const [c4, setC4] = useState(min1 < min2 ? 2 : 1.5);

    useEffect(() => {
        setRange(globalMax - globalMin);
        setM(col_height / (globalMax - globalMin));
        setH0(globalMin);
        setH1(Math.min(min1, min2));
        setH2(Math.max(min1, min2));
        setH3(max1);
        setH4(max2);
        setC2(min1 < min2 ? 1 : 2);
        setC3(min1 < min2 ? 1.5 : 1);
        setC4(min1 < min2 ? 2 : 1.5);
    }, [min1, max1, min2, max2, globalMin, globalMax]);

    const color = (i) => {
        switch (i) {
            case 1:
                return '#EF5229';
            case 2:
                return '#93366B';
            case 0:
                return '#fff';
            case 1.5:
                return '#45223A';
        }
    }

    const style = {
        height: '300px',
        paddingLeft: '0.5%',
        paddingRight: '0.5%',
        backgroundColor: color(0),
        color: 'black',
        flex: 1,
    }

    return (
        <div className="d-flex flex-column-reverse align-items-end">
            <Section height={(h1-h0) * m} color={color(0)}/>
            <Section height={(h2-h1) * m} color={color(c2)}/>
            <Section height={(h3-h2) * m} color={color(c3)}/>
            <Section height={(h4-h3) * m} color={color(c4)}/>
        </div>
    )
}

function Section({ height, color }) {
    return (
        <div className="flex w-full align-start justify-center" style={{ height, backgroundColor: color }} />
    )
}