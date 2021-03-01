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
import { Info, Status } from "./Steps";

const SingleExport = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [exports, setExports] = useState({});
  const [infoStepInvalid, setInfoStepInvalid] = useState(false);
  const infoRef = useRef(null);

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
            data: [
              {
                title: props.title,
                headers: props.headers,
                rows: props.rows,
              },
            ],
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
      component: <Info ref={infoRef} />,
    },
    {
      label: "2. Export Status",
      description: "Step 2: Status of your export",
      invalid: false,
      passive: true,
      primaryButton: () => {
        handleCloseExport();
      },
      secondaryButton: () => {
        setCurrentStep(currentStep - 1);
      },
      component: <Status exports={exports} />,
    },
  ];

  // Funcao para abrir o export
  const handleOpenExport = () => {
    setOpen(true);
  };

  // Funcao para fechar o export
  const handleCloseExport = () => {
    setOpen(false);
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
        open={open}
        modalHeading="Exporting Data"
        primaryButtonText="Export"
        secondaryButtonText="Cancel"
        passiveModal={steps[currentStep].passive}
        onRequestSubmit={steps[currentStep].primaryButton}
        onSecondarySubmit={steps[currentStep].secondaryButton}
        onRequestClose={() => {
          handleCloseExport();
        }}
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

export default SingleExport;
