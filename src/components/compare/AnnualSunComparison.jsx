'use client';

import { Container, Stack, Text, Group } from '@mantine/core';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
} from 'recharts';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function AnnualSunComparison({
  data1,
  data2,
  city1Color = '#9810fa',
  city2Color = '#00a63e',
}) {
  if (!data1 || !data2 ) return null;

  const chartData = months.map((month) => {
    const city1Sun = data1.weather[month]?.sunshine?.daily_hours;
    const city2Sun = data2.weather[month]?.sunshine?.daily_hours;

    return {
      name: month.slice(0, 3), // Jan, Feb, etc.
      [data1['city']]: city1Sun,
      [data2['city']]: city2Sun,
    };
  });

  return (
    <Container size="md" py="xl">
      <Stack spacing="sm">
        <Group justify="space-between">
          <Text size="lg" fw={700}>
            ☀️ Daily Sunshine Hours Comparison
          </Text>
        </Group>

        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              label={{
                value: 'Daily Sunshine Hours',
                angle: -90,
                position: 'insideLeft',
              }}
              domain={[0, 'dataMax + 1']}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={data1['city']}
              stroke={city1Color}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey={data2['city']}
              stroke={city2Color}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Stack>
    </Container>
  );
}
