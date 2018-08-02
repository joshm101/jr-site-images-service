/**
 * Returns true if the proper environment variables
 * are set. False otherwise.
 */
const validEnv = () => {
  if (!process.env.JR_SITE_USERS_SERVICE_URI) {
    console.error('Users service URI not provided.')
    return false
  }

  if (!process.env.JR_SITE_S3_BUCKET_NAME) {
    console.error('S3 bucket name not provided.')
    return false
  }

  if (!process.env.AWS_ACCESS_KEY_ID) {
    console.error('AWS access key ID not provided.')
    return false
  }

  if (!process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('AWS secret access key not provided.')
    return false
  }

  return true
}

module.exports = validEnv
