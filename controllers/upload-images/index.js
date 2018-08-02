const aws = require('aws-sdk')

const s3 = new aws.S3()

const normalizeFilename = require('../../utils/normalize-filename')
const validImageFile = require('../../utils/valid-image-file')

const BUCKET_NAME = process.env.JR_SITE_S3_BUCKET_NAME

/**
 * Isolates user-defined filename and file extension
 * from entire filename and returns the two values
 * as independent properties in an object
 * @param {string} filename - filename to process
 * @return {object} - Object with isolated filename data
 */
const isolateFilenameData = (filename) => {
  const extensionIndex = filename.lastIndexOf('.')

  return {
    name: filename.substring(0, extensionIndex),
    extension: filename.substring(extensionIndex)
  }
}

/**
 * Processes the result of attempting to send a file
 * to S3 for storage.
 * @param {object} err - Upload to S3 error object
 * @param {object} data - Response from S3
 * @param {string} originalFilename - original name of uploaded file
 * @param {string} finalFilename - final name of uploaded file
 * @param {function} resolve - Promise resolution function
 * @return {void}
 */
const onFileSendResult = (
  err, data, originalFilename, finalFilename, resolve
) => {
  if (err) {
    console.error(err)
    // resolve with uploaded flag set to false so that consumer
    // can interpret the individual file upload error event
    resolve({
      uploaded: false,
      filename: originalFilename
    })
  }

  // Successful upload, resolve Promise accordingly
  resolve({
    uploaded: true,
    filename: originalFilename,
    normalizedName: finalFilename
  })
}

/**
 * Attempts to send a file uploaded to this server to
 * S3 for storage
 * @param {object} fileObject - Multer file object
 * @return {Promise<object>} - File send Promise result
 */
const sendFileToS3 = (fileObject) => {
  const { originalname, buffer, mimetype } = fileObject
  const filenameData = isolateFilenameData(originalname)

  const { extension } = filenameData
  const normalizedName = normalizeFilename(filenameData.name)
  const finalFilename = `${normalizedName}${extension}`

  const s3Params = {
    Bucket: BUCKET_NAME,
    Key: finalFilename,
    Body: buffer,
    ContentType: mimetype,
    ACL: 'public-read'
  }

  // Wrap result in a Promise for easier success/error handling
  return new Promise((resolve) => {
    // Attempt to send file to S3 and process result with
    // onFileSendResult function
    s3.putObject(s3Params, (err, data) => {
      onFileSendResult(
        err, data, originalname, finalFilename, resolve
      )
    })
  })
}

/**
 * Image uploading controller function. Sends each uploaded file
 * to S3 individually and responds to consumer with files that
 * were uploaded and files that were unable to be uploaded.
 * Also includes unsupported files in the response
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const uploadImages = (req, res) => {
  const { files } = req

  // get any invalid files that were provided
  const invalidFiles = files.filter(file =>
    !validImageFile(file.originalname)
  ).map(file => file.originalname)

  // get all valid files that were provided
  const validFiles = files.filter(file =>
    validImageFile(file.originalname)
  )

  if (validFiles.length === 0) {
    res.status(400).send({
      message: 'No valid files were provided.'
    })
  }

  // Attempt to send all files to S3. Responds with results
  Promise.all(
    // Map over each valid file and attempt to send to S3
    validFiles.map(file =>
      sendFileToS3(file)
    )
  ).then((results) => {
    // Process the results of sending all files to S3
    const uploadedFiles = results.filter(result =>
      result.uploaded
    )

    const uploadErrors = results.filter(result =>
      !result.uploaded
    )

    res.status(200).send({
      data: {
        uploadedFiles,
        uploadErrors,
        invalidFiles
      }
    })
  }).catch(error => {
    console.error(error)
    res.status(500).send({
      message: 'An unknown error occurred while uploading the images.'
    })
  })
}

module.exports = uploadImages
