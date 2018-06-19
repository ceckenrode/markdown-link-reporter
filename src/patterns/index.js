export const MARKDOWN_LINK_MATCH = /((!?\[[^\]]*?\])\((?:(?!http|www\.|\#|\.com|\.net|\.info|\.o‌​rg).)*?\))/g;

export const MARKDOWN_LINK_URL_MATCH = /\[.*?]\((.*?)\)/;

export const HTML_LINK_MATCH = /<img.+src="(?:(?!http|www\.|\#|\.com|\.net|\.info|\.org).)*?".*?>/g;

export const HTML_LINK_URL_MATCH = /<img.+src="(.*)".*?>/;

export const CODE_BLOCK_MATCH = /`{3}/g;
