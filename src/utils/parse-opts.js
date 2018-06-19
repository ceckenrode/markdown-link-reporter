import path from "path";
import fs from "fs";

const parseOpts = () => {
  const entry = process.argv[2] || process.cwd();

  const isDirectory = fs.lstatSync(entry).isDirectory();

  const isAbsolute = path.isAbsolute(entry);

  return {
    entry,
    isDirectory,
    isAbsolute,
    resolve: (file) => {
      if (isDirectory) {
        if (isAbsolute) {
          return path.join(entry, file);
        }
        return path.join(process.cwd(), entry, file);
      }
      if (isAbsolute) {
        return file;
      }
      return path.join(process.cwd(), file);
    }
  };
};

export default parseOpts;
