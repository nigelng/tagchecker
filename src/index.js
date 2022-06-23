import { EOL } from 'node:os'
import path from 'path'

import { split, defaultTo, forEach, head } from 'ramda'

import logger from './logger'
import processLine from './processLine'

import CONSTANTS from 'consts'
import { readFile } from 'helpers'

const fileName = defaultTo(CONSTANTS.DEBUG_FILENAME, head(process.argv.slice(2)))
const datafilePath = path.resolve(__dirname, `../data/${fileName}`)

;(async () => {
  try {
    const text = defaultTo('', await readFile(datafilePath))
    const lines = split(EOL, text)

    forEach((line) => {
      const result = processLine(line)
      logger.info(result)
    }, lines)
    process.exit(0)
  } catch {
    process.exit(1)
  }
})()
