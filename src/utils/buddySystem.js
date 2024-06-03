function splitBlock(block, requiredSize) {
  while (block.size / 2 >= requiredSize) {
    block.size /= 2;
  }
  return block;
}

export function buddySystem(memorySize, processes) {
  let freeBlocks = [{ start: 0, size: memorySize }];
  let allocatedBlocks = [];

  processes.forEach((process) => {
    for (let i = 0; i < freeBlocks.length; i++) {
      if (freeBlocks[i].size >= process.size) {
        let block = splitBlock(freeBlocks.splice(i, 1)[0], process.size);
        allocatedBlocks.push({ ...block, process });
        return;
      }
    }
  });

  return { allocatedBlocks, freeBlocks };
}
