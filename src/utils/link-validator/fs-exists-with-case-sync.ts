import * as fs from "fs";
import * as path from "path";
import { forEach as _forEach } from "lodash";

// Does a case sensitive check to see if a file exist
function fileExistsWithCaseSync(filepath: string): boolean {
  try {
    return recurse(filepath);
  } catch (e) {
    return false;
  }
}

function recurse(filepath: string): boolean {
  let dir = filepath;
  let prevfilepath = filepath;
  let result: null | false | true = null;
  try {
    while (result === null) {
      dir = path.dirname(dir);
      if (dir === "/" || dir === ".") {
        result = true;
        break;
      }
      const filenames: string[] = fs.readdirSync(dir);
      if (filenames.indexOf(path.basename(prevfilepath)) === -1) {
        result = false;
        break;
      }
      prevfilepath = dir;
    }
    return result;
  } catch (e) {
    return false;
  }
}

export default fileExistsWithCaseSync;
