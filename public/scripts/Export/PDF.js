const { ipcMain } = require("electron");
const fs = require("fs");
const PDFDocument = require("./PdfTable");

const handleCreatePDF = async (arg) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      layout: "landscape",
    });
    const fileName = `${arg.exportInfo.path}/${arg.title}.pdf`;
    let stream = fs.createWriteStream(fileName);
    doc.pipe(stream);
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
    doc.end();
    resolve({ stream });
  });
};

ipcMain.handle("exporting:PDF", async (event, arg) => {
  return handleCreatePDF(arg)
    .then(({ stream }) => {
      stream.on("finish", () => {
        return "finished";
      });
      stream.on("error", (err) => {
        console.log(err);
        stream.end();
        return "error";
      });
    })
    .catch((err) => {
      console.log(err);
      return "error";
    });
});
