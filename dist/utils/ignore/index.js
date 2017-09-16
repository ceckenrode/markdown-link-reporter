"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function getRemarkIgnorePatterns(opts) {
    var remarkPath = path.join(opts.cwd, '.remarkignore');
    if (!fs.existsSync(remarkPath)) {
        return [];
    }
    var fileLines = fs
        .readFileSync(remarkPath, "utf-8")
        .split("\n");
    return fileLines.filter(function (fileLine) {
        var trimmed = fileLine.trim();
        if (trimmed.startsWith('#')) {
            return false;
        }
        return fileLine.length;
    });
}
exports.default = getRemarkIgnorePatterns;
