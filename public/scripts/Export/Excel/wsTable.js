const { headerStyles, rowStyles } = require("./wsStyles");

// Funcao responsavel por criar as tabelas
const wsTable = (ws, headers, rows) => {
  // Cria o header da tabela
  headers.forEach((header, headerIndex) => {
    ws.cell(5, 1 + headerIndex)
      .string(`${header.header}`)
      .style(headerStyles);
  });

  // Cria as linhas da tabela
  rows.forEach((row, rowIndex) => {
    headers.forEach((header, headerIndex) => {
      let text = "";
      if (
        typeof row[header.key] === "string" &&
        row[header.key].includes("<br>")
      ) {
        row[header.key].split("<br>").forEach((value) => {
          text += `${value}\n`;
        });
      } else {
        text = `${row[header.key]}`;
      }

      ws.cell(6 + rowIndex, 1 + headerIndex)
        .string(text)
        .style(rowStyles);
    });
  });
};

module.exports = wsTable;

/*
Object.keys(row).forEach((cell, cellIndex) => {
      ws.cell(rowIndex + rowIndex, columnIndex + cellIndex)
        .string(`${row[cell]}`)
        .style(rowStyles);
      columnIndex += 2;
    });

*/
