import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { InlineLoading } from "carbon-components-react";
const { ipcRenderer } = window.require("electron");

const ExportStatus = forwardRef(({ exports, services }, ref) => {
  const [closable, setClosable] = useState(true);
  const [exportStatus, setExportStatus] = useState(exports.info.formats);
  const [servicesStatus, setServicesStatus] = useState(services);
  const [exportData, setExportData] = useState({
    info: exports.info,
    data: [],
  });

  const handleFetchData = async (service) => {
    const response = await ipcRenderer.invoke(service.event, {
      credentials: JSON.parse(sessionStorage.getItem("currentAccount")),
    });

    const tempExportData = exportData;
    tempExportData.data.push({
      title: service.description,
      headers: service.headers,
      rows: response,
    });

    setExportData(tempExportData);

    setServicesStatus(
      servicesStatus.map((serviceStatus) =>
        serviceStatus === service
          ? Object.defineProperty(serviceStatus, "status", {
              value: "finished",
            })
          : serviceStatus
      )
    );
  };

  const handleExportData = async (name) => {
    const response = await ipcRenderer.invoke(`exporting:${name}`, exportData);

    setExportStatus(
      exportStatus.map((format) =>
        format.name === name
          ? Object.defineProperty(format, "status", { value: response.status })
          : format
      )
    );
  };

  const handleFetchAndExport = async () => {
    setClosable(false);
    const servicePromises = services.map((service) => {
      return handleFetchData(service);
    });

    await Promise.all(servicePromises);

    exportStatus.forEach((format) => {
      if (format.export) handleExportData(format.name);
    });
    setClosable(true);
  };

  useEffect(() => {
    handleFetchAndExport();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Exporta funcoes deste componente como referencia
  // para serem usada em outros componentes
  useImperativeHandle(ref, () => {
    return {
      closable: closable,
      resetStatus: () => {
        setExportStatus(
          exportStatus.map((format) =>
            Object.defineProperty(format, "status", { value: "active" })
          )
        );
        setServicesStatus(
          servicesStatus.map((service) =>
            Object.defineProperty(service, "status", { value: "active" })
          )
        );
      },
    };
  });

  return (
    <div>
      <div className="bx--export--status">
        <div className="bx--export--status__title">Fetching services data:</div>
        <div className="bx--export--status__services">
          {servicesStatus.map((service) => {
            return (
              <InlineLoading
                description={service.description}
                status={service.status}
              />
            );
          })}
        </div>
        <div className="bx--export--status__title">
          Your current export status:
        </div>
        <div className="bx--export--status__services">
          {exportStatus.map((format) => {
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

export default ExportStatus;
