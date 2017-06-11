import * as path from "path";
import * as fs from "fs";
import * as chalk from "chalk";
import collectMarkdownLinks from "./utils/collect-markdown-links";
import validateLinks from "./utils/link-validator";
import logResults from "./utils/log-results";
import parseOpts from "./utils/parse-opts";
import { runChain } from "./utils/helpers";
import { Options } from "./types";
import { ValidatedLink } from "./types";

const opts = parseOpts();

console.log(chalk.bold.cyan("Starting Markdown Reporter..."));

runChain(collectMarkdownLinks(opts))
  .chain((mdMap: ValidatedLink[]) => validateLinks(mdMap, opts))
  .fold((validatedLinks: ValidatedLink[]) => logResults(validatedLinks));
