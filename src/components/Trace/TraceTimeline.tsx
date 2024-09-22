// components/TraceTimeline.tsx
import React from 'react';
import { SpanType } from '@/utils/types/traceType';
import { processSpans, ProcessedSpan } from '@/utils/traceUtils';
import './TraceTimeline.css'; // 스타일을 위한 CSS 파일

interface TraceTimelineProps {
  spans: SpanType[];
  onSpanClick?: (span: SpanType) => void;
}

export const TraceTimeline: React.FC<TraceTimelineProps> = ({ spans, onSpanClick }) => {
  const processedSpans: ProcessedSpan[] = processSpans(spans);

  // 트레이스의 전체 지속 시간 계산
  const traceStartTime = processedSpans.length > 0 ? Math.min(...processedSpans.map((span) => span.start_time_unix_nano)) : 0;
  const traceEndTime = processedSpans.length > 0 ? Math.max(...processedSpans.map((span) => span.end_time_unix_nano)) : 0;
  const traceDuration = (traceEndTime - traceStartTime) / 1e6; // 밀리초 단위

  // 최대 레벨 계산
  const maxLevel = processedSpans.reduce((max, span) => (span.level > max ? span.level : max), 0);

  // 스케일 설정 (전체 타임라인의 폭을 100%)
  const timelineWidth = 1000; // 픽셀 단위, 필요에 따라 조정 가능
  const scale = timelineWidth / traceDuration;

  return (
    <div className="trace-timeline-container" style={{ position: 'relative', width: `${timelineWidth}px`, height: `${(maxLevel + 1) * 50}px`, border: '1px solid #ccc', overflowX: 'auto' }}>
      {processedSpans.map((span) => (
        <div
          key={span.span_id}
          className="trace-span"
          style={{
            position: 'absolute',
            left: `${span.relativeStart * scale}px`,
            top: `${span.level * 50}px`,
            width: `${span.duration * scale}px`,
            height: '30px',
            backgroundColor: '#87ceeb',
            border: '1px solid #1e90ff',
            borderRadius: '4px',
            cursor: 'pointer',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={`스팬 이름: ${span.name}\n서비스: ${span.service_name || 'Unknown Service'}\n기간: ${span.duration.toFixed(2)} ms`}
          onClick={() => onSpanClick && onSpanClick(span)}
        >
          <span style={{ padding: '5px', fontSize: '12px', color: '#000' }}>{span.name}</span>
        </div>
      ))}
      {/* 시간 축 */}
      <div className="trace-timeline-axis" style={{ position: 'absolute', top: `${(maxLevel + 1) * 50 - 20}px`, left: '0', width: '100%', height: '20px', borderTop: '1px solid #ccc' }}>
        {/* 시간 표시 예시 */}
        <span style={{ position: 'absolute', left: '0px', top: '0', fontSize: '10px' }}>0 ms</span>
        <span style={{ position: 'absolute', left: `${(traceDuration / 2) * scale}px`, top: '0', fontSize: '10px' }}>{(traceDuration / 2).toFixed(0)} ms</span>
        <span style={{ position: 'absolute', left: `${traceDuration * scale}px`, top: '0', fontSize: '10px' }}>{traceDuration.toFixed(0)} ms</span>
      </div>
    </div>
  );
};
