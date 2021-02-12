import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Checkbox, TextInput } from "carbon-components-react";
import Formats from "./Formats";
const { dialog } = require("electron").remote;
const os = window.require("os");

const SelectInfo = forwardRef((props, ref) => {
  const [exportPath, setExportPath] = useState(os.homedir());
  const [exportFormats, setExportFormats] = useState(Formats);

  // Funcao para selecionar o dir
  // onde o export vai ser salvo
  const handleSelectDir = () => {
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

  // Funcao muda o exportFomats de cada formato se o
  // checkbox relacionado ao formato for selecionado ou nao
  const handleExportFormat = (event, currentFormat) => {
    setExportFormats(
      exportFormats.map((format) =>
        format.name === currentFormat
          ? Object.defineProperty(format, "currentExport", { value: event })
          : format
      )
    );
  };

  // Exporta funcoes deste componente como referencia
  // para serem usada em outros componentes
  useImperativeHandle(ref, () => {
    return {
      exportInfo: { path: exportPath, formats: exportFormats },
    };
  });

  return (
    <>
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
          {exportFormats.map((format) => {
            return (
              <Checkbox
                defaultChecked={format.defaultChecked}
                id={`checkbox-${format.name}`}
                labelText={format.name}
                onChange={(event) => {
                  handleExportFormat(event, format.name);
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
});

export default SelectInfo;
