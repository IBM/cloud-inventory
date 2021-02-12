import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import {
  Modal,
  ProgressIndicator,
  ProgressStep,
} from "carbon-components-react";

import SelectInfo from "./Steps/SelectInfo";
import Exporting from "./Steps/Exporting";

const ExportModal = forwardRef((props, ref) => {
  // Estados do modal
  const [openModal, setOpenModal] = useState(false);
  const [modalPassive, setModalPassive] = useState(false);

  // Estados dos Steps
  const [currentStep, setCurrentStep] = useState(0);
  const [infoStepIsInvalid, setInfoStepIsInvalied] = useState(false);

  // Estados das Infos
  const [exportInfo, setExportInfo] = useState({});
  const selectInfoRef = useRef(null);

  // Funcao para abrir o Modal
  const handleOpenExportModal = () => {
    setOpenModal(true);
  };

  // Funcao para fechar o Modal
  const handleCloseExportModal = () => {
    setOpenModal(false);
  };

  // Valida se as informacoes selecionadas no
  // primeiro passo estao corretas
  const handleValidateInfoStep = () => {
    const info = selectInfoRef.current.exportInfo;
    const isValid = info.formats.find((format) =>
      format.currentExport ? true : false
    );
    if (isValid) {
      setInfoStepIsInvalied(false);
      setExportInfo(info);
      setModalPassive(true);
      setCurrentStep(1);
    } else {
      setInfoStepIsInvalied(true);
    }
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
        passiveModal={modalPassive}
        primaryButtonText="Export"
        secondaryButtonText="Cancel"
        onRequestClose={() => {
          handleCloseExportModal();
        }}
        onRequestSubmit={() => {
          handleValidateInfoStep();
        }}
      >
        <ProgressIndicator currentIndex={currentStep}>
          <ProgressStep
            invalid={infoStepIsInvalid}
            label="Select Info"
            description="Step 1: Selecting the info to exporting data"
            secondaryLabel={infoStepIsInvalid ? "Please select a format" : ""}
          />
          <ProgressStep
            label="Exporting"
            description="Step 2: Exporting current data"
          />
        </ProgressIndicator>
        {currentStep === 0 && <SelectInfo ref={selectInfoRef} />}
        {currentStep === 1 && (
          <Exporting
            rows={props.rows}
            headers={props.headers}
            exportInfo={exportInfo}
          />
        )}
      </Modal>
    )
  );
});

export default ExportModal;
