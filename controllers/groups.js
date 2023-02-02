import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'
import { Book } from '../models/book.js'


function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Group.findById(req.params.id)
  .then(group => {
    cloudinary.uploader.upload(imageFile, {tags: `${group.name}`})
    .then(image => {
      group.imgUrl = image.url
      group.save()
      .then(group => {
        res.status(201).json(group.imgUrl)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export {
  addPhoto
}