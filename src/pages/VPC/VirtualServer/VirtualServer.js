import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./TableHeader";

const { ipcRenderer } = window.require("electron");

const VirtualServer = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  const handleFetchData = async () => {
    setLoadingTable(true);
    const res = await ipcRenderer.invoke("virtual-server-vpc:requestApi", {
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
          title="VPC Virtual Server"
          headerData={Headers}
          rowData={rows}
          refresh={() => {
            handleFetchData();
          }}
        />
      )}
      {loadingTable && <DataTableSkeleton headers={Headers} rowCount={20} />}
    </>
  );
};

export default VirtualServer;
