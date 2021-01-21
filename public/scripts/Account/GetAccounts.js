const { ipcMain } = require("electron");
const { decrypt } = require("../Helpers/Crypto");
const fs = require("fs");

ipcMain.handle("account:get", async (event, arg) => {
  console.log(arg.log);
  const path = `${__dirname}/accounts.json`;
  try {
    let accounts = JSON.parse(fs.readFileSync(path, "utf8"));

    accounts.forEach((account, index) => {
      accounts[index] = JSON.parse(decrypt(account));
      accounts[index].id = `${index}`;
    });

    return accounts;
  } catch {
    return [];
  }
});
