/**
 * Returns true if the proper environment variables
 * are set. False otherwise.
 */
const validEnv = () => {
  if (!process.env.JR_SITE_USERS_SERVICE_URI) {
    console.error('Users service URI not provided.')
    return false
  }
  return true
}

module.exports = validEnv
