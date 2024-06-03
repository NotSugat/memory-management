export function unequalFixedPartitioning(
  memoryPartitions,
  processes,
  strategy,
) {
  let partitions = memoryPartitions.map((size) => ({ size, process: null }));

  const fitStrategies = {
    firstFit: (process) => {
      for (let i = 0; i < partitions.length; i++) {
        if (!partitions[i].process && partitions[i].size >= process.size) {
          partitions[i].process = process.id;
          break;
        }
      }
    },
    bestFit: (process) => {
      let bestIndex = -1;
      let smallestFitSize = Infinity;
      for (let i = 0; i < partitions.length; i++) {
        if (
          !partitions[i].process &&
          partitions[i].size >= process.size &&
          partitions[i].size < smallestFitSize
        ) {
          bestIndex = i;
          smallestFitSize = partitions[i].size;
        }
      }
      if (bestIndex !== -1) {
        partitions[bestIndex].process = process.id;
      }
    },
    worstFit: (process) => {
      let worstIndex = -1;
      let largestFitSize = -Infinity;
      for (let i = 0; i < partitions.length; i++) {
        if (
          !partitions[i].process &&
          partitions[i].size >= process.size &&
          partitions[i].size > largestFitSize
        ) {
          worstIndex = i;
          largestFitSize = partitions[i].size;
        }
      }
      if (worstIndex !== -1) {
        partitions[worstIndex].process = process.id;
      }
    },
  };

  processes.forEach((process) => {
    fitStrategies[strategy](process);
  });

  return partitions;
}
