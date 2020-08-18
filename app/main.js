const { app, BrowserWindow, Menu } = require("electron");
const { isDev, isMac } = require("./backend/utils");
const { menu } = require("./backend/config/menus");
const globalShortcuts = require("./backend/config/globalShortcuts");

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
    width: 500,
    height: 600,
    resizable: isDev,
  });
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  globalShortcuts(mainWindow);
  mainWindow.loadFile(`./frontend/index.html`);
}
