import React, { useState, useEffect } from 'react';
import { data } from './data';

interface RelationshipMap {
  [key: string]: string[];
}

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
  const [relationshipMap, setRelationshipMap] = useState<RelationshipMap>({});

  const jsonData: JsonData = data;
  const metrics = jsonData.data.metrics[0];
  const nodes = metrics.nodes;
  const edges = metrics.edges;

  useEffect(() => {
    const newRelationshipMap: RelationshipMap = {};
    edges.forEach((edge) => {
      if (!newRelationshipMap[edge.source]) {
        newRelationshipMap[edge.source] = [];
      }
      newRelationshipMap[edge.source].push(edge.target);
    });
    setRelationshipMap(newRelationshipMap);
  }, [edges]);

  const layoutNodes = () => {
    const centerX = 450;
    const centerY = 400;
    const positions: Record<string, { x: number; y: number }> = {};
    const visited: Set<string> = new Set();

    const dfs = (nodeId: string, depth: number, angle: number, radius: number) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      positions[nodeId] = { x, y };

      const children = relationshipMap[nodeId] || [];
      const childAngleStep = (2 * Math.PI) / (children.length || 1);
      children.forEach((childId, index) => {
        const childAngle = angle + childAngleStep * index;
        dfs(childId, depth + 1, childAngle, radius + 150);
      });
    };

    // Find root nodes (nodes with no incoming edges)
    const rootNodes = nodes.filter((node) => !Object.values(relationshipMap).flat().includes(node.node_id));

    rootNodes.forEach((rootNode, index) => {
      const angle = (index / rootNodes.length) * 2 * Math.PI;
      dfs(rootNode.node_id, 0, angle, 200);
    });

    // Position any remaining nodes
    nodes.forEach((node) => {
      if (!positions[node.node_id]) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = 300 + Math.random() * 100;
        positions[node.node_id] = {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
        };
      }
    });

    return positions;
  };

  const nodePositions = layoutNodes();

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center">
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
          <h3 className="mt-2 font-bold">Related Services:</h3>
          <ul>{relationshipMap[selectedNode.node_id]?.map((targetId, index) => <li key={index}>{targetId}</li>)}</ul>
        </div>
      )}
    </div>
  );
};

export default ServiceMap;
