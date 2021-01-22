const { ipcMain } = require("electron");

ipcMain.on("subnet-vpc:requestApi", async (event, arg) => {
  console.log(arg.log);

  if (arg.eventLoading) {
    event.reply(arg.eventLoading);
  }
  event.reply("subnet-vpc:receiving-data", [{}, {}]);
});
