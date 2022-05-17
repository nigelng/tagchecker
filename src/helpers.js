import fs from 'fs/promises'

import { is, isNil, isEmpty, either, replace, test, match } from 'ramda'

import CONSTANTS from 'consts'
import logger from 'logger'

const isNilOrEmpty = either(isNil, isEmpty)

export { isNilOrEmpty }
export async function readFile(filePath) {
  try {
    return await fs.readFile(filePath, { encoding: 'utf-8' })
  } catch (err) {
    logger.error(err)
    throw new Error(`Unable to read file ${filePath}`)
  }
}

export function getTags(text) {
  if (!is(String, text) || isNilOrEmpty(text)) {
    return []
  }
  return match(CONSTANTS.RGX_TAG_DEFINITION, text)
}

export function getClosingTag(openingTag) {
  if (isNilOrEmpty(openingTag)) {
    return ''
  }

  if (!isOpeningTag(openingTag)) {
    return ''
  }

  const replSubStr = `</$1`
  const matchRegex = /^<([A-Z]>)/g

  return replace(matchRegex, replSubStr, openingTag)
}

export function isOpeningTag(tag) {
  return test(CONSTANTS.RGX_OPENING_TAG_DEFINITION, tag)
}

export function isClosingTag(tag) {
  return test(CONSTANTS.RGX_CLOSING_TAG_DEFINITION, tag)
}
