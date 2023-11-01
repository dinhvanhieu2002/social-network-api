const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nonAccentVietnamese = require('../helpers/nonAccentVietnamese');


const signup = async (req, res) => {
  try {
    const {
      username,
      fullName,
      email,
      password,
      avatar
    } = req.body;

    const checkUsername = await User.findOne({ username });
    if (checkUsername) {
      return res.status(500).json({
        error: "username already used",
      });
    }

    const existingEmail = await User.findOne({ email })
    var user = new User();
    if(!existingEmail) {
      user.username = password ? username : nonAccentVietnamese.toLowerCaseNonAccentVietnamese(fullName).split(" ").join("");
      user.fullName = fullName;
      user.email = email;
      user.avatar = (avatar === "" || !avatar) ? "https://res.cloudinary.com/dgvb3ulgi/image/upload/v1673277818/avatars/no-avatar_l8c2wl.png" : avatar;
      if(password) {
        user.setPassword(password);
      }
      user = await user.save();
    }


    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    res.json({user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User
      .findOne({ username })
      .select("email username fullName password avatar salt id");

    if (!user) return res.status(404).json({ error: "User not exist"});

    if (!user.validPassword(password))
      return res.status(500).json({error: "Wrong password"});

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    user.password = undefined;
    user.salt = undefined;

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { username, fullName, avatar } = req.body

    const user = await User.findById(req.user);
    user.username = username;
    user.fullName = fullName;
    user.avatar = avatar;

    const updatedUser = await user.save()

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getInfo = async (req, res) => {
  const { userId } = req.params

  try {
    
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: 'User not found'});

    if(user.password) {
      user.password = undefined;
      user.salt = undefined;
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) return res.status(404).json({ msg: 'User not found'});

    if(user.password) {
      user.password = undefined;
      user.salt = undefined;
    }

    return res.status(200).json({ user, token: req.token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const search = async (req, res) => {
  try {
    const { username } = req.query;

    let users = await User.find({
      username: new RegExp(".*" + username + ".*"),
    });
    if (!users || users.length === 0) return res.status(400).json({ error: "cannot find user" });
    users = users.filter((user) => user.id !== req.user)

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSuggestedUsers = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user);
    //id nguoi minh dang theo doi
    const followings = currentUser.following;
    var users = [];

    if(followings.length > 0) {
      //dsach nguoi dung min dang theo doi
      const followingUsers = await User.find({ _id: { $in: followings}});
      followingUsers.forEach( async element => {
        const suggetedUser = await User.find({ _id: { $in: element.following}});
        users = [...users, ...suggetedUser];
      })
    } else {
      users = await User.find({ _id: {$ne: req.user }}).limit(20);
    }  

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const follow = async (req, res) => {
  try {
    const { followedId } = req.body;

    const user = await User.findById(req.user);
    const followedUser = await User.findById(followedId);

    user.following = [...user.following, followedId];
    
    followedUser.followers = [...followedUser.followers, req.user];

    await user.save();
    await followedUser.save();

    res.status(200).json({ message: "follow successfully" });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
}

const unfollow = async (req, res) => {
  try {
    const { followedId } = req.body;

    const user = await User.findById(req.user);
    const followedUser = await User.findById(followedId);

    user.following = user.following.filter(
      (following) => following.toString() !== followedId
    );

    followedUser.followers = followedUser.followers.filter(
      (follower) => follower.toString() !== req.user
    );

    await user.save();
    await followedUser.save();

    res.status(200).json({ message: "unfollow successfully" });
  } catch (error) {
    res.status(500).json({ error: "something went wrong" });
  }
}



module.exports = { signup, signin, updateProfile, getInfo, getSuggestedUsers, follow, unfollow, search, getCurrentUser }