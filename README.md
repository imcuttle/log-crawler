# log-crawler

[![Build status](https://img.shields.io/travis/imcuttle/log-crawler/master.svg?style=flat-square)](https://travis-ci.org/imcuttle/log-crawler)
[![Test coverage](https://img.shields.io/codecov/c/github/imcuttle/log-crawler.svg?style=flat-square)](https://codecov.io/github/imcuttle/log-crawler?branch=master)
[![NPM version](https://img.shields.io/npm/v/log-crawler.svg?style=flat-square)](https://www.npmjs.com/package/log-crawler)
[![NPM Downloads](https://img.shields.io/npm/dm/log-crawler.svg?style=flat-square&maxAge=43200)](https://www.npmjs.com/package/log-crawler)
[![Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://prettier.io/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg?style=flat-square)](https://conventionalcommits.org)

> Crawl the log of any command

## Installation

```bash
npm install log-crawler -g
```

## Usage

### Cli

```bash
npx log-crawler "NODE_ENV=production npm start" --dir=/logs/data/

npx log-crawler --help
```

## Contributing

- Fork it!
- Create your new branch:  
  `git checkout -b feature-new` or `git checkout -b fix-which-bug`
- Start your magic work now
- Make sure npm test passes
- Commit your changes:  
  `git commit -am 'feat: some description (close #123)'` or `git commit -am 'fix: some description (fix #123)'`
- Push to the branch: `git push`
- Submit a pull request :)

## Authors

This library is written and maintained by imcuttle, <a href="mailto:moyuyc95@gmail.com">moyuyc95@gmail.com</a>.

## License

MIT - [imcuttle](https://github.com/imcuttle) 🐟
