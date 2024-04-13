import React, { useCallback, useState } from "react";
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
import { ControlPanel } from "./ControlPanel";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "inputNode",
    position: { x: 250, y: 0 },
    data: { label: "Input 1" },
  },
  {
    id: "2",
    type: "inputNode",
    position: { x: 250, y: 100 },
    data: { label: "Input 2" },
  },
];

const initialEdges: Edge[] = [];

export const Flow: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [inputValues, setInputValues] = useState<{ [key: string]: number }>({
    "1": 0,
    "2": 0,
  });

  const setInputValue = (id: string, value: number) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const updatedNodes = nodes.map((node) => {
    if (node.type === "inputNode") {
      return {
        ...node,
        data: {
          ...node.data,
          value: inputValues[node.id],
          setValue: (value: number) => setInputValue(node.id, value),
        },
      };
    }
    return node;
  });

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
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <div style={{ padding: "10px", color: "white" }}>
        <button onClick={() => addGate("NOT")}>Add NOT Gate</button>
        <button onClick={() => addGate("AND")}>Add AND Gate</button>
        <button onClick={() => addGate("OR")}>Add OR Gate</button>
      </div>
      <div style={{ padding: "10px", color: "white" }}>
        <ControlPanel inputValues={inputValues} setInputValue={setInputValue} />
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{ backgroundColor: "#1A192B", padding: "10vh" }}
      />
    </div>
  );
};
