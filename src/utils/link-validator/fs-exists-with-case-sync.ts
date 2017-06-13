import * as fs from "fs";
import * as path from "path";

// Does a case sensitive check to see if a file exist
function fileExistsWithCaseSync(filepath: string): boolean {
  try {
    return recurse(filepath);
  } catch (e) {
    return false;
  }
}

function recurse(filePath: string): boolean {
  let fileDir = filePath;
  let prevFilePath = filePath;
  let result: null | false | true = null;
  while (result === null) {
    fileDir = path.dirname(fileDir);
    if (fileDir === "/" || fileDir === ".") {
      result = true;
      break;
    }
    const fileNames: string[] = fs.readdirSync(fileDir);
    if (fileNames.indexOf(path.basename(prevFilePath)) === -1) {
      result = false;
      break;
    }
    prevFilePath = fileDir;
  }
  return result;
}

export default fileExistsWithCaseSync;
