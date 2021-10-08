const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Helper = require("../helpers/helpers");
const PostModel = require("../models/Post");
class postController {
  async postStatus(req, res) {
    const { status, userId } = req.body;
    console.log("userId", userId, status);
    try {
      const newPost = await new PostModel({
        status,
        userId,
      }).save();
      console.log("newPost", newPost);
      const user = await User.find({ _id: userId });
      console.log(user[0].following, "user");
      const posts = await PostModel.find({
        userId: { $in: [...user[0].following, userId] },
      })
        .sort({ createdAt: -1 })

        .populate({
          path: "userId",
          select: { firstName: 1, _id: 0 },
        });

      console.log("newPost", posts);
      return res.status(200).send({
        message: "Status fetched.",
        data: posts,
        status: true,
      });
    } catch (error) {
      return res.status(400).send({
        message: "Status not update.",
        data: error,
        status: false,
      });
    }
  }
  async getPost(req, res) {
    const { userId } = req.params;
    console.log("userId", userId);
    try {
      const user = await User.find({ _id: userId });
      console.log(user[0].following, "user");
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
