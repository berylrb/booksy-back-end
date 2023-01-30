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
  axios.get(`http://openlibrary.org/works/${qKey}/editions.json`)
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

// book ratings = http://openlibrary.org/works/OL28914133W/ratings.json



export {
  bsIndex,
  show
}

