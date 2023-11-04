const express = require('express');

const userRouter = require('./user');
const postRouter = require('./post');
const commentRouter = require('./comment');
const uploadRouter = require('./upload');
const conversationRouter = require('./conversation');
const messageRouter = require('./message');
const activityRouter = require('./activity');

const router = express.Router();

//done
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use("/upload", uploadRouter);
router.use('/comments', commentRouter);
router.use("/conversations", conversationRouter);
router.use("/messages", messageRouter);
router.use("/activities", activityRouter);

module.exports = router;