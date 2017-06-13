import * as chalk from "chalk";
import { forEach as _forEach } from "lodash";
import generateSeperator from "./generate-seperator";
import { ValidatedLink } from "../../types";

// logResults is responsible for printing the final output of the cli to the terminal
function logResults(validatedLinks: ValidatedLink[]): void {
  let totalBrokenLinks: number = 0;
  let totalBrokenFiles: number = 0;
  _forEach(validatedLinks, report => {
    let brokenLinks: { link: string; line: number }[] = [];
    _forEach(report.links, link => {
      if (!link.valid) {
        brokenLinks.push({ link: link.link, line: link.line });
        totalBrokenLinks++;
      }
    });
    if (brokenLinks.length) {
      totalBrokenFiles++;
      console.log(`\n${chalk.blue.bold.underline(report.filepath)}\n`);
      console.log(
        chalk.red.bold(
          `${brokenLinks.length} broken link${brokenLinks.length > 1
            ? "s"
            : ""}:\n`
        )
      );
      _forEach(brokenLinks, brokenLink => {
        console.log(
          chalk.yellow(brokenLink.link) +
            " " +
            chalk.red.bold(`⬅  line ${brokenLink.line}`)
        );
      });
      console.log(chalk.magenta.bold("\n" + generateSeperator()));
    }
  });
  if (totalBrokenLinks) {
    console.log(chalk.bgRed.bold.underline("\nMarkdown Tests Failed:"));
    console.log(
      chalk.red.bold.underline(
        `\n${totalBrokenLinks} Broken Link${totalBrokenLinks > 1
          ? "s"
          : ""} in ${totalBrokenFiles > 1
          ? totalBrokenFiles + " Files"
          : totalBrokenFiles + " File"}`
      )
    );
    process.exit(1);
  } else {
    console.log(
      chalk.green.bold.underline("\nAll Markdown Link Tests Passed!")
    );
    process.exit(0);
  }
}

export default logResults;
