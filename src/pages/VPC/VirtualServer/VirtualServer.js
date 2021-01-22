import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./TableHeader";

const { ipcRenderer } = window.require("electron");

const VirtualServer = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    ipcRenderer.send("virtual-server-vpc:requestApi", {
      log: "Requesting VPC Virtual Server data from API",
      credentials: JSON.parse(sessionStorage.getItem("currentAccount")),
    });
  }, []);

  ipcRenderer.on("virtual-server-vpc:loading-table", (event, arg) => {
    setLoadingTable(true);
  });

  ipcRenderer.on("virtual-server-vpc:receiving-data", (event, arg) => {
    setRows(arg);
    setLoadingTable(false);
  });

  return (
    <>
      {!loadingTable && (
        <Table
          title="VPC Virtual Server"
          headerData={Headers}
          rowData={rows}
          eventName="virtual-server-vpc:requestApi"
          eventArgs={{
            log: "Requesting VPC Virtual Server data from API",
            eventLoading: "virtual-server-vpc:loading-table",
          }}
        />
      )}
      {loadingTable && <DataTableSkeleton headers={Headers} rowCount={11} />}
    </>
  );
};

export default VirtualServer;
