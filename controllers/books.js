import { Profile } from "../models/profile.js"
import { Book } from "../models/book.js"
import axios from "axios"


function bsIndex(req, res) {
  // const today = new Date().toISOString().split('T')[0]
  axios.get (`https://openlibrary.org/trending/weekly.json?details=true`)
  .then(apiResponse => {
    res.json(apiResponse.data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.errmsg })
  })
}


async function show(req, res) {
  try {
    const { qKey } = req.params
    console.log('qKey:', qKey)

    const response = await axios.get(`http://openlibrary.org/works/${qKey}.json`)
    console.log('OL API Res:', response)

    const bookData = await Book.findOne({ qKey: qKey }).lean()
    console.log('Existing Book Doc:', bookData)

    const book = bookData ? { ...response.data, ...bookData } : response.data
    console.log('Consolidated Book', book)

    res.json(book)
  } catch (err) {
    res.status(500).json(err)
  }
}



function createReview(req, res) {
  Book.findById(req.params.bookId.trim())
  .then(book => {
    Profile.findById(req.user.profile)
    .then(profile => {
      req.body.reviewAuthor = profile.name
      book.reviews?.push(req.body)
      book.save()
      .then(updatedBook => res.json(updatedBook))
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

async function findReviewsByKey(req, res) {
  try {
    const book = await Book.findOne({ qKey: req.params.id })
    console.log(book, 'book')
    res.json(book)
  } catch(err) {
    console.log(err)
    res.status(500).json(err)
  }
}

async function getBookRatings(req, res) {
  const { qKey } = req.params
  axios.get(`https://openlibrary.org/works/${qKey}/ratings.json`)
  .then(response => {
    res.json(response.data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err.errmsg})
  })
}
// book ratings = http://openlibrary.org/works/OL28914133W/ratings.json



export {
  bsIndex,
  show,
  createReview,
  findReviewsByKey,
  getBookRatings
}

