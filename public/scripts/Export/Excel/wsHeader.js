// Funcao responsavel por criar o header nos Worksheets
const wsHeader = (wb, ws) => {
  // Cria os estilos do header
  const style = wb.createStyle({
    fill: {
      type: "pattern",
      patternType: "solid",
      bgColor: "#222B35",
      fgColor: "#222B35",
    },
    alignment: {
      vertical: "center",
    },
  });

  // Texto customizado do header
  const text = [
    {
      color: "#FFFFFF",
      size: 30,
    },
    "IBM",
    {
      color: "#FFFFFF",
      size: 30,
      bold: true,
    },
    " Cloud",
  ];

  // Junta as celulas e escreve o texto do header
  ws.cell(1, 1, 3, 100, true).string(text).style(style);
};

module.exports = wsHeader;
