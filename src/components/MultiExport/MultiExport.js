import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Modal,
  ProgressIndicator,
  ProgressStep,
} from "carbon-components-react";
import { SelectInfo, SelectServices, ExportStatus } from "./Steps";

const MultiExport = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [exports, setExports] = useState({});
  const [services, setServices] = useState([]);
  const [infoStepInvalid, setInfoStepInvalid] = useState(false);
  const infoRef = useRef(null);
  const serviceRef = useRef(null);
  const statusRef = useRef(null);

  const steps = [
    {
      label: "1. Select Info",
      description: "Step 1: Select the info to export your data",
      invalid: infoStepInvalid,
      primaryButtonText: "Next",
      primaryButton: () => {
        const isValid = infoRef.current.validate();
        if (isValid) {
          setInfoStepInvalid(false);
          setExports({
            info: infoRef.current.getInfo,
          });
          setCurrentStep(currentStep + 1);
        } else {
          setInfoStepInvalid(true);
        }
      },
      secondaryButtonText: "Cancel",
      secondaryButton: () => {
        handleCloseExport();
      },
      requestClose: () => {
        handleCloseExport();
      },
      component: <SelectInfo ref={infoRef} />,
    },
    {
      label: "2. Select Services",
      description: "Step 2: Select the services to export",
      invalid: false,
      primaryButtonText: "Export",
      primaryButton: () => {
        setServices(serviceRef.current.getServices);
        setCurrentStep(currentStep + 1);
      },
      secondaryButtonText: "Back",
      secondaryButton: () => {
        setCurrentStep(currentStep - 1);
      },
      requestClose: () => {
        handleCloseExport();
      },
      component: <SelectServices ref={serviceRef} />,
    },
    {
      label: "3. Export Status",
      description: "Step 3: Status of your export",
      invalid: false,
      passive: true,
      requestClose: () => {
        if (statusRef.current.closable) {
          statusRef.current.resetStatus();
          handleCloseExport();
        }
      },
      component: (
        <ExportStatus ref={statusRef} exports={exports} services={services} />
      ),
    },
  ];

  // Funcao para abrir o export
  const handleOpenExport = () => {
    setOpen(true);
  };

  // Funcao para fechar o export
  const handleCloseExport = () => {
    setOpen(false);
    setCurrentStep(0);
  };

  // Exporta funcoes deste componente como referencia
  // para serem usada em outros componentes
  useImperativeHandle(ref, () => {
    return {
      openExport: handleOpenExport,
    };
  });

  return (
    open && (
      <Modal
        hasForm
        modalHeading="Exporting Data"
        open={open}
        passiveModal={steps[currentStep].passive}
        primaryButtonText={steps[currentStep].primaryButtonText}
        secondaryButtonText={steps[currentStep].secondaryButtonText}
        onRequestSubmit={steps[currentStep].primaryButton}
        onSecondarySubmit={steps[currentStep].secondaryButton}
        onRequestClose={steps[currentStep].requestClose}
      >
        <ProgressIndicator spaceEqually currentIndex={currentStep}>
          {steps.map((step) => (
            <ProgressStep
              label={step.label}
              description={step.description}
              invalid={step.invalid}
            />
          ))}
        </ProgressIndicator>
        {steps[currentStep].component}
      </Modal>
    )
  );
});

export default MultiExport;
