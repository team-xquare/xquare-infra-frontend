export type TraceType = {
  trace_id: string;
  date: string;
  resource: string;
  method: string | null;
  duration_ms: number;
  status_code: number | null;
};
