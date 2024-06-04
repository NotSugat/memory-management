import React, { useEffect } from "react";
import { fixedSizePartitioning } from "../utils/fixedSizePartitioning";
import { unequalFixedPartitioning } from "../utils/unequalFixedPartitioning";
import { dynamicMemoryAllocation } from "../utils/dynamicMemoryAllocation";
import { buddySystem } from "../utils/buddySystem";
import { paging } from "../utils/paging";
import { useState } from "react";

function MemoryManager({
  memorySize,
  pageSize,
  strategy,
  technique,
  processes,
  updateMemoryStatus,
  memoryStatus: mem,
  partitionSize,
  setPartitionSize,
  unequalMemorySize,
  setUnequalMemorySize,
}) {
  useEffect(() => {
    let memoryStatus = {};
    switch (technique) {
      case "fixedSizePartitioning":
        memoryStatus = fixedSizePartitioning(
          memorySize,
          partitionSize,
          processes,
          strategy,
        );
        break;
      case "unequalFixedPartitioning":
        // const unequalSizes = unequalMemorySize.split(",").map((s) => Number(s));
        memoryStatus = unequalFixedPartitioning(
          [200, 100, 300, 400],
          processes,
          strategy,
        );
        break;
      case "dynamicMemoryAllocation":
        memoryStatus = dynamicMemoryAllocation(memorySize, processes, strategy);
        break;
      case "buddySystem":
        memoryStatus = buddySystem(memorySize, processes);
        break;
      case "paging":
        memoryStatus = paging(memorySize, pageSize, processes);
        break;
      default:
        break;
    }
    updateMemoryStatus({ status: memoryStatus });
  }, [memorySize, pageSize, strategy, technique, processes]);

  return null;
}

export default MemoryManager;
