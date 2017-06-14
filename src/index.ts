import * as chalk from "chalk";
import collectMarkdownLinks from "./utils/collect-markdown-links";
import validateLinks from "./utils/link-validator";
import logResults from "./utils/log-results";
import parseOpts from "./utils/parse-opts";
import { runChain } from "./utils/helpers";
import { Options } from "./types";
import { ValidatedLink } from "./types";

// Create an object containing options passed into the cli
const opts: Options = parseOpts();

console.log(chalk.bold.cyan("Starting Markdown Reporter..."));

// runChain neatly pipes the result of one function into the next
runChain(collectMarkdownLinks(opts))
  .chain((markdownLinks: ValidatedLink[]) => validateLinks(markdownLinks, opts))
  .fold((validatedLinks: ValidatedLink[]) => logResults(validatedLinks));
