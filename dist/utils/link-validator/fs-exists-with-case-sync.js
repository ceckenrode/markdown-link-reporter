"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function fileExistsWithCaseSync(filepath) {
    try {
        return recurse(filepath);
    }
    catch (e) {
        return false;
    }
}
function recurse(filePath) {
    var fileDir = filePath;
    var prevFilePath = filePath;
    var result = null;
    while (result === null) {
        fileDir = path.dirname(fileDir);
        if (fileDir === "/" || fileDir === ".") {
            result = true;
            break;
        }
        var fileNames = fs.readdirSync(fileDir);
        if (fileNames.indexOf(path.basename(prevFilePath)) === -1) {
            result = false;
            break;
        }
        prevFilePath = fileDir;
    }
    return result;
}
exports.default = fileExistsWithCaseSync;
