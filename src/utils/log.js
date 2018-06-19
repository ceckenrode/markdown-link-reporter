import chalk from "chalk";

export const logInit = (...msg) => {
  console.log(chalk.bold.cyan(...msg));
};

export const logFile = (...msg) => {
  console.log(chalk.blue.bold.underline(...msg));
};

export const logBrokenNum = (...msg) => {
  console.log(chalk.red.bold(...msg));
};

export const logBrokenLink = (link, line) => {
  console.log(chalk.yellow(link) + " " + chalk.red.bold(`⬅  line ${line}`));
};

export const logSeparator = (...msg) => {
  console.log(chalk.magenta.bold(...msg));
};

export const logFailureMsg = (...msg) => {
  console.log(chalk.bgRed.bold.underline(...msg));
};

export const logFailureList = (...msg) => {
  console.log(chalk.red.bold.underline(...msg));
};

export const logSuccessMsg = (...msg) => {
  console.log(chalk.green.bold.underline(...msg));
};
