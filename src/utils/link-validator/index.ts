import * as path from "path";
import * as fs from "fs";
import { map as _map } from "lodash";
import { ValidatedLink } from "./../../types";
import { Options } from "./../../types";

function validateLinks(
  markdownLinks: ValidatedLink[],
  opts: Options
): ValidatedLink[] {
  const validatedLinks = _map(markdownLinks, md => {
    const splitMdPath = path.join(opts.cwd, md.filepath).split("/");
    md.links = _map(md.links, link => {
      const resolvedLinkPath = path.join(
        splitMdPath.slice(0, splitMdPath.length - 1).join("/"),
        link.url
      );
      link.valid = fs.existsSync(resolvedLinkPath);
      return link;
    });
    return md;
  });
  return validatedLinks;
}

export default validateLinks;
