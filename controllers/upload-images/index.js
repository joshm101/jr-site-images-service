const uploadImages = (req, res) => {
  console.log(req.files)
  res.status(200).send({})
}

module.exports = uploadImages
