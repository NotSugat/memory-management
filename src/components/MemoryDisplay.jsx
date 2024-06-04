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
      <h2 className="text-2xl font-semibold">Memory Status</h2>

      {technique === "fixedSizePartitioning" && status?.status && (
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            listStyle: "none",
            padding: 0,
            istStyleType: "none",
          }}
          className="bg-[#262730]  rounded-md"
        >
          {status?.status?.map((item, index) => (
            <li key={index} className="p-4 text-xl font-semibold gap-2">
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
          }}
          onClick={() => console.log(status)}
          className="display"
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
