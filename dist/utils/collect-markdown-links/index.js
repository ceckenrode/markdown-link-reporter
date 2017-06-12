"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
var fs = require("fs");
var lodash_1 = require("lodash");
var patterns_1 = require("../../patterns");
function collectMarkdownLinks(opts) {
    var markdownFiles = [];
    try {
        markdownFiles = glob.sync("**/*.md", {
            ignore: "**/node_modules/**",
            cwd: opts.cwd
        });
    }
    catch (e) {
        if (fs.existsSync(opts.cwd) &&
            opts.cwd.substring(opts.cwd.length - 2, opts.cwd.length) === "md") {
            markdownFiles = [opts.cwd];
        }
        else {
            throw new Error("Not a valid directory path or path to a markdown file.");
        }
    }
    var markdownFileLinks = [];
    lodash_1.forEach(markdownFiles, function (file) {
        var fileLines = fs.readFileSync(file, "utf-8").split("\n");
        var links = [];
        lodash_1.forEach(fileLines, function (line, index) {
            var matches = line.match(patterns_1.MARKDOWN_LINK_MATCH) || [];
            lodash_1.forEach(matches, function (link) {
                links.push({ link: link, line: index + 1 });
            });
        });
        var markdownObj = {
            filepath: file
        };
        markdownObj.links = lodash_1.map(links, function (link) {
            return {
                link: link.link,
                line: link.line,
                url: (link.link.match(patterns_1.MARKDOWN_LINK_URL_MATCH) || [""])[1],
                valid: false
            };
        });
        markdownFileLinks.push(markdownObj);
    });
    return markdownFileLinks;
}
exports.default = collectMarkdownLinks;
