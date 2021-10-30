//Module imports
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const dbConfig = require("./DB/connection");
const apiRoutes = require("./apiRoutes");
const App = express();
require("dotenv").config();

// DATABASE CONNECTION.
dbConfig;

// MIDDLEWARE
App.use(logger("dev"));
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(cors());
App.options("*", cors());

//Accessing all the routes
App.use(apiRoutes);

// importing port number from env file
const port = process.env.PORT;

//App will listen on 5000 port
App.listen(port, () => {
  console.log(`APP RUNNING ON PORT : ${port}`);
});

//exporting the module
module.exports = App;
