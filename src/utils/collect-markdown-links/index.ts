import * as glob from "glob";
import * as path from "path";
import * as fs from "fs";
import { forEach as _forEach, map as _map } from "lodash";
import { ValidatedLink } from "../../types";
import { Options } from "./../../types";
import { MARKDOWN_LINK_MATCH, MARKDOWN_LINK_URL_MATCH } from "../../patterns";

import getRemarkIgnorePatterns from '../ignore';

// collectMarkdownLinks goes through each directory and creates an array of ValidatedLink objects describing each markdown file and the links inside of it
function collectMarkdownLinks(opts: Options): ValidatedLink[] {
  let markdownFiles: string[] = [];

  const ignore = getRemarkIgnorePatterns(opts);

  try {
    markdownFiles = glob.sync("**/*.md", {
      ignore: ["**/node_modules/**"].concat(ignore),
      cwd: opts.cwd
    });
  } catch (e) {
    if (fs.existsSync(opts.cwd) && path.extname(opts.cwd) === ".md") {
      markdownFiles = [opts.cwd];
    } else {
      throw new Error("Not a valid directory path or path to a markdown file.");
    }
  }

  const markdownFileLinks: ValidatedLink[] = [];

  _forEach(markdownFiles, file => {
    // Split each file into lines so we can later print the line number for each invalid link
    const fileLines: string[] = fs
      .readFileSync(path.join(opts.cwd, file), "utf-8")
      .split("\n");
    const links: { link: string; line: number }[] = [];
    _forEach(fileLines, (line, index) => {
      const matches = line.match(MARKDOWN_LINK_MATCH) || [];
      _forEach(matches, link => {
        links.push({ link, line: index + 1 });
      });
    });
    const markdownObj: ValidatedLink | any = {
      filepath: file
    };
    markdownObj.links = _map(links, link => {
      return {
        link: link.link,
        line: link.line,
        url: (link.link.match(MARKDOWN_LINK_URL_MATCH) || [])[1],
        valid: false
      };
    });
    markdownFileLinks.push(markdownObj);
  });
  return markdownFileLinks;
}

export default collectMarkdownLinks;
