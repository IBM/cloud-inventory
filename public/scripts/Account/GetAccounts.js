const { ipcMain } = require("electron");
const { decrypt } = require("../Helpers/Crypto");
const { accountPath } = require("../Helpers/Archive");
const fs = require("fs");

ipcMain.handle("account:get", async (event, arg) => {
  console.log(arg.log);
  const filePath = `${accountPath}/accounts.json`;

  if (!fs.existsSync(filePath)) {
    return [];
  } else {
    let accounts = JSON.parse(fs.readFileSync(filePath, "utf8"));

    accounts.forEach((account, index) => {
      accounts[index] = JSON.parse(decrypt(account));
      accounts[index].id = `${index}`;
    });

    return accounts;
  }
});
