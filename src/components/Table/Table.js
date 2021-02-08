import React, { useState, useRef } from "react";
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
  Checkbox,
} from "carbon-components-react";
import { Renew32, Export20, Restart20 } from "@carbon/icons-react";
import ExportModal from "../ExportModal";
const { ipcRenderer } = window.require("electron");

const MyTable = ({ title, rowData, headerData, eventName, eventArgs }) => {
  const [tableHader, setTableHeader] = useState(headerData);
  const [defaultHeader] = useState(headerData);
  const formRef = useRef(null);

  // Define se o checkbox vem checked por padrao
  const handleDefaultChecked = (header) => {
    return tableHader.find((e) => e.key === header.key) ? true : false;
  };

  // Adiciona ou remove um dos header da tabela
  const handleChangeHeader = (event, header, index) => {
    if (event.target.checked) {
      // Adiciona um header da tabela caso o checkbox nao esteja check
      const tempHeader = [...tableHader];
      tempHeader.splice(index, 0, header);
      setTableHeader(tempHeader);
    } else {
      // Remove um header da tabela caso o checkbox nao esteja check
      setTableHeader(
        tableHader.filter((element) => element.key !== header.key)
      );
    }
  };

  // Reseta os campos do header
  const handleResetDefault = () => {
    setTableHeader(defaultHeader);
  };

  // Recarrega a tabela
  const handleRefreshTable = () => {
    eventArgs.credentials = JSON.parse(
      sessionStorage.getItem("currentAccount")
    );
    ipcRenderer.send(eventName, eventArgs);
  };

  // Abre o modal responsavel por
  // exportar a tabela
  const handleExport = () => {
    formRef.current.openExportModal();
  };

  return (
    <>
      <DataTable rows={rowData} headers={tableHader} isSortable>
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
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                  onChange={onInputChange}
                />
                <TableToolbarMenu
                  renderIcon={Renew32}
                  title="Refresh"
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                  onClick={() => {
                    handleRefreshTable();
                  }}
                />

                <TableToolbarMenu
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                >
                  <li className="bx--table-settings__title">Edit columns</li>
                  {defaultHeader.map((header, index) => (
                    <li className="bx--table-toolbar-settings__options">
                      <Checkbox
                        defaultChecked={handleDefaultChecked(header)}
                        onClick={(event) =>
                          handleChangeHeader(event, header, index)
                        }
                        labelText={header.header}
                        id={header.key}
                      />
                    </li>
                  ))}
                  <TableToolbarAction
                    className="bx--table-toolbar-settings__button"
                    onClick={() => handleResetDefault()}
                  >
                    Reset to default
                    <Restart20 />
                  </TableToolbarAction>
                </TableToolbarMenu>
                <Button
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                  size="small"
                  kind="primary"
                  className="bx--table-toolbar__button"
                  onClick={() => {
                    handleExport();
                  }}
                >
                  Export Table
                  <Export20 />
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
      <ExportModal ref={formRef} />
    </>
  );
};

export default MyTable;
