//Module imports
const express = require("express");
const router = express.Router();
const Auth = require("./routes/Auth");
const User = require("./routes/User");
const Post = require("./routes/Post");

//Api Routes
router.use("/api/auth", Auth);
router.use("/api/user", User);
router.use("/api/post", Post);

//exporting module
module.exports = router;
