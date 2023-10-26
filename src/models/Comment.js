const mongoose = require('mongoose')
const modelOptions = require('./ModelOptions');

const commentSchema = new mongoose.Schema({
    postId: { type: String, required: true },
    reactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    likeCount: { type: Number, default: 0},
    caption: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, modelOptions
)


module.exports = mongoose.model('Comment', commentSchema)