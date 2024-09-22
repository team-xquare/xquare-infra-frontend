import React, { useEffect, useRef, useState, WheelEvent, MouseEvent } from 'react';
import { SpanType } from '@/utils/types/traceType';
import { processSpans, ProcessedSpan } from '@/utils/traceUtils';
import './TraceTimeline.css';

interface TraceTimelineProps {
  spans: SpanType[];
  onSpanClick?: (span: SpanType) => void;
  serviceColors?: { [key: string]: string };
}

export const TraceTimeline: React.FC<TraceTimelineProps> = ({ spans, onSpanClick, serviceColors = {} }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [timelineWidth, setTimelineWidth] = useState<number>(0);
  const [scaleX, setScaleX] = useState<number>(1);
  const [scaleY, setScaleY] = useState<number>(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setTimelineWidth(containerRef.current.clientWidth);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    resizeObserver.observe(containerRef.current);

    updateWidth();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const processedSpans: ProcessedSpan[] = processSpans(spans);

  if (processedSpans.length === 0) {
    return <div>No spans available to display.</div>;
  }

  const traceStartTime = Math.min(...processedSpans.map((span) => span.start_time_unix_nano));
  const traceEndTime = Math.max(...processedSpans.map((span) => span.end_time_unix_nano));
  const traceDuration = (traceEndTime - traceStartTime) / 1e6;

  const maxLevel = processedSpans.reduce((max, span) => (span.level > max ? span.level : max), 0);

  const baseScaleX = timelineWidth / traceDuration;
  const scaledScaleX = baseScaleX * scaleX;

  const baseSpanHeight = 30;
  const baseSpanSpacing = 2;

  const scaledSpanHeight = baseSpanHeight * scaleY;
  const scaledSpanSpacing = baseSpanSpacing * scaleY;

  const generateTimeLabels = () => {
    const labels = [];
    const numLabels = 5;
    const interval = traceDuration / numLabels;
    for (let i = 0; i <= numLabels; i++) {
      const time = i * interval;
      labels.push(
        <span
          key={i}
          className="trace-time-label"
          style={{
            left: `${time * scaledScaleX}px`,
          }}
        >
          {time.toFixed(0)} ms
        </span>
      );
    }
    return labels;
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const { deltaY, ctrlKey, shiftKey } = e;

    const zoomIntensity = 0.001;
    const zoomAmount = 1 - deltaY * zoomIntensity;

    if (ctrlKey) {
      setScaleX((prev) => {
        const newScale = prev * zoomAmount;
        return Math.min(Math.max(newScale, 0.5), 5);
      });
    } else if (shiftKey) {
      setScaleY((prev) => {
        const newScale = prev * zoomAmount;
        return Math.min(Math.max(newScale, 0.5), 3);
      });
    }
  };

  const isDragging = useRef(false);
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    isDragging.current = true;
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const deltaX = e.clientX - lastMousePosition.current.x;
    const deltaY = e.clientY - lastMousePosition.current.y;

    containerRef.current.scrollLeft -= deltaX;
    containerRef.current.scrollTop -= deltaY;

    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  return (
    <div
      className="trace-timeline-container"
      ref={containerRef}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: `${(maxLevel + 1) * (scaledSpanHeight + scaledSpanSpacing) + 30}px`,
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        overflowX: 'auto',
        cursor: 'grab',
        userSelect: 'none',
      }}
    >
      {processedSpans.map((span) => (
        <div
          key={span.span_id}
          className="trace-span"
          style={{
            position: 'absolute',
            left: `${span.relativeStart * scaledScaleX}px`,
            top: `${span.level * (scaledSpanHeight + scaledSpanSpacing)}px`, // 수직 스케일 적용
            width: `${span.duration * scaledScaleX}px`,
            height: `${scaledSpanHeight}px`, // 수직 스케일 적용
            backgroundColor: serviceColors[span.service_name || 'Unknown Service'] || '#87ceeb',
            border: '1px solid #1e90ff',
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            transition: 'left 0.2s ease, width 0.2s ease, top 0.2s ease, height 0.2s ease',
          }}
          title={`스팬 이름: ${span.name}\n서비스: ${span.service_name || 'Unknown Service'}\n기간: ${span.duration.toFixed(2)} ms`}
          onClick={() => onSpanClick && onSpanClick(span)}
        >
          <span className="trace-span-label">{span.name}</span>
        </div>
      ))}
      {/* 시간 축 */}
      <div
        className="trace-timeline-axis"
        style={{
          position: 'absolute',
          top: `${(maxLevel + 1) * (scaledSpanHeight + scaledSpanSpacing)}px`,
          left: '0',
          width: `${traceDuration * scaledScaleX}px`,
          height: '20px',
          borderTop: '1px solid #ccc',
          transition: 'width 0.2s ease, top 0.2s ease',
        }}
      >
        {generateTimeLabels()}
      </div>
    </div>
  );
};
