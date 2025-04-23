'use client';
import { useEffect, useState } from 'react';
import { Container, Title } from '@mantine/core';
export default function ClimateCompare({ data1, data2, city1Color, city2Color }) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [hovered, setHovered] = useState(null);

    return (
        <>
            <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Title order={1} mb="xl" c={city1Color} style={{ cursor: 'pointer' }} onHover={() => setHovered(data1.city)} onMouseLeave={() => setHovered(null)} onClick={() => setHovered(data1.city)}>
                    {data1.city}
                </Title>
                <Title order={1} mb="xl">&nbsp;vs.&nbsp;</Title>
                <Title order={1} mb="xl" c={city2Color} style={{ cursor: 'pointer' }} onHover={() => setHovered(data2.city)} onMouseLeave={() => setHovered(null)} onClick={() => setHovered(data2.city)}>
                    {data2.city}
                </Title>
            </Container>
            <div style={{ flex: 1, height: '100%', width: '100%', display: 'flex', alignItems: 'stretch', justifyContent: 'space-evenly' }}>
                {months.map(m => (
                    <div key={m} style={{ position: 'relative', width: '100%', margin: '0px 1px' }}>
                        <div style={{ position: 'absolute', top: `${50 - data2.weather[m].temperature.record_high}%`, height: `${(data2.weather[m].temperature.record_high - data2.weather[m].temperature.record_low)}%`, width: '100%', backgroundColor: city2Color, opacity: 0.25, borderRadius: '90%' }} />
                        <div style={{ position: 'absolute', top: `${50 - data1.weather[m].temperature.record_high}%`, height: `${(data1.weather[m].temperature.record_high - data1.weather[m].temperature.record_low)}%`, width: '100%', backgroundColor: city1Color, opacity: 0.25, borderRadius: '90%' }} />
                        <div style={{ position: 'absolute', top: `${50 - data1.weather[m].temperature.high}%`, height: `${(data1.weather[m].temperature.high - data1.weather[m].temperature.low)}%`, width: '100%', backgroundColor: city1Color, borderRadius: '90%' }} />
                        <div style={{ position: 'absolute', top: `${50 - data2.weather[m].temperature.high}%`, height: `${(data2.weather[m].temperature.high - data2.weather[m].temperature.low)}%`, width: '100%', backgroundColor: city2Color, borderRadius: '90%' }} />
                    </div>
                ))}
            </div>
        </>
        
    )
}