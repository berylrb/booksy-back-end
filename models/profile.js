import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: Object,
  bio: String,
  savedBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  joinedGroups: [{ type: Schema.Types.ObjectId, ref: "Group" }]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
