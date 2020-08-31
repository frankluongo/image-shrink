const path = require("path");
const os = require("os");
const { ipcMain, dialog } = require("electron");

const defaultDest = path.join(os.homedir(), "imageshrink");

function OutputSelect(mainWindow) {
  ipcMain.on("output:select", onOutputSelect);

  async function onOutputSelect() {
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ["openDirectory"],
    });
    mainWindow.webContents.send("output:selected", result.filePaths[0]);
  }
}

module.exports = OutputSelect;
