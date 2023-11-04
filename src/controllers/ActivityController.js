const Activity = require("../models/Activity");

const create = async (req, res) => {
  try {
    const { fromUserId, toUserId, postId, postImageUrl, comment } = req.body;

    const newActivity = new Activity({
      fromUserId, toUserId, postId, postImageUrl, comment
    });

    const savedActiity = await newActivity.save();

    res.status(201).json(savedActiity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ toUserId: req.user});

    if (!activities)
      return res.status(404).json({ message: "cannot find any post" });

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



module.exports = {
  create,
  getActivities,
};