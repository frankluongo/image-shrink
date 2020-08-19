const { BrowserWindow } = require("electron");

exports.createAboutWindow = () => {
  const aboutWindow = new BrowserWindow({
    title: "Image Shrink",
    width: 300,
    height: 300,
    resizable: false,
  });
  aboutWindow.loadFile(`./frontend/about.html`);
};
