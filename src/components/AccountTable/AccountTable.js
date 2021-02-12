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
