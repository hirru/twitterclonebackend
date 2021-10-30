//Module Import
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const Helper = require("../helpers/helpers");

//Class contains method to handle users
class userController {
  // Method to get all the users except the logged in one
  async getUsers(req, res) {
    const { userId } = req.params;
    try {
      const users = await UserModel.find({ _id: { $ne: userId } });

      return res.status(200).send({
        message: "Status fetched.",
        data: users,
        status: true,
      });
    } catch (error) {
      return res.status(400).send({
        message: "failed!",
        data: error,
        status: false,
      });
    }
  }

  //Method to follow or unfollow a user
  async followUnfollow(req, res) {
    const { userId, followingId, type } = req.body;
    try {
      if (type == "unfollow") {
        const unfollow = await UserModel.updateOne(
          { _id: userId },
          { $pull: { following: { $in: followingId } } }
        );

        return res.status(200).send({
          message: "unfollowed Successfully!",
          data: unfollow,
          status: true,
        });
      } else if (type == "follow") {
        const follow = await UserModel.updateOne(
          { _id: userId },
          { $push: { following: followingId } }
        );

        return res.status(200).send({
          message: "followed.",
          data: follow,
          status: true,
        });
      }
    } catch (error) {
      return res.status(400).send({
        message: "Request failed.",
        data: error,
        status: false,
      });
    }
  }
}

//export module
module.exports = new userController();
