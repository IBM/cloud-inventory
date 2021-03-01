import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { DataTableSkeleton } from "carbon-components-react";
import Headers from "./TableHeader";

const { ipcRenderer } = window.require("electron");

const FileStorage = ({ eventName }) => {
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
          title="File Storage"
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

export default FileStorage;
