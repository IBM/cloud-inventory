const { ipcMain } = require("electron");
const fs = require("fs");
const PDFDocument = require("./classe");
const handleCreatePDF = async (arg) => {
  return new Promise((res, rej) => {
    const doc = new PDFDocument({
      layout: "landscape",
    });
    //TABELA
    doc.pipe(fs.createWriteStream(`${arg.exportInfo.path}`));
    const table = {
      headers: [],
      rows: [],
    };

    arg.headers.forEach((header) => {
      table.headers.push([header.header]);
    });
    arg.rows.forEach((row, index) => {
      table.rows.push([]);
      arg.headers.forEach((header) => {
        table.rows[index].push(row[header.key]);
      });
    });

    doc.table(table, 10, 15, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(9),
      prepareRow: (row, i) => doc.font("Helvetica").fontSize(7),
      width: 770,
    });

    //doc.end();
    res({ status: "finished" });
    rej({ status: "error" });
  });
};
ipcMain.handle("exporting:PDF", async (event, arg) => {
  handleCreatePDF(arg)
    .then((res) => {
      console.log(res.status);
      // return res.status;
    })
    .catch((err) => {
      console.log(err.status);
      //return err.status;
    });
});
