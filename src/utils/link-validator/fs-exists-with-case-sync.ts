import * as fs from "fs";
import * as path from "path";

// Does a case sensitive check to see if a file exist, since travis runs case sensitive on linux
function fileExistsWithCaseSync(filepath: string): boolean {
  const dir = path.dirname(filepath);
  if (dir === "/" || dir === ".") return true;
  const filenames = fs.readdirSync(dir);
  if (filenames.indexOf(path.basename(filepath)) === -1) {
    return false;
  }
  return fileExistsWithCaseSync(dir);
}

export default fileExistsWithCaseSync;
