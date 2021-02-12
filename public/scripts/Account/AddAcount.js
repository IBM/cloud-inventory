const { ipcMain } = require("electron");
const { encrypt } = require("../Helpers/Crypto");
const { accountPath } = require("../Helpers/Archive");
const fs = require("fs");

ipcMain.on("account:add", async (event, arg) => {
  const newAccount = encrypt(JSON.stringify(arg));
  const filePath = `${accountPath}/accounts.json`;
  console.log("Creating a new account");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([newAccount]), "utf-8");
  } else {
    let accounts = JSON.parse(fs.readFileSync(filePath, "utf8"));
    accounts.push(newAccount);
    fs.writeFileSync(filePath, JSON.stringify(accounts), "utf-8");
  }
});
