import * as fs from "fs";
import * as path from "path";
import { some as _some } from "lodash";

let cache: any = {};

// Does a case sensitive check to see if a file exist
function fileExistsWithCaseSync(file: string): boolean {
  const filepath = path.resolve(file);
  const dirname = path.dirname(filepath);
  const basename = path.basename(filepath);

  let files: string[];
  if (cache[dirname]) {
    files = [cache[dirname]];
  } else {
    try {
      files = cache[dirname] = fs.readdirSync(dirname);
    } catch (e) {
      return false;
    }
  }
  cache = {};
  return check(files, dirname, basename);
}

function check(files: string[], dirname: string, basename: string) {
  return _some(files, file => {
    const result = file === basename;
    return result;
  });
}

export default fileExistsWithCaseSync;
