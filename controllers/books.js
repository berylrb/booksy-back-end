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
    console.log(qKey, 'show qkey')
    console.log('qKey:', qKey)

    const response = await axios.get(`http://openlibrary.org/works/${qKey}.json`)
    // console.log('OL API Res:', response)

    const bookData = await Book.findOne({ qKey: qKey }).lean()
    // console.log('Existing Book Doc:', bookData)

    const book = bookData ? { ...response.data, ...bookData } : response.data
    // console.log('Consolidated Book', book)

    res.json(book)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function getSubject(req, res) {
  try {
    const { subject } = req.params
    console.log(subject, 'subj')
    const subjBooks = await axios.get(`https://openlibrary.org/subjects/${subject}.json`)
    let subjBooks2 = subjBooks?.data.works
    console.log(subjBooks2.slice(0, 5), 'LOOK HERE')
    res.json(subjBooks2)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const removeBook = async (req, res) => {
  try {
    console.log(req.params.qKey, 'qkey?')
    const profile = await Profile.findById(req.user.profile)
    .populate('savedBooks')
    const book = await Book.findOne(req.params)
    console.log(book, 'book here')
    // .populate('collectedByPerson')
    book.collectedByPerson?.remove(profile)
    await book.save()
    profile.savedBooks?.remove(book)
    await profile.save()
    console.log(profile, book, 'what is happening')
    res.json(profile)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function bookSearch(req, res) {
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?subject=${req.body.query}`)
    console.log(req.body, 'req.body.query')
    res.json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
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
  getBookRatings,
  bookSearch,
  removeBook,
  getSubject
}

