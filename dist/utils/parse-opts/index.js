"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
function parseOpts() {
    var opts = process.argv.slice(2, process.argv.length);
    opts[0] = opts[0] ? opts[0] : process.cwd();
    var cwd = "";
    if (opts[0].charAt(0) !== "/") {
        cwd = path.join(process.cwd(), opts[0]);
    }
    else {
        cwd = opts[0];
    }
    return {
        cwd: cwd
    };
}
exports.default = parseOpts;
