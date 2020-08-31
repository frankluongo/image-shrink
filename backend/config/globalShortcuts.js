const { globalShortcut } = require("electron");
const { isMac, isDev } = require("../utils");

module.exports = (mainWindow) => {
  globalShortcut.register("CmdOrCtrl+R", () => mainWindow.reload());
  if (isDev) {
    const devToolsCmd = isMac ? "Command+Alt+I" : "Ctrl+Shift+I";
    globalShortcut.register(devToolsCmd, () => mainWindow.toggleDevTools());
  }
};
