import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Modal,
  Button,
  Checkbox,
  TextInput,
  ProgressStep,
  ProgressIndicator,
} from "carbon-components-react";
const { dialog } = require("electron").remote;
const os = window.require("os");

const ExportModal = forwardRef((props, ref) => {
  const [openModal, setOpenModal] = useState(false);
  const [exportPath, setExportPath] = useState(os.homedir());

  // Funcao para abrir o Modal
  const handleOpenExportModal = () => {
    setOpenModal(true);
  };

  // Funcao para fechar o Modal
  const handleCloseExportModal = () => {
    setOpenModal(false);
  };

  // Funcao para selecionar o dir
  // onde o export vai ser salvo
  const handleSelectDir = (event) => {
    dialog
      .showOpenDialog({
        defaultPath: exportPath,
        properties: ["openDirectory"],
      })
      .then((dir) => {
        setExportPath(dir.filePaths[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Exporta funcoes deste componente como referencia
  // para serem usada em outros componentes
  useImperativeHandle(ref, () => {
    return {
      openExportModal: handleOpenExportModal,
    };
  });

  return (
    openModal && (
      <Modal
        hasForm
        modalHeading="Exporting Data"
        open={openModal}
        primaryButtonText="Export"
        secondaryButtonText="Cancel"
        onRequestClose={() => {
          handleCloseExportModal();
        }}
        onRequestSubmit={() => {}}
      >
        <ProgressIndicator currentIndex={0}>
          <ProgressStep
            label="Select Info"
            description="Step 1: Selecting the info to exporting data"
          />
          <ProgressStep
            label="Exporting"
            description="Step 2: Exporting current data"
          />
        </ProgressIndicator>
        <div className="bx--export--form">
          <div className="bx--export--form__title">
            Your export will be saved in:
          </div>

          <div className="bx--export--form__path">
            <TextInput disabled value={exportPath} />
            <Button onClick={(e) => handleSelectDir(e)}>Select Folder</Button>
          </div>
          <div className="bx--export--form__title">Select Format:</div>
          <div className="bx--export--form__options">
            <Checkbox id="checkbox-excel" labelText="Excel" />
            <Checkbox id="checkbox-pdf" labelText="Pdf" />
          </div>
        </div>
      </Modal>
    )
  );
});

export default ExportModal;
