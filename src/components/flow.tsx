import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  useEdgesState,
  useNodesState,
  Edge,
  Node,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { GateNode } from "./nodes/GateNode";
import { InputNode } from "./nodes/InputNode";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Input 1" },
  },
  {
    id: "2",
    type: "input",
    position: { x: 0, y: 100 },
    data: { label: "Input 2" },
  },
];

const initialEdges: Edge[] = [];

export const Flow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const addGate = useCallback(
    (type: "NOT" | "AND" | "OR") => {
      const id = `gate-${(Math.random() * 100000).toFixed(0)}`;
      const newNode: Node = {
        id,
        type: "gateNode",
        position: {
          x: Math.random() * window.innerWidth * 0.8,
          y: Math.random() * window.innerHeight * 0.8,
        },
        data: { label: type },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes],
  );

  const nodeTypes = {
    gateNode: GateNode,
    inputNode: InputNode,
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={() => addGate("NOT")}>Add NOT Gate</button>
      <button onClick={() => addGate("AND")}>Add AND Gate</button>
      <button onClick={() => addGate("OR")}>Add OR Gate</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      />
    </div>
  );
};
