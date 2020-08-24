const path = require("path");
const os = require("os");
const { ipcMain, shell } = require("electron");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const slash = require("slash");

const defaultDest = path.join(os.homedir(), "imageshrink");

function ImageMin(mainWindow) {
  ipcMain.on("image:minimize", onImageMin);

  function onImageMin(_, { imgPath, quality, dest }) {
    shrinkImage(imgPath, quality, dest || defaultDest);
  }

  async function shrinkImage(imgPath, quality, destination) {
    try {
      const pngQuality = quality / 100;
      const files = await imagemin([slash(imgPath)], {
        destination,
        plugins: [
          imageminMozjpeg({ quality }),
          imageminPngquant({
            quality: [pngQuality, pngQuality],
          }),
        ],
      });
      console.log(files);
      shell.openPath(destination);
      mainWindow.webContents.send("image:done");
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = ImageMin;
