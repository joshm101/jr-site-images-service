const express = require('express')
const multer = require('multer')
const upload = multer()

const uploadImages = require('../../controllers/upload-images')
const getImages = require('../../controllers/get-images')

const apiRouter = express.Router()

const root = (req, res) => {
  res.status(200).send({
    message: 'jr-site-images-microservice API'
  })
}

apiRouter.post(
  '/upload-images',
  [upload.array('images'), uploadImages]
)
apiRouter.get('/get-images', getImages)
apiRouter.get('/', root)

module.exports = apiRouter
