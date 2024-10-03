interface MetricNode {
  node_id: string;
  type: string;
  calls: number;
  successes: number;
  failures: number;
  latency_avg_ms: number;
}

interface Edge {
  source: string;
  target: string;
  interaction_type: string;
  calls: number;
  successes: number;
  failures: number;
  latency_avg_ms: number;
}

interface Metric {
  timestamp: string;
  nodes: MetricNode[];
  edges: Edge[];
}

interface Data {
  metrics: Metric[];
}

export interface Response {
  data: Data;
}
