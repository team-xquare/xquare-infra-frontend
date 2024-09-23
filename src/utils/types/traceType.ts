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
  parent_span_id?: string;
  end_time_unix_nano: number;
  service_name: string;
  attributes: {
    [key: string]: string;
  };
  events: SpanEventResponse[];
};

interface SpanEventResponse {
  timeUnixNano: number;
  name: string;
  attributes: { [key: string]: string };
}

export type SpansType = {
  spans: SpanType[]
}