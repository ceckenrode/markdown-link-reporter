import * as path from "path";
import { Options } from "../../types";

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
