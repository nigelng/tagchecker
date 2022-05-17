import * as helpers from '../src/helpers'

const { readFile, getTags, getClosingTag, isOpeningTag, isClosingTag } = helpers

describe('helpers', () => {
  describe('readFile', () => {
    it('should read file from data folder', async () => {
      const readSpy = jest.spyOn(helpers, 'readFile')
      readSpy.mockImplementation(() => 'hello')

      const text = await helpers.readFile('test')

      expect(text).toEqual('hello')
      expect(readSpy).toBeCalledWith('test')

      readSpy.mockRestore()
    })

    it('should throw error if file does not exist', async () => {
      const fileName = 'something_random'
      expect(async () => {
        await readFile(fileName)
      }).rejects.toThrowError(`Unable to read file ${fileName}`)
    })
  })

  describe('getTags', () => {
    it('should get all valid tags from input text', () => {
      const tags = getTags('<A><B></C></D><<a><b>></c>><//D>')
      expect(tags.length).toEqual(4)
      expect(tags).toContain('<A>')
      expect(tags).toContain('<B>')
      expect(tags).toContain('</C>')
      expect(tags).toContain('</D>')
    })

    it('should ignore invalid tags', () => {
      const tags = getTags('<ABC> <A1> <B/> <+C> <<*> <\\D> <E+>>')
      expect(tags).toEqual([])
    })

    it('should ignore undefined, null or empty input', () => {
      expect(getTags()).toEqual([])
      expect(getTags(null)).toEqual([])
      expect(getTags('')).toEqual([])
    })

    it('should handle non string input gracefully', () => {
      expect(getTags(345)).toEqual([])
      expect(getTags(['a'])).toEqual([])
      expect(getTags({ a: 1 })).toEqual([])
    })
  })

  describe('isOpeningTag', () => {
    it('should return true if the input is an opening tag', () => {
      expect(isOpeningTag('<A>')).toBe(true)
    })

    it('should return false if input tag is not an opening tag', () => {
      expect(isOpeningTag('</A>')).toBe(false)
    })

    it('should return undefined, null, empty string gracefully', () => {
      expect(isOpeningTag('')).toBe(false)
      expect(isOpeningTag(null)).toBe(false)
      expect(isOpeningTag()).toBe(false)
    })
  })

  describe('isClosingTag', () => {
    it('should return true if the input is a closing tag', () => {
      expect(isClosingTag('</A>')).toBe(true)
    })

    it('should return false if input tag is not an closing tag', () => {
      expect(isClosingTag('<A>')).toBe(false)
    })

    it('should return undefined, null, empty string gracefully', () => {
      expect(isClosingTag('')).toBe(false)
      expect(isClosingTag(null)).toBe(false)
      expect(isClosingTag()).toBe(false)
    })
  })

  describe('getClosingTag', () => {
    it('should return a closing tag for a valid opening tag', () => {
      expect(getClosingTag('<A>')).toBe('</A>')
    })

    it('should return empty string if input is not an opening tag', () => {
      expect(getClosingTag('</A>')).toBe('')
      expect(getClosingTag('')).toBe('')
      expect(getClosingTag()).toBe('')
      expect(getClosingTag(4)).toBe('')
    })
  })
})
