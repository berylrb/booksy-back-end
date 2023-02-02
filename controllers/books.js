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


function show (req, res) {
  const { qKey } = req.params
  console.log(qKey)
  // axios.get(`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${isbn}&api-key=${process.env.API_KEY}`)
  axios.get(`http://openlibrary.org/works/${qKey}.json`)
  .then(response => {
    console.log('HERE', response.data)
    // Book.findOne({ isbn: response.results.isbn13 })
    res.json(response.data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.errmsg })
  })
}

// async function createReview(req, res) {
//   try {
//     console.log(req.params, 'params')
//     const book = await Book.findById(req.params.bookId)
//     console.log(book, 'book')
//     const profile = await Profile.findById(req.user.profile)
//     req.body.reviewAuthor = profile.name
//     const updatedBook = book.reviews?.push(req.body)
//     // const newReview = book.reviews[book.reviews?.length - 1]
//     await updatedBook.save()
//     console.log(updatedBook, 'updated')
//     res.status(201).json(updatedBook)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json(error)
//   }
// }

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

