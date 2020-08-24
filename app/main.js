const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const { isDev, isMac } = require("./backend/utils");
const { menu } = require("./backend/config/menus");

const ImageMin = require("./backend/ImageMin");

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
    width: isDev ? 1200 : 500,
    height: 600,
    resizable: isDev,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  if (isDev) mainWindow.webContents.openDevTools();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.loadFile(`./frontend/index.html`);
  ImageMin(mainWindow);
}
