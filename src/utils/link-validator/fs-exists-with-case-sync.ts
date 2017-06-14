import * as fs from "fs";
import * as path from "path";

const cache: any = {};

// Checks to see if the information is cached before checking the file system
function fileExistsWithCaseSync(filePath: string): boolean {
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
}

function scanDirectory(filePath: string): boolean {
  let fileDir = filePath;
  let prevFilePath = filePath;
  let result: null | false | true = null;
  while (result === null) {
    fileDir = path.dirname(fileDir);
    if (fileDir === "/" || fileDir === ".") {
      return (result = true);
    }
    const fileNames: string[] = (cache[fileDir] = fs.readdirSync(fileDir));
    if (fileNames.indexOf(path.basename(prevFilePath)) === -1) {
      return (result = false);
    }
    prevFilePath = fileDir;
  }
  return result;
}

export default fileExistsWithCaseSync;
