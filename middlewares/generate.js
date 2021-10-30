// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");
const key = "123456789kjhgf";
const genToken = (user) => {
  const token = jwt.sign({ user }, key, {
    expiresIn: "48hr",
  });
  return (user.token = token);
};

const genVerifyEmailToken = (email) => {
  const token = jwt.sign({ email: email }, key, {
    expiresIn: "24hr",
  });
  return token;
};

module.exports = { genToken, genVerifyEmailToken };
