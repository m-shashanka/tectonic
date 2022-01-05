const UserModel = require("../models/UserModel");
const PostModel = require("../models/PostModel");

const commentOnPost = async (postId, userId) => {
  try {
    const post = await PostModel.findById(postId);

    if (!post) return { error: "No post found" };

    const user = await UserModel.findById(userId);

    const { profilePicUrl, username } = user;

    return {
      profilePicUrl,
      username,
      postByUserId: post.user.toString()
    };
  } catch (error) {
    return { error: "Server error" };
  }
};

module.exports = { commentOnPost };
