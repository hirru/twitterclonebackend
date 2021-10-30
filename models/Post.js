const mongoose = require("mongoose");

//Schema to store post data in the database
const postSchema = new mongoose.Schema({
  status: { type: String, require: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
postSchema.set("timestamps", true);

//Creating a post model
const Post = mongoose.model("post", postSchema);
module.exports = Post;
