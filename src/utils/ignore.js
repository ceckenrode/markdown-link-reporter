import fs from "fs";
import path from "path";

const getRemarkIgnorePatterns = opts => {
  const remarkPath = opts.resolve(".remarkignore");

  if (!fs.existsSync(remarkPath)) {
    return [];
  }

  const fileLines = fs.readFileSync(remarkPath, "utf-8").split("\n");

  return fileLines.filter(fileLine => {
    const trimmed = fileLine.trim();
    if (trimmed.startsWith("#")) {
      return false;
    }

    return fileLine.length;
  });
};

export default getRemarkIgnorePatterns;
