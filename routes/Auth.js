const express = require("express");
const HandleErrors = require("../middleware/error");
const router = express.Router();
const authController = require("../controllers/Auth");

router.post("/signUp", HandleErrors(authController.signUp));
router.post("/login", HandleErrors(authController.login));
router.post("/matchToken", HandleErrors(authController.matchToken));
router.get("/test", (req, res) => {
  res.send("DummyBackend");
});

module.exports = router;
