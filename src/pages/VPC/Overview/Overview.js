import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./TableHeader";

const { ipcRenderer } = window.require("electron");

const Overview = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    ipcRenderer.send("vpc-overview:requestApi", {
      log: "Requesting VPCs data from API",
      credentials: JSON.parse(sessionStorage.getItem("currentAccount")),
    });
  }, []);

  ipcRenderer.on("vpc-overview:loading-table", (event, arg) => {
    setLoadingTable(true);
  });

  ipcRenderer.on("vpc-overview:receiving-data", (event, arg) => {
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
          eventName="vpc-overview:requestApi"
          eventArgs={{
            log: "Requesting VPC data from API",
            eventLoading: "vpc-overview:loading-table",
          }}
        />
      )}
      {loadingTable && <DataTableSkeleton headers={Headers} rowCount={11} />}
    </>
  );
};

export default Overview;
