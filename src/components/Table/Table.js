import React from "react";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Button,
} from "carbon-components-react";
const { ipcRenderer } = window.require("electron");

const MyTable = ({ title, rowData, headerData, eventName, eventArgs }) => {
  return (
    <DataTable rows={rowData} headers={headerData} isSortable>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getBatchActionProps,
        onInputChange,
      }) => (
        <TableContainer title={title}>
          <TableToolbar>
            <TableToolbarContent>
              <TableToolbarSearch
                expanded
                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                onChange={onInputChange}
              />
              <TableToolbarMenu
                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
              >
                <TableToolbarAction
                  primaryFocus
                  onClick={() => alert("Alert 1")}
                >
                  export to PDF
                </TableToolbarAction>
                <TableToolbarAction onClick={() => alert("Alert 2")}>
                  export to Excel
                </TableToolbarAction>
              </TableToolbarMenu>
              <Button
                tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
                onClick={() => {
                  eventArgs.credentials = JSON.parse(
                    sessionStorage.getItem("currentAccount")
                  );
                  ipcRenderer.send(eventName, eventArgs);
                }}
                size="small"
                kind="primary"
              >
                Reload Table
              </Button>
            </TableToolbarContent>
          </TableToolbar>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>
                      {typeof cell.value === "string" &&
                      cell.value.includes("<br>")
                        ? cell.value.split("<br>").map((value) => {
                            return <p>{value}</p>;
                          })
                        : cell.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};

export default MyTable;
