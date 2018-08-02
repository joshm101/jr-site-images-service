const express = require('express')
const multer = require('multer')
const upload = multer()

const uploadImages = require('../../controllers/upload-images')
const authenticated = require('../../middleware/authenticated')

const apiRouter = express.Router()

const root = (req, res) => {
  res.status(200).send({
    message: 'jr-site-images-microservice API'
  })
}

apiRouter.post(
  '/upload-images',
  [authenticated, upload.array('images'), uploadImages]
)
apiRouter.get('/', root)

module.exports = apiRouter
