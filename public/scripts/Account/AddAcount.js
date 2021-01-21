const { ipcMain } = require("electron");
const { encrypt } = require("../Helpers/Crypto");
const fs = require("fs");

ipcMain.on("account:add", async (event, arg) => {
  const newAccount = encrypt(JSON.stringify(arg));
  const path = `${__dirname}/accounts.json`;
  console.log("Creating a new account");
  try {
    let accounts = JSON.parse(fs.readFileSync(path, "utf8"));
    accounts.push(newAccount);
    fs.writeFileSync(path, JSON.stringify(accounts), "utf-8");
  } catch {
    fs.writeFileSync(path, JSON.stringify([newAccount]), "utf-8");
  }
});
