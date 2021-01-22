const { ipcMain } = require("electron");

ipcMain.on("virtual-server-vpc:requestApi", async (event, arg) => {
  console.log(arg.log);

  if (arg.eventLoading) {
    event.reply(arg.eventLoading);
  }
  event.reply("virtual-server-vpc:receiving-data", [{}, {}]);
});
