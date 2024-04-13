interface ControlPanelProps {
  inputValues: { [key: string]: number };
  setInputValue: (id: string, value: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  inputValues,
  setInputValue,
}) => {
  return (
    <div>
      {Object.keys(inputValues).map((inputId) => (
        <button
          key={inputId}
          onClick={() =>
            setInputValue(inputId, inputValues[inputId] === 0 ? 1 : 0)
          }
        >
          Toggle Input {inputId}
        </button>
      ))}
    </div>
  );
};
