import React, { useState } from 'react';
import { data } from './data';

interface Node {
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

interface Metrics {
  timestamp: string;
  nodes: Node[];
  edges: Edge[];
}

interface JsonData {
  data: {
    metrics: Metrics[];
  };
}

interface ServiceNodeProps {
  x: number;
  y: number;
  node: Node;
  onNodeClick: (node: Node) => void;
}

interface ServiceLinkProps {
  source: { x: number; y: number };
  target: { x: number; y: number };
  edge: Edge;
}

const ServiceNode: React.FC<ServiceNodeProps> = ({ x, y, node, onNodeClick }) => {
  const getColor = (type: string) => {
    switch (type) {
      case 'SERVICE':
        return '#4ECDC4';
      case 'DATABASE':
        return '#FFA07A';
      default:
        return '#45B7D1';
    }
  };

  return (
    <g transform={`translate(${x},${y})`} onClick={() => onNodeClick(node)}>
      <circle r="30" fill={getColor(node.type)} />
      <text textAnchor="middle" dy=".3em" fill="#000" stroke="#fff" strokeWidth="0.1" fontSize="16">
        {node.node_id}
      </text>
    </g>
  );
};

const ServiceLink: React.FC<ServiceLinkProps> = ({ source, target, edge }) => {
  const offset = 54;
  const arrowOffset = -0;

  const startX = source.x;
  const startY = source.y;
  const endX = target.x - ((target.x - source.x) * offset) / Math.hypot(target.x - source.x, target.y - source.y);
  const endY = target.y - ((target.y - source.y) * offset) / Math.hypot(target.x - source.x, target.y - source.y);

  return (
    <g>
      <defs>
        <marker id="arrow" markerWidth="10" markerHeight="7" refX={arrowOffset} refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(0,0,0,0.1)" />
        </marker>
      </defs>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
      <text x={(startX + endX) / 2} y={(startY + endY) / 2} fill="#666" fontSize="10">
        {edge.calls} calls, {edge.latency_avg_ms.toFixed(2)}ms
      </text>
    </g>
  );
};

const ServiceMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const jsonData: JsonData = data;

  const metrics = jsonData.data.metrics[0];
  const nodes = metrics.nodes;
  const edges = metrics.edges;

  const calculateReferences = () => {
    const references: Record<string, number> = {};
    const callers: Record<string, number> = {};

    edges.forEach((edge) => {
      references[edge.target] = (references[edge.target] || 0) + edge.calls; // 참조를 당하는 노드
      callers[edge.source] = (callers[edge.source] || 0) + edge.calls; // 참조를 하는 노드
    });

    return { references, callers };
  };

  const layoutNodes = () => {
    const centerX = 600;
    const centerY = 400;
    const maxRadius = 400; // 최대 반경 증가
    const minRadius = 100;
    const positions: Record<string, { x: number; y: number }> = {};
    const { references, callers } = calculateReferences();

    // Find max reference count for normalization
    const maxReferences = Math.max(...Object.values(references));
    const maxCallers = Math.max(...Object.values(callers));

    nodes.forEach((node, index) => {
      const referenceCount = references[node.node_id] || 0;
      const callerCount = callers[node.node_id] || 0;

      // Normalized positions based on reference and caller counts
      const normalizedX = (callerCount / maxCallers) * (maxRadius - minRadius) + minRadius; // 왼쪽
      const normalizedXRight = (referenceCount / maxReferences) * (maxRadius - minRadius) + minRadius; // 오른쪽

      // x 좌표는 참조를 하는 노드와 참조를 당하는 노드에 따라 조정
      const x = centerX - normalizedX + normalizedXRight; // 왼쪽과 오른쪽 배치 조합

      // y 좌표를 각 노드의 인덱스에 따라 조정하여 분산
      const angle = (index / nodes.length) * 2 * Math.PI; // 원형 배치
      const radius = minRadius + (maxRadius - minRadius) * (Math.random() * 0.5); // 랜덤하게 반경 조정

      positions[node.node_id] = {
        x: x + radius * Math.cos(angle), // 분산된 x 좌표
        y: centerY + radius * Math.sin(angle), // 분산된 y 좌표
      };
    });

    return positions;
  };

  const nodePositions = layoutNodes();

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Datadog APM Service Map</h1>
      <svg width="1200" height="800">
        {edges.map((edge, index) => (
          <ServiceLink
            key={index}
            source={nodePositions[edge.source] || { x: 0, y: 0 }}
            target={nodePositions[edge.target] || { x: 0, y: 0 }}
            edge={edge}
          />
        ))}
        {nodes.map((node) => (
          <ServiceNode
            key={node.node_id}
            x={nodePositions[node.node_id].x}
            y={nodePositions[node.node_id].y}
            node={node}
            onNodeClick={handleNodeClick}
          />
        ))}
      </svg>
      {selectedNode && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-bold">{selectedNode.node_id}</h2>
          <p>Type: {selectedNode.type}</p>
          <p>Calls: {selectedNode.calls}</p>
          <p>Successes: {selectedNode.successes}</p>
          <p>Failures: {selectedNode.failures}</p>
          <p>Avg Latency: {selectedNode.latency_avg_ms.toFixed(2)}ms</p>
        </div>
      )}
    </div>
  );
};

export default ServiceMap;
