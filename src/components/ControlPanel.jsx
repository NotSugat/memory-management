import React, { useState } from "react";
import { unequalFixedPartitioning } from "../utils/unequalFixedPartitioning";

function ControlPanel({
  memorySize,
  setMemorySize,
  pageSize,
  setPageSize,
  strategy,
  setStrategy,
  technique,
  setTechnique,
  onSimulate,
  partitionSize,
  setPartitionSize,
  unequalMemorySize,
  setUnequalMemorySize,
  setMessageStatus,
}) {
  const handleSimulate = () => {
    onSimulate();
  };

  return (
    <div>
      <h2>Control Panel</h2>
      <div>
        <label>
          Memory Size:
          <input
            type="number"
            value={memorySize}
            onChange={(e) => setMemorySize(Number(e.target.value))}
          />
        </label>
      </div>

      {technique === "fixedSizePartitioning" && (
        <div>
          <label>
            Partition Size:
            <input
              type="number"
              value={partitionSize}
              onChange={(e) => setPartitionSize(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      {/* {technique === "unequalFixedPartitioning" && ( */}
      {/*   <div> */}
      {/*     <label> */}
      {/*       Unequal memory Size: */}
      {/*       <input */}
      {/*         placeholder="Enter memory sizes separated by commas [2,4,8,4]" */}
      {/*         type="text" */}
      {/*         value={unequalFixedPartitioning()} */}
      {/*         onChange={(e) => setUnequalMemorySize(e.target.value)} */}
      {/*       /> */}
      {/*     </label> */}
      {/*   </div> */}
      {/* )} */}

      {technique === "un" && (
        <div>
          <label>
            Partition Size:
            <input
              type="number"
              value={partitionSize}
              onChange={(e) => setPartitionSize(Number(e.target.value))}
            />
          </label>
        </div>
      )}
      <div>
        <label>
          Page Size:
          <input
            type="number"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Allocation Strategy:
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
          >
            <option value="firstFit">First Fit</option>
            <option value="bestFit">Best Fit</option>
            <option value="worstFit">Worst Fit</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Memory Management Technique:
          <select
            value={technique}
            onChange={(e) => {
              setTechnique(e.target.value);
              setMessageStatus({});
            }}
          >
            <option value="fixedSizePartitioning">
              Fixed-sized Partitioning
            </option>
            <option value="unequalFixedPartitioning">
              Unequal-sized Partitioning
            </option>
            <option value="dynamicMemoryAllocation">Dynamic Allocation</option>
            <option value="buddySystem">Buddy System</option>
            <option value="paging">Paging</option>
          </select>
        </label>
      </div>
      <button onClick={handleSimulate}>Simulate</button>
    </div>
  );
}

export default ControlPanel;
