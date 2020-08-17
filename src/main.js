const { app, BrowserWindow } = require("electron");
const { getPlatform } = require("./utils");

process.env.NODE_ENV = "production";

const isDev = process.env.NODE_ENV !== "production";
const platform = getPlatform(process.platform);

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Shrink",
    width: 500,
    height: 600,
    resizable: isDev,
  });

  // Option 1
  // mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // Option 2
  mainWindow.loadFile(`./app/index.html`);
}

app.on("ready", createMainWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (platform !== "mac") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
