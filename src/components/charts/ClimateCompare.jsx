'use client';
import { useEffect, useState } from 'react';
import { Container, Title, Stack, Text, Group } from '@mantine/core';
import { IconSun, IconTemperaturePlus, IconTemperature, IconTemperatureMinus, IconSnowflake, IconLeaf2 } from '@tabler/icons-react';

export default function ClimateCompare({ data1, data2, city1Color = 'rgba(194, 122, 255, 0.75)', city2Color = 'rgba(187, 244, 81, 0.75)' }) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [clickedCities, setClickedCities] = useState(new Set());
    const [hoveredCity, setHoveredCity] = useState(null);
    const [tempUnits, setTempUnits] = useState('c');

    const [months1, setMonths1] = useState(months)
    const [months2, setMonths2] = useState(months);

    const handleMonthOffset = (setMonths, direction) => {
        setMonths(prev => {
            const newMonths = [...prev];
            if (direction === 'left') {
                newMonths.unshift(newMonths.pop());
            } else {
                newMonths.push(newMonths.shift());
            }
            return newMonths;
        });
    };

    const tempRanges = [
        { c: 45, f: 113, label: 'Hellfire', icon: "🥵" },
        { c: 35, f: 95, label: 'Hot', icon: <IconTemperaturePlus size={20} color="#f54a00" /> },
        { c: 25, f: 77, label: 'Warm', icon: <IconSun size={20} color="#fe9a00" /> },
        { c: 15, f: 59, label: 'Mild', icon: <IconTemperature size={20} color="#9ae600" /> },
        { c: 5, f: 41, label: 'Chilly', icon: <IconLeaf2 size={20} color="#05df72" /> },
        { c: -5, f: 23, label: 'Cold', icon: <IconSnowflake size={20} color="#46edd5" /> },
        { c: -15, f: 5, label: 'Frigid', icon: <IconTemperatureMinus size={20} color="#51a2ff" /> },
        { c: -25, f: -13, label: 'Arctic', icon: "🥶" },
        {c: null, label: '', icon: ''},
        {c: null, label: '', icon: ''}
    ];


    return (
        <>
            <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Title
                    order={1}
                    mb="xl"
                    c="#9810fa"
                    onMouseEnter={() => !clickedCities.has(data1.city) && setHoveredCity(data1.city)}
                    onMouseLeave={() => !clickedCities.has(data1.city) && setHoveredCity(null)}
                    onClick={() => setClickedCities(prev => {
                        const next = new Set([...prev]);
                        if (next.has(data1.city)) {
                            next.delete(data1.city);
                        } else {
                            next.add(data1.city);
                        }
                        return next;
                    })}
                    style={{ 
                        cursor: 'pointer',
                        opacity: clickedCities.has(data1.city) || hoveredCity === data1.city || (!clickedCities.size && hoveredCity === null) ? 1 : 0.5,
                        filter: clickedCities.has(data1.city) || hoveredCity === data1.city || (!clickedCities.size && hoveredCity === null) ? 'none' : 'grayscale(0.8)'
                    }}
                >
                    {data1.city}
                </Title>
                <Title order={1} mb="xl">&nbsp;vs.&nbsp;</Title>
                <Title
                    order={1}
                    mb="xl"
                    c="#00a63e"
                    onMouseEnter={() => !clickedCities.has(data2.city) && setHoveredCity(data2.city)}
                    onMouseLeave={() => !clickedCities.has(data2.city) && setHoveredCity(null)}
                    onClick={() => setClickedCities(prev => {
                        const next = new Set([...prev]);
                        if (next.has(data2.city)) {
                            next.delete(data2.city);
                        } else {
                            next.add(data2.city);
                        }
                        return next;
                    })}
                    style={{ 
                        cursor: 'pointer',
                        opacity: clickedCities.has(data2.city) || hoveredCity === data2.city || (!clickedCities.size && hoveredCity === null) ? 1 : 0.5,
                        filter: clickedCities.has(data2.city) || hoveredCity === data2.city || (!clickedCities.size && hoveredCity === null) ? 'none' : 'grayscale(0.8)'
                    }}
                >
                    {data2.city}
                </Title>
            </Container>
            <Container style={{width: '100%', height: '50vh', marginTop: 40, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                {/* Temperature Scale */}
                <Stack
                    justify="space-between"
                    h="100%"
                    style={{
                        marginTop: '-0.5rem',
                        paddingRight: '1rem',
                        minWidth: '80px',
                        position: 'relative',
                        height: '84%'
                    }}
                >
                    <div style={{position: 'absolute', top: -30, left: 0, zIndex: 5}}>
                        <button
                            onClick={() => setTempUnits(tempUnits === 'c' ? 'f' : 'c')}
                            style={{ background: '#f5f5f5', borderRadius: 5, border: 'none', cursor: 'pointer', color: '#ccc' }}
                        >
                            °C / °F
                        </button>
                    </div>
                    {tempRanges.map((range, index) => (
                        <Group key={range.label} gap="xs" wrap="nowrap">
                            {range.icon}
                            {range.label && (
                                <Text size="xs" c="dimmed">
                                    {range[tempUnits]}°{tempUnits.toUpperCase()}
                                </Text>
                            )}
                        </Group>
                    ))}
                </Stack>
                <div style={{ position: 'relative', flex: 1, height: '100%', paddingLeft: 40, paddingRight: 20 }}>
                    {/* Temperature visualization with gradient */}
                    <svg width="100%" height="50vh" viewBox="0 0 1000 500" preserveAspectRatio="none">
                    {/* Gradient Definition */}
                    <defs>
                        <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ed6bff" />
                            <stop offset="8%" stopColor="#ff6467" />
                            <stop offset="15%" stopColor="#ff6467" />
                            <stop offset="25%" stopColor="#fe9a00" />
                            <stop offset="35%" stopColor="#9ae600" />
                            <stop offset="40%" stopColor="#05df72" />
                            <stop offset="45%" stopColor="#05df72" />
                            <stop offset="70%" stopColor="#00d3f3" />
                            <stop offset="80%" stopColor="#51a2ff" />
                            <stop offset="90%" stopColor="#7c86ff" />
                            <stop offset="100%" stopColor="#8e51ff" />
                        </linearGradient>

                        {/* Mask Definition */}
                        {/* MASK: white = clear, black = full white veil, gray = partial veil */}
                        <mask id="bar-mask" mask-type="luminance">
                        {/* Entire mask is black = full white veil */}
                        <rect x="0" y="0" width="100%" height="100%" fill="white" fill-opacity="1" />
                        
                        {/* Bars act like "light leaks" in the veil */}
                        {months.map((m, i) => {
                            const x = (100/12) * i;
                            const w = `calc((100vw - 100px) / 12)`;
                            const h1 = (data1.weather[m].temperature.high - data1.weather[m].temperature.low);
                            const h2 = (data2.weather[m].temperature.high - data2.weather[m].temperature.low);
                            const y1 = 50 - data1.weather[months2[months1.indexOf(m)]].temperature.high;
                            const y2 = 50 - data2.weather[months1[months1.indexOf(m)]].temperature.high;

                            return (
                            <g key={i}>
                                <rect x={`${x}%`} y={`${y1}%`} width={w} height={`${h1}%`} fill="black" 
                                    fillOpacity={clickedCities.has(data1.city) || hoveredCity === data1.city ? 0.75 : 0.5} 
                                />
                                <rect x={`${x}%`} y={`${y2}%`} width={w} height={`${h2}%`} fill="black" 
                                    fillOpacity={clickedCities.has(data2.city) || hoveredCity === data2.city ? 0.75 : 0.5}
                                />
                            </g>
                            );
                        })}
                        </mask>
                    </defs>

                    {/* Underlying Gradient */}
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#temperatureGradient)" />

                    {/* White layer with punched-out bars */}
                    <rect x="0" y="0" width="100%" height="100%" fill="white" mask="url(#bar-mask)" />

                </svg>

                    <div style={{position: 'absolute', right: 0, top: -40, width: '100%', zIndex: 5, display: 'flex', justifyContent: 'space-evenly', textAlign: 'center'}}>
                        <button 
                            onClick={() => handleMonthOffset(setMonths1, 'left')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9810fa' }}
                        >
                            {'<'}
                        </button>
                        {months1.map(m => (
                            <div key={m} style={{ position: 'relative', width: '100%', margin: 0, color: '#9810fa', fontWeight: 'bold' }}>
                                {months.indexOf(m) + 1}
                            </div>
                        ))}
                        <button 
                            onClick={() => handleMonthOffset(setMonths1, 'right')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9810fa' }}
                        >
                            {'>'}
                        </button>
                    </div>
                    <div style={{position: 'absolute', right: 0, bottom: 30, width: '100%', zIndex: 5, display: 'flex', justifyContent: 'space-evenly', textAlign: 'center'}}>
                        <button 
                            onClick={() => handleMonthOffset(setMonths2, 'left')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00a63e' }}
                        >
                            {'<'}
                        </button>
                        {months2.map(m => (
                            <div key={m} style={{ position: 'relative', width: '100%', margin: 0, color: '#00a63e', fontWeight: 'bold' }}>
                                {months.indexOf(m) + 1}
                            </div>
                        ))}
                        <button 
                            onClick={() => handleMonthOffset(setMonths2, 'right')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00a63e' }}
                        >
                            {'>'}
                        </button>
                    </div>
                </div>
            </Container>
        </>

    )
}