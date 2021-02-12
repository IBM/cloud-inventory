const { ipcMain } = require("electron");

ipcMain.handle("exporting:PDF", async (event, arg) => {
  console.log(arg);

  return "finished";
});
