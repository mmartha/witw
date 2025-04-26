'use client';
import { useEffect, useState } from 'react';
import { Container, Title, Stack, Text, Group } from '@mantine/core';
import { IconSun, IconTemperaturePlus, IconTemperature, IconTemperatureMinus, IconSnowflake, IconLeaf2 } from '@tabler/icons-react';

export default function ClimateCompare({ data1, data2, city1Color = 'rgba(194, 122, 255, 0.75)', city2Color = 'rgba(187, 244, 81, 0.75)' }) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [clickedCities, setClickedCities] = useState(new Set());
    const [hoveredCity, setHoveredCity] = useState(null);

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
        { min: 45, label: 'Hellfire', icon: "🥵" },
        { min: 35, label: 'Hot', icon: <IconTemperaturePlus size={20} color="#f54a00" /> },
        { min: 25, label: 'Warm', icon: <IconSun size={20} color="#fe9a00" /> },
        { min: 15, label: 'Mild', icon: <IconTemperature size={20} color="#9ae600" /> },
        { min: 5, label: 'Chilly', icon: <IconLeaf2 size={20} color="#05df72" /> },
        { min: -5, label: 'Cold', icon: <IconSnowflake size={20} color="#46edd5" /> },
        { min: -15, label: 'Frigid', icon: <IconTemperatureMinus size={20} color="#51a2ff" /> },
        { min: -25, label: 'Arctic', icon: "🥶" },
        {min: null, label: '', icon: ''},
        {min: null, label: '', icon: ''}
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
                    {tempRanges.map((range, index) => (
                        <Group key={range.label} gap="xs" wrap="nowrap">
                            {range.icon}
                            {range.label && (
                                <Text size="xs" c="dimmed">
                                    {range.min}°C
                                </Text>
                            )}
                        </Group>
                    ))}
                </Stack>
                <div style={{ position: 'relative', flex: 1, height: '100%' }}>
                    {/* Decorative layer */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 2,
                        display: 'flex', 
                        alignItems: 'stretch', 
                        justifyContent: 'space-evenly',
                        pointerEvents: 'none'
                    }}>
                        {months1.map(m => (
                            <div key={`decorative-${m}`} style={{ position: 'relative', width: '100%', height: '100%', margin: '0px 1px', display: 'inline-block' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: `${50 - data1.weather[m].temperature.high}%`,
                                    height: `${(data1.weather[m].temperature.high - data1.weather[m].temperature.low)}%`,
                                    width: '100%',
                                    borderRadius: '20%',
                                    border: clickedCities.has(data1.city) ? '2px solid #9810fa' : 'none',
                                    boxShadow: `0 0 5px #9810fa, 0 0 10px #9810fa, inset 0 0 3px #9810fa`
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: `${50 - data2.weather[months2[months1.indexOf(m)]].temperature.high}%`,
                                    height: `${(data2.weather[months2[months1.indexOf(m)]].temperature.high - data2.weather[months2[months1.indexOf(m)]].temperature.low)}%`,
                                    width: '100%',
                                    borderRadius: '20%',
                                    border: clickedCities.has(data2.city) ? '2px solid #00a63e' : 'none',
                                    boxShadow: `0 0 5px #00a63e, 0 0 10px #00a63e, inset 0 0 3px #00a63e`
                                }} />
                            </div>
                        ))}
                    </div>

                    {/* Temperature visualization with gradient */}
                    <div style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%', 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'stretch', 
                        justifyContent: 'space-evenly',
                        background: `linear-gradient(to bottom,
                            #ed6bff 0%,
                            #ff6467 8%,
                            #ff6467 15%,
                            #fe9a00 25%,
                            #9ae600 35%,
                            #05df72 40%,
                            #05df72 45%,
                            #00d3f3 70%,
                            #51a2ff 80%,
                            #7c86ff 90%,
                            #8e51ff 100%
                        )`,
                        filter: 'brightness(5)',
                        zIndex: 1
                    }}>
                        {months1.map(m => (
                            <div key={m} style={{ position: 'relative', width: '100%', margin: '0px 1px' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: `${50 - data1.weather[m].temperature.high}%`,
                                    height: `${(data1.weather[m].temperature.high - data1.weather[m].temperature.low)}%`,
                                    width: '100%',
                                    borderRadius: '20%'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: clickedCities.has(data1.city) || hoveredCity === data1.city || (!clickedCities.size && hoveredCity === null) ? 'rgba(0, 0, 255, 0.75)' : 'transparent',
                                        borderRadius: '20%',
                                        filter: 'brightness(0.0001)',
                                        mixBlendMode: 'multiply'
                                    }} />
                                </div>
                                <div style={{
                                    position: 'absolute',
                                    top: `${50 - data2.weather[months2[months1.indexOf(m)]].temperature.high}%`,
                                    height: `${(data2.weather[months2[months1.indexOf(m)]].temperature.high - data2.weather[months2[months1.indexOf(m)]].temperature.low)}%`,
                                    width: '100%',
                                    borderRadius: '20%'
                                }}>
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        background: clickedCities.has(data2.city) || hoveredCity === data2.city || (!clickedCities.size && hoveredCity === null) ? 'rgba(0, 0, 255, 0.75)' : 'transparent',
                                        borderRadius: '20%',
                                        filter: 'brightness(0.0001)',
                                        mixBlendMode: 'multiply'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
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