import { Handle, Position, NodeProps } from "reactflow";

// Custom Input Node Component
export const InputNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div style={{ padding: 10, backgroundColor: "#bbf", borderRadius: 5 }}>
      <strong>{data.label}</strong>
      {/* Output Handle on the right side */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
