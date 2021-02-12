const { ipcMain } = require("electron");
const fs = require("fs");
const os = require("os");

const basePath = `${os.homedir()}/.cloud-inventory/`;
const logsPath = `${basePath}/logs`;
const accountPath = `${basePath}/accounts`;

// Verifica se os paths para archive de dados existem
// Caso algum deles nao existam, criamos ele
ipcMain.on("archive:verify", (event, arg) => {
  // Base Path
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }

  // Logs Path
  if (!fs.existsSync(logsPath)) {
    fs.mkdirSync(logsPath);
  }

  // Account Path
  if (!fs.existsSync(accountPath)) {
    fs.mkdirSync(accountPath);
  }
});

module.exports = {
  logsPath,
  accountPath,
};
