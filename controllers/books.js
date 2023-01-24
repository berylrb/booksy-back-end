import { Profile } from "../models/profile.js"
import { Book } from "../models/book.js"
import axios from "axios"


function bsIndex(req, res) {
  axios.get (`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${process.env.API_KEY}`)
  .then(apiResponse => {
    res.json(apiResponse.data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({ err: err.errmsg })
  })
}



export {
  bsIndex,
 }