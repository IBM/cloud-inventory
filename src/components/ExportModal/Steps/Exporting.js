import React, { useState, useEffect } from "react";
import { InlineLoading } from "carbon-components-react";

const { ipcRenderer } = window.require("electron");

const ExportingModal = ({ title, headers, rows, exportInfo }) => {
  const [exportStatus, setExportStatus] = useState(exportInfo.formats);

  const handleExportEvent = async (name) => {
    const status = await ipcRenderer.invoke(`exporting:${name}`, {
      title,
      headers,
      rows,
      exportInfo,
    });

    setExportStatus(
      exportStatus.map((format) =>
        format.name === name
          ? Object.defineProperty(format, "status", { value: status })
          : format
      )
    );
  };

  useEffect(() => {
    exportInfo.formats.forEach((format) => {
      if (format.currentExport) handleExportEvent(format.name);
    });
  }, []);

  return (
    <>
      <div className="bx--export--status">
        <div className="bx--export--status__title">
          Your current export status:
        </div>
        {exportStatus.map((format) => {
          return (
            format.currentExport && (
              <InlineLoading description={format.name} status={format.status} />
            )
          );
        })}
      </div>
    </>
  );
};

export default ExportingModal;
