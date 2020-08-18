const { isMac, isDev } = require("../utils");

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

const showMacMenu = isMac ? appMenu : [];
const showDevMenu = isDev ? devMenu : [];

exports.menu = [...showMacMenu, ...fileMenu, ...showDevMenu];
