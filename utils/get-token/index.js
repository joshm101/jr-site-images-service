/**
 * Extracts a JWT from the Authorization header
 * @param {object} req - Express request object
 * @return {string} - JWT to verify
 */
const getToken = (req) => {
  const authorizationHeader = req.get('Authorization')

  if (!authorizationHeader) {
    return undefined
  }

  // Split "Bearer <token>" format
  const authorizationHeaderArray = authorizationHeader.split(' ')
  if (
    !authorizationHeaderArray.length ||
    authorizationHeaderArray.length !== 2
  ) {
    return undefined
  }

  // Get token and return. Token may be undefined.
  // Undefined token case handled by consumer
  const token = authorizationHeaderArray[1]

  return token
}

module.exports = getToken
