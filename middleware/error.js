const HandleErrors = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (err) {
      console.error("error handler", err);
      res.status(480).send(err);
      next(err);
    }
  };
};

module.exports = HandleErrors;
