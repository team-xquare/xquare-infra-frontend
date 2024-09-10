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

export const TraceLatencyGraph: React.FC<PlotlyChartProps> = ({ jsonData }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
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
    if (chartRef.current) {
      try {
        if (!jsonData || typeof jsonData !== 'object' || Object.keys(jsonData).length === 0) {
          throw new Error('Invalid or empty data');
        }

        if (Object.keys(jsonData).length !== 5) {
          console.warn(`Expected 5 data series, but got ${Object.keys(jsonData).length}`);
        }

        const firstKey = Object.keys(jsonData)[0];
        const timestamps = Object.keys(jsonData[firstKey]);

        if (timestamps.length === 0) {
          throw new Error('No timestamp data available');
        }

        const colors = [
          'rgb(0, 123, 255)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(153, 102, 255)',
        ];

        const traces = Object.keys(jsonData).map((key, index) => ({
          x: timestamps,
          y: Object.values(jsonData[key]).map((val) => {
            const num = Number(val);
            return isNaN(num) ? null : num;
          }),
          type: 'scatter' as const,
          mode: 'lines' as const,
          name: `p${key}`,
          line: {
            color: colors[index % colors.length],
            width: 2,
          },
          legendgroup: `group${key}`,
          showlegend: true,
          hoverinfo: 'x+y+name' as const,
          hovertemplate: '%{x}<br>%{name}: %{y:.2f}<extra></extra>',
        }));

        const layout: Partial<Plotly.Layout> = {
          width: chartWidth,
          height: Math.max(180, chartWidth * 0.5),
          margin: { l: 30, r: 30, t: 20, b: 50 },
          xaxis: {
            title: '',
            fixedrange: true,
            tickvals: timestamps.filter((_, i) => i % Math.ceil(timestamps.length / 4) === 0),
            ticktext: timestamps
              .filter((_, i) => i % Math.ceil(timestamps.length / 4) === 0)
              .map((ts) => ts.substring(11, 16)),
          },
          yaxis: { title: '', fixedrange: true },
          dragmode: false,
          hovermode: 'closest' as const,
          showlegend: true,
          legend: {
            orientation: 'h',
            yanchor: 'bottom',
            y: -0.4,
            xanchor: 'center',
            x: 0.5,
            traceorder: 'normal',
            itemsizing: 'constant',
            font: { size: 10 },
            itemwidth: 30,
          },
        };

        const config: Partial<Plotly.Config> = {
          displayModeBar: false,
          staticPlot: false,
          scrollZoom: false,
          responsive: true,
        };

        Plotly.newPlot(chartRef.current, traces, layout, config).catch((plotError) => {
          console.error('Error plotting chart:', plotError);
          setError('Failed to create chart');
        });
      } catch (err) {
        console.error('Error processing data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      }
    }
  }, [jsonData, chartWidth]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div ref={chartRef} style={{ position: 'relative', zIndex: '0', width: '100%' }} />;
};
