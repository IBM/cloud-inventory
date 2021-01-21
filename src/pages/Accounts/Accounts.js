import React, { useState, useEffect } from "react";
import { DataTableSkeleton } from "carbon-components-react";
import AccountTable from "../../components/AccountTable";
import TableHeaders from "./TableHeaders";

const { ipcRenderer } = window.require("electron");

const Accounts = () => {
  const [rows, setRows] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await ipcRenderer.invoke("account:get", {
        log: "Getting accounts",
      });
      setRows(accounts);
      setLoadingTable(false);
    };
    fetchAccounts();
  }, []);

  return (
    <>
      {!loadingTable && (
        <AccountTable
          title="Your Accounts"
          headerData={TableHeaders}
          rowData={rows}
        />
      )}
      {loadingTable && (
        <DataTableSkeleton headers={TableHeaders} rowCount={12} />
      )}
    </>
  );
};

export default Accounts;
