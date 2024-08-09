import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Span {
  spanId: string;
  parentSpanId?: string;
  name: string;
  startTimeUnixNano: string;
  endTimeUnixNano: string;
  attributes: Array<{
    key: string;
    value: {
      stringValue?: string;
      intValue?: number;
    };
  }>;
}

interface Trace {
  batches: Array<{
    scopeSpans: Array<{
      spans: Span[];
    }>;
  }>;
}

const TraceView: React.FC = () => {
  const [trace, setTrace] = useState<Trace | null>(null);
  const [selectedSpan, setSelectedSpan] = useState<Span | null>(null);

  useEffect(() => {
    const fetchTrace = async () => {
      try {
        // Grafana API 엔드포인트와 인증 정보를 적절히 설정해야 합니다
        const response = await axios.get(
          'https://grafana-tempo.xquare.app/api/traces/3853f64689719bd7771ed91862e1ad29',
        );
        setTrace(response.data);
      } catch (error) {
        console.error('Error fetching trace data:', error);
      }
    };

    fetchTrace();
  }, []);

  if (!trace) {
    return <div>Loading...</div>;
  }

  const spans = trace.batches[0]?.scopeSpans[0]?.spans || [];

  // 전체 트레이스의 시작 및 종료 시간 계산
  const traceStart = Math.min(...spans.map((s) => Number(s.startTimeUnixNano)));
  const traceEnd = Math.max(...spans.map((s) => Number(s.endTimeUnixNano)));
  const traceDuration = traceEnd - traceStart;

  // SVG 크기 설정
  const svgWidth = 800;
  const svgHeight = spans.length * 30;
  const barHeight = 20;

  const handleSpanClick = (span: Span) => {
    setSelectedSpan(span);
  };

  return (
    <div className="trace-view">
      <h2>Trace View</h2>
      <svg width={svgWidth} height={svgHeight}>
        {spans.map((span, index) => {
          const startOffset = ((Number(span.startTimeUnixNano) - traceStart) / traceDuration) * svgWidth;
          const duration = ((Number(span.endTimeUnixNano) - Number(span.startTimeUnixNano)) / traceDuration) * svgWidth;

          return (
            <g key={span.spanId} onClick={() => handleSpanClick(span)} style={{ cursor: 'pointer' }}>
              <rect x={startOffset} y={index * 30} width={duration} height={barHeight} fill="steelblue" />
              <text x={startOffset + 5} y={index * 30 + 15} fill="white" fontSize="12px">
                {span.name} ({(Number(span.endTimeUnixNano) - Number(span.startTimeUnixNano)) / 1e6}ms)
              </text>
            </g>
          );
        })}
      </svg>
      {selectedSpan && <SpanDetails span={selectedSpan} />}
    </div>
  );
};

const SpanDetails: React.FC<{ span: Span }> = ({ span }) => {
  return (
    <div className="span-details">
      <h3>Span Details</h3>
      <p>
        <strong>Name:</strong> {span.name}
      </p>
      <p>
        <strong>ID:</strong> {span.spanId}
      </p>
      <p>
        <strong>Parent ID:</strong> {span.parentSpanId || 'None'}
      </p>
      <p>
        <strong>Duration:</strong> {(Number(span.endTimeUnixNano) - Number(span.startTimeUnixNano)) / 1e6}ms
      </p>
      <h4>Attributes:</h4>
      <ul>
        {span.attributes.map((attr, index) => (
          <li key={index}>
            <strong>{attr.key}:</strong> {attr.value.stringValue || attr.value.intValue}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TraceView;
