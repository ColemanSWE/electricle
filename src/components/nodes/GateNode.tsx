import { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";

interface GateNodeProps extends NodeProps {
  data: {
    label: "NOT" | "AND" | "OR";
  };
}

const gateLogic = {
  NOT: (inputs: boolean[]) => !inputs[0],
  AND: (inputs: boolean[]) =>
    inputs.reduce((acc: any, curr: any) => acc && curr, true),
  OR: (inputs: boolean[]) => inputs.some((input: any) => input),
};

export const GateNode: React.FC<GateNodeProps> = ({ data }) => {
  const [inputStates, setInputStates] = useState<boolean[]>([false, false]);

  const output = gateLogic[data.label]
    ? gateLogic[data.label](inputStates)
    : false;

  return (
    <div style={{ padding: 10, backgroundColor: "#ddd", borderRadius: 5 }}>
      {data.label !== "NOT" && (
        <Handle type="target" position={Position.Left} />
      )}
      {data.label === "NOT" && (
        <>
          <Handle
            type="target"
            position={Position.Left}
            id="a"
            style={{ top: 30 }}
          />
        </>
      )}

      <strong>{data.label} Gate</strong>
      <div>Output: {output.toString()}</div>

      {/* Output */}
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
