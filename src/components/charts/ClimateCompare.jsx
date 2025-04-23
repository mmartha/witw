export default function ClimateCompare({ data1, data2, city1Color, city2Color }) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    console.log(data1);
    console.log(data2);
    return (
        <div style={{ flex: 1, height: '100%', width: '100%', display: 'flex', alignItems: 'stretch', justifyContent: 'space-evenly' }}>
            {months.map(m => (
                <div key={m} style={{ position: 'relative', width: '100%', margin: '0px 1px', border: '1px solid rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ position: 'absolute', top: `${50 - data2.weather[m].temperature.record_high}%`, height: `${(data2.weather[m].temperature.record_high - data2.weather[m].temperature.record_low)}%`, width: '100%', backgroundColor: city2Color, opacity: 0.25, borderRadius: '90%' }} />
                    <div style={{ position: 'absolute', top: `${50 - data1.weather[m].temperature.record_high}%`, height: `${(data1.weather[m].temperature.record_high - data1.weather[m].temperature.record_low)}%`, width: '100%', backgroundColor: city1Color, opacity: 0.25, borderRadius: '90%' }} />
                    <div style={{ position: 'absolute', top: `${50 - data1.weather[m].temperature.high}%`, height: `${(data1.weather[m].temperature.high - data1.weather[m].temperature.low)}%`, width: '100%', backgroundColor: city1Color, borderRadius: '90%' }} />
                    <div style={{ position: 'absolute', top: `${50 - data2.weather[m].temperature.high}%`, height: `${(data2.weather[m].temperature.high - data2.weather[m].temperature.low)}%`, width: '100%', backgroundColor: city2Color, borderRadius: '90%' }} />
                </div>
            ))}
        </div>
    )
}