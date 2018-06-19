import path from "path";
import uriDecoder from "./uri-decoder";
import fsExistsSyncWithCase from "./fs-exists-sync-with-case";

const validateLinks = (markdownLinks, opts) => {
  const validatedLinks = markdownLinks.map(md => {
    const fileDir = path.dirname(path.join(opts.resolve(md.filepath)));

    md.links = md.links.map(link => {
      const resolvedLinkPath = path.join(fileDir, uriDecoder(link.url));
      link.valid = fsExistsSyncWithCase(resolvedLinkPath);
      return link;
    });

    return md;
  });

  return validatedLinks;
};

export default validateLinks;
