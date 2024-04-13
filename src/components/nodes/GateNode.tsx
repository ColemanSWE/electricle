import { useState, useEffect } from "react";
import { Handle, Position, NodeProps } from "reactflow";

interface GateNodeProps extends NodeProps {
  data: {
    label: "NOT" | "AND" | "OR";
  };
}

const gateLogic = {
  NOT: (inputs: boolean[]) => !inputs[0],
  AND: (inputs: boolean[]) => inputs.reduce((acc, curr) => acc && curr, true),
  OR: (inputs: boolean[]) => inputs.some((input) => input),
};

export const GateNode: React.FC<GateNodeProps> = ({ data }) => {
  const initialInputs = data.label === "NOT" ? [false] : [false, false];
  const [inputStates, setInputStates] = useState<boolean[]>(initialInputs);

  const output = gateLogic[data.label]
    ? gateLogic[data.label](inputStates)
    : false;

  const inputHandles =
    data.label === "NOT" ? (
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ top: "50%" }}
      />
    ) : (
      <>
        <Handle
          type="target"
          position={Position.Left}
          id="a"
          style={{ top: "30%" }}
        />
        <Handle
          type="target"
          position={Position.Left}
          id="b"
          style={{ top: "70%" }}
        />
      </>
    );

  return (
    <div style={{ padding: 10, backgroundColor: "#ddd", borderRadius: 5 }}>
      {inputHandles}
      <strong>{data.label} Gate</strong>
      <div>Output: {output.toString()}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};
