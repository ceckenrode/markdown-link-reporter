"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function uriDecoder(URI) {
    var decodedURI = URI;
    if (URI.indexOf("%") > -1) {
        if (URI.indexOf("%23") > -1) {
            decodedURI = URI.replace(/%23/g, "#");
        }
        if (decodedURI.indexOf("%") > -1) {
            decodedURI = decodeURI(decodedURI);
        }
    }
    return decodedURI;
}
exports.default = uriDecoder;
