import { Profile } from "../models/profile.js"
import { Book } from "../models/book.js"
import axios from "axios"


function bsIndex(req, res) {
  axios.get (`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${process.env.API_KEY}`)
  .then(apiResponse => {
    console.log(apiResponse.data.results[0].isbns[0].isbn10)
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