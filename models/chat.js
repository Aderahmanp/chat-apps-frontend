const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
  massage: { type: String },
  from: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  to: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Chat', chatSchema)
