"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var cache = {};
function fileExistsWithCaseSync(filePath) {
    var fileDir = path.dirname(filePath);
    var fileBase = path.basename(filePath);
    if (cache[fileDir]) {
        return cache[fileDir].indexOf(fileBase) > -1;
    }
    try {
        return scanDirectory(filePath);
    }
    catch (e) {
        return false;
    }
}
function scanDirectory(filePath) {
    var fileDir = filePath;
    var prevFilePath = filePath;
    var result = null;
    while (result === null) {
        fileDir = path.dirname(fileDir);
        if (fileDir === "/" || fileDir === ".") {
            return (result = true);
        }
        var fileNames = (cache[fileDir] = fs.readdirSync(fileDir));
        if (fileNames.indexOf(path.basename(prevFilePath)) === -1) {
            return (result = false);
        }
        prevFilePath = fileDir;
    }
    return result;
}
exports.default = fileExistsWithCaseSync;
