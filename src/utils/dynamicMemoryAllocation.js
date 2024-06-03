export function dynamicMemoryAllocation(memorySize, processes, strategy) {
  let freeBlocks = [{ start: 0, size: memorySize }];
  let allocatedBlocks = [];

  const fitStrategies = {
    firstFit: (process) => {
      for (let i = 0; i < freeBlocks.length; i++) {
        if (freeBlocks[i].size >= process.size) {
          const allocatedBlock = {
            ...freeBlocks[i],
            size: process.size,
            process: process.id,
          };
          freeBlocks[i] = {
            start: freeBlocks[i].start + process.size,
            size: freeBlocks[i].size - process.size,
          };
          return allocatedBlock;
        }
      }
      return null;
    },
    bestFit: (process) => {
      let bestIndex = -1;
      for (let i = 0; i < freeBlocks.length; i++) {
        if (
          freeBlocks[i].size >= process.size &&
          (bestIndex === -1 || freeBlocks[i].size < freeBlocks[bestIndex].size)
        ) {
          bestIndex = i;
        }
      }
      if (bestIndex !== -1) {
        const allocatedBlock = {
          ...freeBlocks[bestIndex],
          size: process.size,
          process: process.id,
        };
        freeBlocks[bestIndex] = {
          start: freeBlocks[bestIndex].start + process.size,
          size: freeBlocks[bestIndex].size - process.size,
        };
        return allocatedBlock;
      }
      return null;
    },
    worstFit: (process) => {
      let worstIndex = -1;
      for (let i = 0; i < freeBlocks.length; i++) {
        if (
          freeBlocks[i].size >= process.size &&
          (worstIndex === -1 ||
            freeBlocks[i].size > freeBlocks[worstIndex].size)
        ) {
          worstIndex = i;
        }
      }
      if (worstIndex !== -1) {
        const allocatedBlock = {
          ...freeBlocks[worstIndex],
          size: process.size,
          process: process.id,
        };
        freeBlocks[worstIndex] = {
          start: freeBlocks[worstIndex].start + process.size,
          size: freeBlocks[worstIndex].size - process.size,
        };
        return allocatedBlock;
      }
      return null;
    },
  };

  processes.forEach((process) => {
    const allocatedBlock = fitStrategies[strategy](process);
    if (allocatedBlock) {
      allocatedBlocks.push(allocatedBlock);
    }
  });

  return {
    allocatedBlocks,
    freeBlocks: freeBlocks.filter((block) => block.size > 0),
  };
}
