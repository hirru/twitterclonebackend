const express = require("express");
const HandleErrors = require("../middlewares/error");
const router = express.Router();
const postController = require("../controllers/Post");

router.post("/postStatus", HandleErrors(postController.postStatus));
router.get("/getFeed/:userId", HandleErrors(postController.getPost));

module.exports = router;
