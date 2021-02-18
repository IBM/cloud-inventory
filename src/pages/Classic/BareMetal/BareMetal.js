import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./TableHeader";

const { ipcRenderer } = window.require("electron");

const BareMetal = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  const handleFetchData = async () => {
    setLoadingTable(true);
    const res = await ipcRenderer.invoke("bare-metal-classic:requestApi", {
      credentials: JSON.parse(sessionStorage.getItem("currentAccount")),
    });
    setRows(res);
    setLoadingTable(false);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      {!loadingTable && (
        <Table
          title="Bare Metal"
          headerData={Headers}
          rowData={rows}
          refresh={() => {
            handleFetchData();
          }}
        />
      )}
      {loadingTable && <DataTableSkeleton headers={Headers} rowCount={11} />}
    </>
  );
};

export default BareMetal;
