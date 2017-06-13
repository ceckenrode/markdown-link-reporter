"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var lodash_1 = require("lodash");
var uri_decoder_1 = require("../uri-decoder");
function validateLinks(markdownLinks, opts) {
    var validatedLinks = lodash_1.map(markdownLinks, function (md) {
        var splitMdPath = path.join(opts.cwd, md.filepath).split("/");
        md.links = lodash_1.map(md.links, function (link) {
            var resolvedLinkPath = path.join(splitMdPath.slice(0, splitMdPath.length - 1).join("/"), uri_decoder_1.default(link.url));
            link.valid = fs.existsSync(resolvedLinkPath);
            return link;
        });
        return md;
    });
    return validatedLinks;
}
exports.default = validateLinks;
