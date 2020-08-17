const { app, BrowserWindow } = require("electron");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Shrink",
    width: 500,
    height: 600,
  });

  // Option 1
  // mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  // Option 2
  mainWindow.loadFile(`./app/index.html`);
}

app.on("ready", createMainWindow);
