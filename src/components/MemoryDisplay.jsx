import { useState } from "react";
import { useEffect } from "react";

function MemoryDisplay({ memoryStatus, technique }) {
  const [status, setStatus] = useState({});

  useEffect(() => {
    setStatus({});
    setStatus(memoryStatus);
    console.log("Memory Status", memoryStatus);
  }, [memoryStatus]);

  return (
    <div>
      <h2>Memory Status</h2>

      {technique === "fixedSizePartitioning" && status?.status && (
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            listStyle: "none",
            padding: 0,
            istStyleType: "none",
            gap: "0.5rem",
          }}
        >
          {status?.status?.map((item, index) => (
            <li key={index}>
              {`P${index}:`}
              {item !== null ? item : "null"}
            </li>
          ))}
        </ul>
      )}

      {technique === "unequalFixedPartitioning" && status?.status && (
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            listStyle: "none",
            padding: 0,
            istStyleType: "none",
            gap: "0.5rem",
          }}
          onClick={() => console.log(status)}
        >
          {status?.status?.map((item, index) => (
            <li key={index}>
              Size {`P${index}:`}
              {item?.size} : {item?.process ? item?.process : "null"}
            </li>
          ))}
        </ul>
      )}
      <div>
        <h3>Fixed Size/Unequal Partitions</h3>
        {status.allocatedBlocks && (
          <ul>
            {status.allocatedBlocks.map((block, index) => (
              <li key={index}>
                Partition {index}:{" "}
                {block !== null ? `Process ${block}` : "null"}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3>Dynamic Allocation</h3>
        <div>
          <h4>Allocated Blocks</h4>
          <ul>
            {status.allocatedBlocks &&
              status.allocatedBlocks.map((block, index) => (
                <li key={index}>
                  Block {index}: Process {block.process}, Size {block.size},
                  Start {block.start}
                </li>
              ))}
          </ul>
          <h4>Free Blocks</h4>
          <ul>
            {status.freeBlocks &&
              status.freeBlocks.map((block, index) => (
                <li key={index}>
                  Block {index}: Size {block.size}, Start {block.start}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div>
        <h3>Paging</h3>
        <div>
          <h4>Frames</h4>
          <ul>
            {status.frames &&
              status.frames.map((frame, index) => (
                <li key={index}>
                  Frame {index}:{" "}
                  {frame
                    ? `Process ${frame.process}, Page ${frame.page}`
                    : "Free"}
                </li>
              ))}
          </ul>
          <h4>Page Tables</h4>
          {status.pageTables &&
            status.pageTables.map((pageTable, index) => (
              <div key={index}>
                <h4>Process {index}</h4>
                <ul>
                  {pageTable.map((frame, pageIndex) => (
                    <li key={pageIndex}>
                      Page {pageIndex}: Frame {frame}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MemoryDisplay;
