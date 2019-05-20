const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

userSchema = new Schema({
  name: { type: String, required: true, max: 20 },
  username: { type: String, required: true, unique: true, lowercase: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: { type: String, required: true, min: 6 },
  number: { type: String },
  gender: { type: String },
  image: { type: String },
  bio: { type: String },
  from: [{ type: Schema.Types.ObjectId, ref: 'Chat' }],
  to: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)
