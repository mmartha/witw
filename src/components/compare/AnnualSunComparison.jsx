import * as d3 from "d3";
import { useRef, useEffect } from "react";
import { Container, Title, Stack, Text, Group } from '@mantine/core';

const width = 500;
const height = 500;
const radius = Math.min(width, height) / 2 - 40;

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

hexToRGB('#FF0000', 0.5);


function RadialSunshineChart({ data1, data2, city1Color, city2Color }) {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear previous render

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const city1Name = data1.city;
    const city2Name = data2.city;

    const values1 = months.map(m => data1.weather[m]?.sunshine?.daily_hours ?? 0);
    const values2 = months.map(m => data2.weather[m]?.sunshine?.daily_hours ?? 0);

    const maxValue = Math.max(...values1, ...values2, 12);

    const angleScale = d3.scaleLinear()
      .domain([0, 12])
      .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
      .domain([0, maxValue])
      .range([0, radius]);

    const radialLine = d3.lineRadial()
      .angle((_, i) => angleScale(i))
      .radius(d => radiusScale(d))
      .curve(d3.curveCardinalClosed); // smooth curve

    // Draw grid
    const gridLevels = 5;
    for (let i = 1; i <= gridLevels; i++) {
      g.append("circle")
        .attr("r", (i / gridLevels) * radius)
        .attr("fill", "none")
        .attr("stroke", "#ccc");
    }

    // Draw month labels
    months.forEach((month, i) => {
      const angle = angleScale(i) - Math.PI / 2;
      const x = Math.cos(angle) * (radius + 20);
      const y = Math.sin(angle) * (radius + 20);

      g.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "12px")
        .text(month);
    });

    // Draw city 1
    g.append("path")
      .datum(values1)
      .attr("fill", hexToRGB(city1Color, 0.3))
      .attr("stroke", city1Color)
      .attr("stroke-width", 2)
      .attr("d", radialLine);

    // Draw city 2
    g.append("path")
      .datum(values2)
      .attr("fill", hexToRGB(city2Color, 0.3))
      .attr("stroke", city2Color)
      .attr("stroke-width", 2)
      .attr("d", radialLine);

  }, [data1, data2]);

  return (
    <Container size="md" py="md" style={{width: '100%', display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <Title size="lg" py="lg" fw={700}>
          ☀️ Daily Sunshine Hours Comparison
        </Title>
      <Group>
          <svg ref={svgRef}></svg>
        </Group>
    </Container>
  );
}

export default RadialSunshineChart;
