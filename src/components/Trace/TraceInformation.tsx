import React, { useState, useEffect, useRef } from 'react';
import { theme } from '@/style/theme';
import styled from '@emotion/styled';
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
  children?: Span[];
  depth?: number;
}

interface Trace {
  batches: Array<{
    scopeSpans: Array<{
      spans: Span[];
    }>;
  }>;
}

type PropsType = {
  selectedTrace: string | null;
  setSelectedTrace: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TraceInformation = ({ selectedTrace, setSelectedTrace }: PropsType) => {
  const [trace, setTrace] = useState<Trace | null>(null);
  const [selectedSpan, setSelectedSpan] = useState<Span | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState<number>(elementRef?.current?.offsetWidth ?? 0);

  useEffect(() => {
    if (!elementRef.current) return;

    const measureWidth = () => {
      if (elementRef.current) {
        setElementWidth(elementRef.current.offsetWidth);
      }
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);

    return () => {
      window.removeEventListener('resize', measureWidth);
    };
  }, [selectedTrace]);

  useEffect(() => {
    const fetchTrace = async () => {
      try {
        const response = await axios.get(`https://grafana-tempo.xquare.app/api/traces/${selectedTrace}`);
        setTrace(response.data);
      } catch (error) {
        console.error('Error fetching trace data:', error);
      }
    };

    if (selectedTrace) {
      fetchTrace();
    }
  }, [selectedTrace]);

  if (!trace) {
    return null;
  }

  const spans = trace.batches.flatMap((batch) => batch.scopeSpans.flatMap((scope) => scope.spans));

  const organizeSpans = (spans: Span[]): Span[] => {
    const spanMap = new Map(spans.map((span) => [span.spanId, { ...span, children: [] as Span[] }]));
    const rootSpans: Span[] = [];

    spanMap.forEach((span) => {
      if (span.parentSpanId && spanMap.has(span.parentSpanId)) {
        spanMap.get(span.parentSpanId)!.children!.push(span);
      } else {
        rootSpans.push(span);
      }
    });

    const flattenSpans = (span: Span, depth: number = 0): Span[] => {
      return [{ ...span, depth }, ...span.children!.flatMap((child) => flattenSpans(child, depth + 1))];
    };

    return rootSpans.flatMap((span) => flattenSpans(span));
  };

  const organizedSpans = organizeSpans(spans);

  const traceStart = Math.min(...spans.map((s) => Number(s.startTimeUnixNano)));
  const traceEnd = Math.max(...spans.map((s) => Number(s.endTimeUnixNano)));
  const traceDuration = traceEnd - traceStart;

  const svgWidth = elementWidth;
  const svgHeight = organizedSpans.length * 42;
  const barHeight = 40;

  const handleSpanClick = (span: Span) => {
    setSelectedSpan(span);
  };

  return (
    <Wrapper selectedTrace={selectedTrace} ref={elementRef}>
      <ColorBox />
      <TitleContainer>
        <h2>Trace View</h2>
        <b
          onClick={() => {
            setSelectedTrace(null);
          }}
        >
          닫기
        </b>
      </TitleContainer>
      <svg width="100%" height={svgHeight}>
        {organizedSpans.map((span, index) => {
          const startOffset = ((Number(span.startTimeUnixNano) - traceStart) / traceDuration) * svgWidth;
          const duration = ((Number(span.endTimeUnixNano) - Number(span.startTimeUnixNano)) / traceDuration) * svgWidth;
          const yPosition = index * 42;

          return (
            <g key={span.spanId} onClick={() => handleSpanClick(span)} style={{ cursor: 'pointer' }}>
              <rect
                x={startOffset + (span.depth ? span.depth * 20 : 0)}
                y={yPosition}
                width={duration}
                height={barHeight}
                fill={theme.color.mainLight1}
              />
              <text
                x={startOffset + 5 + (span.depth ? span.depth * 20 : 0)}
                y={yPosition + 15}
                fill="white"
                fontSize="12px"
              >
                {span.name} ({(Number(span.endTimeUnixNano) - Number(span.startTimeUnixNano)) / 1e6}ms)
              </text>
            </g>
          );
        })}
      </svg>
      {selectedSpan && <SpanDetails span={selectedSpan} />}
    </Wrapper>
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

const Wrapper = styled.div<{ selectedTrace: string | null }>`
  position: fixed;
  bottom: 0;
  right: ${({ selectedTrace }) => (Boolean(selectedTrace) ? '0' : '-1500px')};
  border-left: 1px solid ${theme.color.gray4};
  width: calc(100vw - 460px);
  height: calc(100vh - 80px);
  overflow-y: auto;
  background-color: ${theme.color.gray1};
  transition: right 0.7s ease-in-out;
  z-index: 1;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 50px;
  > b {
    color: red;
    cursor: pointer;
  }
`;

const ColorBox = styled.div`
  width: 100%;
  height: 14px;
  background-color: ${theme.color.main};
`;
