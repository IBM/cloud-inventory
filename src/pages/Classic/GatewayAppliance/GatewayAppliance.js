import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./TableHeader";

const { ipcRenderer } = window.require("electron");

const GatewayAppliance = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  const handleFetchData = async () => {
    setLoadingTable(true);
    const res = await ipcRenderer.invoke("gateway-appliance:requestApi", {
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
          title="Gateway Appliance"
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

export default GatewayAppliance;
