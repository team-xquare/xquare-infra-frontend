import { useMemo } from 'react';
import '@pyroscope/flamegraph/dist/index.css';
import { FlamegraphRenderer } from '@pyroscope/flamegraph';
import { SpansType, SpanType } from '@/utils/types/traceType.ts';

export const FlameGraph = ({ spans }: SpansType) => {
  const flamegraphData = useMemo(() => convertTraceToFlamegraph(spans), [spans]);

  if (!flamegraphData) {
    return <div>No valid flamegraph data available</div>;
  }

  return (
    <FlamegraphRenderer profile={flamegraphData} onlyDisplay="flamegraph" showToolbar={false} showCredit={false} />
  );
};

// 매개변수를 SpanType[] 타입으로 유지합니다.
function convertTraceToFlamegraph(spans: SpanType[]) {
  if (spans.length === 0) return null;

  const nameMap: { [key: string]: number } = {};
  const levels: number[][] = [];

  if (!spans[0]) return;

  const traceStartTime = spans[0].start_time_unix_nano;
  const traceEndTime = spans[0].end_time_unix_nano;
  const traceDuration = traceEndTime - traceStartTime;

  function addToNameMap(name: string): number {
    if (nameMap[name] === undefined) {
      nameMap[name] = Object.keys(nameMap).length;
    }
    return nameMap[name];
  }

  spans.forEach((span, index) => {
    const startTime = span.start_time_unix_nano;
    const endTime = span.end_time_unix_nano;
    const duration = endTime - startTime;
    const startOffset = startTime - traceStartTime;
    const nameIndex = addToNameMap(span.name);

    if (!levels[index]) levels[index] = [];
    levels[index].push(startOffset, duration, 0, nameIndex);
  });

  const rootSpan = spans[0];
  return {
    version: 1,
    flamebearer: {
      names: Object.keys(nameMap),
      levels,
      numTicks: traceDuration,
      maxSelf: Math.max(...levels.flat()),
    },
    metadata: {
      appName: 'your-app-name',
      name: `${rootSpan.name} Flamegraph`,
      startTime: traceStartTime,
      endTime: traceEndTime,
      query: 'your-app-query',
      maxNodes: 1024,
      format: 'single' as const,
      sampleRate: 1000000000,
      spyName: 'opentelemetry' as const,
      units: 'trace_samples' as const, // 'milliseconds' 대신 'samples' 사용
    },
  };
}
