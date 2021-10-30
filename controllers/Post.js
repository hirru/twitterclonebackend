//Module Imports
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Helper = require("../helpers/helpers");
const PostModel = require("../models/Post");

// Class containing methods for creating and fetching posts
class postController {
  //Method to post a status
  async postStatus(req, res) {
    const { status, userId } = req.body;
    try {
      const newPost = await new PostModel({
        status,
        userId,
      }).save();

      const user = await User.find({ _id: userId });
      const posts = await PostModel.find({
        userId: { $in: [...user[0].following, userId] },
      })
        .sort({ createdAt: -1 })

        .populate({
          path: "userId",
          select: { firstName: 1, _id: 0 },
        });

      return res.status(200).send({
        message: "Post created Successfully.",
        data: posts,
        status: true,
      });
    } catch (error) {
      return res.status(400).send({
        message: "Failed to create post.",
        data: error,
        status: false,
      });
    }
  }

  //Method to get all the post of the user and the user followings
  async getPost(req, res) {
    const { userId } = req.params;
    console.log("userId", userId);
    try {
      const user = await User.find({ _id: userId });
      const posts = await PostModel.find({
        userId: { $in: [...user[0].following, userId] },
      })
        .sort({ createdAt: -1 })
        .populate({
          path: "userId",
          select: { firstName: 1, _id: 0 },
        });

      return res.status(200).send({
        message: "Status fetched.",
        data: posts,
        status: true,
      });
    } catch (error) {
      return res.status(400).send({
        message: "Status not fetched.",
        data: error,
        status: false,
      });
    }
  }
}

module.exports = new postController();
