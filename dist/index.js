"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var collect_markdown_links_1 = require("./utils/collect-markdown-links");
var link_validator_1 = require("./utils/link-validator");
var log_results_1 = require("./utils/log-results");
var parse_opts_1 = require("./utils/parse-opts");
var helpers_1 = require("./utils/helpers");
var opts = parse_opts_1.default();
console.log(chalk.bold.cyan("Starting Markdown Reporter..."));
helpers_1.runChain(collect_markdown_links_1.default(opts))
    .chain(function (markdownLinks) { return link_validator_1.default(markdownLinks, opts); })
    .fold(function (validatedLinks) { return log_results_1.default(validatedLinks); });
