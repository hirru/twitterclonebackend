const express = require("express");
const HandleErrors = require("../middleware/error");
const router = express.Router();
const PeopleController = require("../controllers/People");

router.get("/getPeople/:userId", PeopleController.getPeople);
router.post("/follow", PeopleController.followUnfollow);

router.get("/test", (req, res) => {
  res.send("DummyBackend");
});

module.exports = router;
