import * as chalk from "chalk";
import collectMarkdownLinks from "./utils/collect-markdown-links";
import validateLinks from "./utils/link-validator";
import logResults from "./utils/log-results";
import parseOpts from "./utils/parse-opts";
import { Options } from "./types";
import { ValidatedLink } from "./types";

const opts: Options = parseOpts();

console.log(chalk.bold.cyan("Starting Markdown Reporter..."));

const markdownLinks = collectMarkdownLinks(opts);
const validatedLinks: ValidatedLink[] = validateLinks(markdownLinks, opts);
logResults(validatedLinks)
