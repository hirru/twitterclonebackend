const jwt = require("jsonwebtoken");

// VALIDATE SENT TOKEN ON ROUTES THAT NEED PROTECTION
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = req.headers.authorization;

    try {
      // verify makes sure that the token hasn't expired and has been issued by us
      jwt.verify(token, process.env.PRIVATEKEY);
      // We call next to pass execution to the subsequent middleware
      next();
    } catch ({ message }) {
      // Throw an error just in case anything goes wrong with verification
      res.status(401).json({ success: false, error: message });
    }
  } else {
    res.status(401).json({
      success: false,
      result: "Authentication error. Token required.",
    });
  }
};
