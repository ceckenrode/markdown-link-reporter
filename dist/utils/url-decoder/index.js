"use strict";
function uriDecoder(URI) {
    var decodedURI = "";
    if (URI.indexOf("%") > -1) {
        try {
            decodedURI = decodeURI(URI);
        }
        catch (e) {
            decodedURI = URI;
        }
        return decodedURI;
    }
    return URI;
}
