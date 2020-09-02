#!/usr/bin/env node
const logCrawl = require('.').default
const nps = require('path')

const opts = require('optimist')
  .usage('Usage: $0 <command> [options]')
  .string(['command', 'dir', 'flags'])
  .describe({
    dir: 'The log directory',
    flags: 'the write flag of log file',
    help: 'show help'
  })
  .default({
    dir: nps.join(process.cwd(), 'log'),
    flags: 'a'
  })

const argv = opts.argv

if (argv.help) {
  // @ts-ignore
  return opts.showHelp()
}

if (!argv._[0]) {
  process.exitCode = 1
  console.error('Command script is required!')
} else {
  logCrawl(argv._[0], argv.dir, { createWriteStreamOptions: { flags: argv.flags } })
}
