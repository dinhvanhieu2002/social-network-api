const mongoose = require('mongoose')
const modelOptions = require('./ModelOptions')
const conversationSchema = new mongoose.Schema({
    lastMessageAt: { type: Date, default: Date.now() },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
      }
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    createdAt: { type: Date, default: Date.now()}
}, modelOptions)

module.exports = mongoose.model('Conversation', conversationSchema)