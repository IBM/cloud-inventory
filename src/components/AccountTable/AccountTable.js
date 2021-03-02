import React, { useRef } from "react";
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
  OverflowMenu,
  ModalWrapper,
  Button,
} from "carbon-components-react";
import AccountForm from "../AccountForm";
const { ipcRenderer } = window.require("electron");

const AccountTable = ({ title, rowData, headerData }) => {
  const formRef = useRef(null);

  return (
    <>
      <DataTable
        overflowMenuOnHover={false}
        rows={rowData}
        headers={headerData}
        render={({
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
                <Button
                  tabIndex={
                    getBatchActionProps().shouldShowBatchActions ? -1 : 0
                  }
                  onClick={() => formRef.current.openForm()}
                  size="small"
                  kind="primary"
                >
                  Add Account
                </Button>
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                  <TableHeader />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                    <TableCell className="bx--table-column-menu">
                      <OverflowMenu flipped>
                        {/*    <ModalWrapper
                        hasForm
                        buttonTriggerText="Edit"
                        modalHeading="Edit Account Settings"
                        buttonTriggerClassName="bx--account--btn"
                      >
                       Edit current account settings...
                      </ModalWrapper> */}
                        <ModalWrapper
                          danger
                          buttonTriggerText="Delete"
                          modalHeading="Deleting Account"
                          buttonTriggerClassName="bx--account--btn--delete"
                          primaryButtonText="Delete"
                          handleSubmit={async () => {
                            console.log("AA");
                            const res = await ipcRenderer.invoke(
                              "account:delete",
                              {
                                accountName: row.cells[0].value,
                                userNameApi: row.cells[1].value,
                                classicApiKey: row.cells[2].value,
                                cloudApiKey: row.cells[3].value,
                              }
                            );

                            if (res) {
                              window.location.reload();
                            }
                          }}
                        >
                          <div>
                            Are you sure you want to delete this account
                          </div>
                        </ModalWrapper>
                      </OverflowMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
      <AccountForm ref={formRef} />
    </>
  );
};

export default AccountTable;
