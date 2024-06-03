import React, { useState } from "react";

function ProcessList({ processes, onAddProcess, onRemoveProcess }) {
  const [processSize, setProcessSize] = useState(0);

  const handleAdd = () => {
    if (processSize > 0) {
      const newProcess = {
        id: Date.now(),
        size: processSize,
      };
      onAddProcess(newProcess);
      setProcessSize(0);
    }
  };

  return (
    <div>
      <h2>Processes</h2>
      <ul>
        {processes.map((process) => (
          <li key={process.id}>
            Process {process.id}: {process.size} KB
            <button onClick={() => onRemoveProcess(process.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <label>
          Process Size:
          <input
            type="number"
            value={processSize}
            onChange={(e) => setProcessSize(Number(e.target.value))}
          />
        </label>
        <button onClick={handleAdd}>Add Process</button>
      </div>
    </div>
  );
}

export default ProcessList;
