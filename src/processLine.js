import { last, forEach } from 'ramda'

import { isNilOrEmpty, isOpeningTag, getClosingTag, getTags } from './helpers'

export default (line) => {
  const allTags = getTags(line)
  let lineResult = ''

  if (isNilOrEmpty(allTags)) {
    return 'No tag found'
  }

  const pendingOpeningTags = []

  forEach((tag) => {
    // stop at the first unmatched tag
    if (!isNilOrEmpty(lineResult)) {
      return
    }

    if (isOpeningTag(tag)) {
      /*
       * This is an opening tag, so let's see what coming up next
       */
      pendingOpeningTags.push(tag)
      return
    }

    /*
     * This tag is a closing tag:
     * - if there is no previous opening tag, it's an orphaned closing tag
     * - if it does not match last opening tag, it's an unmatched closing tag
     * - otherwise happy day
     */

    const lastOpeningTag = last(pendingOpeningTags)

    if (isNilOrEmpty(lastOpeningTag)) {
      lineResult = `Expected # found ${tag}`
      return
    }

    const matchedClosingTag = getClosingTag(lastOpeningTag)

    if (matchedClosingTag !== tag) {
      lineResult = `Expected ${matchedClosingTag} found ${tag}`
      return
    }

    pendingOpeningTags.pop()
  }, allTags)

  if (!isNilOrEmpty(lineResult)) {
    return lineResult
  }

  return isNilOrEmpty(pendingOpeningTags)
    ? 'Correctly tagged paragraph'
    : `Expect ${getClosingTag(pendingOpeningTags[0])} found #`
}
