const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
require("./scripts/index");

let mainWindow;

function createWindow() {
  
  // Cria a janela do navegador 
  mainWindow = new BrowserWindow({
    center: true,
    minWidth: 1024,
    minHeight: 768,
    title: "Cloud Inventory",
    icon: __dirname + "/favicon.icns",
    autoHideMenuBar: isDev ? false : true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  // Funcao para iniciar maximizado
  mainWindow.maximize();

  // e carrega o index.html do aplicativo 
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.resolve(__dirname, "..", "build", "index.html")}`
  );

  // Abre a ferramenta de desenvolvimento (DevTools)
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // Emitido quando a janela é fechada
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// Este método será chamado quando o Electron terminar a
// inicialização e estiver pronto para criar janelas do navegador.
// Algumas APIs só podem ser usadas após a ocorrência desse evento
app.on("ready", createWindow);

// Sai quando todas as janelas estão fechadas
app.on("window-all-closed", () => {
  // No OS X, é comum que aplicativos e sua barra de menu
  // permanecam ativos até que o usuário saia explicitamente usando Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // No OS X, é comum recriar uma janela do aplicativo quando o
  // ícone do dock é clicado e não há janelas abertas
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.emit("archive:verify");