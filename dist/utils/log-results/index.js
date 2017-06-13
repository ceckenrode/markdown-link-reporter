"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require("chalk");
var lodash_1 = require("lodash");
var generate_seperator_1 = require("./generate-seperator");
function logResults(validatedLinks) {
    var totalBrokenLinks = 0;
    var totalBrokenFiles = 0;
    lodash_1.forEach(validatedLinks, function (report) {
        var brokenLinks = [];
        lodash_1.forEach(report.links, function (link) {
            if (!link.valid) {
                brokenLinks.push({ link: link.link, line: link.line });
                totalBrokenLinks++;
            }
        });
        if (brokenLinks.length) {
            totalBrokenFiles++;
            console.log("\n" + chalk.blue.bold.underline(report.filepath) + "\n");
            console.log(chalk.red.bold(brokenLinks.length + " broken link" + (brokenLinks.length > 1
                ? "s"
                : "") + ":\n"));
            lodash_1.forEach(brokenLinks, function (brokenLink) {
                console.log(chalk.yellow(brokenLink.link) +
                    " " +
                    chalk.red.bold("\u2B05  line " + brokenLink.line));
            });
            console.log(chalk.magenta.bold("\n" + generate_seperator_1.default()));
        }
    });
    if (totalBrokenLinks) {
        console.log(chalk.bgRed.bold.underline("\nMarkdown Tests Failed:"));
        console.log(chalk.red.bold.underline("\n" + totalBrokenLinks + " Broken Links in " + totalBrokenFiles + " Files"));
        process.exit(1);
    }
    else {
        console.log(chalk.green.bold.underline("\nAll Markdown Link Tests Passed!"));
        process.exit(0);
    }
}
exports.default = logResults;
