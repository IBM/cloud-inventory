import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./TableHeader";

const { ipcRenderer } = window.require("electron");

const BareMetal = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    ipcRenderer.send("bare-metal:requestApi", {
      log: "Requesting Bare Metal data from API",
      credentials: JSON.parse(sessionStorage.getItem("currentAccount")),
    });
  }, []);

  ipcRenderer.on("bare-metal:loading-table", (event, arg) => {
    setLoadingTable(true);
  });

  ipcRenderer.on("bare-metal:receiving-data", (event, arg) => {
    setRows(arg);
    setLoadingTable(false);
  });

  return (
    <>
      {!loadingTable && (
        <Table
          title="Bare Metal"
          headerData={Headers}
          rowData={rows}
          eventName="bare-metal:requestApi"
          eventArgs={{
            log: "Requesting Bare Metal data from API",
            eventLoading: "bare-metal:loading-table",
          }}
        />
      )}
      {loadingTable && <DataTableSkeleton headers={Headers} rowCount={11} />}
    </>
  );
};

export default BareMetal;
