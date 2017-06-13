"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var lodash_1 = require("lodash");
var cache = {};
function fileExistsWithCaseSync(file) {
    var filepath = path.resolve(file);
    var dirname = path.dirname(filepath);
    var basename = path.basename(filepath);
    var files;
    if (cache[dirname]) {
        files = [cache[dirname]];
    }
    else {
        try {
            files = cache[dirname] = fs.readdirSync(dirname);
        }
        catch (e) {
            return false;
        }
    }
    cache = {};
    return check(files, dirname, basename);
}
function check(files, dirname, basename) {
    return lodash_1.some(files, function (file) {
        var result = file === basename;
        return result;
    });
}
exports.default = fileExistsWithCaseSync;
