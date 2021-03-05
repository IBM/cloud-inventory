const { ipcMain } = require("electron");
const excel = require("excel4node");
const createWsHeader = require("./wsHeader");
const createWsTable = require("./wsTable");

ipcMain.handle("exporting:Excel", async (event, arg) => {
  const wb = new excel.Workbook({
    defaultFont: {
      size: 12,
      name: "IBM Plex Sans",
    },
  });

  const timestamp = new Date().getTime();
  const exportPath = `${arg.info.path}/cinventory-export-${timestamp}.xlsx`;
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
    console.log(err);
    event.sender.send("notification", {
      kind: "error",
      title: "Error exporting data",
      description: "",
      caption: new Date().toLocaleTimeString(),
    });
    return { status: "error", msg: err };
  }
});
