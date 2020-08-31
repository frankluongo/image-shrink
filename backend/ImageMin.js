const path = require("path");
const os = require("os");
const { ipcMain, shell } = require("electron");
const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const ImageminGm = require("imagemin-gm");
const slash = require("slash");
const log = require("electron-log");

const imageminGm = new ImageminGm();

const defaultDest = path.join(os.homedir(), "imageshrink");

function ImageMin(mainWindow) {
  ipcMain.on("image:minimize", onImageMin);

  function onImageMin(_, { images, quality, dest, width }) {
    const imagePaths = images.map(getImagePath);
    imagePaths.forEach((path) =>
      shrinkImage(path, quality, dest || defaultDest, width)
    );
  }

  async function shrinkImage(path, quality, destination, width) {
    try {
      const files = await imagemin([path], {
        destination,
        plugins: imageminPlugins(quality, width),
        glob: false,
      });
      log.info(files);
      shell.openPath(destination);
      mainWindow.webContents.send("image:done", { files });
    } catch (e) {
      log.error(e);
    }
  }

  function getImagePath(image) {
    return slash(image);
  }

  function imageminPlugins(quality, width) {
    const pngQuality = quality / 100;
    const plugins = [
      imageminMozjpeg({ quality }),
      imageminPngquant({
        quality: [pngQuality, pngQuality],
      }),
    ];
    if (width) plugins.push(imageminGm.resize({ width }));
    return plugins;
  }
}

module.exports = ImageMin;
