# Markdown Link Reporter

A cli tool for identifying all broken local markdown links in a file or directory.

## Installation

```
npm install -g markdown-link-reporter
```

## Usage

After installing, simply run the command `markdown-link-reporter` in your terminal. By default, this will scan all markdown files in your current working directory.

To test a specific directory or file, run `markdown-link-reporter <relative or absolute path to folder or file>`. 

Example:

```
markdown-link-reporter ./Readme.md
```

### Add Markdown Link Reporter to Your Testing Suite

Just run `markdown-link-reporter`, the process ends with a status code of 0 if no issues are found, otherwise the process exits with status code of 1.
