const uuidv4 = require('uuid/v4')

/**
 * Normalizes a provided filename by replacing
 * whitespace between tokens with dashes and
 * appending a dash followed by a uuid to
 * generate a sufficiently unique filename.
 * This creates filenames that adhere to a
 * standard and avoid naming collisions
 * @param {string} name - Filename to normalize
 * @return {string} - Normalized filename
 */
const normalizeFilename = (name) => {
  if (!name || !(typeof name === 'string')) {
    return ''
  }

  const filename = name.trim()
  if (!filename) {
    // filename consisted of only spaces
    return ''
  }

  const whitespaceReplacedWithDashes = filename.trim().replace(/ /g, '-')
  return `${whitespaceReplacedWithDashes}-${uuidv4()}`
}

module.exports = normalizeFilename
