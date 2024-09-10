import React, { useEffect, useRef, useState } from 'react';
import Plotly from 'plotly.js-dist-min';

interface DataPoint {
  [timestamp: string]: string;
}

interface JsonData {
  [key: string]: DataPoint;
}

interface PlotlyChartProps {
  jsonData: JsonData;
}

export const TraceRequestGraph: React.FC<PlotlyChartProps> = ({ jsonData }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(360);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        const containerWidth = chartRef.current.offsetWidth;
        setChartWidth(containerWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (chartRef.current && jsonData) {
      const timestamps = Object.keys(jsonData).map((ts) => ts.substring(11, 16));
      const values = Object.values(jsonData).map(Number);

      const trace = {
        x: timestamps,
        y: values,
        type: 'bar' as const,
        marker: {
          color: 'rgba(147, 203, 255, 1)',
        },
      };

      const layout: Partial<Plotly.Layout> = {
        width: chartWidth,
        height: Math.max(180, chartWidth * 0.5),
        margin: {
          l: 30,
          r: 30,
          t: 20,
          b: 40,
        },
        xaxis: {
          title: '',
          fixedrange: true,
          tickvals: timestamps.filter((_, i) => i % Math.ceil(timestamps.length / 4) === 0),
          ticktext: timestamps.filter((_, i) => i % Math.ceil(timestamps.length / 4) === 0),
        },
        yaxis: {
          title: '',
          fixedrange: true,
        },
        dragmode: false as const,
        hovermode: false as const,
      };

      const config: Partial<Plotly.Config> = {
        displayModeBar: false,
        staticPlot: true,
        scrollZoom: false,
        responsive: true,
      };

      Plotly.newPlot(chartRef.current, [trace], layout, config);
    }
  }, [jsonData, chartWidth]);

  return <div ref={chartRef} style={{ position: 'relative', zIndex: '0', width: '100%' }} />;
};