const Comment = require("../models/Comment");

const create = async (req, res) => {
  try {
    const { postId, caption } = req.body;

    const comment = new Comment({
      postId,
      caption,
      userId: req.user,
    });

    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.find({ postId }).sort("-createdAt");

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findOne({
      _id: commentId,
      userId: req.user,
    });

    if (!comment) return res.status(404).json({ error: "not found comment" });

    await comment.deleteOne();

    return res.status(200).json({ message: "remove comment successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const reaction = async (req, res) => {
  try {
    const { commentId } = req.params;
    const loggedUser = req.user;
    let message;

    const comment = await Comment.findById(commentId);

    if (comment.reactions.includes(loggedUser)) {
      comment.reactions = comment.reactions.filter(
        (reaction) => reaction.toString() !== loggedUser
      );
      comment.likeCount--;
      message = "unliked comment";
    } else {
      comment.reactions = [...comment.reactions, loggedUser];
      comment.likeCount++;
      message = "liked comment";
    }

    await comment.save();

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, getCommentsByPost, remove, reaction };
