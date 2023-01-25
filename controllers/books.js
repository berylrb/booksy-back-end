import { Profile } from "../models/profile.js"
import { Book } from "../models/book.js"
import axios from "axios"


function bsIndex(req, res) {
  axios.get (`https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=${process.env.API_KEY}`)
  .then(apiResponse => {
    apiResponse.data.results.forEach(result => {
      console.log(result.book_details[0].title, result.isbns[0].isbn13)
    })
    console.log(apiResponse.data.results[0].isbns[0].isbn10)
    console.log(apiResponse.data.results[0].id)
    res.json(apiResponse.data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.errmsg })
  })
}

// function showBook(req, res) {
//   axios.get (`https://api.nytimes.com/svc/books/v3/reviews.json?api-key=${process.env.API_KEY}`)
// }



export {
  bsIndex,
}

