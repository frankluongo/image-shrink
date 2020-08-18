const { app } = require("electron");
const { getPlatform } = require("../utils");
const platform = getPlatform(process.platform);

const macMenu = platform === "mac" ? [{ role: "appMenu" }] : [];

exports.fileMenu = [
  ...macMenu,
  {
    label: "File",
    submenu: [
      {
        label: "Quit",
        click: onQuit,
      },
    ],
  },
];

function onQuit() {
  app.quit();
}
