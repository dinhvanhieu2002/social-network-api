const mongoose = require('mongoose')
const modelOptions = require('./ModelOptions')

const activitySchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  postImageUrl: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
}, modelOptions)

module.exports = mongoose.model('Activity', activitySchema)