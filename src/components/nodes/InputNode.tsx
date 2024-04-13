import { Handle, NodeProps, Position } from "reactflow";

interface InputNodeData {
  label: string;
  value: number;
  setValue: (value: number) => void;
}

export const InputNode: React.FC<NodeProps<InputNodeData>> = ({ data }) => {
  const toggleValue = () => {
    data.setValue(data.value === 0 ? 1 : 0);
  };

  return (
    <div style={{ padding: 10, backgroundColor: "#bbf", borderRadius: 5 }}>
      <div style={{ cursor: "pointer" }}>
        <strong>{data.label}</strong>: {data.value}
      </div>
      <button onClick={toggleValue}>Toggle Value</button>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
