const path = require("path");
const os = require("os");
const { ipcRenderer } = require("electron");

const SAVED_PATH = "SAVED_PATH";

function ImageShrink() {
  const savedPath = localStorage.getItem(SAVED_PATH);
  const defaultPath = path.join(os.homedir(), "imageshrink");
  const initialPath = savedPath ? savedPath : defaultPath;

  const form = document.querySelector("[data-form]");
  const output = document.querySelector("[data-output]");
  const photo = form.querySelector("[data-photo]");
  const filesTable = form.querySelector("[data-files]");
  const qualityRange = form.querySelector("[data-quality]");
  const widthCheckbox = form.querySelector("[data-change-dimensions]");
  const widthInput = form.querySelector("[data-dimensions]");
  const outputPath = form.querySelector("[data-output-path]");
  const outputDest = { dest: null };

  // Actions
  setOutputPath(initialPath);
  outputPath.addEventListener("click", onOutputClick);
  photo.addEventListener("change", onPhotoChange);
  form.addEventListener("submit", onSubmit);
  ipcRenderer.on("image:done", onPhotoResized);
  ipcRenderer.on("output:selected", onOutputSelected);

  // Functions
  function onSubmit(e) {
    e.preventDefault();
    if (photo.files.length < 1) {
      alert("Please select an image");
      return;
    }
    const files = Array.from(photo.files);
    const images = files.map(buildPath);
    const quality = qualityRange.value;
    const width = widthCheckbox.checked ? widthInput.value : null;
    const { dest } = outputDest;

    ipcRenderer.send("image:minimize", { images, quality, width, dest });
  }

  function onPhotoChange() {
    if (photo.files.length < 1) return;
    Array.from(photo.files).forEach(displayPhotoDetails);
  }

  function onPhotoResized(_, { files }) {
    const { sourcePath } = files[0];
    const fileRow = filesTable.querySelector(
      `[data-file-path="${sourcePath}"]`
    );
    fileRow.setAttribute("data-resized", true);
  }

  function onOutputClick(e) {
    e.preventDefault();
    ipcRenderer.send("output:select");
  }

  function onOutputSelected(_, dir) {
    setOutputPath(dir);
  }

  function displayPhotoDetails(file) {
    filesTable.innerHTML += `
      <tr class="app-main-form-file-table__row" data-file-path="${file.path}">
        <td class="app-main-form-file-table__data">${file.name}</td>
        <td class="app-main-form-file-table__data">${file.path}</td>
      </tr>
    `;
  }

  function setOutputPath(dir) {
    outputDest.dest = dir;
    output.innerText = outputDest.dest;
    localStorage.setItem(SAVED_PATH, dir);
  }

  function buildPath(image) {
    return image.path;
  }
}

ImageShrink();
