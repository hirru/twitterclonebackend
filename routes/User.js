const express = require("express");
const router = express.Router();
const PeopleController = require("../controllers/User");

router.get("/getPeople/:userId", PeopleController.getUsers);
router.post("/follow", PeopleController.followUnfollow);

module.exports = router;
