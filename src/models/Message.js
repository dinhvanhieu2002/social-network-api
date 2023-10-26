const mongoose = require('mongoose')
const modelOptions = require('./ModelOptions')
const messageSchema = new mongoose.Schema({
    conversationId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: { type: String },
    body: { type: String },
}, 
  modelOptions
)

module.exports = mongoose.model('Message', messageSchema)