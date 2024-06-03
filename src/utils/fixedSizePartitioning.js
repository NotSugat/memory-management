export function fixedSizePartitioning(
  memorySize,
  partitionSize,
  processes,
  strategy,
) {
  let partitions = Array(Math.floor(memorySize / partitionSize)).fill(null);

  const fitStrategies = {
    firstFit: (process) => {
      const neededPartitions = Math.ceil(process.size / partitionSize);
      for (let i = 0; i <= partitions.length - neededPartitions; i++) {
        let fit = true;
        for (let j = 0; j < neededPartitions; j++) {
          if (partitions[i + j] !== null) {
            fit = false;
            break;
          }
        }
        if (fit) {
          for (let j = 0; j < neededPartitions; j++) {
            partitions[i + j] = process.id;
          }
          return true;
        }
      }
      return false;
    },
    bestFit: (process) => {
      const neededPartitions = Math.ceil(process.size / partitionSize);
      let bestIndex = -1;
      let bestFitSize = Infinity;
      for (let i = 0; i <= partitions.length - neededPartitions; i++) {
        let fit = true;
        let fitSize = 0;
        for (let j = 0; j < neededPartitions; j++) {
          if (partitions[i + j] !== null) {
            fit = false;
            break;
          }
          fitSize += partitionSize;
        }
        if (fit && fitSize < bestFitSize) {
          bestIndex = i;
          bestFitSize = fitSize;
        }
      }
      if (bestIndex !== -1) {
        for (let j = 0; j < neededPartitions; j++) {
          partitions[bestIndex + j] = process.id;
        }
        return true;
      }
      return false;
    },
    worstFit: (process) => {
      const neededPartitions = Math.ceil(process.size / partitionSize);
      let worstIndex = -1;
      let worstFitSize = 0;
      for (let i = 0; i <= partitions.length - neededPartitions; i++) {
        let fit = true;
        let fitSize = 0;
        for (let j = 0; j < neededPartitions; j++) {
          if (partitions[i + j] !== null) {
            fit = false;
            break;
          }
          fitSize += partitionSize;
        }
        if (fit && fitSize > worstFitSize) {
          worstIndex = i;
          worstFitSize = fitSize;
        }
      }
      if (worstIndex !== -1) {
        for (let j = 0; j < neededPartitions; j++) {
          partitions[worstIndex + j] = process.id;
        }
        return true;
      }
      return false;
    },
  };

  processes.forEach((process) => {
    fitStrategies[strategy](process);
  });

  return partitions;
}
