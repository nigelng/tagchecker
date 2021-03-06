# TagChecker ๐

This simple application provides utilities for checking:

- All the tags in a given piece of text (paragraph) are correctly nested
- And, there are no missing or extra tags.

See full details in `./docs/requirements`

## ๐ฅ Status

![PR Builder](https://github.com/nigelng/tagchecker/workflows/PR%20Builder/badge.svg)

## ๐ Development

### ๐ Debugging

- Either:

  - NodeJS `node 16`
  - Nix setup

- Debug command: `> yarn debug` (will default parse `data/debug.txt`)

### ๐งช Testing

- Run `yarn test`

## ๐ Usage

- Build: `yarn build`
- Run: `yarn start <filename>` where `filename` is name of the file to parse, and required to be in `data` folder (filename is default to `debug.txt`)
