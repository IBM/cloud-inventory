import React, { useState, useEffect } from "react";
import { InlineLoading } from "carbon-components-react";
const { ipcRenderer } = window.require("electron");

const Status = ({ exports }) => {
  const [status, setStatus] = useState(exports.info.formats);

  const handleExportEvent = async (name) => {
    const response = await ipcRenderer.invoke(`exporting:${name}`, exports);

    setStatus(
      status.map((format) =>
        format.name === name
          ? Object.defineProperty(format, "status", { value: response.status })
          : format
      )
    );
  };

  useEffect(() => {
    exports.info.formats.forEach((format) => {
      if (format.export) handleExportEvent(format.name);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
};

export default Status;
