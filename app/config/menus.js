const { app } = require("electron");
const { getPlatform } = require("../../utils");
const platform = getPlatform(process.platform);

const isMac = platform === "mac";
const macMenu = isMac ? [{ role: "appMenu" }] : [];
const closeCommand = isMac ? "Command+W" : "Ctrl+Q";

exports.fileMenu = [
  ...macMenu,
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        accelerator: closeCommand,
        click: onQuit,
      },
    ],
  },
];

function onQuit() {
  app.quit();
}
