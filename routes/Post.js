const express = require("express");
const HandleErrors = require("../middleware/error");
const router = express.Router();
const postController = require("../controllers/Post");

router.post("/postStatus", HandleErrors(postController.postStatus));
router.get("/getFeed/:userId", HandleErrors(postController.getPost));
router.get("/test", (req, res) => {
  res.send("DummyBackend");
});

module.exports = router;
