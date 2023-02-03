import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'
import { Book } from '../models/book.js'
import { Group } from '../models/group.js'


const index = async (req, res) => {
  try {
    const groups = await Group.find({})
      .populate('owner')
      .populate('members')
      .populate('booksRead')
      .sort({ createdAt: 'desc' })
      res.status(200).json(groups)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

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
      group.save()
      res.status(201).json(group)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId)
      .populate('owner')
      .populate('members')
      .populate('booksRead')
      res.status(200).json(group)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.groupId,
      req.body,
      { new: true }
    ).populate('owner')
    res.status(200).json(group)
  } catch (error) {
    res.status(500).json(error)
  }
}


const deleteGroup = async(req, res) => {
  try {
    const group = Group.findByIdAndDelete(req.params.groupId)
    const profile = Profile.findById(req.user.profile)
    profile.joinedGroups.remove({ _id: req.params.groupId })
    group.members.remove( { _id: profile })
    await profile.save()
    res.status(200).json(group)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Group.findById(req.params.id)
  .then(group => {
    console.log('beef')
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
  createGroup,
  index,
  show,
  update,
  deleteGroup as delete,

}