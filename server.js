const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const dbConfig = require("./DB/connection");
const apiRoutes = require("./apiRoutes");
const App = express();

// DATABASE CONNECTION.
dbConfig;
// MIDDLEWARE

App.use(logger("dev"));
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(cors());

App.options("*", cors());

App.use(apiRoutes);

App.listen(5000, () => {
  console.log(`APP RUNNING ON PORT:5000`);
});

module.exports = App;
