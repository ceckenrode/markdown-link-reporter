"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function fileExistsWithCaseSync(filepath) {
    var dir = path.dirname(filepath);
    if (dir === "/" || dir === ".")
        return true;
    var filenames = fs.readdirSync(dir);
    if (filenames.indexOf(path.basename(filepath)) === -1) {
        return false;
    }
    return fileExistsWithCaseSync(dir);
}
exports.default = fileExistsWithCaseSync;
