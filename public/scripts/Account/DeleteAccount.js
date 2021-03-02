const { ipcMain } = require("electron");
const { encrypt, decrypt } = require("../Helpers/Crypto");
const { accountPath } = require("../Helpers/Archive");
const fs = require("fs");

ipcMain.handle("account:delete", async (event, arg) => {
  console.log("Deleting account");

  const filePath = `${accountPath}/accounts.json`;
  let accounts = JSON.parse(fs.readFileSync(filePath, "utf8"));

  accounts.forEach((account, index) => {
    accounts[index] = JSON.parse(decrypt(account));
  });

  accounts = accounts.filter(
    (account) =>
      account.accountName !== arg.accountName &&
      account.userNameApi !== arg.userNameApi &&
      account.classicApiKey !== arg.classicApiKey &&
      account.cloudApiKey !== arg.cloudApiKey
  );

  accounts.forEach((account, index) => {
    accounts[index] = encrypt(JSON.stringify(account));
  });

  fs.writeFileSync(filePath, JSON.stringify(accounts), "utf-8");

  return true;
});
