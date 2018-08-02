const chai = require('chai')

const validImageFile = require('./index')

const { expect } = chai

describe('valid image file', () => {
  it('returns false when provided a name with no extension', () => {
    const result = validImageFile('my-malformed-filename')

    expect(result).to.equal(false)
  })

  it('returns false when provided an unsupported extension', () => {
    const result = validImageFile('filename.exe')

    expect(result).to.equal(false)
  })

  it('returns true when provided a supported extension', () => {
    const results = [
      validImageFile('filename.jpg'),
      validImageFile('filename.jpeg'),
      validImageFile('filename.png'),
      validImageFile('filename.gif')
    ]

    results.forEach((result) => {
      expect(result).to.equal(true)
    })
  })
})
