const requestPromise = require('request-promise')

const getToken = require('../../utils/get-token')

const USERS_SERVICE_URI = process.env.JR_SITE_USERS_SERVICE_URI

/**
 * Determines if the Authorization header in the
 * current request contains a valid auth token
 * by checking with the users microservice.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Invoked when auth token
 * has been validated to execute next function in
 * middleware chain.
 * @return {void}
 */
const authenticated = (req, res, next) => {
  const token = getToken(req)
  if (!token) {
    res.status(401).send({
      message: 'Not authorized to upload images.'
    })
    return
  }

  const requestOptions = {
    uri: `http://${USERS_SERVICE_URI}:3005/api/token-valid`,
    headers: {
      Authorization: `Bearer: ${token}`
    }
  }

  requestPromise(requestOptions).then((response) => {
    const authResponse = JSON.parse(response)
    if (authResponse.data) {
      // serviceResponse.data is truthy, token is valid
      next()
      return
    }

    // authResponse.data is falsy, auth token is
    // invalid. Requester is not authorized to
    // upload images.
    res.status(401).send({
      message: 'Auth token invalid; not authorized to upload images.'
    })
  }).catch((error) => {
    console.error(`Error: ${error}`)
    res.status(500).send({
      message: 'An unknown error occurred while ' +
               'validating the auth token. No ' +
               'images were uploaded.'
    })
  })
}

module.exports = authenticated
