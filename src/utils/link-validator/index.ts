import * as path from "path";
import { map as _map } from "lodash";
import uriDecoder from "../uri-decoder";
import fsExistCaseSync from "./fs-exists-with-case-sync";
import { ValidatedLink } from "./../../types";
import { Options } from "./../../types";

// linkValidator takes in the ValidatedLink array and determines whether each link points to a valid filepath
function validateLinks(
  markdownLinks: ValidatedLink[],
  opts: Options
): ValidatedLink[] {
  const validatedLinks: ValidatedLink[] = _map(markdownLinks, md => {
    const splitMdPath = path.join(opts.cwd, md.filepath).split("/");
    md.links = _map(md.links, link => {
      const resolvedLinkPath = path.join(
        splitMdPath.slice(0, splitMdPath.length - 1).join("/"),
        uriDecoder(link.url)
      );
      link.valid = fsExistCaseSync(resolvedLinkPath);
      return link;
    });
    return md;
  });
  return validatedLinks;
}

export default validateLinks;
