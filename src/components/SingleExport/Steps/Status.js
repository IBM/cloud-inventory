import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { InlineLoading } from "carbon-components-react";
const { ipcRenderer } = window.require("electron");

const Status = forwardRef(({ exports }, ref) => {
  const [status, setStatus] = useState(exports.info.formats);
  const [closable, setClosable] = useState(true);

  const handleExportEvent = async (name) => {
    setClosable(false);
    const tempExportData = exports;

    let hasExpansion = false;

    const expansionRows = [];
    let expansionHeaders = "";
    let expasionTitle = "";

    tempExportData.data[0].rows.forEach((row) => {
      if (row.expansion) {
        hasExpansion = true;
        if (expansionHeaders === "") expansionHeaders = row.expansion.headers;
        if (expasionTitle === "") expasionTitle = row.expansion.title;
        row.expansion.rows.forEach((row) => {
          expansionRows.push(row);
        });
      }
    });

    if (hasExpansion) {
      tempExportData.data.push({
        title: expasionTitle,
        headers: expansionHeaders,
        rows: expansionRows,
      });
    }

    const response = await ipcRenderer.invoke(
      `exporting:${name}`,
      tempExportData
    );

    setStatus(
      status.map((format) =>
        format.name === name
          ? Object.defineProperty(format, "status", { value: response.status })
          : format
      )
    );
    setClosable(true);
  };

  useEffect(() => {
    exports.info.formats.forEach((format) => {
      if (format.export) handleExportEvent(format.name);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Exporta funcoes deste componente como referencia
  // para serem usada em outros componentes
  useImperativeHandle(ref, () => {
    return {
      closable: closable,
      resetStatus: () => {
        setStatus(
          status.map((format) =>
            Object.defineProperty(format, "status", { value: "active" })
          )
        );
      },
    };
  });

  return (
    <div>
      <div className="bx--export--status">
        <div className="bx--export--status__title">
          Your current export status:
        </div>
        <div className="bx--export--status__services">
          {status.map((format) => {
            return (
              format.export && (
                <InlineLoading
                  description={format.name}
                  status={format.status}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Status;
