const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const Helper = require("../helpers/helpers");
const bcrypt = require("bcryptjs");
const ResponseFormatter = require("../helpers/responseFormatter");
const { genToken, genVerifyEmailToken } = require("../middleware/generate.js");
const helpers = require("../helpers/helpers");
const key = "123456789kjhgf";

class AuthController {
  async signUp(req, res) {
    try {
      let { firstName, lastName, email, password } = req.body;
      console.log("hitted0", req.body);
      email = email.toLowerCase();
      password = await bcrypt.hash(password, 8);
      const userExists = await Helper.checkUserExists(email);
      if (userExists) {
        return res.status(400).send({
          message: "User already exists",
          data: "",
          status: false,
        });
      }

      const saveNewUser = await new UserModel({
        firstName,
        lastName,
        email,
        password,
      }).save(function (err, savedSurvey) {
        if (err) {
          console.log("err", err);
          return;
        }

        return res.status(200).send({
          message: "Sign up successfull.",
          data: savedSurvey,
          status: true,
        });
      });
    } catch (error) {
      console.log("err", error);
      return res.status(400).send({
        message: "Something went worng!",
        data: error,
        status: false,
      });
    }
  }
  async login(req, res) {
    let { email, password } = req.body;
    console.log(req.body);
    const status = await Helper.matchCredentials(email.toLowerCase(), password);

    if (!status.matched) {
      return res.status(400).send({
        message: status.message,
        data: "",
        status: false,
      });
    }

    delete status.userInfo._doc.password;
    let user = status.userInfo;
    // console.log("login", user);
    const token = await genToken(user);
    user._doc.token = token;

    return res.status(200).send({
      message: "Login Successful.",
      data: { ...user._doc, isAuthLogin: true, timestamp: Date.now() },
      status: true,
    });
  }
  async matchToken(req, res) {
    const token = req.header("Authorization");
    console.log("user :>> ", token);

    try {
      let { user } = jwt.verify(token, key);
      console.log("user :>> ", user);
      if (user) {
        const data = await Helper.checkUserExists(user.email);
        delete data._doc.password;

        if (!data) {
          return responseFormatter.error(
            res,
            {
              isExpire: true,
              status: false,
            },
            "YOUR SESSION HAS EXPIRED. PLEASE LOGIN AGAIN."
          );
        } else {
          return ResponseFormatter.success(
            res,
            {
              data,
              token,
              isAuthLogin: true,
            },
            "Token Matched"
          );
        }
      }
    } catch (err) {
      console.log("err", err);
      return ResponseFormatter.error(
        res,
        {
          isExpire: true,
          status: false,
        },
        "YOUR SESSION HAS EXPIRED. PLEASE LOGIN AGAIN."
      );
    }
  }
}

module.exports = new AuthController();
