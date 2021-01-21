const { ipcMain } = require("electron");
const { encrypt } = require("../Helpers/Crypto");
const os = require('os');  // Allocating os module
const fs = require("fs");

ipcMain.on("account:add", async (event, arg) => {
  const newAccount = encrypt(JSON.stringify(arg));
  const path = `${os.homedir()}/.cloud-inventory/`;
  const file = `${path}/accounts.json`;
  console.log("Creating a new account");
  try {
    let accounts = JSON.parse(fs.readFileSync(file, "utf8"));
    accounts.push(newAccount);
    fs.writeFileSync(file, JSON.stringify(accounts), "utf-8");
  } catch {
    fs.mkdirSync(path);
    fs.writeFileSync(file, JSON.stringify([newAccount]), "utf-8");
  }
});
