export interface ValidatedLink {
  filepath: string;
  links: { link: string; url: string; valid: boolean; line: number }[];
}

export interface Options {
  cwd: string;
}
