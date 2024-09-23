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
  const [selectedSpan, setSelectedSpan] = useState<SpanType | null>(null);

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
  const traceDuration = (traceEndTime - traceStartTime) / 1e6; // Convert nanoseconds to milliseconds

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

  const handleSpanClick = (span: SpanType) => {
    setSelectedSpan(span);
    if (onSpanClick) {
      onSpanClick(span);
    }
  };

  return (
    <div className="trace-timeline-wrapper">
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
          overflow: 'auto', // Changed to 'auto' to allow both scrollX and scrollY
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        {processedSpans.map((span) => {
          const hasExceptionEvent = span.events?.some(event => event.name === 'exception');

          return (
            <div
              key={span.span_id}
              className={`trace-span ${selectedSpan?.span_id === span.span_id ? 'selected' : ''}`}
              style={{
                position: 'absolute',
                left: `${span.relativeStart * scaledScaleX}px`,
                top: `${span.level * (scaledSpanHeight + scaledSpanSpacing)}px`,
                width: `${span.duration * scaledScaleX}px`,
                height: `${scaledSpanHeight}px`,
                backgroundColor: serviceColors[span.service_name || 'Unknown Service'] || '#87ceeb',
                border: hasExceptionEvent ? '2px solid red' : '1px solid #1e90ff', // Red border for spans with exception events
                cursor: 'pointer',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                transition: 'left 0.2s ease, width 0.2s ease, top 0.2s ease, height 0.2s ease',
                zIndex: selectedSpan?.span_id === span.span_id ? 2 : 1, // Bring selected span to front
              }}
              title={`Span Name: ${span.name}\nService: ${span.service_name || 'Unknown Service'}\nDuration: ${span.duration.toFixed(2)} ms`}
              onClick={() => handleSpanClick(span)}
            >
              <span className="trace-span-label">{span.name}</span>
            </div>
          );
        })}
        {/* Time Axis */}
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

      {/* Details Panel */}
      {selectedSpan && (
        <div className="trace-details-panel">
          <h3>Span Details</h3>
          <div className="trace-details-section">
            <h4>Attributes</h4>
            <table>
              <tbody>
              {selectedSpan.attributes && Object.entries(selectedSpan.attributes).map(([key, value]) => (
                <tr key={key}>
                  <td><strong>{key}</strong></td>
                  <td>{String(value)}</td>
                </tr>
              ))}
              {!selectedSpan.attributes || Object.keys(selectedSpan.attributes).length === 0 ? (
                <tr>
                  <td colSpan={2}>No attributes available.</td>
                </tr>
              ) : null}
              </tbody>
            </table>
          </div>
          <div className="trace-details-section">
            <h4>Logs/Events</h4>
            {selectedSpan.events && selectedSpan.events.length > 0 ? (
              <div className="trace-events-list">
                {selectedSpan.events.map((event, index) => (
                  <div key={index} className="trace-event-item">
                    <div className="trace-event-header">
                    </div>
                    <div className="trace-event-attributes">
                      {Object.entries(event.attributes).map(([attrKey, attrValue]) => (
                        <div key={attrKey} className="trace-event-attribute">
                          <strong>{attrKey}:</strong> {attrValue}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No events available.</p>
            )}
          </div>
          <button className="trace-details-close" onClick={() => setSelectedSpan(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};
