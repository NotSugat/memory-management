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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold  ">Processes</h2>
      <ul>
        {processes.map((process) => (
          <li key={process.id} className="flex items-center gap-4 text-lg">
            <p className="flex gap-4 ">
              <span className="font-semibold">PID {process.id}:</span>
              <span className="">{process.size} KB</span>
            </p>
            <button
              onClick={() => onRemoveProcess(process.id)}
              className="text-lg px-4 py-2 bg-[#464750] rounded-md"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="textfield flex items-center gap-4">
        <label>
          Process Size:
          <input
            type="number"
            value={processSize}
            onChange={(e) => setProcessSize(Number(e.target.value))}
          />
        </label>
        <button
          onClick={handleAdd}
          className="text-lg px-4 py-2 bg-[#464750] rounded-md"
        >
          Add Process
        </button>
      </div>
    </div>
  );
}

export default ProcessList;
