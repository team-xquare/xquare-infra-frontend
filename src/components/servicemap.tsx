import React, { useState, useRef, useMemo } from 'react';

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

interface ServiceMapProps {
  data: JsonData;
}

interface ServiceNodeProps {
  x: number;
  y: number;
  node: Node;
  onNodeClick: (node: Node) => void;
  onNodeHover: (node: Node | null) => void;
  maxCalls: number;
  isConnected: boolean;
  isHovered: boolean;
}

interface ServiceLinkProps {
  source: { x: number; y: number };
  target: { x: number; y: number };
  edge: Edge;
  maxCalls: number;
  isConnected: boolean;
}

const ServiceNode: React.FC<ServiceNodeProps> = ({
  x,
  y,
  node,
  onNodeClick,
  onNodeHover,
  maxCalls,
  isConnected,
  isHovered,
}) => {
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

  const radius = 20 + (node.calls / maxCalls) * 30;
  const opacity = isConnected ? 1 : 0.3;

  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={(e) => {
        e.stopPropagation();
        onNodeClick(node);
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
        onNodeHover(node);
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        onNodeHover(null);
      }}
      style={{ cursor: 'pointer' }}
    >
      <circle r={radius} fill={getColor(node.type)} opacity={opacity} />
      <text textAnchor="middle" dy=".3em" fill="#000" stroke="#fff" strokeWidth="0.1" fontSize="16" opacity={opacity}>
        {node.node_id}
      </text>
      {isHovered && <circle r={radius + 5} fill="none" stroke="#FFD700" strokeWidth="2" opacity={0.8} />}
    </g>
  );
};

const ServiceLink: React.FC<ServiceLinkProps> = ({ source, target, edge, maxCalls, isConnected }) => {
  const offset = 54;
  const arrowOffset = -0;

  const startX = source.x;
  const startY = source.y;
  const endX = target.x - ((target.x - source.x) * offset) / Math.hypot(target.x - source.x, target.y - source.y);
  const endY = target.y - ((target.y - source.y) * offset) / Math.hypot(target.x - source.x, target.y - source.y);

  const strokeWidth = 1 + (edge.calls / maxCalls) * 5;
  const opacity = isConnected ? 0.8 : 0.1;

  return (
    <g>
      <defs>
        <marker
          id={`arrow-${edge.source}-${edge.target}`}
          markerWidth="10"
          markerHeight="7"
          refX={arrowOffset}
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="rgba(0,0,0,0.1)" />
        </marker>
      </defs>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth={strokeWidth}
        markerEnd={`url(#arrow-${edge.source}-${edge.target})`}
        opacity={opacity}
      />
      <text x={(startX + endX) / 2} y={(startY + endY) / 2} fill="#666" fontSize="10" opacity={opacity}>
        {edge.calls} calls, {edge.latency_avg_ms.toFixed(2)}ms
      </text>
    </g>
  );
};

const ServiceMap: React.FC<ServiceMapProps> = ({ data }) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [magnification, setMagnification] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const metrics = data.data.metrics[0];
  const nodes = metrics.nodes;
  const edges = metrics.edges;

  const { references, uniqueEdges } = useMemo(() => {
    const references = nodes.reduce(
      (acc, node) => {
        acc[node.node_id] = {
          incoming: 0,
          outgoing: 0,
          uniqueTargets: new Set<string>(),
          connectedNodes: new Set<string>(),
        };
        return acc;
      },
      {} as Record<
        string,
        { incoming: number; outgoing: number; uniqueTargets: Set<string>; connectedNodes: Set<string> }
      >,
    );

    const uniqueEdgesMap = new Map<string, Edge>();

    edges.forEach((edge) => {
      const key = `${edge.source}-${edge.target}`;
      if (uniqueEdgesMap.has(key)) {
        const existingEdge = uniqueEdgesMap.get(key)!;
        existingEdge.calls += edge.calls;
      } else {
        uniqueEdgesMap.set(key, { ...edge });
      }
    });

    uniqueEdgesMap.forEach((edge) => {
      references[edge.target].incoming += edge.calls;
      references[edge.source].outgoing += edge.calls;
      references[edge.source].uniqueTargets.add(edge.target);
      references[edge.source].connectedNodes.add(edge.target);
      references[edge.target].connectedNodes.add(edge.source);
    });

    return { references, uniqueEdges: Array.from(uniqueEdgesMap.values()) };
  }, [nodes, edges]);

  const nodePositions = useMemo(() => {
    const width = 1200;
    const height = 800;
    const padding = 100;
    const positions: Record<string, { x: number; y: number }> = {};

    const sortedNodes = [...nodes].sort(
      (a, b) => references[b.node_id].uniqueTargets.size - references[a.node_id].uniqueTargets.size,
    );

    sortedNodes.forEach((node, index) => {
      const x = padding + ((width - 2 * padding) * index) / (nodes.length - 1);
      const y = height / 2 + (Math.random() - 0.5) * (height / 2 - padding);

      positions[node.node_id] = { x, y };
    });

    return positions;
  }, [nodes, references]);

  const handleNodeClick = (node: Node) => {
    setSelectedNode(node);
  };

  const handleNodeHover = (node: Node | null) => {
    setHoveredNode(node);
  };

  const maxCalls = Math.max(...nodes.map((node) => node.calls));
  const maxEdgeCalls = Math.max(...uniqueEdges.map((edge) => edge.calls));

  const isConnected = (nodeId: string) => {
    if (!hoveredNode) return true;
    return hoveredNode.node_id === nodeId || references[hoveredNode.node_id].connectedNodes.has(nodeId);
  };

  const onWheel = (event: React.WheelEvent<SVGSVGElement>) => {
    // 기본 스크롤 동작 방지
    event.preventDefault();
    event.stopPropagation();

    if (event.ctrlKey) {
      const delta = event.deltaY * -0.001;
      const svg = event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - svg.left;
      const mouseY = event.clientY - svg.top;

      setMagnification((prevMagnification) => {
        const newMagnification = Math.max(0.1, prevMagnification + delta);
        const scaleFactor = newMagnification / prevMagnification;

        setOffset((prevOffset) => ({
          x: mouseX - (mouseX - prevOffset.x) * scaleFactor,
          y: mouseY - (mouseY - prevOffset.y) * scaleFactor,
        }));

        return newMagnification;
      });
    }
  };

  const onMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
    startPos.current = { x: event.clientX, y: event.clientY };
  };

  const onMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (isDragging && startPos.current) {
      const dx = event.clientX - startPos.current.x;
      const dy = event.clientY - startPos.current.y;
      setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      startPos.current = { x: event.clientX, y: event.clientY };
    }
  };

  const onMouseUp = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    startPos.current = null;
  };

  return (
    <div
      ref={svgContainerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: 'calc(100% - 200px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
          }}
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 1200 800"
          onWheel={onWheel}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => {
            document.body.style.overflow = 'auto';
          }}
          onMouseEnter={() => {
            document.body.style.overflow = 'hidden';
          }}
        >
          <g transform={`translate(${offset.x}, ${offset.y}) scale(${magnification})`}>
            {uniqueEdges.map((edge, index) => (
              <ServiceLink
                key={index}
                source={nodePositions[edge.source] || { x: 0, y: 0 }}
                target={nodePositions[edge.target] || { x: 0, y: 0 }}
                edge={edge}
                maxCalls={maxEdgeCalls}
                isConnected={!hoveredNode || isConnected(edge.source) || isConnected(edge.target)}
              />
            ))}
            {nodes.map((node) => (
              <ServiceNode
                key={node.node_id}
                x={nodePositions[node.node_id].x}
                y={nodePositions[node.node_id].y}
                node={node}
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                maxCalls={maxCalls}
                isConnected={isConnected(node.node_id)}
                isHovered={hoveredNode?.node_id === node.node_id}
              />
            ))}
          </g>
        </svg>
      </div>
      {selectedNode && (
        <div
          style={{
            marginTop: '16px',
            padding: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            maxHeight: '200px',
            overflow: 'auto',
            width: '100%',
          }}
        >
          <h2 style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{selectedNode.node_id}</h2>
          <p>Type: {selectedNode.type}</p>
          <p>Calls: {selectedNode.calls}</p>
          <p>Successes: {selectedNode.successes}</p>
          <p>Failures: {selectedNode.failures}</p>
          <p>Avg Latency: {selectedNode.latency_avg_ms.toFixed(2)}ms</p>
          <p>Referenced by: {references[selectedNode.node_id].incoming}</p>
          <p>References: {references[selectedNode.node_id].outgoing}</p>
          <p>Unique Targets: {references[selectedNode.node_id].uniqueTargets.size}</p>
          <h3 style={{ marginTop: '8px', fontWeight: 'bold' }}>Unique Edge Calls:</h3>
          <ul>
            {uniqueEdges
              .filter((edge) => edge.source === selectedNode.node_id || edge.target === selectedNode.node_id)
              .map((edge, index) => (
                <li key={index}>
                  {edge.source} → {edge.target}: {edge.calls} calls
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ServiceMap;
