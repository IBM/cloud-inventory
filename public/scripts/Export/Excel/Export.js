const { ipcMain } = require("electron");
const excel = require("excel4node");
const createWsHeader = require("./wsHeader");
const createWsTable = require("./wsTable");

const wb = new excel.Workbook({
  defaultFont: {
    size: 12,
    name: "IBM Plex Sans",
  },
});

ipcMain.handle("exporting:Excel", async (event, arg) => {
  const exportPath = `${arg.exportInfo.path}\\cinventory-export.xlsx`;
  try {
    arg.data.map((exporting) => {
      // Cria um novo Worksheet com o nome do servico
      const ws = wb.addWorksheet(exporting.title);

      // Cria o header do Worksheet
      createWsHeader(wb, ws);

      // Cria a tabela
      createWsTable(ws, exporting.headers, exporting.rows);
    });

    // Cria o excel na area de trabalho
    wb.write(exportPath);
    return { status: "finished", msg: "Success" };
  } catch (err) {
    event.sender.send("notification", {
      kind: "error",
      title: "Error exporting data",
      description: "",
      caption: new Date().toLocaleTimeString(),
    });
    return { status: "error", msg: err };
  }
});
