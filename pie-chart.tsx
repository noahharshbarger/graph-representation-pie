import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

import ChartColors from '../../styles/ChartColors';

const PortfolioChart = () => {
  const chartRef = useRef(null);

  // Mock data
  const stockMarketValues = [3000, 2500, 1500, 2000]; // Example market values for stocks
  const stockSymbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT']; // Example stock symbols
  const portfolioPercentages = [30, 25, 15, 20]; // Example percentages for portfolio allocation

  useEffect(() => {
    // Clear any existing chart content
    d3.select(chartRef.current).selectAll('*').remove();

    // Dimensions and radius
    const width = chartRef.current.clientWidth;
    const height = chartRef.current.clientHeight;
    const radius = Math.min(width, height) / 2;

    // Color scale
    const color = d3.scaleOrdinal()
      .domain(stockSymbols)
      .range(ChartColors());

    // Arc generator
    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius);

    // Pie layout
    const pie = d3.pie()
      .sort(null)
      .value(d => d);

    // SVG element
    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Data binding
    const arcs = svg.selectAll('.arc')
      .data(pie(stockMarketValues))
      .enter()
      .append('g')
      .attr('class', 'arc');

    // Draw arcs
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data))
      .style('stroke', 'white')
      .style('stroke-width', 5);

    // Click event
    arcs.on('click', (event, d) => {
      const symbol = stockSymbols[d.index];
      window.location.href = `/investments/portfolio/${symbol}`;
    });

    return () => {
      // Cleanup on unmount
      d3.select(chartRef.current).selectAll('*').remove();
    };
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default PortfolioChart;
