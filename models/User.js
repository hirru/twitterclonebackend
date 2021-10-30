const mongoose = require("mongoose");

//Schema to store user data in the database
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  following: { type: Array },
});

//Creating a user model
const User = mongoose.model("user", userSchema);
module.exports = User;
