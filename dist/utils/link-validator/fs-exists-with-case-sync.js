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
function recurse(filepath) {
    var dir = filepath;
    var prevfilepath = filepath;
    var result = null;
    try {
        while (result === null) {
            dir = path.dirname(dir);
            if (dir === "/" || dir === ".") {
                result = true;
                break;
            }
            var filenames = fs.readdirSync(dir);
            if (filenames.indexOf(path.basename(prevfilepath)) === -1) {
                result = false;
                break;
            }
            prevfilepath = dir;
        }
        return result;
    }
    catch (e) {
        return false;
    }
}
exports.default = fileExistsWithCaseSync;
