"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glob = require("glob");
var path = require("path");
var fs = require("fs");
var lodash_1 = require("lodash");
var patterns_1 = require("../../patterns");
var ignore_1 = require("../ignore");
function collectMarkdownLinks(opts) {
    var markdownFiles = [];
    var ignore = ignore_1.default(opts);
    try {
        markdownFiles = glob.sync("**/*.md", {
            ignore: ["**/node_modules/**"].concat(ignore),
            cwd: opts.cwd
        });
    }
    catch (e) {
        if (fs.existsSync(opts.cwd) && path.extname(opts.cwd) === ".md") {
            markdownFiles = [opts.cwd];
        }
        else {
            throw new Error("Not a valid directory path or path to a markdown file.");
        }
    }
    var markdownFileLinks = [];
    lodash_1.forEach(markdownFiles, function (file) {
        var fileLines = fs
            .readFileSync(path.join(opts.cwd, file), "utf-8")
            .split("\n");
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
                url: (link.link.match(patterns_1.MARKDOWN_LINK_URL_MATCH) || [])[1],
                valid: false
            };
        });
        markdownFileLinks.push(markdownObj);
    });
    return markdownFileLinks;
}
exports.default = collectMarkdownLinks;
