import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";

const { ipcRenderer } = window.require("electron");

const Services = ({ eventName, title, headers, expansion }) => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  const handleFetchData = async (eventName) => {
    setLoadingTable(true);
    const res = await ipcRenderer.invoke(eventName, {
      credentials: JSON.parse(sessionStorage.getItem("currentAccount")),
    });
    setRows(res);
    setLoadingTable(false);
  };

  useEffect(() => {
    handleFetchData(eventName);
  }, [eventName]);

  return (
    <>
      {!loadingTable && (
        <Table
          title={title}
          headerData={headers}
          rowData={rows}
          expansion={expansion}
          refresh={() => {
            handleFetchData(eventName);
          }}
        />
      )}
      {loadingTable && <DataTableSkeleton headers={headers} rowCount={20} />}
    </>
  );
};

export default Services;
