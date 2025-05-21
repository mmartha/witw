'use client';
import { useEffect, useState, useRef } from 'react';
import { Container, Title, Stack, Text, Group } from '@mantine/core';
import { IconSun, IconTemperaturePlus, IconTemperature, IconTemperatureMinus, IconSnowflake, IconLeaf2 } from '@tabler/icons-react';
import moment from 'moment';

export default function AnnualTempComparison({ data1, data2, clickedCities, hoveredCity, city1Color = '#9810fa', city2Color = '#00a63e' }) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [tempUnits, setTempUnits] = useState('c');
    
    const chartRef = useRef(null);
    const [barWidth, setBarWidth] = useState(0);

    const [months1, setMonths1] = useState(months)
    const [months2, setMonths2] = useState(months);

    useEffect(() => {
        function updateBarWidth() {
          if (chartRef.current) {
            const containerWidth = chartRef.current.clientWidth;
            const usableWidth = containerWidth - 60; // subtract legend or padding
            setBarWidth(Math.max((usableWidth / 12), 50));
          }
        }
      
        updateBarWidth();
        window.addEventListener('resize', updateBarWidth);
        return () => window.removeEventListener('resize', updateBarWidth);
      }, []);

    const handleMonthOffset = (setMonths, direction) => {
        setMonths(prev => {
            const newMonths = [...prev];
            if (direction === 'left') {
                newMonths.push(newMonths.shift());
            } else {
                newMonths.unshift(newMonths.pop());
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
        { c: null, label: '', icon: '' },
        { c: null, label: '', icon: '' }
    ];

    return (
        <>
            <Container size="lg" py="xl" style={{ width: '100%', minHeight: '50vh', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
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
                    <div style={{ position: 'absolute', top: -30, left: 0, zIndex: 5 }}>
                        <button
                            onClick={() => setTempUnits(tempUnits === 'c' ? 'f' : 'c')}
                            style={{ background: '#f5f5f5', borderRadius: 5, border: 'none', cursor: 'pointer', color: '#ccc' }}
                        >
                            °C / °F
                        </button>
                    </div>
                    {tempRanges.map((range, index) => (
                        <Group key={index} gap="xs" wrap="nowrap">
                            {range.icon}
                            {range.label && (
                                <Text size="xs" c="dimmed">
                                    {range[tempUnits]}°{tempUnits.toUpperCase()}
                                </Text>
                            )}
                        </Group>
                    ))}
                </Stack>
                <div ref={chartRef} style={{ position: 'relative', flex: 1, height: '100%', paddingLeft: 40, paddingRight: 20 }}>
                    {/* Temperature visualization with gradient */}
                    <svg width="100%" height="50vh" viewBox="0 0 1000 500" preserveAspectRatio="none" style={{nminWidth: 120}}>
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
                                {months1.map((m1, j) => {
                                    const i = (j+1)%12;
                                    const x = (100 / 12) * i;
                                    const w = barWidth;
                                    const m2 = months2[i];
                                    const h1 = (data1.weather[m1].temperature.high - data1.weather[m1].temperature.low);
                                    const h2 = (data2.weather[m2].temperature.high - data2.weather[m2].temperature.low);
                                    const y1 = 50 - data1.weather[m1].temperature.high;
                                    const y2 = 50 - data2.weather[m2].temperature.high;

                                    return (
                                        <g key={i}>
                                            <rect x={`${x}%`} y={`${y1}%`} width={w} height={`${h1}%`} fill="black"
                                                fillOpacity={clickedCities.has(data1.city) ? 0.65 : (hoveredCity === data1.city ? 0.85 : 0.35)}
                                                style={{ transition: 'all 0.5s ease' }}
                                            />
                                            <rect x={`${x}%`} y={`${y2}%`} width={w} height={`${h2}%`} fill="black"
                                                fillOpacity={clickedCities.has(data2.city) ? 0.65 : (hoveredCity === data2.city ? 0.85 : 0.35)}
                                                style={{ transition: 'all 0.5s ease' }}
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

                        {/* Visible borders on top */}
                        {
                            months1.map((m1, j) => {
                                const i = (j+1)%12;
                                const x = (100 / 12) * i;
                                const w = barWidth;
                                const m2 = months2[i];
                                const h1 = (data1.weather[m1].temperature.high - data1.weather[m1].temperature.low);
                                const h2 = (data2.weather[m2].temperature.high - data2.weather[m2].temperature.low);
                                const y1 = 50 - data1.weather[m1].temperature.high;
                                const y2 = 50 - data2.weather[m2].temperature.high;

                                return (
                                    <g key={`borders-${i}`}>
                                        {clickedCities.has(data1.city) && (
                                            <rect x={`${x}%`} y={`${y1}%`} width={w} height={`${h1}%`}
                                                fill="none" stroke={city1Color} strokeWidth="2" style={{ transition: 'all 0.5s ease' }} />
                                        )}
                                        {clickedCities.has(data2.city) && (
                                            <rect x={`${x}%`} y={`${y2}%`} width={w} height={`${h2}%`}
                                                fill="none" stroke={city2Color} strokeWidth="2" style={{ transition: 'all 0.5s ease' }} />
                                        )}
                                    </g>
                                );
                            })
                        }

                    </svg>

                    {/* months sliders */}
                    <div style={{ position: 'absolute', right: 0, top: -40, width: '100%', zIndex: 5, display: 'flex', justifyContent: 'space-evenly', textAlign: 'center' }}>
                        <button
                            onClick={() => handleMonthOffset(setMonths1, 'left')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9810fa' }}
                        >
                            {'<'}
                        </button>
                        {months1.map(m => (
                            <div key={m} style={{ position: 'relative', width: '100%', margin: 0, color: '#9810fa', fontWeight: 'bold' }}>
                                {moment().month(months.indexOf(m)).format('MMM').slice(0, barWidth < 51 ? 1 : 3)}
                            </div>
                        ))}
                        <button
                            onClick={() => handleMonthOffset(setMonths1, 'right')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9810fa' }}
                        >
                            {'>'}
                        </button>
                    </div>
                    <div style={{ position: 'absolute', right: 0, bottom: 30, width: '100%', zIndex: 5, display: 'flex', justifyContent: 'space-evenly', textAlign: 'center' }}>
                        <button
                            onClick={() => handleMonthOffset(setMonths2, 'left')}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00a63e' }}
                        >
                            {'<'}
                        </button>
                        {months2.map(m => (
                            <div key={m} style={{ position: 'relative', width: '100%', margin: 0, color: '#00a63e', fontWeight: 'bold' }}>
                                {moment().month(months.indexOf(m)).format('MMM').slice(0, barWidth < 51 ? 1 : 3)}
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