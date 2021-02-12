const { ipcMain } = require("electron");

ipcMain.on("bare-metal:requestApi", async (event, arg) => {
  console.log(arg.log);

  if (arg.eventLoading) {
    event.reply(arg.eventLoading);
  }

  event.reply("bare-metal:receiving-data", [{}, {}]);
});
