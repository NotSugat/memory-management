import { useState } from "react";
import ControlPanel from "./components/ControlPanel";
import ProcessList from "./components/ProcessList";
import MemoryDisplay from "./components/MemoryDisplay";
import MemoryManager from "./components/MemoryManager";

function App() {
  const [memorySize, setMemorySize] = useState(64); // Default 1MB
  const [partitionSize, setPartitionSize] = useState(4);
  const [pageSize, setPageSize] = useState(4); // Default 4KB
  const [strategy, setStrategy] = useState("firstFit");
  const [technique, setTechnique] = useState("fixedSizePartitioning");
  const [processes, setProcesses] = useState([]);
  const [memoryStatus, setMemoryStatus] = useState({});
  const [unequalMemorySize, setUnequalMemorySize] = useState([]);

  const addProcess = (process) => {
    setProcesses([...processes, process]);
  };

  const removeProcess = (processId) => {
    setProcesses(processes.filter((p) => p.id !== processId));
  };

  const simulate = () => {
    setMemoryStatus({});
    console.log("Simulating...", {
      memorySize,
      pageSize,
      strategy,
      technique,
      processes,
      memoryStatus,
    });
  };

  return (
    <div>
      <h1>Memory Management Simulator</h1>
      <ControlPanel
        memorySize={memorySize}
        setMemorySize={setMemorySize}
        pageSize={pageSize}
        setPageSize={setPageSize}
        strategy={strategy}
        setStrategy={setStrategy}
        technique={technique}
        setTechnique={setTechnique}
        onSimulate={simulate}
        partitionSize={partitionSize}
        setPartitionSize={setPartitionSize}
        unequalMemorySize={unequalMemorySize}
        setUnequalMemorySize={setUnequalMemorySize}
        setMesssageStatus={setMemoryStatus}
      />
      <ProcessList
        processes={processes}
        onAddProcess={addProcess}
        onRemoveProcess={removeProcess}
      />
      <MemoryManager
        memorySize={memorySize}
        pageSize={pageSize}
        strategy={strategy}
        technique={technique}
        processes={processes}
        updateMemoryStatus={setMemoryStatus}
        memoryStatus={memoryStatus}
        partitionSize={partitionSize}
        setPartitionSize={setPartitionSize}
        unequalMemorySize={unequalMemorySize}
        setUnequalMemorySize={setUnequalMemorySize}
      />
      <MemoryDisplay memoryStatus={memoryStatus} technique={technique} />
    </div>
  );
}

export default App;
