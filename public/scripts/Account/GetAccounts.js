const { ipcMain } = require("electron");
const { decrypt } = require("../Helpers/Crypto");
const os = require('os');  // Allocating os module
const fs = require("fs");

ipcMain.handle("account:get", async (event, arg) => {
  console.log(arg.log);
  const file = `${os.homedir()}/.cloud-inventory/accounts.json`;
  try {
    let accounts = JSON.parse(fs.readFileSync(file, "utf8"));

    accounts.forEach((account, index) => {
      accounts[index] = JSON.parse(decrypt(account));
      accounts[index].id = `${index}`;
    });

    return accounts;
  } catch {
    return [];
  }
});
