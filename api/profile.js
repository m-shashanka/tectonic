const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");
const FollowerModel = require("../models/FollowerModel");
const bcrypt = require("bcryptjs");
const {
  newFollowerNotification,
  removeFollowerNotification
} = require("../utilsServer/notificationActions");

router.get("/account/info",authMiddleware,async (req,res) => {
  try{
    const { userId } = req;
    const profile = await UserModel.findById(userId).select("+bio");
    if (!profile) {
      return res.status(404).send("User not Found");
    }
    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

//Get profile info
router.get("/:username", authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() }).select("+bio");
    if (!user) {
      return res.status(404).send("No User Found");
    }

    const profileFollowStats = await FollowerModel.findOne({ user: user._id });

    const postsCount = await PostModel.count({ user: user._id });

    return res.json({
      profile: user,

      postsLength: postsCount,

      followersLength:
        profileFollowStats.followers.length > 0 ? profileFollowStats.followers.length : 0,

      followingLength:
        profileFollowStats.following.length > 0 ? profileFollowStats.following.length : 0
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// Get posts of a user
router.get(`/posts/:username`, authMiddleware, async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(404).send("No User Found");
    }

    const posts = await PostModel.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("comments.user");

    return res.json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// Get followers of a user
router.get("/followers/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await FollowerModel.findOne({ user: userId }).populate("followers.user");

    return res.json(user.followers);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// Get following of a user
router.get("/following/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await FollowerModel.findOne({ user: userId }).populate("following.user");

    return res.json(user.following);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// Follow a user
router.post("/follow/:userToFollowId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { userToFollowId } = req.params;

    const user = await FollowerModel.findOne({ user: userId });
    const userToFollow = await FollowerModel.findOne({ user: userToFollowId });

    if (!user || !userToFollow) {
      return res.status(404).send("User not found");
    }

    const isFollowing =
      user.following.length > 0 &&
      user.following.filter(following => following.user.toString() === userToFollowId)
        .length > 0;

    if (isFollowing) {
      return res.status(401).send("User Already Followed");
    }

    await user.following.unshift({ user: userToFollowId });
    await user.save();

    await userToFollow.followers.unshift({ user: userId });
    await userToFollow.save();

    await newFollowerNotification(userId, userToFollowId);

    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// Unfollow a user
router.put("/unfollow/:userToUnfollowId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const { userToUnfollowId } = req.params;

    const user = await FollowerModel.findOne({
      user: userId
    });

    const userToUnfollow = await FollowerModel.findOne({
      user: userToUnfollowId
    });

    if (!user || !userToUnfollow) {
      return res.status(404).send("User not found");
    }

    const notFollowing = user.following.length > 0 &&
      user.following.filter(following => following.user.toString() === userToUnfollowId).length === 0;

    if (notFollowing || user.following.length === 0) {
      return res.status(401).send("User Not Followed before");
    }

    const removeFollowing = await user.following
      .map(following => following.user.toString())
      .indexOf(userToUnfollowId);

    await user.following.splice(removeFollowing, 1);
    await user.save();

    const removeFollower = await userToUnfollow.followers
      .map(follower => follower.user.toString())
      .indexOf(userId);

    await userToUnfollow.followers.splice(removeFollower, 1);
    await userToUnfollow.save();

    await removeFollowerNotification(userId, userToUnfollowId);

    return res.status(200).send("Updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// Update profile
router.post("/update", authMiddleware, async (req, res) => {
  try {
    const { userId } = req;

    const { bio, profilePicUrl, name } = req.body;

    const user = await UserModel.findById(userId);

    if(!name || name.length < 1)
      return res.status(500).send("Name cannot be empty");
    
    user.name = name;

    if(bio)
      user.bio = bio;

    if (profilePicUrl) 
      user.profilePicUrl = profilePicUrl;

    await user.save();

    return res.status(200).send("Success");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// Update password
router.post("/settings/password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).send("Password must be atleast 6 characters");
    }

    const user = await UserModel.findById(req.userId).select("+password");

    const isPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isPassword) {
      return res.status(401).send("Invalid Password");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).send("Updated successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

// Update message popup setting
router.post("/settings/messagePopup", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (user.newMessagePopup) {
      user.newMessagePopup = false;
    }
    //
    else {
      user.newMessagePopup = true;
    }

    await user.save();
    return res.status(200).send("updated");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;