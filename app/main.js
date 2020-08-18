require("dotenv");
const { app, BrowserWindow, Menu } = require("electron");
const { getPlatform, isDev } = require("./backend/utils");
const { fileMenu } = require("./backend/config/menus");
const globalShortcuts = require("./backend/config/globalShortcuts");

const platform = getPlatform(process.platform);

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (platform !== "mac") app.quit();
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
    width: 500,
    height: 600,
    resizable: isDev,
  });
  const mainMenu = Menu.buildFromTemplate(fileMenu);
  Menu.setApplicationMenu(mainMenu);
  globalShortcuts(mainWindow);
  mainWindow.loadFile(`./frontend/index.html`);
}
