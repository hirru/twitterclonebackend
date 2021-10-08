const express = require("express");
const router = express.Router();
const Authentication = require("./routes/Auth");
const People = require("./routes/People");

const Post = require("./routes/Post");
router.use("/api/auth", Authentication);
router.use("/api/people", People);
router.use("/api/post", Post);

module.exports = router;
