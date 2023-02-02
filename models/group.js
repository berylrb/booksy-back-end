import mongoose from 'mongoose'

const Schema = mongoose.Schema

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imgUrl: { type: String },
    members: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    booksRead: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  },
  { timestamps: true },
  { typeKey: '$type' }
)

const Group = mongoose.model('Group', groupSchema)

export { Group }