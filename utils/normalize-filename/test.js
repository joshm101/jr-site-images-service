const chai = require('chai')

const normalizeFilename = require('./index')

const { expect } = chai

describe('normalize filename', () => {
  it('returns an empty string when provided an empty string', () => {
    const result = normalizeFilename('')
    expect(result).to.equal('')
  })

  it('returns an empty string when provided non-string input', () => {
    expect(
      normalizeFilename(125)
    ).to.equal('')
  })

  it('returns an empty string when provided only whitespace', () => {
    expect(
      normalizeFilename('     ')
    ).to.equal('')
  })

  it('returns a properly normalized filename', () => {
    const singleTokenResult = normalizeFilename('64262_3525-_532js')
    const multiTokenResult = normalizeFilename('-2_20 18__n ode-js')

    expect(singleTokenResult).to.match(/\S{1}-\w/)
    expect(multiTokenResult).to.match(/\S{2}-\w/)
  })
})
