const path = require("path");
const os = require("os");
const { ipcRenderer } = require("electron");

function ImageShrink() {
  const form = document.querySelector("[data-form]");
  const output = document.querySelector("[data-output]");
  const photo = form.querySelector("[data-photo]");
  const file = form.querySelector("[data-file]");
  const quality = form.querySelector("[data-quality]");

  // Actions
  output.innerText = path.join(os.homedir(), "imageshrink");
  photo.addEventListener("change", onPhotoChange);
  form.addEventListener("submit", onSubmit);
  ipcRenderer.on("image:done", onPhotoResized);

  // Functions
  function onSubmit(e) {
    e.preventDefault();
    if (photo.files.length < 1) {
      alert("Please select an image");
      return;
    }
    const imgPath = photo.files[0].path;
    const curQuality = quality.value;

    ipcRenderer.send("image:minimize", { imgPath, quality: curQuality });
  }

  function onPhotoChange() {
    if (photo.files.length < 1) return;
    const imgPath = photo.files[0].path;
    file.value = imgPath;
  }

  function onPhotoResized() {
    console.log("done");
  }
}

ImageShrink();
