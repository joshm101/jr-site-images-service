const supportedExtensionRegex = /.jpg|.jpeg|.png|.gif/

/**
 * Determines if a provided image file is considered
 * valid by examining the provided filename
 * @param {string} filename - filename to check
 * @return {boolean} - Whether or not the file is
 * considered to be valid
 */
const validImageFile = (filename) => {
  const extensionDelimiter = filename.lastIndexOf('.')

  if (extensionDelimiter === -1) {
    // extension delimiter (period) not found in
    // filename string, invalid image file
    return false
  }

  const extension = filename.substring(
    extensionDelimiter
  ).toLowerCase()

  const validExtension = supportedExtensionRegex.test(extension)

  if (!validExtension) {
    return false
  }

  return true
}

module.exports = validImageFile
