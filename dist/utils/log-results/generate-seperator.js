"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateSeperator() {
    var cols = process.stdout.columns;
    var seperator = "";
    for (var i = 0; i < cols; i++) {
        seperator += "_";
    }
    return seperator;
}
exports.default = generateSeperator;
