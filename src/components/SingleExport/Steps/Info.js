import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Button, Checkbox, TextInput } from "carbon-components-react";
import Formats from "./Formats";
const { dialog } = require("electron").remote;
const os = window.require("os");

const Info = forwardRef((props, ref) => {
  const [path, setPath] = useState(`${os.homedir()}\\Desktop`);
  const [formats, setFormats] = useState(Formats);

  // Funcao para selecionar o dir onde o export vai ser salvo
  const handleSelectDir = () => {
    dialog
      .showOpenDialog({
        defaultPath: path,
        properties: ["openDirectory"],
      })
      .then((dir) => {
        setPath(dir.filePaths[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Funcao muda o campo export de cada formato se o
  // checkbox relacionado ao formato for selecionado ou nao
  const handleExportFormat = (event, currentFormat) => {
    setFormats(
      formats.map((format) =>
        format.name === currentFormat
          ? Object.defineProperty(format, "export", { value: event })
          : format
      )
    );
  };

  // Valida se algum champo esta selecionado
  const handleValidadeInfo = () => {
    const isValid = formats.find((format) => (format.export ? true : false));

    if (isValid) {
      return true;
    }

    return false;
  };

  // Exporta funcoes deste componente como referencia
  // para serem usada em outros componentes
  useImperativeHandle(ref, () => {
    return {
      getInfo: { path: path, formats: formats },
      validate: () => {
        return handleValidadeInfo();
      },
    };
  });

  return (
    <>
      <div className="bx--export--info">
        <div className="bx--export--info__title">
          Your export will be saved in:
        </div>
        <div className="bx--export--info__path">
          <TextInput disabled value={path} />
          <Button onClick={(e) => handleSelectDir(e)}>Select Folder</Button>
        </div>
        <div className="bx--export--info__title">Select Format:</div>
        <div className="bx--export--info__options">
          {formats.map((format) => {
            return (
              <Checkbox
                id={`checkbox-${format.name}`}
                defaultChecked={format.export}
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

export default Info;
