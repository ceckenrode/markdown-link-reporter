import * as path from "path";
import * as fs from "fs";
import { Options } from "../../types";

// parseOpts returns an object containing command-line arguments passed into the cli
// Currently only cwd is supported, but more options can be added without having to modify much of the rest of the program
function parseOpts(): Options {
  const opts = process.argv.slice(2, process.argv.length);
  opts[0] = opts[0] ? opts[0] : process.cwd();
  let cwd: string = "";

  if (opts[0].charAt(0) !== "/") {
    cwd = path.join(process.cwd(), opts[0]);
  } else {
    cwd = opts[0];
  }
  return {
    cwd
  };
}

export default parseOpts;
