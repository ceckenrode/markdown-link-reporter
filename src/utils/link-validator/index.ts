import * as path from "path";
import { map as _map } from "lodash";
import uriDecoder from "../uri-decoder";
import fsExistCaseSync from "./fs-exists-with-case-sync";
import { ValidatedLink } from "./../../types";
import { Options } from "./../../types";

function validateLinks(
  markdownLinks: ValidatedLink[],
  opts: Options
): ValidatedLink[] {
  const validatedLinks: ValidatedLink[] = _map(markdownLinks, md => {
    const fileDir = path.dirname(path.join(opts.cwd, md.filepath));
    md.links = _map(md.links, link => {
      const resolvedLinkPath = path.join(
        fileDir,
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
