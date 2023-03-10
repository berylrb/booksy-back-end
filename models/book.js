import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  reviewAuthor: { type: String },
  reviewContent: { type: String, required: true },
  // book: { type: Schema.Types.ObjectId, ref: "Book" }
})

const bookSchema = new Schema(
  {
    title: {
      type: String,
      // required: true
    },
    author: {
      type: String,
      // required: true
    },
    qKey: {
      type: String,
      // required: true
    },
    description: {
      type: String,
      //  required: true
    },
    imgUrl: { type: String },
    collectedByPerson: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    collectedByGroup: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    reviews: [reviewSchema]
  },
  { timestamps: true },
  { typeKey: '$type' }
)

const Book = mongoose.model('Book', bookSchema)

export { Book }