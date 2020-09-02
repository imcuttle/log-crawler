/**
 * Crawl the log of any command
 * @author imcuttle
 */
import * as execa from 'execa'
import * as fs from 'fs'
import * as nps from 'path'
import * as dayjs from 'moment'
import { sync } from 'mkdirp'

type CreateWriteStreamOptions = Parameters<typeof fs.createWriteStream>[1]

function makeGetPreventFileStream(opts?: CreateWriteStreamOptions) {
  let fileStream
  let currentFilename
  return {
    get fileStream() {
      return fileStream
    },
    close: () => {
      fileStream && fileStream.close()
    },
    get: (filename) => {
      if (filename) {
        if (currentFilename !== filename) {
          if (fileStream) {
            fileStream.close()
          }
          fileStream = fs.createWriteStream(filename, opts)
        }

        if (fileStream) {
          return fileStream
        }
      }
    }
  }
}

const prefixMapper = {
  $time: (chunk) => {
    return `[${dayjs().format()}] `
  },
  '$beijing-time': () => {
    return `[${dayjs()
      .utcOffset(+8, false)
      .format('YYYY-MM-DD HH:mm:ss')}] `
  }
}

export default function logCrawl(
  command,
  dirPath,
  {
    prefix = '$beijing-time',
    getName = (type) => dayjs().format('YYYY-MM-DD') + `_${type}.txt`,
    process = global.process,
    createWriteStreamOptions
  }: {
    createWriteStreamOptions?: CreateWriteStreamOptions
    process?: any
    getName?: (type: 'log' | 'error') => string
    prefix?: '$beijing-time' | '$time' | (() => string) | string
  } = {}
) {
  const cp = execa.command(command, {
    stdio: 'pipe',
    shell: true
  })

  const getPrefix = prefixMapper.hasOwnProperty(prefix as string)
    ? prefixMapper[prefix as string]
    : typeof prefix === 'function'
    ? prefix
    : () => prefix || ''

  const getStdoutFileStream = makeGetPreventFileStream(createWriteStreamOptions)
  const getStderrFileStream = makeGetPreventFileStream(createWriteStreamOptions)

  cp.stdout
    .on('data', (chunk) => {
      const filename = nps.join(dirPath, getName('log'))
      sync(nps.dirname(filename))
      const fileStream = getStdoutFileStream.get(filename)
      if (getPrefix) {
        fileStream.write(`${getPrefix()}${String(chunk)}`)
      } else {
        fileStream.write(chunk)
      }
    })
    .on('end', () => {
      getStdoutFileStream.close()
    })
    .pipe(process.stdout)

  cp.stderr
    .on('data', (chunk) => {
      const filename = nps.join(dirPath, getName('error'))
      sync(nps.dirname(filename))
      const fileStream = getStderrFileStream.get(filename)
      if (getPrefix) {
        fileStream.write(`${getPrefix()}${String(chunk)}`)
      } else {
        fileStream.write(chunk)
      }
    })
    .on('end', () => {
      getStderrFileStream.close()
    })
    .pipe(process.stderr)

  // pipe exitCode
  cp.on('exit', (code) => {
    process.exitCode = code
  })

  return cp
}
