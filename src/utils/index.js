exports.getPlatform = (platform) => {
  let os;
  switch (platform) {
    case "darwin":
      os = "mac";
      break;
    case "win32":
      os = "windows";
      break;
    case "linux":
      os = "linux";
      break;
    default:
      os = undefined;
      break;
  }
  return os;
};
