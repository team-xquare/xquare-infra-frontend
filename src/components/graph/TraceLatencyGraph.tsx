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

export const TraceLatencyGraph: React.FC<PlotlyChartProps> = ({ jsonData }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current && Object.keys(jsonData).length === 5) {
      const timestamps = Object.keys(jsonData['99']).map((ts) => ts.substring(11, 16));

      const colors = [
        'rgb(0, 123, 255)', // 파랑
        'rgb(255, 99, 132)', // 빨강
        'rgb(75, 192, 192)', // 청록
        'rgb(255, 205, 86)', // 노랑
        'rgb(153, 102, 255)', // 보라
      ];

      const traces = Object.keys(jsonData).map((key, index) => ({
        x: timestamps,
        y: Object.values(jsonData[key]).map(Number),
        type: 'scatter' as const,
        mode: 'lines' as const,
        name: `p${key}`,
        line: {
          color: colors[index],
          width: 2,
        },
        legendgroup: `group${key}`,
        showlegend: true,
      }));

      const layout: Partial<Plotly.Layout> = {
        width: 380,
        height: 180,
        margin: {
          l: 30,
          r: 30,
          t: 20,
          b: 50,
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
        dragmode: false,
        hovermode: false,
        showlegend: true,
        legend: {
          orientation: 'h',
          yanchor: 'bottom',
          y: -0.4,
          xanchor: 'center',
          x: 0.5,
          traceorder: 'normal',
          itemsizing: 'constant',
          font: {
            size: 10,
          },
          itemwidth: 30,
        },
      };

      const config: Partial<Plotly.Config> = {
        displayModeBar: false,
        staticPlot: true,
        scrollZoom: false,
      };

      Plotly.newPlot(chartRef.current, traces, layout, config);
    }
  }, [jsonData]);

  return <div ref={chartRef} style={{ position: 'relative', zIndex: '0' }} />;
};
