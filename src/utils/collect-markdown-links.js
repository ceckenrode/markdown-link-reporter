import glob from "glob";
import path from "path";
import fs from "fs";
import getRemarkIgnorePatterns from "./ignore";

import {
  MARKDOWN_LINK_MATCH,
  MARKDOWN_LINK_URL_MATCH,
  HTML_LINK_MATCH,
  HTML_LINK_URL_MATCH,
  CODE_BLOCK_MATCH
} from "../patterns";

const collectMarkdownLinks = opts => {
  let markdownFiles = [];

  const ignore = getRemarkIgnorePatterns(opts);

  try {
    if (opts.isDirectory) {
      markdownFiles = glob.sync("**/*.md", {
        ignore: [...ignore, "**/node_modules/**"],
        cwd: opts.entry
      });
    } else {
      if (path.extname(opts.entry) !== ".md") {
        throw new Error(
          "Not a valid directory path or path to a markdown file."
        );
      } else {
        markdownFiles = [opts.entry];
      }
    }
  } catch (e) {
    throw new Error("Not a valid directory path or path to a markdown file.");
  }

  const markdownFileLinks = [];

  markdownFiles.forEach(file => {
    const fileLines = fs.readFileSync(opts.resolve(file), "utf-8").split("\n");

    const links = [];
    let insideCodeBlock = false;

    fileLines.forEach((line, index) => {
      const block = line.match(CODE_BLOCK_MATCH);

      if (block && block.length % 2 !== 0) {
        insideCodeBlock = !insideCodeBlock;
      }

      if (insideCodeBlock) return;

      const matches =
        line.match(MARKDOWN_LINK_MATCH) || line.match(HTML_LINK_MATCH) || [];

      matches.forEach(link => {
        links.push({ link, line: index + 1 });
      });
    });

    const markdownObj = {
      filepath: file
    };

    markdownObj.links = links.map(link => {
      return {
        link: link.link,
        line: link.line,
        url: (link.link.match(MARKDOWN_LINK_URL_MATCH) ||
          link.link.match(HTML_LINK_URL_MATCH) ||
          [])[1],
        valid: false
      };
    });
    markdownFileLinks.push(markdownObj);
  });
  return markdownFileLinks;
};

export default collectMarkdownLinks;
