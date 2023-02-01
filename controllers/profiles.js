import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'
import { Book } from '../models/book.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

async function addBook(req, res) {
  try {

    req.body.description = req.body.description.value
    // req.body.author = req.body.authors[0].author
    console.log('req.body.author', req.body.author)

    const profile = await Profile.findById(req.params.id)
    const book = await Book.create(req.body)
    profile.savedBooks.push(book)
    await profile.save()
    res.json(book)
  } catch(err) {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  }
}

export { 
  index, 
  addPhoto,
  addBook
}
