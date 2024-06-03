export function paging(memorySize, pageSize, processes) {
  let frames = Array(Math.floor(memorySize / pageSize)).fill(null);

  let pageTables = processes.map((process, processIndex) => {
    let pages = Math.ceil(process.size / pageSize);
    let pageTable = Array(pages).fill(-1);

    for (let page = 0; page < pages; page++) {
      for (let frame = 0; frame < frames.length; frame++) {
        if (!frames[frame]) {
          frames[frame] = { process: processIndex, page };
          pageTable[page] = frame;
          break;
        }
      }
    }

    return pageTable;
  });

  return { frames, pageTables };
}
