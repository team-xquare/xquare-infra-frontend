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
    edges.forEach((edge) => {
      references[edge.target] = (references[edge.target] || 0) + edge.calls;
    });
    return references;
  };

  const layoutNodes = () => {
    const centerX = 600;
    const centerY = 400;
    const maxRadius = 300;
    const minRadius = 100;
    const positions: Record<string, { x: number; y: number }> = {};
    const references = calculateReferences();

    // Find max reference count for normalization
    const maxReferences = Math.max(...Object.values(references));

    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI;
      const referenceCount = references[node.node_id] || 0;

      // Normalize radius based on reference count (more references = smaller radius)
      const normalizedRadius = maxRadius - (referenceCount / maxReferences) * (maxRadius - minRadius);

      positions[node.node_id] = {
        x: centerX + normalizedRadius * Math.cos(angle),
        y: centerY + normalizedRadius * Math.sin(angle),
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
