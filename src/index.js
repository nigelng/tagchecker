import { EOL } from 'node:os'
import path from 'path'

import { split, last, defaultTo, forEach, head } from 'ramda'

import { isNilOrEmpty, isOpeningTag, getClosingTag } from './helpers'
import logger from './logger'

import CONSTANTS from 'consts'
import { readFile, getTags } from 'helpers'

const fileName = defaultTo(CONSTANTS.DEBUG_FILENAME, head(process.argv.slice(2)))
const datafilePath = path.resolve(__dirname, `../data/${fileName}`)

const processLineTags = (allTags) => {
  const pendingOpeningTags = []
  let loggedInvalidTag = false

  forEach((tag) => {
    /*
     * This is an opening tag, so let's see what coming up next
     */
    if (isOpeningTag(tag)) {
      pendingOpeningTags.push(tag)
      return
    }

    /*
     * This tag is a closing tag:
     * - if there is no previous opening tag, it's an orphaned closing tag
     * - if matched with last opening tag, happy day
     * - otherwise it is an unmatched closing tag
     */

    const lastOpeningTag = last(pendingOpeningTags)

    if (isNilOrEmpty(lastOpeningTag)) {
      logger.info(`Expected # found ${tag}`)
      loggedInvalidTag = true
      return
    }

    const matchedClosingTag = getClosingTag(lastOpeningTag)

    if (matchedClosingTag === tag) {
      pendingOpeningTags.pop()
      return
    }

    logger.info(`Expected ${matchedClosingTag} found ${tag}`)
    loggedInvalidTag = true
  }, allTags)

  if (loggedInvalidTag) {
    return
  }

  if (!isNilOrEmpty(pendingOpeningTags)) {
    logger.info(`Expect ${getClosingTag(pendingOpeningTags[0])} found #`)
    return
  }

  logger.info(`Correctly tagged paragraph`)
}

;(async () => {
  try {
    const text = defaultTo('', await readFile(datafilePath))
    const lines = split(EOL, text)

    forEach((line) => {
      const allTags = getTags(line)

      if (isNilOrEmpty(allTags)) {
        return
      }

      processLineTags(allTags)
    }, lines)
    process.exit(0)
  } catch {
    process.exit(1)
  }
})()
