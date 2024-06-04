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
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Control Panel</h2>
      <div className="textfield">
        <label>
          Memory Size:
          <input
            type="number"
            value={memorySize}
            onChange={(e) => setMemorySize(Number(e.target.value))}
            className=""
          />
        </label>
      </div>

      {technique === "fixedSizePartitioning" && (
        <div className="textfield">
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
        <div className="textfield">
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
      <div className="textfield">
        <label>
          Page Size:
          <input
            type="number"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="textfield">
        <label>
          Allocation Strategy:
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="p-4 text-white border border-[#1e232b] rounded-md text-[#eee] focus:outline-none focus:border-[#1e232b] focus:ring-1 focus:ring-[#1e232b]  bg-[#262730]"
          >
            <option value="firstFit">First Fit</option>
            <option value="bestFit">Best Fit</option>
            <option value="worstFit">Worst Fit</option>
          </select>
        </label>
      </div>
      <div className="textfield">
        <label>
          Memory Management Technique:
          <select
            value={technique}
            onChange={(e) => {
              setTechnique(e.target.value);
              setMessageStatus({});
            }}
            className="p-4 text-white border border-[#1e232b] rounded-md text-[#eee] focus:outline-none focus:border-[#1e232b] focus:ring-1 focus:ring-[#1e232b]  bg-[#262730]"
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
      <button
        onClick={handleSimulate}
        className="text-lg px-4 py-2 bg-[#464750] rounded-md"
      >
        Simulate
      </button>
    </div>
  );
}

export default ControlPanel;
