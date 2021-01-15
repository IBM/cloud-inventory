import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./tableHeader";

const { ipcRenderer } = window.require("electron");

const VirtualServerClassic = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    ipcRenderer.send(
      "virtual-server-classic:requestApi",
      "Requesting Classic Virtual Server data from API"
    );
  }, []);

  ipcRenderer.on("virtual-server-classic:loading-table", (event, arg) => {
    console.log(arg);
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
          eventNameRequest="virtual-server-classic:requestApi"
          eventNameLoading="virtual-server-classic:loading-table"
        />
      )}
      {loadingTable && <DataTableSkeleton headers={Headers} rowCount={11} />}
    </>
  );
};

export default VirtualServerClassic;
