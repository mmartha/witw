'use client';

import { Container, Title, Text, Stack, Paper } from '@mantine/core';
import WithShell from '@/components/shared/WithShell';

export default function About() {
    return (
        <WithShell>
            <Container size="lg" py="xl">
                <Stack gap="xl">
                    <div>
                        <Title order={1} mb="md">About Weather in the World</Title>
                        <Text size="lg" c="dimmed">
                            Exploring climate patterns and weather data from cities around the globe.
                        </Text>
                    </div>

                    <Paper withBorder p="xl" radius="md">
                        <Stack gap="md">
                            <Title order={2}>Our Mission</Title>
                            <Text>
                                Weather in the World aims to provide comprehensive climate data and insights 
                                for cities across the globe. We believe that understanding weather patterns 
                                and climate trends is essential for both personal planning and global awareness.
                            </Text>
                        </Stack>
                    </Paper>

                    <Paper withBorder p="xl" radius="md">
                        <Stack gap="md">
                            <Title order={2}>Data Sources</Title>
                            <Text>
                                Our weather data is collected from reliable meteorological sources, 
                                ensuring accuracy and consistency. We regularly update our database 
                                to provide the most current information available.
                            </Text>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>
        </WithShell>
    );
}
