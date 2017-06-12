import * as glob from "glob";
import * as path from "path";
import * as fs from "fs";
import { forEach as _forEach, map as _map } from "lodash";
import { ValidatedLink } from "../../types";
import { Options } from "./../../types";
import { MARKDOWN_LINK_MATCH, MARKDOWN_LINK_URL_MATCH } from "../../patterns";

function collectMarkdownLinks(opts: Options): ValidatedLink[] {
  let markdownFiles: string[] = [];
  try {
    markdownFiles = glob.sync("**/*.md", {
      ignore: "**/node_modules/**",
      cwd: opts.cwd
    });
  } catch (e) {
    if (
      fs.existsSync(opts.cwd) &&
      opts.cwd.substring(opts.cwd.length - 2, opts.cwd.length) === "md"
    ) {
      markdownFiles = [opts.cwd];
    } else {
      throw new Error("Not a valid directory path or path to a markdown file.");
    }
  }

  const markdownFileLinks: ValidatedLink[] = [];

  _forEach(markdownFiles, file => {
    const fileLines: string[] = fs.readFileSync(file, "utf-8").split("\n");
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
        url: (link.link.match(MARKDOWN_LINK_URL_MATCH) || [""])[1],
        valid: false
      };
    });
    markdownFileLinks.push(markdownObj);
  });
  return markdownFileLinks;
}

export default collectMarkdownLinks;
