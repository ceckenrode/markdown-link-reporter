import * as fs from "fs";
import * as path from "path";

const cache = {};

// Checks to see if the information is cached before checking the file system
const fsExistsSyncWithCase = filePath => {
  const fileDir = path.dirname(filePath);
  const fileBase = path.basename(filePath);
  if (cache[fileDir]) {
    return cache[fileDir].indexOf(fileBase) > -1;
  }
  try {
    return scanDirectory(filePath);
  } catch (e) {
    return false;
  }
};

const scanDirectory = filePath => {
  let fileDir = filePath;
  let prevFilePath = filePath;
  let result = null;
  while (result === null) {
    fileDir = path.dirname(fileDir);
    if (fileDir === "/" || fileDir === ".") {
      return (result = true);
    }
    const fileNames = (cache[fileDir] = fs.readdirSync(fileDir));
    if (fileNames.indexOf(path.basename(prevFilePath)) === -1) {
      return (result = false);
    }
    prevFilePath = fileDir;
  }
  return result;
};

export default fsExistsSyncWithCase;
