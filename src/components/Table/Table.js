import React, { useState, useRef } from "react";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableExpandRow,
  TableExpandedRow,
  TableHeader,
  TableExpandHeader,
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
import SingleExport from "../SingleExport";

const MyTable = ({ title, rowData, headerData, refresh, expansion }) => {
  const [tableHader, setTableHeader] = useState(headerData);
  const [defaultHeader] = useState(headerData);
  const formRef = useRef(null);
  const TableType = expansion ? TableExpandRow : TableRow;

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
    refresh();
  };

  // Abre o modal responsavel por
  // exportar a tabela
  const handleExport = () => {
    formRef.current.openExport();
  };

  return (
    <>
      <DataTable rows={rowData} headers={tableHader} isSortable>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
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
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {expansion && <TableExpandHeader />}
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableType {...getRowProps({ row })}>
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
                    </TableType>
                    {expansion && row.isExpanded && (
                      <TableExpandedRow colSpan={headers.length + 1}>
                        <p>Aux squad rules</p>
                      </TableExpandedRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
      <SingleExport
        rows={rowData}
        headers={headerData}
        title={title}
        ref={formRef}
      />
    </>
  );
};

export default MyTable;
