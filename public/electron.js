const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const axios = require("axios");
const { ipcMain, app, BrowserWindow } = electron;

const api = axios.default.create({
  baseURL: "https://api.softlayer.com/rest/v3.1/",
  headers: {
    "Content-Type": "application/json",
  },
});

global.share = { electron, ipcMain, api };
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    minWidth: 1280,
    minHeight: 720,
    title: "Cloud Inventory",
    autoHideMenuBar: "true",
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Funcao para iniciar maximizado
  // mainWindow.maximize();

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.resolve(__dirname, "..", "build", "index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

require("./scripts/VirtualServerClassic");
