import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./tableHeader";

const { ipcRenderer } = window.require("electron");

const VirtualServerClassic = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    ipcRenderer.send("virtual-server-classic:requestApi", {
      log: "Requesting Classic Virtual Server data from API",
      credentials: JSON.parse(sessionStorage.getItem("currentAccount")),
    });
  }, []);

  ipcRenderer.on("virtual-server-classic:loading-table", (event, arg) => {
    setLoadingTable(true);
  });

  ipcRenderer.on("virtual-server-classic:receiving-data", (event, arg) => {
    setRows(arg);
    setLoadingTable(false);
  });

  return (
    <>
      {!loadingTable && (
        <Table
          title="Virtual Server for Classic"
          headerData={Headers}
          rowData={rows}
          eventName="virtual-server-classic:requestApi"
          eventArgs={{
            log: "Requesting Classic Virtual Server data from API",
            eventLoading: "virtual-server-classic:loading-table",
          }}
        />
      )}
      {loadingTable && <DataTableSkeleton headers={Headers} rowCount={11} />}
    </>
  );
};

export default VirtualServerClassic;
