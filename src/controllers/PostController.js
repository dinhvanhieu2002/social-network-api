const Post = require("../models/Post");
const User = require("../models/User");

const create = async (req, res) => {
  try {
    const { caption, photo } = req.body;

    const newPost = new Post({
      caption,
      photo,
      userId: req.user,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOne({
      _id: postId,
      userId: req.user,
    });

    if (!post) return res.status(404).json({ message: "not found post" });

    await post.deleteOne();

    return res.status(200).json({ message: "remove post successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption } = req.body

    const post = await Post.findOneAndUpdate({
      _id: postId,
      userId: req.user,
    }, {
      caption,
      updatedAt: Date.now()
    });

    if (!post) return res.status(404).json({ message: "not found post" });

    // await post.save();

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const postsOfUser = await Post.find({ userId: req.user });
    const currentUser = await User.findById(req.user);
    const postsOfFollowing = await Post.find({
      userId: { $in: currentUser.following },
    });

    const posts = [...postsOfUser, ...postsOfFollowing].sort(
      (date1, date2) => date2.createdAt - date1.createdAt
    );

    if (!posts || posts.length === 0)
      return res.status(404).json({ message: "cannot find any post" });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getPostsOfUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId }).sort("-createdAt");

    if (!posts || posts.length === 0) res.status(404).json({ message: "no post" });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const reaction = async (req, res) => {
  try {
    const { postId } = req.params;
    const loggedUser = req.user;
    let message;

    const post = await Post.findById(postId);

    if (post.reactions.includes(loggedUser)) {
      post.reactions = post.reactions.filter(
        (reaction) => reaction.toString() !== loggedUser
      );
      post.likeCount--;
      message = "unliked post";
    } else {
      post.reactions = [...post.reactions, loggedUser];
      post.likeCount++;
      message = "liked post";
    }

    await post.save();

    res.status(200).json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  create,
  remove,
  update,
  getPosts,
  getPostsOfUser,
  reaction,
};