import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./tableHeader";

const { ipcRenderer } = window.require("electron");

const VPCoverview = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    ipcRenderer.send("vpc:requestApi", {
      log: "Requesting VPCs data from API",
      credentials: JSON.parse(sessionStorage.getItem("currentAccount")),
    });
  }, []);

  ipcRenderer.on("vpc:loading-table", (event, arg) => {
    setLoadingTable(true);
  });

  ipcRenderer.on("vpc:receiving-data", (event, arg) => {
    setRows(arg);
    setLoadingTable(false);
  });

  return (
    <>
      {!loadingTable && (
        <Table
          title="VPCs"
          headerData={Headers}
          rowData={rows}
          eventName="vpc:requestApi"
          eventArgs={{
            log: "Requesting VPC data from API",
            eventLoading: "vpc:loading-table",
          }}
        />
      )}
      {loadingTable && <DataTableSkeleton headers={Headers} rowCount={11} />}
    </>
  );
};

export default VPCoverview;
