import React, { useEffect, useRef } from 'react';
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

export const TraceErrorGraph: React.FC<PlotlyChartProps> = ({ jsonData }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && jsonData['1']) {
      const timestamps = Object.keys(jsonData['1']).map((ts) => ts.substring(11, 16));
      const values = Object.values(jsonData['1']).map(Number);

      const trace = {
        x: timestamps,
        y: values,
        type: 'bar' as const,
        marker: {
          color: 'rgba(204, 23, 29, 1)',
        },
      };

      const layout: Partial<Plotly.Layout> = {
        width: 428,
        height: 180,
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
      };

      Plotly.newPlot(chartRef.current, [trace], layout, config);
    }
  }, [jsonData]);

  return <div ref={chartRef} />;
};
