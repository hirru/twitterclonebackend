const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  status: { type: String, require: true },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});
postSchema.set("timestamps", true);
const Post = mongoose.model("post", postSchema);
module.exports = Post;
