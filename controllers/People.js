const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");

const Helper = require("../helpers/helpers");

class peopleController {
  async getPeople(req, res) {
    const { userId } = req.params;
    console.log("userId", userId);
    try {
      const user = await UserModel.find({ _id: { $ne: userId } });
      return res.status(200).send({
        message: "Status fetched.",
        data: user,
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
  async followUnfollow(req, res) {
    const { userId, followingId, type } = req.body;
    console.log("userId", req.body);
    try {
      if (type == "unfollow") {
        const response = await UserModel.updateOne(
          { _id: userId },
          { $pull: { following: { $in: followingId } } }
        );

        return res.status(200).send({
          message: "unfollowed.",
          data: response,
          status: true,
        });
      } else if (type == "follow") {
        const response = await UserModel.updateOne(
          { _id: userId },
          { $push: { following: followingId } }
        );

        return res.status(200).send({
          message: "followed.",
          data: response,
          status: true,
        });
      }
    } catch (error) {
      console.log("err", error);
      return res.status(400).send({
        message: "something went wrong.",
        data: error,
        status: false,
      });
    }
  }
}

module.exports = new peopleController();
