"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runChain = function (x) { return ({
    chain: function (f) { return exports.runChain(f(x)); },
    fold: function (f) { return f(x); }
}); };
