import { SpanType } from '@/utils/types/traceType';

export interface ProcessedSpan extends SpanType {
  level: number;
  relativeStart: number; // in milliseconds
  duration: number; // in milliseconds
}

export const processSpans = (spans: SpanType[]): ProcessedSpan[] => {
  if (spans.length === 0) return [];

  const traceStartTime = Math.min(...spans.map((span) => span.start_time_unix_nano));

  const spanMap = new Map<string, SpanType>();
  spans.forEach((span) => spanMap.set(span.span_id, span));

  const processedSpans: ProcessedSpan[] = spans.map((span) => ({
    ...span,
    level: 0,
    relativeStart: (span.start_time_unix_nano - traceStartTime) / 1e6,
    duration: (span.end_time_unix_nano - span.start_time_unix_nano) / 1e6,
  }));

  processedSpans.forEach((span) => {
    let currentSpan: SpanType = span;
    let level = 0;
    while (currentSpan.parent_span_id && spanMap.has(currentSpan.parent_span_id)) {
      level += 1;
      currentSpan = spanMap.get(currentSpan.parent_span_id)!;
    }
    span.level = level;
  });

  return processedSpans;
};
