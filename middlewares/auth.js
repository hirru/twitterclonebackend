// import jwt from "jsonwebtoken";
// import Helper from "../helpers/helpers.jss";
// import responseFormatter from "../helpers/responseFormatter.js";
const jwt = require("jsonwebtoken");
const Helper = require("../helpers/helpers");
const responseFormatter = require("../helpers/responseFormatter");

const JWT_SECRETE_KEY = "123456789kjhgf";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    const { user } = await jwt.verify(token, JWT_SECRETE_KEY);
    const data = await Helper.checkUserExists(user.email);
    if (!data) {
      return responseFormatter.error(
        res,
        {
          isExpire: true,
          status: false,
        },
        "User doesn't exits! Please try to login again."
      );
    }

    if (user) {
      req.token = token;
      req.user = user;
      next();
    }
  } catch (e) {
    responseFormatter.error(
      res,
      {
        isExpire: true,
        status: false,
      },
      "YOUR SESSION HAS EXPIRED. PLEASE LOGIN AGAIN."
    );
  }
};

module.exports = auth;
// export default auth;
