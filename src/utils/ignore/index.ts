import * as fs from "fs";
import * as path from "path";

function getRemarkIgnorePatterns(opts): String[] {
  const remarkPath = path.join(opts.cwd, '.remarkignore');

  if(!fs.existsSync(remarkPath)) {
    return [];
  }

  const fileLines: string[] = fs
    .readFileSync(remarkPath, "utf-8")
    .split("\n");

  return fileLines.filter((fileLine) => {
    const trimmed = fileLine.trim();
    if(trimmed.startsWith('#')){
      return false;
    }

    return fileLine.length;
  });
}

export default getRemarkIgnorePatterns;
