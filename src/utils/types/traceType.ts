export type ValueType = {
  [key: string]: string;
};

export type AttributeType = {
  key: string;
  value: ValueType;
};

export type SpanType = {
  spanID: string;
  startTimeUnixNano: string;
  durationNanos: string;
  attributes: AttributeType[];
};

export type SpansType = {
  spans: SpanType[];
};

export type TraceType = {
  traceID: string;
  rootServiceName: string;
  rootTraceName: string;
  startTimeUnixNano: string;
  durationMs: number;
  spanSet: SpansType;
};
