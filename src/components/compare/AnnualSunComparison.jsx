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
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
}

function RadialSunshineChart({ data1, data2, city1Color, city2Color }) {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const labelRefs = useRef([]);
  const path1Refs = useRef([]);
  const path2Refs = useRef([]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    labelRefs.current = [];
    path1Refs.current = [];
    path2Refs.current = [];

    const g = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const city1Name = data1.city;
    const city2Name = data2.city;

    const values1 = months.map(m => data1.weather[m]?.sunshine?.daylight_hours ?? 0);
    const values1b = months.map(m => data1.weather[m]?.sunshine?.daily_hours ?? 0);
    const values2 = months.map(m => data2.weather[m]?.sunshine?.daylight_hours ?? 0);
    const values2b = months.map(m => data2.weather[m]?.sunshine?.daily_hours ?? 0);
    const maxValue = 20;

    const angleScale = d3.scaleLinear().domain([0, 12]).range([0, 2 * Math.PI]);
    const radiusScale = d3.scaleLinear().domain([0, maxValue]).range([0, radius]);

    const radialLine = d3.lineRadial()
      .angle((_, i) => angleScale(i))
      .radius(d => radiusScale(d))
      .curve(d3.curveCardinalClosed);

    const tooltip = d3.select(tooltipRef.current);

    // Month labels
    months.forEach((month, i) => {
      const angle = angleScale(i) - Math.PI / 2;
      const x = Math.cos(angle) * (radius + 20);
      const y = Math.sin(angle) * (radius + 20);

      const label = g.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("font-size", "12px")
        .attr("fill", "#333")
        .attr("class", "month-label")
        .attr("data-index", i)
        .text(month.slice(0, 3));

      labelRefs.current.push(label);
    });

    // Grid circles
    for (let i = 1; i <= 5; i++) {
      g.append("circle")
        .attr("r", (i / 5) * radius)
        .attr("fill", "none")
        .attr("stroke", "#ccc");
    }

    // Draw city 1 curve
    const path1 = g.append("path")
      .datum(values1)
      .attr("fill", "transparent")
      .attr("stroke", city1Color)
      .attr("stroke-width", 2)
      .attr("class", "city1")
      .attr("d", radialLine)
      .style("transition", "opacity 0.3s ease");
    path1Refs.current.push(path1);

    // Draw city 1 fill
    const path1b = g.append("path")
      .datum(values1b)
      .attr("fill", hexToRGB(city1Color, 0.3))
      .attr("class", "city1")
      .attr("d", radialLine)
      .style("transition", "opacity 0.3s ease");
    path1Refs.current.push(path1b);

    // Draw city 2 curve
    const path2 = g.append("path")
      .datum(values2)
      .attr("fill", "transparent")
      .attr("stroke", city2Color)
      .attr("stroke-width", 2)
      .attr("class", "city2")
      .attr("d", radialLine)
      .style("transition", "opacity 0.3s ease");
    path2Refs.current.push(path2);

    // Draw city 2 fill
    const path2b = g.append("path")
      .datum(values2b)
      .attr("fill", hexToRGB(city2Color, 0.3))
      .attr("class", "city2")
      .attr("d", radialLine)
      .style("transition", "opacity 0.3s ease");
    path2Refs.current.push(path2b);

    // Interaction
    const handleHover = (i, val, city) => {
      tooltip
        .style("display", "block")
        .html(`<strong>${city}</strong><br>${months[i]}: ${val} hrs`);

      labelRefs.current[i]?.attr("font-weight", "bold");

      if (city === data1.city) {
        path1Refs.current.forEach((path, i) => {
          path
            .attr("stroke-width", 3)
            .style("opacity", 1);
        });
        path2Refs.current.forEach(path => {
          path
            .attr("stroke-width", 0)
            .style("opacity", 0.3);
        });
      } else if (city === data2.city) {
        path2Refs.current.forEach(path => {
          path
            .attr("stroke-width", 3)
            .style("opacity", 1);
        });
        path1Refs.current.forEach((path, i) => {
          path
            .attr("stroke-width", 0)
            .style("opacity", 0.3);
        });
      }
    };

    const handleOut = (i) => {
      tooltip.style("display", "none");
      labelRefs.current[i]?.attr("font-weight", "normal");

      path1Refs.current.forEach(path => {
        path
          .attr("stroke-width", 2)
          .style("opacity", 1);
      });
      path2Refs.current.forEach(path => {
        path
          .attr("stroke-width", 2)
          .style("opacity", 1);
      });
    };

    // Hit areas
    [...values1, ...values2].forEach((val, i) => {
      const isCity1 = i < 12;
      const monthIndex = isCity1 ? i : i - 12;
      const data = isCity1 ? values1 : values2;
      const city = isCity1 ? city1Name : city2Name;
      const v = data[monthIndex];

      const cx = Math.cos(angleScale(monthIndex) - Math.PI / 2) * radiusScale(v);
      const cy = Math.sin(angleScale(monthIndex) - Math.PI / 2) * radiusScale(v);

      g.append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", 10)
        .attr("fill", "transparent")
        .style("cursor", "pointer")
        .on("mouseover", (e) => handleHover(monthIndex, v, city))
        .on("mousemove", (e) => {
          tooltip
            .style("left", e.pageX + 10 + "px")
            .style("top", e.pageY - 28 + "px");
        })
        .on("mouseout", () => handleOut(monthIndex));
    });

  }, [data1, data2]);

  return (
    <Container size="md" py="md" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title size="lg" py="lg" fw={700}>
        ☀️ Daily Sunshine Hours Comparison
      </Title>
      <Group mt="sm" spacing="lg" mb="lg">
        <Group spacing="xs">
          <div style={{ width: 12, height: 12, backgroundColor: city1Color, borderRadius: '50%' }} />
          <Text size="sm">{data1.city}</Text>
        </Group>
        <Group spacing="xs">
          <div style={{ width: 12, height: 12, backgroundColor: city2Color, borderRadius: '50%' }} />
          <Text size="sm">{data2.city}</Text>
        </Group>
      </Group>
      <Group>
        <svg ref={svgRef} />
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            background: "#fff",
            padding: "6px 10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            pointerEvents: "none",
            display: "none",
            fontSize: "12px",
            zIndex: 10
          }}
        />
      </Group>
    </Container>
  );
}

export default RadialSunshineChart;
