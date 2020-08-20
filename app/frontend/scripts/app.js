const path = require("path");
const os = require("os");

function ImageShrink() {
  const form = document.querySelector("[data-form]");
  const output = document.querySelector("[data-output]");
  const file = form.querySelector("[data-file]");
  const quality = form.querySelector("[data-quality]");

  output.innerText = path.join(os.homedir(), "imageshrink");

  console.log({
    form,
    output,
    file,
    quality,
  });
}

ImageShrink();
