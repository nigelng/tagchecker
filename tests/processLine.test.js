import processLine from '../src/processLine'

describe('processLine', () => {
  it('should return "No tag found" if the input line is empty', () => {
    expect(processLine('')).toBe('No tag found')
    expect(processLine()).toBe('No tag found')
  })

  it('should return "No tag found" if the input line contains no tag', () => {
    expect(processLine('abc def xyz')).toBe('No tag found')
  })

  it('should return "Correctly tagged paragraph" if the input line contains valid matched tag', () => {
    expect(processLine('<A> abc def xyz </A>')).toBe('Correctly tagged paragraph')
    expect(processLine('<A><B><C> abc def xyz </C></B></A>')).toBe(
      'Correctly tagged paragraph'
    )
  })

  it('should return "Expected <tag> found #" if the input line contains orphaned opening tag', () => {
    expect(processLine('<A> abc def xyz')).toBe('Expect </A> found #')
  })

  it('should return "Expected <tag> found <other-tag>" if the input line contains mismatched opening tag', () => {
    expect(processLine('<A><B><C> abc def xyz </B></A>')).toBe(
      'Expected </C> found </B>'
    )
  })

  it('should return "Expected # found <tag>" if the input line contains orphaned closing tag', () => {
    expect(processLine('abc def xyz</A>')).toBe('Expected # found </A>')
  })
})
