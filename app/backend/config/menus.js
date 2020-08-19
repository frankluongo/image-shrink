const { isMac, isDev } = require("../utils");
const { app } = require("electron");
const { createAboutWindow } = require("./appWindows");

const aboutMenu = [
  { label: app.name, submenu: [{ label: "About", click: createAboutWindow }] },
];
const appMenu = [{ role: "appMenu" }];
const fileMenu = [{ role: "fileMenu" }];
const devMenu = [
  {
    label: "Developer",
    submenu: [
      { role: "reload" },
      { role: "forcereload" },
      { type: "separator" },
      { role: "toggleDevTools" },
    ],
  },
];

const showAboutMenu = isMac ? aboutMenu : [];
const showDevMenu = isDev ? devMenu : [];
const showMacMenu = isMac ? appMenu : [];

exports.menu = [...showAboutMenu, ...showMacMenu, ...fileMenu, ...showDevMenu];
