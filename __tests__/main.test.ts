/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
import logCrawler from '../src'
import { readFileSync } from 'fs'
import { fixture } from './helper'
import { sync } from 'rimraf'

describe('logCrawler package', function () {
  afterEach(() => {
    sync(fixture('') + '/test*')
  })
  it('spec stdout', function (done) {
    logCrawler('echo "hello, world"', fixture(), {
      getName: () => 'test.txt',
      prefix: () => 'PREFIX ',
      createWriteStreamOptions: {
        // flags: 'a'
      }
    })

    setTimeout(() => {
      const output = readFileSync(fixture('test.txt'), 'utf8')
      expect(output).toBe('PREFIX hello, world\n')
      done()
    }, 1000)
  })

  it('spec stderr', function (done) {
    logCrawler('echo "hello, world" 1>&2', fixture(), {
      getName: () => 'test_error.txt',
      prefix: () => 'PREFIX ',
      createWriteStreamOptions: {
        // flags: 'a'
      }
    })

    setTimeout(() => {
      const output = readFileSync(fixture('test_error.txt'), 'utf8')
      expect(output).toBe('PREFIX hello, world\n')
      done()
    }, 1000)
  })

  it('spec stdout & stderr', function (done) {
    logCrawler('echo "hello, world" 1>&2 && echo "hello, world"', fixture(), {
      getName: (type) => `test_all_${type}.txt`,
      prefix: () => 'PREFIX ',
      createWriteStreamOptions: {
        // flags: 'a'
      }
    })

    setTimeout(() => {
      let output = readFileSync(fixture('test_all_error.txt'), 'utf8')
      expect(output).toBe('PREFIX hello, world\n')

      output = readFileSync(fixture('test_all_log.txt'), 'utf8')
      expect(output).toBe('PREFIX hello, world\n')
      done()
    }, 1000)
  })

  it('stdout prints multi lines', function (done) {
    logCrawler('echo "hello, world" && sleep 1 && echo "lalala"', fixture(), {
      getName: () => 'test_multi.txt',
      prefix: () => 'PREFIX ',
      createWriteStreamOptions: {
        flags: 'a'
      }
    })

    setTimeout(() => {
      const output = readFileSync(fixture('test_multi.txt'), 'utf8')
      expect(output).toMatchInlineSnapshot(`
        "PREFIX hello, world
        PREFIX lalala
        "
      `)
      done()
    }, 3000)
  })

  it('pipe exitCode', function (done) {
    logCrawler('exit 100', fixture(), {
      getName: () => 'test_exitCode.txt',
      prefix: () => 'PREFIX ',
      createWriteStreamOptions: {
        flags: 'a'
      }
    })

    setTimeout(() => {
      expect(process.exitCode).toBe(100)
      done()
    }, 1000)
  })
})
