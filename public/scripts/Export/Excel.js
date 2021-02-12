const { ipcMain } = require("electron");

ipcMain.handle("exporting:Excel", async (event, arg) => {
  console.log(arg);

  return "error";
});
