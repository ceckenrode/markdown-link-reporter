import {
  logFile,
  logBrokenNum,
  logBrokenLink,
  logSeparator,
  logFailureMsg,
  logFailureList,
  logSuccessMsg
} from "./log";

// logResults is responsible for printing the final output of the cli to the terminal
const logResults = validatedLinks => {
  let totalBrokenLinks = 0;
  let totalBrokenFiles = 0;
  validatedLinks.forEach(report => {
    let brokenLinks = [];
    report.links.forEach(link => {
      if (!link.valid) {
        brokenLinks.push({ link: link.link, line: link.line });
        totalBrokenLinks++;
      }
    });
    if (brokenLinks.length) {
      totalBrokenFiles++;
      logFile(`\n${report.filepath}\n`);
      logBrokenNum(
        `${brokenLinks.length} broken link${
          brokenLinks.length > 1 ? "s" : ""
        }:\n`
      );
      brokenLinks.forEach(brokenLink => {
        logBrokenLink(brokenLink.link, brokenLink.line);
      });
      logSeparator("\n" + "_".repeat(process.stdout.columns));
    }
  });
  if (totalBrokenLinks) {
    logFailureMsg("\nMarkdown Tests Failed:");
    logFailureList(
      `\n${totalBrokenLinks} Broken Link${totalBrokenLinks > 1 ? "s" : ""} in ${
        totalBrokenFiles > 1
          ? totalBrokenFiles + " Files"
          : totalBrokenFiles + " File"
      }`
    );
    process.exit(1);
  } else {
    logSuccessMsg("\nAll Markdown Link Tests Passed!");
    process.exit(0);
  }
};

export default logResults;
