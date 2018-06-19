import collectMarkdownLinks from "./utils/collect-markdown-links";
import validateLinks from "./utils/link-validator";
import logResults from "./utils/log-results";
import parseOpts from "./utils/parse-opts";
import { logInit } from "./utils/log";

const opts = parseOpts();

logInit("Starting Markdown Reporter...");

const markdownLinks = collectMarkdownLinks(opts);
const validatedLinks = validateLinks(markdownLinks, opts);
logResults(validatedLinks);
