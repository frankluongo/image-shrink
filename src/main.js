const { app, BrowserWindow, Menu } = require("electron");
const { getPlatform } = require("./utils");
const { fileMenu } = require("./config/menus");

process.env.NODE_ENV = "production";

const isDev = process.env.NODE_ENV !== "production";
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
  mainWindow.loadFile(`./app/index.html`);
}
