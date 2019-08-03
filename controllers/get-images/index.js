const aws = require('aws-sdk')

const {
  JR_SITE_S3_BUCKET_NAME,
  JR_SITE_AWS_ACCESS_KEY_ID,
  JR_SITE_AWS_SECRET_ACCESS_KEY
} = process.env

const s3 = new aws.S3({
  accessKeyId: JR_SITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: JR_SITE_AWS_SECRET_ACCESS_KEY
})

const ROOT_URL = `https://s3.us-east-2.amazonaws.com/${JR_SITE_S3_BUCKET_NAME}`

const getImages = (req, res) => {
  const s3Params = {
    Bucket: JR_SITE_S3_BUCKET_NAME
  }
  s3.listObjectsV2(s3Params, (err, data) => {
    if (err) {
      console.error(err)
      res.status(500).send({
        message: 'An unknown error occurred while retrieving images. ' +
                 'Please try again later.'
      })
      return
    }

    res.status(200).send({
      data: data.Contents.map(imageObject =>
        ({
          url: `${ROOT_URL}/${imageObject.Key}`,
          relativePath: `${imageObject.Key}`
        })
      )
    })
  })
}

module.exports = getImages
