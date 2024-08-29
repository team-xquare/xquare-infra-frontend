export type TraceType = {
  trace_id: string;
  date: string;
  resource: string;
  method: string | null;
  duration_ms: number;
  status_code: number | null;
};

export type SpanType = {
  trace_id: string;
  span_id: string;
  name: string;
  start_time_unix_nano: number;
  end_time_unix_nano: number;
  attributes: {
    [key: string]: string;
  };
};
