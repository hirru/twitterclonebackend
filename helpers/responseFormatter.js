module.exports = {
  success: function (res, data, message) {
    res.status(200).send({
      status: true,
      data: data,
      message: message,
      code: 200,
    });
  },

  error: function (res, data, message) {
    res.status(401).send({
      status: false,
      data: data,
      message: message,
      code: 401,
    });
  },
};
