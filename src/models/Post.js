const mongoose = require('mongoose')
const modelOptions = require('./ModelOptions')

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true, 
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  userId: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, modelOptions)

module.exports = mongoose.model('Post', postSchema)