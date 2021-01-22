import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./TableHeader";

const { ipcRenderer } = window.require("electron");

const Subnet = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    ipcRenderer.send("subnet-vpc:requestApi", {
      log: "Requesting Subnet data from API",
      credentials: JSON.parse(sessionStorage.getItem("currentAccount")),
    });
  }, []);

  ipcRenderer.on("subnet-vpc:loading-table", (event, arg) => {
    setLoadingTable(true);
  });

  ipcRenderer.on("subnet-vpc:receiving-data", (event, arg) => {
    setRows(arg);
    setLoadingTable(false);
  });

  return (
    <>
      {!loadingTable && (
        <Table
          title="Subnet"
          headerData={Headers}
          rowData={rows}
          eventName="subnet-vpc:requestApi"
          eventArgs={{
            log: "Requesting Subnet data from API",
            eventLoading: "subnet-vpc:loading-table",
          }}
        />
      )}
      {loadingTable && <DataTableSkeleton headers={Headers} rowCount={11} />}
    </>
  );
};

export default Subnet;
