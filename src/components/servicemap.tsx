import React, { useState, useEffect } from 'react';
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

interface NodePosition {
  x: number;
  y: number;
}

const ServiceNode: React.FC<{
  node: Node;
  position: NodePosition;
  onClick: (node: Node) => void;
}> = ({ node, position, onClick }) => {
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
    <g transform={`translate(${position.x},${position.y})`} onClick={() => onClick(node)}>
      <circle r="30" fill={getColor(node.type)} />
      <text
        textAnchor="middle"
        dy=".3em"
        fill="#000"
        stroke="#fff"
        strokeWidth="0.5"
        fontSize="12"
        style={{ pointerEvents: 'none' }}
      >
        {/* {node.node_id.split('-').slice(0, -1).join('-')} */}
        {node.node_id}
      </text>
    </g>
  );
};

const ServiceLink: React.FC<{
  source: NodePosition;
  target: NodePosition;
  edge: Edge;
}> = ({ source, target, edge }) => {
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const angle = Math.atan2(dy, dx);

  const sourceRadius = 30;
  const targetRadius = 30;

  const startX = source.x + sourceRadius * Math.cos(angle);
  const startY = source.y + sourceRadius * Math.sin(angle);
  const endX = target.x - targetRadius * Math.cos(angle);
  const endY = target.y - targetRadius * Math.sin(angle);

  // Calculate control points for a curved line
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const curveFactor = 0.2;
  const controlX = midX - curveFactor * (endY - startY);
  const controlY = midY + curveFactor * (endX - startX);

  return (
    <g>
      <path
        d={`M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`}
        fill="none"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="2"
        markerEnd="url(#arrow)"
      />
      <text x={midX} y={midY} fill="#666" fontSize="10" textAnchor="middle" dy="-5" style={{ pointerEvents: 'none' }}>
        {edge.calls} calls
      </text>
    </g>
  );
};

const ServiceMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [nodePositions, setNodePositions] = useState<Record<string, NodePosition>>({});

  const metrics = data.data.metrics[0];
  const nodes = metrics.nodes;
  const edges = metrics.edges;

  useEffect(() => {
    const calculateNodePositions = () => {
      const positions: Record<string, NodePosition> = {};
      const svgWidth = 1200;
      const svgHeight = 800;
      const horizontalPadding = 100;
      const verticalPadding = 50;

      // Calculate in-degree and out-degree for each node
      const inDegree: Record<string, number> = {};
      const outDegree: Record<string, number> = {};
      edges.forEach((edge) => {
        inDegree[edge.target] = (inDegree[edge.target] || 0) + 1;
        outDegree[edge.source] = (outDegree[edge.source] || 0) + 1;
      });

      // Sort nodes based on the difference between out-degree and in-degree
      const sortedNodes = [...nodes].sort((a, b) => {
        const aDiff = (outDegree[a.node_id] || 0) - (inDegree[a.node_id] || 0);
        const bDiff = (outDegree[b.node_id] || 0) - (inDegree[b.node_id] || 0);
        return bDiff - aDiff;
      });

      // Assign nodes to layers
      const layers: string[][] = [];
      sortedNodes.forEach((node) => {
        let layerIndex = 0;
        while (true) {
          if (!layers[layerIndex]) {
            layers[layerIndex] = [];
          }
          if (layers[layerIndex].length < 5) {
            // Limit 5 nodes per layer
            layers[layerIndex].push(node.node_id);
            break;
          }
          layerIndex++;
        }
      });

      // Barycentric method to reduce edge crossings
      const optimizeLayers = (layers: string[][]) => {
        for (let i = 1; i < layers.length; i++) {
          const currentLayer = layers[i];
          const prevLayer = layers[i - 1];

          const nodeOrder: Record<string, number> = {};
          prevLayer.forEach((node, index) => {
            nodeOrder[node] = index;
          });

          const barycenters = currentLayer.map((node) => {
            const connectedNodes = edges
              .filter((e) => e.source === node || e.target === node)
              .map((e) => (e.source === node ? e.target : e.source))
              .filter((n) => prevLayer.includes(n));
            if (connectedNodes.length === 0) return 0;
            return connectedNodes.reduce((sum, n) => sum + nodeOrder[n], 0) / connectedNodes.length;
          });

          currentLayer.sort((a, b) => {
            const indexA = currentLayer.indexOf(a);
            const indexB = currentLayer.indexOf(b);
            return barycenters[indexA] - barycenters[indexB];
          });
        }
      };

      // Apply barycentric method multiple times
      for (let i = 0; i < 3; i++) {
        optimizeLayers(layers);
      }

      // Calculate positions based on optimized layers
      layers.forEach((layer, layerIndex) => {
        const layerX = horizontalPadding + (svgWidth - 2 * horizontalPadding) * (layerIndex / (layers.length - 1));
        layer.forEach((nodeId, nodeIndex) => {
          const layerY = verticalPadding + (svgHeight - 2 * verticalPadding) * (nodeIndex / (layer.length - 1));
          positions[nodeId] = { x: layerX, y: layerY };
        });
      });

      setNodePositions(positions);
    };

    calculateNodePositions();
  }, [nodes, edges]);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Optimized Hierarchical Service Map</h1>
      <svg width="1200" height="800" style={{ border: '1px solid #ccc', borderRadius: '8px' }}>
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="rgba(0,0,0,0.2)" />
          </marker>
        </defs>
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
            node={node}
            position={nodePositions[node.node_id] || { x: 0, y: 0 }}
            onClick={handleNodeClick}
          />
        ))}
      </svg>
      {selectedNode && (
        <div
          style={{
            marginTop: '16px',
            padding: '16px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
          }}
        >
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{selectedNode.node_id}</h2>
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
