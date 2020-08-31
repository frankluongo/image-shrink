process.env.NODE_ENV = "production";

const { app, BrowserWindow, Menu } = require("electron");
const { isDev, isMac } = require("./backend/utils");
const { menu } = require("./backend/config/menus");

const ImageMin = require("./backend/ImageMin");
const OutputSelect = require("./backend/OutputSelect");

// I'm getting a glitchy screen so I had to use this to stop that
app.disableHardwareAcceleration();

//
// App Events
//
app.on("ready", createMainWindow);
app.on("window-all-closed", () => {
  if (isMac) app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
//
// Functions
//
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Shrink",
    width: isDev ? 1200 : 640,
    height: 900,
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: true,
    },
    // titleBarStyle: "hidden",
  });
  if (isDev) mainWindow.webContents.openDevTools();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.loadFile(`./frontend/index.html`);
  ImageMin(mainWindow);
  OutputSelect(mainWindow);
}
