import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'
import { Book } from '../models/book.js'
import { Group } from '../models/group.js'


const createGroup = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    const group = await Group.create(req.body)
    const profile = await Profile.findByIdAndUpdate(req.user.profile,
      { $push: { joinedGroups: group } },
      { new: true }
      )
      group.owner = profile
      group.members.push(profile)
      res.status(201).json(group)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


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
  addPhoto,
  createGroup
}